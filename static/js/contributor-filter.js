(function() {
    'use strict';

    // Parse URL parameters
    function getURLParams() {
        const params = new URLSearchParams(window.location.search);
        return {
            project: params.get('project'),
            role: params.get('role'),
            collapseFilter: params.has('collapse-filter')
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

    // Populate dropdowns with filter data
    function populateDropdowns() {
        const projectSelect = document.getElementById('project-select');
        const roleSelect = document.getElementById('role-select');
        
        if (!window.filterData) {
            console.warn('Filter data not available yet');
            return;
        }
        
        // Populate projects
        window.filterData.projects.forEach(project => {
            const option = document.createElement('option');
            option.value = project.value;
            option.textContent = project.label;
            projectSelect.appendChild(option);
        });
        
        // Populate roles
        window.filterData.roles.forEach(role => {
            const option = document.createElement('option');
            option.value = role.value;
            option.textContent = role.label;
            roleSelect.appendChild(option);
        });
    }

    // Sync dropdowns with current URL parameters
    function syncDropdownsWithURL() {
        const params = getURLParams();
        const projectSelect = document.getElementById('project-select');
        const roleSelect = document.getElementById('role-select');
        
        if (params.project && projectSelect) {
            projectSelect.value = params.project;
        }
        if (params.role && roleSelect) {
            roleSelect.value = params.role;
        }
    }

    // Apply filter from dropdown selections
    function applyFilterFromDropdowns() {
        const projectSelect = document.getElementById('project-select');
        const roleSelect = document.getElementById('role-select');
        
        const project = projectSelect ? projectSelect.value : '';
        const role = roleSelect ? roleSelect.value : '';
        
        // Build new URL with parameters
        const params = new URLSearchParams();
        if (project) params.set('project', project);
        if (role) params.set('role', role);
        
        // Navigate to new URL (or clear params if both empty)
        const newURL = params.toString() 
            ? `${window.location.pathname}?${params.toString()}` 
            : window.location.pathname;
        window.location.href = newURL;
    }

    // Filter contributors based on URL parameters
    function filterContributors() {
        const params = getURLParams();
        const contributorList = document.getElementById('contributor-list');
        const filterResults = document.getElementById('filter-results');
        const filterInfo = document.getElementById('filter-info');

        // If no filters, hide results section and show everything
        if (!params.project && !params.role) {
            if (filterResults) filterResults.style.display = 'none';
            
            document.querySelectorAll('.contributor-group').forEach(group => {
                group.style.display = 'list-item';
            });
            document.querySelectorAll('.contribution').forEach(contrib => {
                contrib.style.display = 'list-item';
            });
            return;
        }

        // Show filter results section
        if (filterResults) filterResults.style.display = 'block';

        // Build filter info text
        let filterText = [];
        if (params.project) {
            filterText.push(`<strong>Project:</strong> ${escapeHtml(formatForDisplay(params.project))}`);
        }
        if (params.role) {
            filterText.push(`<strong>Role:</strong> ${escapeHtml(formatForDisplay(params.role))}`);
        }
        if (filterInfo) filterInfo.innerHTML = filterText.join('<br>');

        // Get all contributor groups
        const allGroups = contributorList.querySelectorAll('.contributor-group');
        let totalMatches = 0;

        allGroups.forEach(group => {
            const contributions = group.querySelectorAll('.contribution');
            let visibleContributions = 0;

            contributions.forEach(contrib => {
                const projectsAttr = contrib.getAttribute('data-projects') || '';
                const rolesAttr = contrib.getAttribute('data-roles') || '';
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

                // Show/hide this contribution
                if (matches) {
                    contrib.style.display = 'list-item';
                    visibleContributions++;
                } else {
                    contrib.style.display = 'none';
                }
            });

            // Show/hide the entire group based on visible contributions
            if (visibleContributions > 0) {
                group.style.display = 'list-item';
                totalMatches++;
            } else {
                group.style.display = 'none';
            }
        });

        // Update filter info with count
        if (filterInfo) {
            filterInfo.innerHTML += `<br><strong>Matches:</strong> ${totalMatches} contributor${totalMatches !== 1 ? 's' : ''}`;
        }
    }

    // Clear filters and show all contributors
    function clearFilters() {
        window.location.href = window.location.pathname;
    }

    // Handle collapsed filter mode
    function handleCollapsedFilter() {
        const params = getURLParams();
        if (!params.collapseFilter) return false;

        const filterMenu = document.getElementById('filter-menu');
        if (!filterMenu) return false;

        // Create a minimal collapsed view
        const collapsedView = document.createElement('div');
        collapsedView.id = 'filter-collapsed';
        collapsedView.innerHTML = '<a href="' + window.location.pathname + '">← Show contributions to all projects</a>';

        // Replace the filter menu with the collapsed view
        filterMenu.parentNode.replaceChild(collapsedView, filterMenu);

        return true;
    }

    // Initialize on page load
    document.addEventListener('DOMContentLoaded', function() {
        // Check if filter should be collapsed
        const isCollapsed = handleCollapsedFilter();

        if (!isCollapsed) {
            // Populate dropdowns if filter data is available
            populateDropdowns();

            // Sync dropdowns with URL parameters
            syncDropdownsWithURL();

            // Add event listener to apply filter button
            const applyButton = document.getElementById('apply-filter');
            if (applyButton) {
                applyButton.addEventListener('click', applyFilterFromDropdowns);
            }

            // Add event listener to clear filter button
            const clearButton = document.getElementById('clear-filters');
            if (clearButton) {
                clearButton.addEventListener('click', clearFilters);
            }
        }

        // Apply filters based on current URL
        filterContributors();
    });
})();