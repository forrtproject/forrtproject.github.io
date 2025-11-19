(function() {
    'use strict';

    // Parse URL parameters
    function getURLParams() {
        const params = new URLSearchParams(window.location.search);
        return {
            project: params.get('project'),
            role: params.get('role')
        };
    }

    // Normalize text for comparison (lowercase, hyphenated)
    function normalize(text) {
        if (!text) return '';
        return text.toLowerCase().trim().replace(/\s+/g, '-').replace(/&/g, 'and');
    }

    // Format text for display (capitalize, spaces)
    function formatForDisplay(text) {
        if (!text) return '';
        return text
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
            .replace(/\band\b/i, '&');
    }

    // Escape HTML to prevent XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Filter contributors based on URL parameters
    function filterContributors() {
        const params = getURLParams();
        const contributorList = document.getElementById('contributor-list');
        const filterControls = document.getElementById('filter-controls');
        const filterInfo = document.getElementById('filter-info');
        const filteredView = document.getElementById('filtered-view');

        // If no filters, show the full list
        if (!params.project && !params.role) {
            contributorList.style.display = 'block';
            filterControls.style.display = 'none';
            filteredView.style.display = 'none';
            return;
        }

        // Hide the default list and show filtered view
        contributorList.style.display = 'none';
        filterControls.style.display = 'block';
        filteredView.style.display = 'block';

        // Build filter info text with escaped values
        let filterText = [];
        if (params.project) {
            filterText.push(`<strong>Project:</strong> ${escapeHtml(formatForDisplay(params.project))}`);
        }
        if (params.role) {
            filterText.push(`<strong>Role:</strong> ${escapeHtml(formatForDisplay(params.role))}`);
        }
        filterInfo.innerHTML = filterText.join('<br>');

        // Get all contributor list items
        const allItems = contributorList.querySelectorAll('li[data-projects]');
        const matchedContributors = [];

        allItems.forEach(item => {
            // Safely get and parse data attributes with null checks
            const projectsAttr = item.getAttribute('data-projects') || '';
            const rolesAttr = item.getAttribute('data-roles') || '';
            const projects = projectsAttr.split(',').filter(p => p.trim()).map(p => p.trim());
            const roles = rolesAttr.split(',').filter(r => r.trim()).map(r => r.trim());
            
            let matches = true;

            // Check project filter
            if (params.project) {
                const normalizedProject = normalize(params.project);
                if (!projects.includes(normalizedProject)) {
                    matches = false;
                }
            }

            // Check role filter
            if (params.role && matches) {
                const normalizedRole = normalize(params.role);
                if (!roles.includes(normalizedRole)) {
                    matches = false;
                }
            }

            if (matches) {
                matchedContributors.push({
                    item: item.cloneNode(true)
                });
            }
        });

        // Display matched contributors
        if (matchedContributors.length === 0) {
            filteredView.innerHTML = '<p><em>No contributors found matching the specified filters.</em></p>';
        } else {
            // Create a formatted list using DOM manipulation for safety
            filteredView.innerHTML = '';
            
            const heading = document.createElement('h3');
            heading.textContent = `Matching Contributors (${matchedContributors.length})`;
            filteredView.appendChild(heading);
            
            const ul = document.createElement('ul');
            ul.style.cssText = 'list-style-type: none; padding-left: 0;';
            
            matchedContributors.forEach(c => {
                // Apply styling to the cloned item and append directly to ul
                c.item.style.cssText = 'margin-bottom: 1em;';
                ul.appendChild(c.item);
            });
            
            filteredView.appendChild(ul);
        }
    }

    // Clear filters and show all contributors
    function clearFilters() {
        window.location.href = window.location.pathname;
    }

    // Initialize on page load
    document.addEventListener('DOMContentLoaded', function() {
        // Add event listener to clear button
        const clearButton = document.getElementById('clear-filters');
        if (clearButton) {
            clearButton.addEventListener('click', clearFilters);
        }

        // Apply filters
        filterContributors();
    });
})();
