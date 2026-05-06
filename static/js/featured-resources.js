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
      if (r.oa_url) {
        html += '<span class="ref-oa-badge open">' +
          '<svg viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 5v6M5 8h6"/></svg>' +
          ' Open Access</span>';
        html += '<a href="' + escHtml(r.oa_url) + '" target="_blank" rel="noopener" class="ref-oa-link">' +
          '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 3H3v10h10v-3M9 1h6v6M9 7L15 1"/></svg>' +
          ' Free PDF</a>';
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
      // OA icons (inline SVG, from Wikimedia Commons PLoS OA logos, public domain)
      var OA_ICON = '<svg class="rl-oa-icon rl-oa-open" viewBox="0 0 640 1000" aria-label="Open Access"><path fill="none" stroke="#008400" stroke-width="105" d="M111 308v-36c0-116 94-209 209-209s209 93 209 209v258"/><circle cx="320" cy="681" r="256" fill="none" stroke="#008400" stroke-width="105"/><circle cx="321" cy="682" r="86" fill="#008400"/></svg>';
      var html = '';
      list.forEach(function (doi) {
        var r = resourceIdx[doi] || {};
        html += '<div class="rl-panel-item" data-doi="' + escHtml(doi) + '">';

        // Header row (always visible)
        html += '<div class="rl-panel-item-header">';
        html += '<button class="rl-panel-item-toggle" aria-label="Show details" aria-expanded="false">';
        html += '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6l4 4 4-4"/></svg>';
        html += '</button>';
        html += '<div class="rl-panel-item-info">';
        html += '<div class="rl-panel-item-title">' + escHtml(r.title || doi) + '</div>';
        html += '<div class="rl-panel-item-ref">' + escHtml(r.short_ref || '') + '</div>';
        html += '</div>';
        html += '<button class="rl-panel-item-remove" data-doi="' + escHtml(doi) + '" aria-label="Remove">&times;</button>';
        html += '</div>';

        // Details section (collapsed by default)
        html += '<div class="rl-panel-item-details">';
        if (r.apa) {
          html += '<div class="rl-detail-ref-row">';
          html += '<div class="rl-detail-apa">' + escHtml(r.apa) + '</div>';
          html += '<button class="rl-detail-copy" data-copy-apa="' + escHtml(doi) + '" title="Copy APA reference">';
          html += '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="8" height="10" rx="1"/><path d="M5 3V2a1 1 0 011-1h5a1 1 0 011 1v9a1 1 0 01-1 1h-1"/></svg>';
          html += '</button>';
          html += '</div>';
        }
        if (r.abstract) {
          html += '<div class="rl-detail-abstract-wrap">';
          html += '<div class="rl-detail-abstract">' + escHtml(r.abstract) + '</div>';
          html += '<button class="rl-detail-show-more">Show more</button>';
          html += '</div>';
        }
        // DOI + OA icon + Free PDF — compact one-liner
        html += '<div class="rl-detail-meta">';
        html += '<a href="https://doi.org/' + encodeURIComponent(doi) + '" target="_blank" rel="noopener" class="rl-detail-doi-link">doi.org/' + escHtml(doi) + '</a>';
        if (r.oa_url) {
          html += OA_ICON;
          html += '<a href="' + escHtml(r.oa_url) + '" target="_blank" rel="noopener" class="rl-detail-pdf-link">Free PDF</a>';
        }
        html += '</div>';
        html += '</div>'; // end details

        html += '</div>'; // end item
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

    // Panel interactions: toggle, copy, show-more, remove
    if (panelBody) panelBody.addEventListener('click', function (e) {
      // Toggle expand/collapse details
      var toggleBtn = e.target.closest('.rl-panel-item-toggle');
      if (toggleBtn) {
        var item = toggleBtn.closest('.rl-panel-item');
        if (item) {
          item.classList.toggle('expanded');
          toggleBtn.setAttribute('aria-expanded',
            item.classList.contains('expanded') ? 'true' : 'false');
          // Hide "Show more" if abstract isn't actually clamped (defer to next frame)
          requestAnimationFrame(function () {
            var absEl = item.querySelector('.rl-detail-abstract');
            if (absEl && absEl.scrollHeight <= absEl.clientHeight) {
              var smBtn = item.querySelector('.rl-detail-show-more');
              if (smBtn) smBtn.style.display = 'none';
            }
          });
        }
        return;
      }
      // Copy APA reference
      var copyBtn = e.target.closest('.rl-detail-copy[data-copy-apa]');
      if (copyBtn) {
        var d = copyBtn.getAttribute('data-copy-apa');
        var res = resourceIdx[d];
        if (res && res.apa) {
          navigator.clipboard.writeText(res.apa).then(function () {
            copyBtn.classList.add('copied');
            setTimeout(function () { copyBtn.classList.remove('copied'); }, 1500);
          });
        }
        return;
      }
      // Show more / show less abstract
      var showMore = e.target.closest('.rl-detail-show-more');
      if (showMore) {
        var wrap = showMore.closest('.rl-detail-abstract-wrap');
        if (wrap) {
          var isExpanded = wrap.classList.toggle('abstract-expanded');
          showMore.textContent = isExpanded ? 'Show less' : 'Show more';
        }
        return;
      }
      // Remove item
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

    // Download PDF
    var pdfBtn = document.getElementById('fr-rl-pdf');
    if (pdfBtn) pdfBtn.addEventListener('click', function () {
      var list = getList();
      if (list.length === 0) return;

      var origHTML = pdfBtn.innerHTML;
      pdfBtn.disabled = true;
      pdfBtn.innerHTML = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" class="rl-spin"><circle cx="8" cy="8" r="6"/></svg> Generating\u2026';

      function generatePDF() {
        var jspdf = window.jspdf;
        var doc = new jspdf.jsPDF({ unit: 'mm', format: 'a4' });
        var pageW = doc.internal.pageSize.getWidth();
        var pageH = doc.internal.pageSize.getHeight();
        var margin = 20;
        var contentW = pageW - 2 * margin;
        var y = margin;

        function checkPage(needed) {
          if (y + needed > pageH - margin) {
            doc.addPage();
            y = margin;
          }
        }

        // Title
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(18);
        doc.setTextColor(0, 64, 85);
        doc.text('FORRT Reading List', margin, y);
        y += 8;
        doc.setDrawColor(0, 64, 85);
        doc.setLineWidth(0.5);
        doc.line(margin, y, pageW - margin, y);
        y += 5;

        // Subtitle
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(136, 136, 136);
        doc.text('Generated on ' + new Date().toLocaleDateString() + ' \u2014 ' + list.length + ' resource' + (list.length !== 1 ? 's' : ''), margin, y);
        y += 8;

        list.forEach(function (doi, i) {
          var r = resourceIdx[doi] || {};

          // Estimate space needed for this entry (at least title + ref)
          checkPage(25);

          // Title
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(11);
          doc.setTextColor(34, 34, 34);
          var titleLines = doc.splitTextToSize(r.title || doi, contentW);
          doc.text(titleLines, margin, y);
          y += titleLines.length * 5 + 2;

          // APA reference
          if (r.apa) {
            checkPage(10);
            doc.setFont('times', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(68, 68, 68);
            var apaLines = doc.splitTextToSize(r.apa, contentW - 10);
            // Hanging indent: first line at margin, rest indented
            apaLines.forEach(function (line, li) {
              checkPage(4);
              doc.text(line, li === 0 ? margin : margin + 10, y);
              y += 4;
            });
            y += 1;
          }

          // Abstract
          if (r.abstract) {
            checkPage(10);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(8);
            doc.setTextColor(0, 64, 85);
            doc.text('Abstract', margin, y);
            y += 4;
            doc.setFont('times', 'normal');
            doc.setFontSize(8.5);
            doc.setTextColor(85, 85, 85);
            var absLines = doc.splitTextToSize(r.abstract, contentW);
            absLines.forEach(function (line) {
              checkPage(3.5);
              doc.text(line, margin, y);
              y += 3.5;
            });
            y += 1;
          }

          // DOI + metadata line
          checkPage(5);
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(7.5);
          var metaParts = ['https://doi.org/' + doi];
          if (r.oa_url) metaParts.push('Open Access');
          if (r.focus) metaParts.push(r.focus);
          if (r.resource_type) metaParts.push(r.resource_type);
          doc.setTextColor(0, 96, 128);
          doc.text(metaParts.join('  \u2022  '), margin, y);
          y += 5;

          // Separator
          if (i < list.length - 1) {
            checkPage(5);
            doc.setDrawColor(221, 221, 221);
            doc.setLineWidth(0.2);
            doc.line(margin, y, pageW - margin, y);
            y += 5;
          }
        });

        doc.save('forrt-reading-list.pdf');
        pdfBtn.disabled = false;
        pdfBtn.innerHTML = origHTML;
      }

      // Load jsPDF from CDN if not already loaded
      if (window.jspdf) {
        generatePDF();
      } else {
        var script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.onload = generatePDF;
        script.onerror = function () {
          pdfBtn.disabled = false;
          pdfBtn.innerHTML = origHTML;
          alert('Could not load PDF library. Please check your internet connection.');
        };
        document.head.appendChild(script);
      }
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

    // Submit vote to Google Form via hidden iframe to avoid CORS issues
    function submitVoteToForm(doi) {
      var url = 'https://doi.org/' + encodeURIComponent(doi);
      var formURL = 'https://docs.google.com/forms/d/e/1FAIpQLScYBxxTCWRPTbLqzYo6r_gC19BFKvFhlv2ErKVipgQouDKtvg/formResponse?entry.1898150489=' + encodeURIComponent(url);
      var iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.name = 'forrt-vote-frame-' + Date.now();
      document.body.appendChild(iframe);
      iframe.src = formURL;
      // Clean up after submission
      setTimeout(function () { iframe.remove(); }, 5000);
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
      submitVoteToForm(doi);
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

    // --- Pre-cache card data so filtering never queries the DOM for text ---
    var sectionCache = [];
    document.querySelectorAll('.acc-section').forEach(function (section) {
      var container = section.querySelector('.fr-cards-list');
      if (!container) return;
      var cardEls = container.querySelectorAll('.fc-card, .fr-card');
      var cards = [];
      cardEls.forEach(function (card) {
        var title = (card.querySelector('.fc-title') || card.querySelector('.fr-title') || {}).textContent || '';
        var summary = (card.querySelector('.fc-summary') || card.querySelector('.fr-summary') || {}).textContent || '';
        cards.push({
          el: card,
          focus: card.getAttribute('data-focus'),
          type: card.getAttribute('data-type'),
          spec: card.getAttribute('data-specificity'),
          text: (title + ' ' + summary).toLowerCase()
        });
      });
      var header = section.querySelector('.acc-header');
      var body = section.querySelector('.acc-body');
      sectionCache.push({
        el: section,
        countEl: section.querySelector('.acc-count-match'),
        header: header,
        body: body,
        chevron: header ? header.querySelector('.acc-chevron') : null,
        cards: cards
      });
    });

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

      // --- Pass 1: compute visibility from cached data (no DOM reads) ---
      var sectionResults = [];
      for (var s = 0; s < sectionCache.length; s++) {
        var sec = sectionCache[s];
        var matchCount = 0;
        var cardVis = new Array(sec.cards.length);
        for (var c = 0; c < sec.cards.length; c++) {
          var cd = sec.cards[c];
          var show = (activeFocus === 'all' || cd.focus === activeFocus)
            && (activeType === 'all' || cd.type === activeType)
            && (showNarrow || cd.spec !== 'narrow');
          if (show && tokens.length > 0) {
            for (var t = 0; t < tokens.length; t++) {
              if (cd.text.indexOf(tokens[t]) === -1) { show = false; break; }
            }
          }
          cardVis[c] = show;
          if (show) matchCount++;
        }
        sectionResults.push({ matchCount: matchCount, cardVis: cardVis });
      }

      // --- Pass 2: batch all DOM writes ---
      for (var s = 0; s < sectionCache.length; s++) {
        var sec = sectionCache[s];
        var res = sectionResults[s];

        for (var c = 0; c < sec.cards.length; c++) {
          sec.cards[c].el.style.display = res.cardVis[c] ? '' : 'none';
        }

        if (sec.countEl) sec.countEl.textContent = res.matchCount;

        var header = sec.header;
        var body = sec.body;
        var chevron = sec.chevron;
        if (!header || !body) continue;

        if (res.matchCount === 0) {
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
          if (!header.dataset.wasOpen) {
            header.dataset.wasOpen = body.classList.contains('acc-collapsed') ? '0' : '1';
          }
          header.classList.remove('acc-disabled');
          body.classList.remove('acc-collapsed');
          body.style.maxHeight = 'none';
          body.style.opacity = '1';
          if (chevron) chevron.classList.add('acc-open');
        } else {
          header.classList.remove('acc-disabled');
          if (header.dataset.wasOpen !== undefined) {
            var shouldBeOpen = header.dataset.wasOpen === '1';
            if (shouldBeOpen && body.classList.contains('acc-collapsed')) {
              body.classList.remove('acc-collapsed');
              body.style.maxHeight = 'none';
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
          if (!body.classList.contains('acc-collapsed')) {
            body.style.maxHeight = 'none';
          }
        }
      }
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
