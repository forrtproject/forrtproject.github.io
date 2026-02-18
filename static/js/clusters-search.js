/**
 * Clusters Page Search Functionality
 * Enables searching within Bootstrap tab content that would otherwise be hidden from Ctrl-F
 */
(function() {
    'use strict';

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        // Only run on clusters page
        if (!window.location.pathname.includes('/clusters')) {
            return;
        }

        createSearchInterface();
        setupSearchHandlers();
    }

    function createSearchInterface() {
        // Create sidebar container
        const sidebar = document.createElement('div');
        sidebar.id = 'clusterSearchSidebar';
        sidebar.className = 'cluster-search-sidebar';
        sidebar.innerHTML = `
            <button class="cluster-search-toggle" id="clusterSearchToggle" aria-label="Toggle search panel">
                <i class="fas fa-search"></i> Search Clusters
            </button>
            <div class="cluster-search-panel" id="clusterSearchPanel">
                <div class="cluster-search-header">
                    <h4>Search Clusters</h4>
                    <button class="cluster-search-close" id="clusterSearchClose" aria-label="Close search">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="cluster-search-body">
                    <div class="input-group">
                        <input type="text" 
                               id="clusterSearchInput" 
                               class="form-control" 
                               placeholder="Search clusters..."
                               aria-label="Search clusters">
                        <div class="input-group-append">
                            <button class="btn btn-primary btn-sm" type="button" id="clusterSearchBtn">
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                    <button class="btn btn-outline-secondary btn-sm btn-block mt-2" type="button" id="clusterClearBtn" style="display: none;">
                        <i class="fas fa-times"></i> Clear Results
                    </button>
                    <div id="clusterSearchResults" style="margin-top: 15px; font-size: 0.85rem;"></div>
                </div>
            </div>
        `;

        // Insert at beginning of body
        document.body.insertBefore(sidebar, document.body.firstChild);
    }

    function setupSearchHandlers() {
        const searchInput = document.getElementById('clusterSearchInput');
        const searchBtn = document.getElementById('clusterSearchBtn');
        const clearBtn = document.getElementById('clusterClearBtn');
        const resultsDiv = document.getElementById('clusterSearchResults');
        const toggleBtn = document.getElementById('clusterSearchToggle');
        const closeBtn = document.getElementById('clusterSearchClose');
        const panel = document.getElementById('clusterSearchPanel');

        if (!searchInput || !searchBtn || !clearBtn || !toggleBtn || !closeBtn || !panel) return;

        // Toggle sidebar
        toggleBtn.addEventListener('click', function() {
            panel.classList.toggle('open');
            if (panel.classList.contains('open')) {
                searchInput.focus();
            }
        });

        // Close sidebar
        closeBtn.addEventListener('click', function() {
            panel.classList.remove('open');
        });

        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && panel.classList.contains('open')) {
                panel.classList.remove('open');
            }
        });

        // Search on button click
        searchBtn.addEventListener('click', performSearch);

        // Search on Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        // Clear search
        clearBtn.addEventListener('click', function() {
            searchInput.value = '';
            resultsDiv.innerHTML = '';
            clearBtn.style.display = 'none';
            removeAllHighlights();
            collapseAllTabs();
        });
    }

    function performSearch() {
        const searchInput = document.getElementById('clusterSearchInput');
        const clearBtn = document.getElementById('clusterClearBtn');
        const resultsDiv = document.getElementById('clusterSearchResults');
        const query = searchInput.value.trim();

        if (!query || query.length < 2) {
            resultsDiv.innerHTML = '<div class="alert alert-warning">Please enter at least 2 characters to search.</div>';
            return;
        }

        // Remove previous highlights
        removeAllHighlights();

        // Search through all tab content
        const results = searchAllTabs(query);

        // Display results
        displayResults(results, query);

        // Show clear button
        clearBtn.style.display = 'inline-block';
    }

    function searchAllTabs(query) {
        const results = [];
        const queryLower = query.toLowerCase();
        
        // Find all cluster sections
        const clusterSections = document.querySelectorAll('section[id^="cluster"]');
        
        clusterSections.forEach(function(section) {
            const clusterTitle = section.querySelector('h3, h2, .home-section-title');
            const clusterName = clusterTitle ? clusterTitle.textContent.trim() : 'Unknown Cluster';
            
            // Find all tab panes in this cluster
            const tabPanes = section.querySelectorAll('.tab-pane');
            
            tabPanes.forEach(function(tabPane) {
                const tabId = tabPane.id;
                const content = tabPane.textContent || tabPane.innerText;
                const contentLower = content.toLowerCase();
                
                // Check if query is in content
                if (contentLower.includes(queryLower)) {
                    // Count occurrences
                    const matches = countMatches(contentLower, queryLower);
                    
                    // Get tab label
                    const tabLink = section.querySelector(`a[href="#${tabId}"]`);
                    const tabLabel = tabLink ? tabLink.textContent.trim() : tabId;
                    
                    // Get a snippet of context
                    const snippet = getContextSnippet(content, query);
                    
                    results.push({
                        cluster: clusterName,
                        tab: tabLabel,
                        tabId: tabId,
                        matches: matches,
                        snippet: snippet,
                        section: section,
                        tabPane: tabPane,
                        tabLink: tabLink
                    });
                }
            });
        });
        
        return results;
    }

    function countMatches(text, query) {
        const regex = new RegExp(query, 'gi');
        const matches = text.match(regex);
        return matches ? matches.length : 0;
    }

    function getContextSnippet(text, query) {
        const queryLower = query.toLowerCase();
        const textLower = text.toLowerCase();
        const index = textLower.indexOf(queryLower);
        
        if (index === -1) return '';
        
        const start = Math.max(0, index - 50);
        const end = Math.min(text.length, index + query.length + 100);
        let snippet = text.substring(start, end);
        
        if (start > 0) snippet = '...' + snippet;
        if (end < text.length) snippet = snippet + '...';
        
        // Highlight the query in snippet
        const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
        snippet = snippet.replace(regex, '<mark>$1</mark>');
        
        return snippet;
    }

    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function displayResults(results, query) {
        const resultsDiv = document.getElementById('clusterSearchResults');
        
        if (results.length === 0) {
            resultsDiv.innerHTML = `<div class="alert alert-warning">No results found for "${escapeHtml(query)}".</div>`;
            return;
        }

        let html = `<div class="search-summary">Found ${results.length} tab(s) with ${results.reduce((sum, r) => sum + r.matches, 0)} matches</div>`;
        html += '<div class="search-results-list">';
        
        results.forEach(function(result) {
            html += `
                <div class="search-result-item" data-tab-id="${result.tabId}">
                    <div class="search-result-header">
                        <strong>${escapeHtml(result.tab)}</strong>
                        <span class="badge badge-primary">${result.matches}</span>
                    </div>
                    <div class="search-result-cluster">${escapeHtml(result.cluster)}</div>
                    <div class="search-result-snippet">${result.snippet}</div>
                </div>
            `;
        });
        
        html += '</div>';
        resultsDiv.innerHTML = html;

        // Add click handlers to results
        const resultItems = resultsDiv.querySelectorAll('.search-result-item');
        resultItems.forEach(function(item) {
            item.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab-id');
                const result = results.find(r => r.tabId === tabId);
                if (result) {
                    activateTab(result);
                    highlightMatches(result.tabPane, query);
                    // Scroll to the section
                    result.section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // Mark as active
                    resultItems.forEach(r => r.classList.remove('active'));
                    this.classList.add('active');
                }
            });
        });

        // Auto-expand first result
        if (results.length > 0) {
            resultItems[0].classList.add('active');
            activateTab(results[0]);
            highlightMatches(results[0].tabPane, query);
        }
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function activateTab(result) {
        // Collapse all tabs first
        collapseAllTabs();
        
        // Activate the target tab
        if (result.tabLink) {
            result.tabLink.click();
        }
    }

    function collapseAllTabs() {
        document.querySelectorAll('.tab-pane.show.active').forEach(function(pane) {
            pane.classList.remove('show', 'active');
        });
        document.querySelectorAll('.nav-link.active').forEach(function(link) {
            link.classList.remove('active');
        });
    }

    function highlightMatches(tabPane, query) {
        if (!tabPane) return;
        
        // Remove existing highlights first
        removeHighlightsInElement(tabPane);
        
        // Use mark.js-like approach to highlight matches
        const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
        
        // Get all text nodes
        const walker = document.createTreeWalker(
            tabPane,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        
        const textNodes = [];
        let node;
        while ((node = walker.nextNode())) {
            // Skip if parent is already a mark
            if (node.parentElement.tagName !== 'MARK') {
                textNodes.push(node);
            }
        }
        
        textNodes.forEach(function(textNode) {
            const text = textNode.textContent;
            const testRegex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
            if (testRegex.test(text)) {
                const fragment = document.createDocumentFragment();
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = text.replace(regex, '<mark class="cluster-highlight">$1</mark>');
                while (tempDiv.firstChild) {
                    fragment.appendChild(tempDiv.firstChild);
                }
                textNode.parentNode.replaceChild(fragment, textNode);
            }
        });
    }

    function removeAllHighlights() {
        document.querySelectorAll('.cluster-highlight').forEach(function(mark) {
            const parent = mark.parentNode;
            parent.replaceChild(document.createTextNode(mark.textContent), mark);
            parent.normalize();
        });
    }

    function removeHighlightsInElement(element) {
        element.querySelectorAll('.cluster-highlight').forEach(function(mark) {
            const parent = mark.parentNode;
            parent.replaceChild(document.createTextNode(mark.textContent), mark);
            parent.normalize();
        });
    }

    // Add CSS for sidebar and highlighting
    const style = document.createElement('style');
    style.textContent = `
        /* Highlight styling */
        .cluster-highlight {
            background-color: #ffeb3b;
            padding: 2px 0;
            font-weight: bold;
        }
        
        /* Sidebar toggle button */
        .cluster-search-toggle {
            position: fixed;
            left: 0;
            top: 200px;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 0 5px 5px 0;
            padding: 12px 15px;
            cursor: pointer;
            z-index: 1000;
            box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
            font-size: 14px;
            transition: background 0.3s;
        }
        
        .cluster-search-toggle:hover {
            background: #0056b3;
        }
        
        .cluster-search-toggle i {
            margin-right: 5px;
        }
        
        /* Sidebar panel */
        .cluster-search-panel {
            position: fixed;
            left: -350px;
            top: 0;
            width: 350px;
            height: 100vh;
            background: white;
            box-shadow: 2px 0 10px rgba(0,0,0,0.1);
            z-index: 1001;
            transition: left 0.3s ease;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }
        
        .cluster-search-panel.open {
            left: 0;
        }
        
        /* Sidebar header */
        .cluster-search-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 20px;
            border-bottom: 1px solid #dee2e6;
            background: #f8f9fa;
        }
        
        .cluster-search-header h4 {
            margin: 0;
            font-size: 18px;
            color: #333;
        }
        
        .cluster-search-close {
            background: none;
            border: none;
            font-size: 20px;
            color: #666;
            cursor: pointer;
            padding: 5px;
            line-height: 1;
        }
        
        .cluster-search-close:hover {
            color: #333;
        }
        
        /* Sidebar body */
        .cluster-search-body {
            padding: 20px;
            flex: 1;
            overflow-y: auto;
        }
        
        /* Search results summary */
        .search-summary {
            background: #e7f3ff;
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 15px;
            font-size: 0.9rem;
            color: #004085;
        }
        
        /* Search results list */
        .search-results-list {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        
        /* Individual search result */
        .search-result-item {
            background: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 5px;
            padding: 12px;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .search-result-item:hover {
            background: #e9ecef;
            border-color: #007bff;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .search-result-item.active {
            background: #e7f3ff;
            border-color: #007bff;
            border-width: 2px;
        }
        
        .search-result-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 5px;
        }
        
        .search-result-header strong {
            font-size: 0.95rem;
            color: #333;
            flex: 1;
            margin-right: 10px;
        }
        
        .search-result-header .badge {
            font-size: 0.75rem;
        }
        
        .search-result-cluster {
            font-size: 0.8rem;
            color: #666;
            margin-bottom: 8px;
        }
        
        .search-result-snippet {
            font-size: 0.8rem;
            color: #555;
            line-height: 1.4;
        }
        
        .search-result-snippet mark {
            background-color: #ffeb3b;
            padding: 1px 2px;
            font-weight: 600;
        }
        
        /* Mobile responsive */
        @media (max-width: 768px) {
            .cluster-search-panel {
                width: 100%;
                left: -100%;
            }
            
            .cluster-search-panel.open {
                left: 0;
            }
            
            .cluster-search-toggle {
                top: 150px;
                font-size: 12px;
                padding: 10px 12px;
            }
        }
        
        /* Alert styling in sidebar */
        .cluster-search-body .alert {
            font-size: 0.85rem;
            padding: 8px 12px;
        }
    `;
    document.head.appendChild(style);

})();
