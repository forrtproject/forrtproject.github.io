/**
 * Featured Resources: reference popup, reading list, voting, filtering.
 * Depends on window.FORRT_FEATURED being set by featured_global.html.
 */
(function () {
  'use strict';

  /* ---- Helpers ---- */
  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  function escHtml(s) {
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  /** Flat lookup: DOI → resource object across all clusters. */
  function buildResourceIndex(data) {
    var idx = {};
    if (!data || !data.clusters) return idx;
    Object.keys(data.clusters).forEach(function (cn) {
      data.clusters[cn].forEach(function (r) {
        if (r.doi) idx[r.doi] = r;
      });
    });
    return idx;
  }

  /* ================================================================
     REFERENCE POPUP
     ================================================================ */
  function initReferencePopup(resourceIdx) {
    var backdrop = document.getElementById('fr-ref-popup-backdrop');
    var body = document.getElementById('fr-ref-popup-body');
    var closeBtn = backdrop ? backdrop.querySelector('.ref-popup-close') : null;
    if (!backdrop || !body) return;

    function open(doi) {
      var r = resourceIdx[doi];
      if (!r) return;
      var html = '';
      // Tags + title
      html += '<div class="ref-popup-tags">';
      if (r.focus) html += '<span class="tag tag-focus">' + escHtml(r.focus) + '</span>';
      if (r.resource_type) html += '<span class="tag tag-type">' + escHtml(r.resource_type) + '</span>';
      html += '</div>';
      html += '<div class="ref-popup-title">' + escHtml(r.title) + '</div>';

      // APA
      if (r.apa) {
        html += '<div class="ref-section">';
        html += '<div class="ref-section-label">APA Reference</div>';
        html += '<div class="ref-apa">' + escHtml(r.apa) + '</div>';
        html += '<div class="ref-copy-row">';
        html += '<button class="ref-copy-btn" data-copy="apa" data-doi="' + escHtml(doi) + '">' +
          '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="8" height="10" rx="1"/><path d="M5 3V2a1 1 0 011-1h5a1 1 0 011 1v9a1 1 0 01-1 1h-1"/></svg>' +
          ' Copy APA</button>';
        if (r.bibtex) {
          html += '<button class="ref-copy-btn" data-copy="bibtex" data-doi="' + escHtml(doi) + '">' +
            '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="8" height="10" rx="1"/><path d="M5 3V2a1 1 0 011-1h5a1 1 0 011 1v9a1 1 0 01-1 1h-1"/></svg>' +
            ' Copy BibTeX</button>';
        }
        html += '</div></div>';
      }

      // Abstract
      if (r.abstract) {
        html += '<div class="ref-section">';
        html += '<div class="ref-section-label">Abstract</div>';
        html += '<div class="ref-abstract">' + escHtml(r.abstract) + '</div>';
        html += '</div>';
      }

      // DOI + OA
      html += '<div class="ref-divider"></div>';
      html += '<div class="ref-doi-row">';
      var doiUrl = 'https://doi.org/' + encodeURIComponent(doi);
      html += '<a href="' + doiUrl + '" target="_blank" rel="noopener" class="ref-doi-link">' + escHtml(doiUrl) + '</a>';
      if (r.is_oa) {
        html += '<span class="ref-oa-badge open">' +
          '<svg viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 5v6M5 8h6"/></svg>' +
          ' Open Access</span>';
        if (r.oa_url) {
          html += '<a href="' + escHtml(r.oa_url) + '" target="_blank" rel="noopener" class="ref-oa-link">' +
            '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 3H3v10h10v-3M9 1h6v6M9 7L15 1"/></svg>' +
            ' Free PDF</a>';
        }
      } else {
        html += '<span class="ref-oa-badge closed">' +
          '<svg viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6"/></svg>' +
          ' Not Open Access</span>';
      }
      html += '</div>';

      body.innerHTML = html;
      backdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      backdrop.classList.remove('open');
      body.innerHTML = '';
      document.body.style.overflow = '';
    }

    // Event delegation: ref trigger buttons
    document.addEventListener('click', function (e) {
      var trigger = e.target.closest('.fr-ref-trigger[data-doi]');
      if (trigger) {
        e.preventDefault();
        open(trigger.getAttribute('data-doi'));
        return;
      }
      // Copy buttons inside popup
      var copyBtn = e.target.closest('.ref-copy-btn[data-copy]');
      if (copyBtn) {
        e.preventDefault();
        var type = copyBtn.getAttribute('data-copy');
        var d = copyBtn.getAttribute('data-doi');
        var res = resourceIdx[d];
        if (!res) return;
        var text = type === 'bibtex' ? res.bibtex : res.apa;
        navigator.clipboard.writeText(text).then(function () {
          copyBtn.classList.add('copied');
          var orig = copyBtn.innerHTML;
          var label = type === 'bibtex' ? 'BibTeX' : 'APA';
          copyBtn.innerHTML = copyBtn.querySelector('svg').outerHTML + ' Copied!';
          setTimeout(function () {
            copyBtn.classList.remove('copied');
            copyBtn.innerHTML = orig;
          }, 1500);
        });
        return;
      }
    });

    // Close handlers
    if (closeBtn) closeBtn.addEventListener('click', close);
    backdrop.addEventListener('click', function (e) {
      if (e.target === backdrop) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && backdrop.classList.contains('open')) close();
    });
  }

  /* ================================================================
     READING LIST
     ================================================================ */
  function initReadingList(resourceIdx) {
    var LS_KEY = 'forrt-reading-list';
    var LS_TOOLTIP_KEY = 'forrt-rl-tooltip-shown';
    var pill = document.getElementById('fr-rl-pill');
    var pillCount = document.getElementById('fr-rl-pill-count');
    var tooltip = document.getElementById('fr-rl-tooltip');
    var tooltipDismiss = document.getElementById('fr-rl-tooltip-dismiss');
    var backdrop = document.getElementById('fr-rl-backdrop');
    var panel = document.getElementById('fr-rl-panel');
    var panelClose = document.getElementById('fr-rl-panel-close');
    var panelBody = document.getElementById('fr-rl-panel-body');
    var exportBtn = document.getElementById('fr-rl-export');

    function getList() {
      try { return JSON.parse(localStorage.getItem(LS_KEY)) || []; }
      catch (e) { return []; }
    }
    function setList(arr) {
      localStorage.setItem(LS_KEY, JSON.stringify(arr));
    }

    function updateUI() {
      var list = getList();
      // Pill visibility
      if (pill) {
        pill.classList.toggle('visible', list.length > 0);
        if (pillCount) pillCount.textContent = list.length;
      }
      // Bookmark button states
      document.querySelectorAll('.fr-bookmark-btn[data-doi]').forEach(function (btn) {
        var doi = btn.getAttribute('data-doi');
        var saved = list.indexOf(doi) !== -1;
        btn.classList.toggle('saved', saved);
        var span = btn.querySelector('span');
        if (span) span.textContent = saved ? 'Saved' : 'Save';
      });
    }

    function toggleSave(doi) {
      var list = getList();
      var idx = list.indexOf(doi);
      if (idx === -1) {
        list.push(doi);
        // First-save tooltip
        if (tooltip && !localStorage.getItem(LS_TOOLTIP_KEY)) {
          localStorage.setItem(LS_TOOLTIP_KEY, '1');
          tooltip.classList.add('visible');
          setTimeout(function () { tooltip.classList.remove('visible'); }, 6000);
        }
      } else {
        list.splice(idx, 1);
      }
      setList(list);
      updateUI();
    }

    function renderPanel() {
      if (!panelBody) return;
      var list = getList();
      if (list.length === 0) {
        panelBody.innerHTML = '<div class="rl-panel-empty">No saved resources yet.</div>';
        return;
      }
      var html = '';
      list.forEach(function (doi) {
        var r = resourceIdx[doi] || {};
        html += '<div class="rl-panel-item" data-doi="' + escHtml(doi) + '">';
        html += '<div class="rl-panel-item-info">';
        html += '<div class="rl-panel-item-title">' + escHtml(r.title || doi) + '</div>';
        html += '<div class="rl-panel-item-ref">' + escHtml(r.short_ref || '') + '</div>';
        html += '</div>';
        html += '<button class="rl-panel-item-remove" data-doi="' + escHtml(doi) + '" aria-label="Remove">&times;</button>';
        html += '</div>';
      });
      panelBody.innerHTML = html;
    }

    function openPanel() {
      renderPanel();
      if (backdrop) backdrop.classList.add('open');
      if (panel) panel.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closePanel() {
      if (backdrop) backdrop.classList.remove('open');
      if (panel) panel.classList.remove('open');
      document.body.style.overflow = '';
    }

    // Bookmark button clicks
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.fr-bookmark-btn[data-doi]');
      if (btn) {
        e.preventDefault();
        toggleSave(btn.getAttribute('data-doi'));
      }
    });

    // Pill click → open panel
    if (pill) pill.addEventListener('click', openPanel);
    if (pill) pill.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPanel(); }
    });

    // Close panel
    if (panelClose) panelClose.addEventListener('click', closePanel);
    if (backdrop) backdrop.addEventListener('click', closePanel);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel && panel.classList.contains('open')) closePanel();
    });

    // Tooltip dismiss
    if (tooltipDismiss) tooltipDismiss.addEventListener('click', function () {
      if (tooltip) tooltip.classList.remove('visible');
    });

    // Remove from panel
    if (panelBody) panelBody.addEventListener('click', function (e) {
      var removeBtn = e.target.closest('.rl-panel-item-remove[data-doi]');
      if (removeBtn) {
        var doi = removeBtn.getAttribute('data-doi');
        var list = getList();
        var idx = list.indexOf(doi);
        if (idx !== -1) list.splice(idx, 1);
        setList(list);
        updateUI();
        renderPanel();
      }
    });

    // Export BibTeX
    if (exportBtn) exportBtn.addEventListener('click', function () {
      var list = getList();
      var bibtex = list.map(function (doi) {
        var r = resourceIdx[doi];
        return r && r.bibtex ? r.bibtex : '% No BibTeX available for DOI: ' + doi;
      }).join('\n\n');
      var blob = new Blob([bibtex], { type: 'text/plain;charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'forrt-reading-list.bib';
      a.click();
      URL.revokeObjectURL(url);
    });

    // Initial state
    updateUI();
  }

  /* ================================================================
     VOTING
     ================================================================ */
  function initVoting() {
    var LS_KEY = 'forrt-votes';

    function getVotes() {
      try { return JSON.parse(localStorage.getItem(LS_KEY)) || {}; }
      catch (e) { return {}; }
    }
    function setVotes(obj) {
      localStorage.setItem(LS_KEY, JSON.stringify(obj));
    }

    function updateVoteUI() {
      var votes = getVotes();
      document.querySelectorAll('.fc-vote-btn[data-doi]').forEach(function (btn) {
        var doi = btn.getAttribute('data-doi');
        var voted = !!votes[doi];
        btn.classList.toggle('voted', voted);
        var countEl = btn.querySelector('.fc-vote-count');
        if (countEl && voted) {
          var base = parseInt(countEl.textContent, 10) || 0;
          // Only increment if we haven't already accounted for it
          if (!btn.dataset.voteApplied) {
            countEl.textContent = base + 1;
            btn.dataset.voteApplied = '1';
          }
        }
      });
    }

    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.fc-vote-btn[data-doi]');
      if (!btn || btn.classList.contains('voted')) return;
      e.preventDefault();
      var doi = btn.getAttribute('data-doi');
      var votes = getVotes();
      votes[doi] = true;
      setVotes(votes);
      updateVoteUI();
    });

    updateVoteUI();
  }

  /* ================================================================
     TESTIMONIAL CAROUSEL
     ================================================================ */
  function initCarousels() {
    document.querySelectorAll('.fr-carousel[data-carousel]').forEach(function (carousel) {
      var id = carousel.getAttribute('data-carousel');
      var track = carousel.querySelector('.fr-carousel-track');
      var slides = carousel.querySelectorAll('.fr-carousel-slide');
      var nav = document.querySelector('.fr-carousel-nav[data-nav="' + id + '"]');
      if (!track || slides.length < 2 || !nav) return;

      var current = 0;

      function goTo(idx) {
        if (idx < 0) idx = slides.length - 1;
        if (idx >= slides.length) idx = 0;
        current = idx;
        track.style.transform = 'translateX(-' + (current * 100) + '%)';
        nav.querySelectorAll('.fr-carousel-dot').forEach(function (dot, di) {
          dot.classList.toggle('active', di === current);
        });
      }

      nav.addEventListener('click', function (e) {
        var dot = e.target.closest('.fr-carousel-dot');
        if (dot) {
          goTo(parseInt(dot.getAttribute('data-idx'), 10));
          return;
        }
        var arrow = e.target.closest('.fr-carousel-arrow');
        if (arrow) {
          goTo(current + parseInt(arrow.getAttribute('data-dir'), 10));
        }
      });
    });
  }

  /* ================================================================
     ACCORDION
     ================================================================ */
  function initAccordion() {
    function toggleSection(header) {
      if (header.classList.contains('acc-disabled')) return;
      var body = header.nextElementSibling;
      var chevron = header.querySelector('.acc-chevron');
      if (!body) return;
      var isCollapsed = body.classList.contains('acc-collapsed');
      if (isCollapsed) {
        body.classList.remove('acc-collapsed');
        body.style.maxHeight = body.scrollHeight + 'px';
        body.style.opacity = '1';
        if (chevron) chevron.classList.add('acc-open');
      } else {
        body.style.maxHeight = '0';
        body.style.opacity = '0';
        body.classList.add('acc-collapsed');
        if (chevron) chevron.classList.remove('acc-open');
      }
    }

    // Click handler for accordion headers
    document.addEventListener('click', function (e) {
      var header = e.target.closest('.acc-header');
      if (header) { toggleSection(header); return; }
      var toggleBtn = e.target.closest('.acc-toggle-all');
      if (toggleBtn) { toggleAllSections(toggleBtn); }
    });

    // Keyboard: Enter/Space on header
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var header = e.target.closest('.acc-header');
      if (!header) return;
      e.preventDefault();
      toggleSection(header);
    });

    function toggleAllSections(btn) {
      var clusterId = btn.getAttribute('data-cluster');
      var section = clusterId ? document.getElementById(clusterId) : null;
      if (!section) return;
      var bodies = section.querySelectorAll('.acc-body');
      var anyCollapsed = false;
      bodies.forEach(function (b) {
        var header = b.previousElementSibling;
        if (b.classList.contains('acc-collapsed') && header && !header.classList.contains('acc-disabled')) {
          anyCollapsed = true;
        }
      });

      bodies.forEach(function (b) {
        var header = b.previousElementSibling;
        if (!header || header.classList.contains('acc-disabled')) return;
        var chevron = header.querySelector('.acc-chevron');
        if (anyCollapsed && b.classList.contains('acc-collapsed')) {
          b.classList.remove('acc-collapsed');
          b.style.maxHeight = b.scrollHeight + 'px';
          b.style.opacity = '1';
          if (chevron) chevron.classList.add('acc-open');
        } else if (!anyCollapsed && !b.classList.contains('acc-collapsed')) {
          b.style.maxHeight = '0';
          b.style.opacity = '0';
          b.classList.add('acc-collapsed');
          if (chevron) chevron.classList.remove('acc-open');
        }
      });
      btn.textContent = anyCollapsed ? 'Collapse all' : 'Expand all';
    }

    // Set initial state: all sections open, max-height auto
    document.querySelectorAll('.acc-body').forEach(function (body) {
      if (!body.classList.contains('acc-collapsed')) {
        body.style.maxHeight = body.scrollHeight + 'px';
        body.style.opacity = '1';
      }
    });
  }

  /* ================================================================
     GLOBAL FILTERING + SEARCH
     Filters cards and updates accordion match counts.
     Disables sections with 0 matches, restores when matches return.
     ================================================================ */
  function initFiltering() {
    var focusGroup = document.getElementById('fr-global-focus-tags');
    var typeGroup = document.getElementById('fr-global-type-tags');
    var specCheckbox = document.getElementById('fr-global-specificity-checkbox');
    var searchInput = document.getElementById('clusters-inline-search-input');

    // Tag filter buttons
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.fr-tag-btn');
      if (!btn) return;
      var group = btn.closest('.fr-filter-tags');
      if (!group) return;
      e.preventDefault();
      group.querySelectorAll('.fr-tag-btn').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      applyGlobalFilters();
    });

    if (specCheckbox) specCheckbox.addEventListener('change', applyGlobalFilters);

    if (searchInput) {
      var debounce;
      searchInput.addEventListener('input', function () {
        clearTimeout(debounce);
        debounce = setTimeout(applyGlobalFilters, 150);
      });
    }

    function applyGlobalFilters() {
      var activeFocus = 'all';
      if (focusGroup) {
        var btn = focusGroup.querySelector('.fr-tag-btn.active');
        if (btn) activeFocus = btn.getAttribute('data-value');
      }
      var activeType = 'all';
      if (typeGroup) {
        var btn2 = typeGroup.querySelector('.fr-tag-btn.active');
        if (btn2) activeType = btn2.getAttribute('data-value');
      }
      var showNarrow = specCheckbox ? specCheckbox.checked : false;
      var query = searchInput ? searchInput.value.toLowerCase().trim() : '';
      var tokens = query ? query.split(/\s+/) : [];
      var isFiltered = activeFocus !== 'all' || activeType !== 'all' || tokens.length > 0;

      // Filter cards in every .fr-cards-list, update accordion counts
      document.querySelectorAll('.acc-section').forEach(function (section) {
        var container = section.querySelector('.fr-cards-list');
        if (!container) return;
        var cards = container.querySelectorAll('.fc-card, .fr-card');
        var total = cards.length;
        var matchCount = 0;

        cards.forEach(function (card) {
          var matchFocus = activeFocus === 'all' || card.getAttribute('data-focus') === activeFocus;
          var matchType = activeType === 'all' || card.getAttribute('data-type') === activeType;
          var matchSpec = showNarrow || card.getAttribute('data-specificity') !== 'narrow';

          var matchSearch = true;
          if (tokens.length > 0) {
            var text = (card.querySelector('.fc-title') || card.querySelector('.fr-title') || {}).textContent || '';
            text += ' ' + ((card.querySelector('.fc-summary') || card.querySelector('.fr-summary') || {}).textContent || '');
            text = text.toLowerCase();
            for (var i = 0; i < tokens.length; i++) {
              if (text.indexOf(tokens[i]) === -1) { matchSearch = false; break; }
            }
          }

          var show = matchFocus && matchType && matchSpec && matchSearch;
          card.style.display = show ? '' : 'none';
          if (show) matchCount++;
        });

        // Update the x / y count in the header
        var countEl = section.querySelector('.acc-count-match');
        if (countEl) countEl.textContent = matchCount;

        // Manage accordion open/closed state based on matches and filter
        var header = section.querySelector('.acc-header');
        var body = section.querySelector('.acc-body');
        var chevron = header ? header.querySelector('.acc-chevron') : null;
        if (!header || !body) return;

        if (matchCount === 0) {
          // Remember open state before collapsing (only on first disable)
          if (!header.classList.contains('acc-disabled')) {
            header.dataset.wasOpen = body.classList.contains('acc-collapsed') ? '0' : '1';
          }
          header.classList.add('acc-disabled');
          if (!body.classList.contains('acc-collapsed')) {
            body.style.maxHeight = '0';
            body.style.opacity = '0';
            body.classList.add('acc-collapsed');
            if (chevron) chevron.classList.remove('acc-open');
          }
        } else if (isFiltered) {
          // Filter active with matches: auto-expand
          // Save pre-filter state if not yet saved
          if (!header.dataset.wasOpen) {
            header.dataset.wasOpen = body.classList.contains('acc-collapsed') ? '0' : '1';
          }
          header.classList.remove('acc-disabled');
          body.classList.remove('acc-collapsed');
          body.style.maxHeight = body.scrollHeight + 'px';
          body.style.opacity = '1';
          if (chevron) chevron.classList.add('acc-open');
        } else {
          // No filter active: restore original state
          header.classList.remove('acc-disabled');
          if (header.dataset.wasOpen !== undefined) {
            var shouldBeOpen = header.dataset.wasOpen === '1';
            if (shouldBeOpen && body.classList.contains('acc-collapsed')) {
              body.classList.remove('acc-collapsed');
              body.style.maxHeight = body.scrollHeight + 'px';
              body.style.opacity = '1';
              if (chevron) chevron.classList.add('acc-open');
            } else if (!shouldBeOpen && !body.classList.contains('acc-collapsed')) {
              body.style.maxHeight = '0';
              body.style.opacity = '0';
              body.classList.add('acc-collapsed');
              if (chevron) chevron.classList.remove('acc-open');
            }
            delete header.dataset.wasOpen;
          }
          // Update max-height for open sections
          if (!body.classList.contains('acc-collapsed')) {
            body.style.maxHeight = body.scrollHeight + 'px';
          }
        }
      });
    }
  }

  /* ================================================================
     SORT CARDS BY FOCUS ORDER
     ================================================================ */
  function sortCardsByFocus() {
    var focusOrder = window.FORRT_FOCUS_ORDER;
    if (!focusOrder || !focusOrder.length) return;
    var orderMap = {};
    focusOrder.forEach(function (f, i) { orderMap[f] = i; });

    document.querySelectorAll('.fr-cards-list').forEach(function (list) {
      var cards = Array.prototype.slice.call(list.querySelectorAll('.fc-card, .fr-card'));
      if (cards.length < 2) return;
      cards.sort(function (a, b) {
        var fa = orderMap[a.getAttribute('data-focus')] !== undefined ? orderMap[a.getAttribute('data-focus')] : 999;
        var fb = orderMap[b.getAttribute('data-focus')] !== undefined ? orderMap[b.getAttribute('data-focus')] : 999;
        return fa - fb;
      });
      cards.forEach(function (card) { list.appendChild(card); });
    });
  }

  /* ================================================================
     INIT
     ================================================================ */
  onReady(function () {
    var data = window.FORRT_FEATURED;
    var pubCards = window.FORRT_PUB_CARDS;
    if (!data && !pubCards) return;
    var resourceIdx = buildResourceIndex(data);
    // Merge pub_cards into resource index (featured entries take precedence)
    if (pubCards) {
      Object.keys(pubCards).forEach(function (doi) {
        if (!resourceIdx[doi]) resourceIdx[doi] = pubCards[doi];
      });
    }

    initReferencePopup(resourceIdx);
    initReadingList(resourceIdx);
    initVoting();
    initCarousels();
    sortCardsByFocus();
    initAccordion();
    initFiltering();
  });
})();
