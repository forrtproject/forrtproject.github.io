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

  /** Text used to match a sub-cluster pane (heading + description). */
  function getSubclusterPaneSearchText(pane) {
    if (!pane) return '';
    var parts = [];
    var heading = pane.querySelector('.sc-heading');
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

  function collectClustersInlineSearchResults(scopeRoot, tokens) {
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

      section.querySelectorAll('.tab-pane').forEach(function (pane) {
        if (results.length >= MAX_RESULTS) return;
        var paneId = pane.id;
        if (!paneId) return;
        var tabId = pane.getAttribute('aria-labelledby') || '';

        var scHeading = pane.querySelector('.sc-heading');
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

    var shown = results.slice(0, SHOWN_RESULTS);
    var countText = results.length + ' result' + (results.length !== 1 ? 's' : '');
    toolbarEl.innerHTML = buildResultsToolbar(countText);
    toolbarEl.hidden = false;

    var html = '<div class="clusters-inline-search__hits">';
    shown.forEach(function (r) {
      html += '<a href="#" class="clusters-inline-search__hit" role="button"' +
        ' data-hit-type="' + escAttr(r.type) + '"' +
        ' data-cluster="' + escAttr(r.clusterId) + '"' +
        ' data-tab="' + escAttr(r.tabId) + '"' +
        ' data-pane="' + escAttr(r.paneId) + '">' +
        '<span class="clusters-inline-search__hit-label">' + escapeHtml(r.label) + '</span>' +
        '<span class="clusters-inline-search__hit-meta">' + escapeHtml(r.meta) + '</span>' +
        '</a>';
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

    var mobileToggle = document.getElementById('clusters-mobile-toggle');
    var sidebar = document.getElementById('clusters-sidebar');
    var backToTopBtn = document.getElementById('clusters-back-to-top');
    /* Toolbar may live under the page title (outside .clusters-layout) */
    var controls = document.querySelector('.clusters-controls');
    var navbarEl = document.getElementById('navbar-main');
    var mobileNavMq = window.matchMedia ? window.matchMedia('(max-width: 991.98px)') : null;
    var clusterSubpage = document.querySelector('.clusters-cluster-subpage');
    var mainScrollEl = document.querySelector('.clusters-cluster-subpage__main-scroll');

    function clustersNavIsMobileWidth() {
      return mobileNavMq && mobileNavMq.matches;
    }

    /** /clusters/cluster-N/: desktop main column is the scroll container */
    function useClusterSubpageMainScroll() {
      if (!clusterSubpage || !mainScrollEl) return false;
      if (clustersNavIsMobileWidth()) return false;
      var oy = window.getComputedStyle(mainScrollEl).overflowY;
      return oy === 'auto' || oy === 'scroll';
    }

    function updateClusterSubpageDrawerTop() {
      if (!clusterSubpage || !clustersNavIsMobileWidth()) {
        document.documentElement.style.removeProperty('--cluster-subpage-drawer-top');
        return;
      }
      var bar = clusterSubpage.querySelector('.clusters-cluster-subpage__head-wrap');
      if (bar) {
        document.documentElement.style.setProperty(
          '--cluster-subpage-drawer-top',
          Math.ceil(bar.getBoundingClientRect().bottom) + 4 + 'px'
        );
      }
    }

    function updateClusterSubpageLayout() {
      if (!clusterSubpage) {
        document.documentElement.style.removeProperty('--cluster-subpage-sticky-top');
        document.documentElement.style.removeProperty('--cluster-subpage-drawer-top');
        return;
      }
      var navOff = getNavbarStickyOffsetPx();
      clusterSubpage.style.setProperty('--cluster-subpage-nav-offset', navOff + 'px');
      document.documentElement.style.setProperty(
        '--cluster-subpage-sticky-top',
        'calc(' + navOff + 'px + env(safe-area-inset-top, 0px))'
      );
      if (clustersNavIsMobileWidth()) {
        clusterSubpage.style.removeProperty('--cluster-subpage-head-reserved');
        updateClusterSubpageDrawerTop();
        return;
      }
      document.documentElement.style.removeProperty('--cluster-subpage-drawer-top');
      var display = clusterSubpage.querySelector('.clusters-cluster-subpage__display');
      if (display) {
        clusterSubpage.style.setProperty(
          '--cluster-subpage-head-reserved',
          Math.ceil(display.getBoundingClientRect().top) + 12 + 'px'
        );
      }
    }

    /** Hub: lock body when drawer open. Cluster subpage: dropdown below bar — keep page scroll. */
    function syncClustersMobileBodyScrollLock() {
      if (!sidebar) return;
      if (clusterSubpage && clustersNavIsMobileWidth()) {
        document.body.style.overflow = '';
        return;
      }
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
    }

    function scheduleStickyLayoutMetrics() {
      updateStickyLayoutMetrics();
      updateClusterSubpageLayout();
      requestAnimationFrame(function () {
        updateStickyLayoutMetrics();
        updateClusterSubpageLayout();
      });
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
    if (window.ResizeObserver && clusterSubpage) {
      new ResizeObserver(scheduleStickyLayoutMetrics).observe(clusterSubpage);
    }

    /**
     * Scroll so el sits below the sticky stack (navbar + .clusters-controls search bar).
     * Cluster subpages: scroll the <main> column only (desktop).
     */
    function scrollElementBelowStickyChrome(el) {
      if (!el) return;
      updateStickyLayoutMetrics();
      updateClusterSubpageLayout();
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
          if (useClusterSubpageMainScroll() && mainScrollEl) {
            var delta = el.getBoundingClientRect().top - chromeBottom - margin;
            mainScrollEl.scrollBy({ top: delta, behavior: 'smooth' });
            return;
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
        requestAnimationFrame(function () {
          updateClusterSubpageDrawerTop();
          syncClustersMobileBodyScrollLock();
        });
      });
    }

    if (clusterSubpage) {
      window.addEventListener(
        'scroll',
        function () {
          if (clustersNavIsMobileWidth() && sidebar && sidebar.classList.contains('sidebar-open')) {
            updateClusterSubpageDrawerTop();
          }
        },
        { passive: true }
      );
    }

    root.querySelectorAll('.cluster-nav-heading').forEach(function (heading) {
      heading.addEventListener('click', function (e) {
        /* /clusters/cluster-N/ links: navigate; #cluster-N on hub: expand + scroll in-page */
        if (!isClustersInPageNavHref(this)) {
          closeClustersMobileSidebar();
          return;
        }
        e.preventDefault();
        var group = this.closest('.cluster-nav-group');
        if (!group) return;
        var subList = group.querySelector('.cluster-nav-subs');
        var arrow = group.querySelector('.cluster-nav-toggle');
        if (!subList || !arrow) return;
        var isHidden = subList.style.display === 'none';
        subList.style.display = isHidden ? 'block' : 'none';
        arrow.innerHTML = isHidden ? '&#9662;' : '&#9656;';
        /* Arrow: expand/collapse only — keep mobile drawer open for sub-cluster picks */
        var clickedArrow = e.target.closest('.cluster-nav-toggle');
        if (clickedArrow) return;
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
        var clusterId = this.getAttribute('data-cluster');
        var tabId = this.getAttribute('data-tab');
        var section = clusterId ? document.getElementById(clusterId) : null;
        if (section && tabId) {
          var tab = document.getElementById(tabId);
          showBootstrapTab(tab);
          setTimeout(function () {
            scrollToClusterTabPaneFromTrigger(tab);
          }, 100);
        }
        closeClustersMobileSidebar();
      });
    });

    /* e.g. /clusters/cluster-2/#c2-sc1 — open matching tab after load or hash-only navigation */
    function applyClusterUrlHashTab() {
      var raw = window.location.hash.replace(/^#/, '');
      if (!raw || !/^c\d+-sc\d+$/.test(raw)) return;
      var tab = document.getElementById(raw + '-tab');
      if (!tab) return;
      showBootstrapTab(tab);
      setTimeout(function () {
        scrollToClusterTabPaneFromTrigger(tab);
      }, 150);
    }
    applyClusterUrlHashTab();
    window.addEventListener('hashchange', applyClusterUrlHashTab);

    /* Clicking sub-cluster tabs: scroll so pane content clears sticky chrome */
    if (typeof window.jQuery !== 'undefined' && window.jQuery.fn.tab) {
      window
        .jQuery(root)
        .on('shown.bs.tab', '.cluster-tabs a[data-toggle="tab"], .cluster-tabs a[data-bs-toggle="tab"]', function () {
          scrollToClusterTabPaneFromTrigger(this);
        });
    } else {
      root.querySelectorAll('.cluster-tabs a.nav-link[data-toggle="tab"], .cluster-tabs a.nav-link[data-bs-toggle="tab"]').forEach(function (tabEl) {
        tabEl.addEventListener('click', function () {
          var self = this;
          setTimeout(function () {
            scrollToClusterTabPaneFromTrigger(self);
          }, 200);
        });
      });
    }

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
      var results = collectClustersInlineSearchResults(root, tokens);
      renderClustersInlineResults(results, searchToolbar, searchResults);
      searchPanel.classList.add(RESULTS_OPEN_CLASS);
      scheduleStickyLayoutMetrics();
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

        if (tabId) {
          var tab = document.getElementById(tabId);
          showBootstrapTab(tab);
        }

        setTimeout(function () {
          var scrollEl = null;
          if (hitType === 'cluster') {
            scrollEl =
              section.querySelector('.cluster-header') ||
              section.querySelector('.cluster-title') ||
              section;
          } else if (hitType === 'subcluster' && paneId) {
            var paneSc = document.getElementById(paneId);
            scrollEl = paneSc ? paneSc.querySelector('.sc-heading') || paneSc : section;
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
        var useMain = useClusterSubpageMainScroll();
        var show = useMain ? mainScrollEl.scrollTop > 400 : window.scrollY > 500;
        backToTopBtn.classList.toggle('is-visible', show);
      }
      window.addEventListener('scroll', toggleBackToTop, { passive: true });
      if (mainScrollEl) {
        mainScrollEl.addEventListener('scroll', toggleBackToTop, { passive: true });
      }
      toggleBackToTop();
      backToTopBtn.addEventListener('click', function () {
        if (useClusterSubpageMainScroll() && mainScrollEl) {
          mainScrollEl.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    }
  });
})();
