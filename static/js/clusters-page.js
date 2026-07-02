/**
 * Clusters page: sticky layout, cluster nav, inline toolbar search, back-to-top.
 * Search: clusters & sub-clusters — matches title, stats line (sub-clusters / references), and descriptions.
 */
(function () {
  'use strict';

  var MAX_RESULTS = 400;
  var SHOWN_RESULTS = 80;
  var RESULTS_OPEN_CLASS = 'clusters-inline-search__panel--open';
  var HIGHLIGHT_CLASS = 'clusters-inline-search-highlight';
  var HIGHLIGHT_DURATION_MS = 60 * 1000; /* 1 minute */

  function tokenizeQuery(q) {
    return q
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .filter(function (t) {
        return t.length > 0;
      });
  }

  /** Every token must appear somewhere in text (supports long multi-word queries). */
  function matchesAllTokens(text, tokens) {
    if (!tokens.length) return false;
    var lower = String(text).toLowerCase();
    for (var i = 0; i < tokens.length; i++) {
      if (lower.indexOf(tokens[i]) === -1) return false;
    }
    return true;
  }

  /** Text used to match cluster rows (title + stats + description — not only the heading). */
  function getClusterSectionSearchText(section) {
    if (!section) return '';
    var parts = [];
    var titleEl = section.querySelector('.cluster-title');
    if (titleEl) parts.push(titleEl.textContent);
    var statsEl = section.querySelector('.cluster-stats');
    if (statsEl) parts.push(statsEl.textContent);
    var descEl = section.querySelector('.cluster-description');
    if (descEl) parts.push(descEl.textContent);
    return parts.join(' ').replace(/\s+/g, ' ').trim();
  }

  /** Sub-cluster/discipline heading: an .sc-heading in the pane body (disciplines'
   *  tab-panes), or the .acc-label in the accordion header (clusters' acc-sections). */
  function getSubclusterPaneHeading(pane) {
    if (!pane) return null;
    return pane.querySelector('.sc-heading') || pane.querySelector('.acc-label');
  }

  /** Text used to match a sub-cluster pane (heading + description). */
  function getSubclusterPaneSearchText(pane) {
    if (!pane) return '';
    var parts = [];
    var heading = getSubclusterPaneHeading(pane);
    if (heading) parts.push(heading.textContent);
    var descEl = pane.querySelector('.sc-description');
    if (descEl) parts.push(descEl.textContent);
    return parts.join(' ').replace(/\s+/g, ' ').trim();
  }

  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  function getNavbarStickyOffsetPx() {
    var bodyTop = parseFloat(window.getComputedStyle(document.body).marginTop) || 0;
    var navbar = document.getElementById('navbar-main');
    if (!navbar) return bodyTop;
    var bottom = Math.ceil(navbar.getBoundingClientRect().bottom);
    return Math.max(bottom, bodyTop);
  }

  function escapeHtml(s) {
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  function showBootstrapTab(tabEl) {
    if (!tabEl) return;
    if (typeof window.jQuery !== 'undefined' && window.jQuery.fn.tab) {
      window.jQuery(tabEl).tab('show');
    } else {
      tabEl.click();
    }
  }

  /**
   * Some pages (e.g. disciplines) render each sub-section as a Bootstrap
   * tab-pane rather than an always-in-DOM accordion section, so an inactive
   * pane sits at `display: none` until its trigger tab is shown. Activate it
   * before any scroll/measurement runs, otherwise the target has a zeroed
   * bounding rect and the scroll lands at the top of the page.
   */
  function activateBootstrapTabIfNeeded(paneId, tabId) {
    var pane = paneId ? document.getElementById(paneId) : null;
    if (pane && pane.classList.contains('tab-pane') && tabId) {
      showBootstrapTab(document.getElementById(tabId));
    }
  }

  /** Expand an accordion section's .acc-body if it's currently collapsed. Returns
   *  the .acc-header (a good scroll target) or null if this isn't an accordion section. */
  function expandAccordionIfCollapsed(sectionEl) {
    if (!sectionEl) return null;
    var accBody = sectionEl.querySelector('.acc-body');
    var accHeader = sectionEl.querySelector('.acc-header');
    if (accBody && accBody.classList.contains('acc-collapsed') && accHeader && !accHeader.classList.contains('acc-disabled')) {
      accBody.classList.remove('acc-collapsed');
      accBody.style.maxHeight = accBody.scrollHeight + 'px';
      accBody.style.opacity = '1';
      var ch = accHeader.querySelector('.acc-chevron');
      if (ch) ch.classList.add('acc-open');
    }
    return accHeader;
  }

  /** Click/keyboard toggling for .acc-header sections and "Expand all" buttons.
   *  Shared by clusters and disciplines - both render the same accordion markup. */
  function initAccordionToggle() {
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

    document.addEventListener('click', function (e) {
      /* Controls embedded in the header (e.g. copy-link) handle their own clicks. */
      if (e.target.closest('.acc-copy-link')) return;
      var header = e.target.closest('.acc-header');
      if (header) { toggleSection(header); return; }
      var toggleBtn = e.target.closest('.acc-toggle-all');
      if (toggleBtn) { toggleAllSections(toggleBtn); }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      if (e.target.closest('.acc-copy-link')) return;
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

    /* Initial state: any section not server-rendered with .acc-collapsed starts open. */
    document.querySelectorAll('.acc-body').forEach(function (body) {
      if (!body.classList.contains('acc-collapsed')) {
        body.style.maxHeight = body.scrollHeight + 'px';
        body.style.opacity = '1';
      }
    });
  }

  function collectClustersInlineSearchResults(scopeRoot, tokens, includeRefs) {
    var results = [];
    var seen = {};

    function add(key, item) {
      if (results.length >= MAX_RESULTS || seen[key]) return;
      seen[key] = true;
      results.push(item);
    }

    if (!scopeRoot || !tokens.length) return results;

    scopeRoot.querySelectorAll('.cluster-section').forEach(function (section) {
      if (results.length >= MAX_RESULTS) return;
      var clusterId = section.id;
      var titleEl = section.querySelector('.cluster-title');
      var clusterName = titleEl ? titleEl.textContent.replace(/\s+/g, ' ').trim() : clusterId;
      var clusterHaystack = getClusterSectionSearchText(section);

      if (matchesAllTokens(clusterHaystack, tokens)) {
        add('c:' + clusterId, {
          type: 'cluster',
          clusterId: clusterId,
          tabId: '',
          paneId: '',
          label: clusterName,
          meta: 'Cluster'
        });
      }

      /* Search featured resource cards in this cluster */
      section.querySelectorAll('.fc-card').forEach(function (card) {
        if (results.length >= MAX_RESULTS) return;
        var cardText = card.textContent.replace(/\s+/g, ' ').trim();
        if (!cardText || !matchesAllTokens(cardText, tokens)) return;
        var titleEl = card.querySelector('.fc-title');
        var cardTitle = titleEl ? titleEl.textContent.replace(/\s+/g, ' ').trim() : '';
        var paneEl = card.closest('.acc-section, .tab-pane');
        var paneId = paneEl ? paneEl.id : '';
        var tabId = paneEl ? (paneEl.getAttribute('aria-labelledby') || '') : '';
        add('feat:' + clusterId + ':' + (card.getAttribute('data-doi') || cardTitle), {
          type: 'featured',
          clusterId: clusterId,
          tabId: tabId,
          paneId: paneId,
          label: cardTitle.length > 100 ? cardTitle.substring(0, 100) + '…' : cardTitle,
          meta: clusterName + ' — Recommended'
        });
      });

      section.querySelectorAll('.acc-section, .tab-pane').forEach(function (pane) {
        if (results.length >= MAX_RESULTS) return;
        var paneId = pane.id;
        if (!paneId) return;
        var tabId = pane.getAttribute('aria-labelledby') || '';

        var scHeading = getSubclusterPaneHeading(pane);
        var scName = scHeading ? scHeading.textContent.replace(/\s+/g, ' ').trim() : '';
        var paneHaystack = getSubclusterPaneSearchText(pane);

        if (paneHaystack && matchesAllTokens(paneHaystack, tokens)) {
          add('sc:' + clusterId + ':' + paneId, {
            type: 'subcluster',
            clusterId: clusterId,
            tabId: tabId,
            paneId: paneId,
            label: scName,
            meta: clusterName
          });
        }

        if (includeRefs) {
          pane.querySelectorAll('.publication-item').forEach(function (pubEl, pi) {
            if (results.length >= MAX_RESULTS) return;
            var pubText = pubEl.textContent.replace(/\s+/g, ' ').trim();
            if (!pubText) return;
            if (matchesAllTokens(pubText, tokens)) {
              var truncated = pubText.length > 120 ? pubText.substring(0, 120) + '…' : pubText;
              add('pub:' + clusterId + ':' + paneId + ':' + pi, {
                type: 'publication',
                clusterId: clusterId,
                tabId: tabId,
                paneId: paneId,
                pubIndex: pi,
                label: truncated,
                meta: scName
              });
            }
          });
        }
      });
    });

    return results;
  }

  function escAttr(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  }

  function buildResultsToolbar(countText) {
    return (
      '<div class="clusters-inline-search__toolbar">' +
      '<span class="clusters-inline-search__count">' + countText + '</span>' +
      '<button type="button" class="clusters-inline-search__close btn btn-sm btn-outline-secondary" aria-label="Close search results">' +
      '<i class="fas fa-times" aria-hidden="true"></i></button>' +
      '</div>'
    );
  }

  function renderClustersInlineResults(results, toolbarEl, bodyEl) {
    if (!toolbarEl || !bodyEl) return;

    if (results.length === 0) {
      toolbarEl.innerHTML = buildResultsToolbar('0 results');
      toolbarEl.hidden = false;
      bodyEl.innerHTML = '<div class="clusters-inline-search__empty">No results found.</div>';
      return;
    }

    /* Sort: clusters, featured, sub-clusters, then publications */
    results.sort(function (a, b) {
      var order = { cluster: 0, featured: 1, subcluster: 2, publication: 3 };
      return (order[a.type] || 9) - (order[b.type] || 9);
    });
    var shown = results.slice(0, SHOWN_RESULTS);
    var countText = results.length + ' result' + (results.length !== 1 ? 's' : '');
    toolbarEl.innerHTML = buildResultsToolbar(countText);
    toolbarEl.hidden = false;

    var html = '<div class="clusters-inline-search__hits">';
    shown.forEach(function (r) {
      var extraAttr = r.pubIndex != null ? ' data-pub-index="' + escAttr(r.pubIndex) + '"' : '';
      var isPub = r.type === 'publication';
      var isFeat = r.type === 'featured';
      var icon = isPub ? '<i class="fas fa-file-alt clusters-inline-search__hit-icon" aria-hidden="true"></i>' :
                 isFeat ? '<i class="fas fa-star clusters-inline-search__hit-icon" aria-hidden="true"></i>' : '';
      var hitClass = 'clusters-inline-search__hit' + (isPub ? ' clusters-inline-search__hit--publication' : '') + (isFeat ? ' clusters-inline-search__hit--featured' : '');
      html += '<a href="#" class="' + hitClass + '" role="button"' +
        ' data-hit-type="' + escAttr(r.type) + '"' +
        ' data-cluster="' + escAttr(r.clusterId) + '"' +
        ' data-tab="' + escAttr(r.tabId) + '"' +
        ' data-pane="' + escAttr(r.paneId) + '"' +
        extraAttr + '>' +
        icon +
        '<span class="clusters-inline-search__hit-text">' +
        '<span class="clusters-inline-search__hit-label">' + escapeHtml(r.label) + '</span>' +
        '<span class="clusters-inline-search__hit-meta">' + escapeHtml(r.meta) + '</span>' +
        '</span></a>';
    });
    html += '</div>';

    if (results.length > shown.length) {
      html += '<div class="clusters-inline-search__more">… and ' + (results.length - shown.length) + ' more. Refine your search.</div>';
    }

    bodyEl.innerHTML = html;
  }

  onReady(function () {
    var root = document.querySelector('.clusters-layout');
    if (!root) return;

    initAccordionToggle();

    var mobileToggle = document.getElementById('clusters-mobile-toggle');
    var sidebar = document.getElementById('clusters-sidebar');
    var backToTopBtn = document.getElementById('clusters-back-to-top');
    /* Toolbar may live under the page title (outside .clusters-layout) */
    var controls = document.querySelector('.clusters-controls');
    var navbarEl = document.getElementById('navbar-main');
    var mobileNavMq = window.matchMedia ? window.matchMedia('(max-width: 991.98px)') : null;

    function clustersNavIsMobileWidth() {
      return mobileNavMq && mobileNavMq.matches;
    }

    function syncClustersMobileBodyScrollLock() {
      if (!sidebar) return;
      if (!clustersNavIsMobileWidth() || !sidebar.classList.contains('sidebar-open')) {
        document.body.style.overflow = '';
      } else {
        document.body.style.overflow = 'hidden';
      }
    }

    function closeClustersMobileSidebar() {
      if (sidebar) sidebar.classList.remove('sidebar-open');
      if (mobileToggle) mobileToggle.classList.remove('active');
      syncClustersMobileBodyScrollLock();
    }

    function updateStickyLayoutMetrics() {
      root.style.setProperty('--clusters-sticky-offset', getNavbarStickyOffsetPx() + 'px');
      root.style.setProperty(
        '--clusters-controls-height',
        controls ? controls.offsetHeight + 'px' : '0px'
      );
      /* (Tab content min-height removed — sections are now stacked, not tabbed) */
    }

    function scheduleStickyLayoutMetrics() {
      updateStickyLayoutMetrics();
      requestAnimationFrame(updateStickyLayoutMetrics);
    }

    scheduleStickyLayoutMetrics();
    window.addEventListener(
      'resize',
      function () {
        scheduleStickyLayoutMetrics();
        syncClustersMobileBodyScrollLock();
      },
      { passive: true }
    );
    window.addEventListener(
      'orientationchange',
      function () {
        scheduleStickyLayoutMetrics();
        syncClustersMobileBodyScrollLock();
      },
      { passive: true }
    );
    if (window.ResizeObserver && navbarEl) {
      new ResizeObserver(scheduleStickyLayoutMetrics).observe(navbarEl);
    }
    if (window.ResizeObserver && controls) {
      new ResizeObserver(scheduleStickyLayoutMetrics).observe(controls);
    }

    /** Scroll so el sits below the sticky stack (navbar + .clusters-controls search bar). */
    function scrollElementBelowStickyChrome(el) {
      if (!el) return;
      updateStickyLayoutMetrics();
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          var margin = 14;
          var chromeBottom;
          if (controls) {
            chromeBottom = Math.ceil(controls.getBoundingClientRect().bottom);
          } else {
            var navbar = document.getElementById('navbar-main');
            chromeBottom = navbar ? Math.ceil(navbar.getBoundingClientRect().bottom) : 72;
          }
          var elTopDoc = el.getBoundingClientRect().top + window.pageYOffset;
          var targetScroll = elTopDoc - chromeBottom - margin;
          window.scrollTo({ top: Math.max(0, targetScroll), behavior: 'smooth' });
        });
      });
    }

    /** True when sidebar link should use JS (same-page #anchor), not full navigation. */
    function isClustersInPageNavHref(anchorEl) {
      var href = anchorEl && anchorEl.getAttribute('href');
      return !!(href && href.charAt(0) === '#');
    }

    /** Tab anchor is .nav-link with href="#pane-id" pointing at .tab-pane inside clusters layout. */
    function scrollToClusterTabPaneFromTrigger(tabAnchor) {
      if (!tabAnchor) return;
      var href = tabAnchor.getAttribute('href');
      if (!href || href.charAt(0) !== '#') return;
      var pane = document.querySelector(href);
      if (!pane || !root.contains(pane)) return;
      var scrollTarget = pane.querySelector('.sc-heading') || pane.querySelector('.cluster-tab-content') || pane;
      setTimeout(function () {
        scrollElementBelowStickyChrome(scrollTarget);
      }, 80);
    }

    if (mobileToggle && sidebar) {
      mobileToggle.addEventListener('click', function () {
        sidebar.classList.toggle('sidebar-open');
        this.classList.toggle('active');
        scheduleStickyLayoutMetrics();
        requestAnimationFrame(syncClustersMobileBodyScrollLock);
      });
    }

    root.querySelectorAll('.cluster-nav-heading').forEach(function (heading) {
      heading.addEventListener('click', function (e) {
        var clickedArrow = e.target.closest('.cluster-nav-toggle');
        var group = this.closest('.cluster-nav-group');
        if (!group) return;
        var subList = group.querySelector('.cluster-nav-subs');
        var arrow = group.querySelector('.cluster-nav-toggle');

        /* Arrow click: always toggle expand/collapse, never navigate */
        if (clickedArrow) {
          e.preventDefault();
          if (!subList || !arrow) return;
          var isHidden = subList.style.display === 'none';
          subList.style.display = isHidden ? 'block' : 'none';
          arrow.innerHTML = isHidden ? '&#9662;' : '&#9656;';
          return;
        }

        /* Text click on subpath links: navigate to that cluster page */
        if (!isClustersInPageNavHref(this)) {
          closeClustersMobileSidebar();
          return;
        }

        /* Text click on in-page anchor links: expand + scroll */
        e.preventDefault();
        if (subList && arrow) {
          var isHidden = subList.style.display === 'none';
          subList.style.display = isHidden ? 'block' : 'none';
          arrow.innerHTML = isHidden ? '&#9662;' : '&#9656;';
        }
        var clusterId = group.getAttribute('data-cluster');
        var section = clusterId ? document.getElementById(clusterId) : null;
        if (section) {
          var scrollTarget =
            section.querySelector('.cluster-header') ||
            section.querySelector('.cluster-title') ||
            section;
          setTimeout(function () {
            scrollElementBelowStickyChrome(scrollTarget);
          }, 50);
        }
      });
    });

    root.querySelectorAll('.sc-nav-link').forEach(function (link) {
      link.addEventListener('click', function (e) {
        if (!isClustersInPageNavHref(this)) {
          closeClustersMobileSidebar();
          return;
        }
        e.preventDefault();
        /* data-tab holds the old tab ID; derive the section ID from it (strip -tab suffix) */
        var tabId = this.getAttribute('data-tab') || '';
        var sectionId = tabId.replace(/-tab$/, '');
        var target = sectionId ? document.getElementById(sectionId) : null;
        if (target) {
          activateBootstrapTabIfNeeded(sectionId, tabId);
          var accHeader = expandAccordionIfCollapsed(target);
          var scrollEl = accHeader || target;
          setTimeout(function () { scrollElementBelowStickyChrome(scrollEl); }, 50);
        }
        closeClustersMobileSidebar();
      });
    });

    /* e.g. /clusters/cluster-2/#c2-sc1 or #c2-featured, or /disciplines/#f1-chemistry — scroll to matching section */
    function applyClusterUrlHash() {
      var raw = window.location.hash.replace(/^#/, '');
      if (!raw || !/^[cf]\d+-[a-z0-9-]+$/.test(raw)) return;
      var target = document.getElementById(raw);
      if (!target) return;
      activateBootstrapTabIfNeeded(raw, raw + '-tab');
      var accHeader = expandAccordionIfCollapsed(target);
      setTimeout(function () {
        var scrollEl = accHeader || target;
        scrollElementBelowStickyChrome(scrollEl);
      }, 150);
    }
    applyClusterUrlHash();
    window.addEventListener('hashchange', applyClusterUrlHash);

    /* Per-sub-cluster "copy link" buttons: copy a shareable URL to the section. */
    function copyTextToClipboard(text) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text);
      }
      return new Promise(function (resolve, reject) {
        try {
          var ta = document.createElement('textarea');
          ta.value = text;
          ta.setAttribute('readonly', '');
          ta.style.position = 'absolute';
          ta.style.left = '-9999px';
          document.body.appendChild(ta);
          ta.select();
          var ok = document.execCommand('copy');
          document.body.removeChild(ta);
          ok ? resolve() : reject();
        } catch (err) {
          reject(err);
        }
      });
    }

    root.addEventListener('click', function (e) {
      var btn = e.target.closest('.acc-copy-link');
      if (!btn) return;
      /* Don't let the click bubble to the accordion header toggle. */
      e.preventDefault();
      e.stopPropagation();
      var anchor = btn.getAttribute('data-anchor');
      if (!anchor) return;
      var url = window.location.origin + window.location.pathname + window.location.search + '#' + anchor;
      /* Reflect the anchor in the address bar without re-scrolling (no hashchange). */
      try { window.history.replaceState(null, '', '#' + anchor); } catch (err) {}
      copyTextToClipboard(url).then(function () {
        btn.classList.add('is-copied');
        if (btn._copiedTimer) clearTimeout(btn._copiedTimer);
        btn._copiedTimer = setTimeout(function () { btn.classList.remove('is-copied'); }, 1600);
      }).catch(function () {
        /* Clipboard blocked (e.g. insecure context): prompt the user with the URL. */
        window.prompt('Copy this link:', url);
      });
    });

    /* (Tab click handler removed — all sub-clusters are now visible sections) */

    var searchInput = document.getElementById('clusters-inline-search-input');
    var searchBtn = document.getElementById('clusters-inline-search-btn');
    var searchPanel = document.getElementById('clusters-inline-search-panel');
    var searchToolbar = document.getElementById('clusters-inline-search-toolbar');
    var searchResults = document.getElementById('clusters-inline-search-results');
    var debounceTimer;
    var searchRoot = searchInput ? searchInput.closest('.clusters-inline-search') : null;
    var highlightClearTimer;

    function clearClusterSearchHighlights() {
      root.querySelectorAll('.' + HIGHLIGHT_CLASS).forEach(function (el) {
        el.classList.remove(HIGHLIGHT_CLASS);
      });
      if (highlightClearTimer) {
        clearTimeout(highlightClearTimer);
        highlightClearTimer = null;
      }
    }

    function highlightClusterHit(el) {
      if (!el) return;
      clearClusterSearchHighlights();
      el.classList.add(HIGHLIGHT_CLASS);
      highlightClearTimer = setTimeout(function () {
        el.classList.remove(HIGHLIGHT_CLASS);
      }, HIGHLIGHT_DURATION_MS);
    }

    function hideSearchResults() {
      if (searchToolbar) {
        searchToolbar.innerHTML = '';
        searchToolbar.hidden = true;
      }
      if (searchResults) searchResults.innerHTML = '';
      if (searchPanel) searchPanel.classList.remove(RESULTS_OPEN_CLASS);
      scheduleStickyLayoutMetrics();
    }

    function runInlineSearch() {
      if (!searchInput || !searchResults || !searchPanel || !searchToolbar) return;
      var tokens = tokenizeQuery(searchInput.value);
      if (!tokens.length) {
        hideSearchResults();
        return;
      }
      var includeRefsEl = document.getElementById('clusters-search-include-refs');
      var includeRefs = includeRefsEl ? includeRefsEl.checked : true;
      var results = collectClustersInlineSearchResults(root, tokens, includeRefs);
      renderClustersInlineResults(results, searchToolbar, searchResults);
      searchPanel.classList.add(RESULTS_OPEN_CLASS);
      scheduleStickyLayoutMetrics();
    }

    var includeRefsCheckbox = document.getElementById('clusters-search-include-refs');
    if (includeRefsCheckbox) {
      includeRefsCheckbox.addEventListener('change', function () {
        clearTimeout(debounceTimer);
        runInlineSearch();
      });
    }

    if (searchInput && searchResults && searchPanel && searchToolbar) {
      searchInput.addEventListener('input', function () {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(runInlineSearch, 200);
      });

      searchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          clearTimeout(debounceTimer);
          runInlineSearch();
        }
      });

      if (searchBtn) {
        searchBtn.addEventListener('click', function () {
          clearTimeout(debounceTimer);
          runInlineSearch();
          searchInput.focus();
        });
      }

      document.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape') return;
        var open = searchPanel.classList.contains(RESULTS_OPEN_CLASS);
        var focusedIn = searchRoot && searchRoot.contains(document.activeElement);
        if (!open && !focusedIn) return;
        hideSearchResults();
        if (focusedIn && searchInput) searchInput.blur();
      });

      searchPanel.addEventListener('click', function (e) {
        if (e.target.closest('.clusters-inline-search__close')) {
          e.preventDefault();
          hideSearchResults();
          return;
        }
        var link = e.target.closest('.clusters-inline-search__hit');
        if (!link) return;
        e.preventDefault();
        var hitType = link.getAttribute('data-hit-type') || '';
        var clusterId = link.getAttribute('data-cluster');
        var tabId = link.getAttribute('data-tab') || '';
        var paneId = link.getAttribute('data-pane') || '';
        var section = clusterId ? document.getElementById(clusterId) : null;
        if (!section) return;

        setTimeout(function () {
          activateBootstrapTabIfNeeded(paneId, tabId);
          if (paneId) expandAccordionIfCollapsed(document.getElementById(paneId));
          var scrollEl = null;
          if (hitType === 'cluster') {
            scrollEl =
              section.querySelector('.cluster-header') ||
              section.querySelector('.cluster-title') ||
              section;
          } else if (hitType === 'publication' && paneId) {
            var panePub = document.getElementById(paneId);
            var pubIdx = parseInt(link.getAttribute('data-pub-index'), 10);
            if (panePub && !isNaN(pubIdx)) {
              var pubs = panePub.querySelectorAll('.publication-item');
              scrollEl = pubs[pubIdx] || panePub;
            } else {
              scrollEl = panePub || section;
            }
          } else if (hitType === 'featured' && paneId) {
            var paneFeat = document.getElementById(paneId);
            scrollEl = paneFeat || section;
          } else if (hitType === 'subcluster' && paneId) {
            var paneSc = document.getElementById(paneId);
            scrollEl = paneSc ? (paneSc.querySelector('.sc-heading') || paneSc.querySelector('.acc-header') || paneSc) : section;
          } else {
            scrollEl = section.querySelector('.cluster-header') || section.querySelector('.cluster-title') || section;
          }
          if (scrollEl) {
            highlightClusterHit(scrollEl);
            scrollElementBelowStickyChrome(scrollEl);
          }
        }, 320);

        hideSearchResults();
        closeClustersMobileSidebar();
      });

      document.addEventListener(
        'click',
        function (e) {
          if (!searchPanel.classList.contains(RESULTS_OPEN_CLASS)) return;
          if (searchRoot && searchRoot.contains(e.target)) return;
          hideSearchResults();
        },
        true
      );
    }

    if (backToTopBtn) {
      function toggleBackToTop() {
        backToTopBtn.classList.toggle('is-visible', window.scrollY > 500);
      }
      window.addEventListener('scroll', toggleBackToTop, { passive: true });
      toggleBackToTop();
      backToTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  });
})();
