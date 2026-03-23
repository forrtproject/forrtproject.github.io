/**
 * Clusters page: sticky layout metrics, nav, embedded search, back-to-top.
 * Requires .clusters-layout (from layouts/partials/clusters/all_clusters.html).
 */
(function () {
  'use strict';

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

  function performClustersSearch(query, resultsContainer) {
    var results = [];
    document.querySelectorAll('.cluster-section').forEach(function (section) {
      if (section.textContent.toLowerCase().indexOf(query) === -1) return;
      var titleEl = section.querySelector('.cluster-title');
      results.push({
        id: section.id,
        title: titleEl ? titleEl.textContent.trim() : section.id
      });
    });

    if (results.length === 0) {
      resultsContainer.innerHTML = '<div class="search-no-results">No results found.</div>';
    } else {
      var html = '<div class="search-count">' + results.length + ' result' +
        (results.length !== 1 ? 's' : '') + '</div>';
      results.slice(0, 10).forEach(function (r) {
        html += '<a href="#' + r.id + '" class="search-result-item" data-target="' + r.id + '">' +
          escapeHtml(r.title) + '</a>';
      });
      if (results.length > 10) {
        html += '<div class="search-more">... and ' + (results.length - 10) + ' more results.</div>';
      }
      resultsContainer.innerHTML = html;
    }
    resultsContainer.style.display = 'block';
  }

  function escapeHtml(s) {
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  onReady(function () {
    var root = document.querySelector('.clusters-layout');
    if (!root) return;

    var mobileToggle = document.getElementById('clusters-mobile-toggle');
    var sidebar = document.getElementById('clusters-sidebar');
    var backToTopBtn = document.getElementById('clusters-back-to-top');
    var controls = root.querySelector('.clusters-controls');
    var navbarEl = document.getElementById('navbar-main');

    function updateStickyLayoutMetrics() {
      if (!controls) return;
      root.style.setProperty('--clusters-sticky-offset', getNavbarStickyOffsetPx() + 'px');
      root.style.setProperty('--clusters-controls-height', controls.offsetHeight + 'px');
    }

    function scheduleStickyLayoutMetrics() {
      updateStickyLayoutMetrics();
      requestAnimationFrame(function () {
        updateStickyLayoutMetrics();
      });
    }

    scheduleStickyLayoutMetrics();
    window.addEventListener('resize', scheduleStickyLayoutMetrics, { passive: true });
    window.addEventListener('orientationchange', scheduleStickyLayoutMetrics, { passive: true });
    if (window.ResizeObserver && navbarEl) {
      new ResizeObserver(scheduleStickyLayoutMetrics).observe(navbarEl);
    }

    if (mobileToggle && sidebar) {
      mobileToggle.addEventListener('click', function () {
        sidebar.classList.toggle('sidebar-open');
        this.classList.toggle('active');
        scheduleStickyLayoutMetrics();
      });
    }

    root.querySelectorAll('.cluster-nav-heading').forEach(function (heading) {
      heading.addEventListener('click', function (e) {
        e.preventDefault();
        var group = this.closest('.cluster-nav-group');
        if (!group) return;
        var subList = group.querySelector('.cluster-nav-subs');
        var arrow = group.querySelector('.cluster-nav-toggle');
        if (!subList || !arrow) return;
        var isHidden = subList.style.display === 'none';
        subList.style.display = isHidden ? 'block' : 'none';
        arrow.innerHTML = isHidden ? '&#9662;' : '&#9656;';
        var clusterId = group.getAttribute('data-cluster');
        var section = clusterId ? document.getElementById(clusterId) : null;
        if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    root.querySelectorAll('.sc-nav-link').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var clusterId = this.getAttribute('data-cluster');
        var tabId = this.getAttribute('data-tab');
        var section = clusterId ? document.getElementById(clusterId) : null;
        if (section && tabId) {
          var tab = document.getElementById(tabId);
          if (tab) {
            if (typeof window.jQuery !== 'undefined' && window.jQuery.fn.tab) {
              window.jQuery(tab).tab('show');
            } else {
              tab.click();
            }
          }
          setTimeout(function () {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
        if (sidebar) sidebar.classList.remove('sidebar-open');
        if (mobileToggle) mobileToggle.classList.remove('active');
      });
    });

    var searchInput = document.getElementById('cluster-search');
    var searchResults = document.getElementById('cluster-search-results');
    var debounceTimer;

    if (searchInput && searchResults) {
      searchInput.addEventListener('input', function () {
        clearTimeout(debounceTimer);
        var query = this.value.toLowerCase().trim();
        if (query.length < 2) {
          searchResults.style.display = 'none';
          searchResults.innerHTML = '';
          return;
        }
        debounceTimer = setTimeout(function () {
          performClustersSearch(query, searchResults);
        }, 200);
      });

      searchResults.addEventListener('click', function (e) {
        var link = e.target.closest('.search-result-item');
        if (!link) return;
        e.preventDefault();
        var targetId = link.getAttribute('data-target');
        var target = targetId ? document.getElementById(targetId) : null;
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
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
