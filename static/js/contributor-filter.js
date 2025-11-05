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

        // Build filter info text
        let filterText = [];
        if (params.project) {
            filterText.push(`<strong>Project:</strong> ${formatForDisplay(params.project)}`);
        }
        if (params.role) {
            filterText.push(`<strong>Role:</strong> ${formatForDisplay(params.role)}`);
        }
        filterInfo.innerHTML = filterText.join('<br>');

        // Get all contributor list items
        const allItems = contributorList.querySelectorAll('li[data-projects]');
        const matchedContributors = [];

        allItems.forEach(item => {
            const projects = item.getAttribute('data-projects').split(',').map(p => p.trim());
            const roles = item.getAttribute('data-roles').split(',').map(r => r.trim());
            
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
                    item: item.cloneNode(true),
                    html: item.innerHTML
                });
            }
        });

        // Display matched contributors
        if (matchedContributors.length === 0) {
            filteredView.innerHTML = '<p><em>No contributors found matching the specified filters.</em></p>';
        } else {
            // Create a formatted list
            const resultHTML = `
                <h3>Matching Contributors (${matchedContributors.length})</h3>
                <ul style="list-style-type: none; padding-left: 0;">
                    ${matchedContributors.map(c => `<li style="margin-bottom: 1em;">${c.html}</li>`).join('')}
                </ul>
            `;
            filteredView.innerHTML = resultHTML;
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
