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
        // Find the intro section to insert search box after it
        const introSection = document.querySelector('.wg-blank');
        if (!introSection) return;

        // Create search container
        const searchContainer = document.createElement('div');
        searchContainer.className = 'cluster-search-container';
        searchContainer.innerHTML = `
            <div class="container" style="margin-bottom: 30px; margin-top: 20px;">
                <div class="row justify-content-center">
                    <div class="col-lg-8">
                        <div class="input-group">
                            <input type="text" 
                                   id="clusterSearchInput" 
                                   class="form-control" 
                                   placeholder="Search within all clusters and sub-categories..."
                                   aria-label="Search clusters">
                            <div class="input-group-append">
                                <button class="btn btn-primary" type="button" id="clusterSearchBtn">
                                    <i class="fas fa-search"></i> Search
                                </button>
                                <button class="btn btn-outline-secondary" type="button" id="clusterClearBtn" style="display: none;">
                                    <i class="fas fa-times"></i> Clear
                                </button>
                            </div>
                        </div>
                        <div id="clusterSearchResults" style="margin-top: 10px; font-size: 0.9rem;"></div>
                    </div>
                </div>
            </div>
        `;

        // Insert after intro section
        introSection.parentNode.insertBefore(searchContainer, introSection.nextSibling);
    }

    function setupSearchHandlers() {
        const searchInput = document.getElementById('clusterSearchInput');
        const searchBtn = document.getElementById('clusterSearchBtn');
        const clearBtn = document.getElementById('clusterClearBtn');
        const resultsDiv = document.getElementById('clusterSearchResults');

        if (!searchInput || !searchBtn || !clearBtn) return;

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
            resultsDiv.innerHTML = `<div class="alert alert-info">No results found for "${escapeHtml(query)}".</div>`;
            return;
        }

        let html = `<div class="alert alert-success">Found ${results.length} tab(s) containing "${escapeHtml(query)}" (${results.reduce((sum, r) => sum + r.matches, 0)} total matches). Click on a result to view it:</div>`;
        html += '<div class="list-group" style="margin-top: 10px;">';
        
        results.forEach(function(result) {
            html += `
                <a href="#" class="list-group-item list-group-item-action cluster-search-result" 
                   data-tab-id="${result.tabId}">
                    <div class="d-flex w-100 justify-content-between">
                        <h6 class="mb-1">${escapeHtml(result.cluster)} → ${escapeHtml(result.tab)}</h6>
                        <small>${result.matches} match${result.matches > 1 ? 'es' : ''}</small>
                    </div>
                    <p class="mb-1"><small>${result.snippet}</small></p>
                </a>
            `;
        });
        
        html += '</div>';
        resultsDiv.innerHTML = html;

        // Add click handlers to results
        const resultLinks = resultsDiv.querySelectorAll('.cluster-search-result');
        resultLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const tabId = this.getAttribute('data-tab-id');
                const result = results.find(r => r.tabId === tabId);
                if (result) {
                    activateTab(result);
                    highlightMatches(result.tabPane, query);
                    // Scroll to the section
                    result.section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Auto-expand first result
        if (results.length > 0) {
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

    // Add CSS for highlighting
    const style = document.createElement('style');
    style.textContent = `
        .cluster-highlight {
            background-color: #ffeb3b;
            padding: 2px 0;
            font-weight: bold;
        }
        
        .cluster-search-container {
            position: sticky;
            top: 70px;
            background: white;
            z-index: 100;
            padding: 20px 0 10px 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .cluster-search-result:hover {
            cursor: pointer;
        }
        
        .cluster-search-result mark {
            background-color: #ffeb3b;
            padding: 1px 2px;
        }
    `;
    document.head.appendChild(style);

})();
