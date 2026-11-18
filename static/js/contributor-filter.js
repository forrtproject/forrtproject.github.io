(function() {
    'use strict';

    // The two filters. `param` is the URL parameter, `attr` the data attribute on each
    // contribution, `dataKey` the list in window.filterData and `noun` the word used in
    // messages. Several values go in one parameter, separated by commas: ?project=a,b
    const FILTERS = [
        { id: 'project', param: 'project', attr: 'data-projects', dataKey: 'projects', noun: 'project', title: 'Project' },
        { id: 'role', param: 'role', attr: 'data-roles', dataKey: 'roles', noun: 'role', title: 'Role' }
    ];

    // Normalize text for comparison (lowercase, hyphenated)
    function normalize(text) {
        if (!text) return '';
        return text.toLowerCase().trim().replace(/\s+/g, '-').replace(/&/g, 'and');
    }

    // Parse URL parameters. Each filter gives the list of selected values (empty = no filter).
    function getURLParams() {
        const params = new URLSearchParams(window.location.search);
        const result = { collapseFilter: params.has('collapse-filter') };
        FILTERS.forEach(filter => {
            result[filter.param] = (params.get(filter.param) || '')
                .split(',')
                .map(normalize)
                .filter(Boolean);
        });
        return result;
    }

    // Format text for display (capitalize, spaces). Used when a value has no label.
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

    // The label of a value: the one from the filter data, else a readable version of the value.
    function labelFor(filter, value) {
        const items = (window.filterData && window.filterData[filter.dataKey]) || [];
        const item = items.find(entry => entry.value === value);
        return item ? item.label : formatForDisplay(value);
    }

    // Selected values per filter, kept here while the visitor types and ticks boxes.
    const selected = {};
    // The option elements per filter, so a search can show and hide them.
    const options = {};

    // Does an option match what was typed? Every word typed must appear in the label.
    function matchesQuery(text, query) {
        const words = query.toLowerCase().split(/\s+/).filter(Boolean);
        const haystack = text.toLowerCase();
        return words.every(word => haystack.includes(word));
    }

    // Show only the options that match the search box and say how many there are.
    function updateOptions(filter) {
        const search = document.getElementById(filter.id + '-search');
        const status = document.getElementById(filter.id + '-status');
        const query = search ? search.value : '';
        let shown = 0;

        options[filter.id].forEach(option => {
            const visible = matchesQuery(option.text, query);
            option.element.hidden = !visible;
            if (visible) shown++;
        });

        if (status) {
            const total = options[filter.id].length;
            status.textContent = query.trim()
                ? `${shown} of ${total} ${filter.noun}s match`
                : `${total} ${filter.noun}s`;
        }
    }

    // Show the selected values as buttons that remove them. They stay visible even when
    // the search hides their checkbox.
    function updateChips(filter) {
        const chips = document.getElementById(filter.id + '-selected');
        if (!chips) return;
        chips.textContent = '';
        selected[filter.id].forEach(value => {
            const label = labelFor(filter, value);
            const chip = document.createElement('button');
            chip.type = 'button';
            chip.className = 'filter-chip';
            chip.setAttribute('aria-label', `Remove ${filter.noun} ${label}`);
            chip.textContent = `${label} ×`;
            chip.addEventListener('click', () => {
                selected[filter.id].delete(value);
                const option = options[filter.id].find(entry => entry.value === value);
                if (option) option.checkbox.checked = false;
                updateChips(filter);
                const search = document.getElementById(filter.id + '-search');
                if (search) search.focus();
            });
            chips.appendChild(chip);
        });
    }

    // Build the search box, the list of checkboxes and the selected buttons of one filter.
    function buildFilter(filter) {
        const list = document.getElementById(filter.id + '-options');
        const search = document.getElementById(filter.id + '-search');
        options[filter.id] = [];
        if (!list || !window.filterData || !window.filterData[filter.dataKey]) return;

        window.filterData[filter.dataKey].forEach(item => {
            const label = document.createElement('label');
            label.className = 'filter-option';
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = item.value;
            checkbox.checked = selected[filter.id].has(item.value);
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) selected[filter.id].add(item.value);
                else selected[filter.id].delete(item.value);
                updateChips(filter);
            });
            const text = document.createElement('span');
            text.textContent = item.label;
            label.appendChild(checkbox);
            label.appendChild(text);
            list.appendChild(label);
            options[filter.id].push({ value: item.value, text: item.label, element: label, checkbox: checkbox });
        });

        if (search) search.addEventListener('input', () => updateOptions(filter));
        updateOptions(filter);
        updateChips(filter);
    }

    // Apply the selections: put them in the URL and reload, so the filtered view can be shared.
    function applyFilter() {
        const params = new URLSearchParams();
        FILTERS.forEach(filter => {
            if (selected[filter.id] && selected[filter.id].size) {
                params.set(filter.param, Array.from(selected[filter.id]).join(','));
            }
        });

        // Navigate to new URL (or clear params if nothing is selected)
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
        const active = FILTERS.filter(filter => params[filter.param].length > 0);

        // If no filters, hide results section and show everything
        if (active.length === 0) {
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
        const filterText = active.map(filter => {
            const labels = params[filter.param].map(value => escapeHtml(labelFor(filter, value)));
            return `<strong>${filter.title}:</strong> ${labels.join(', ')}`;
        });
        if (filterInfo) filterInfo.innerHTML = filterText.join('<br>');

        // Get all contributor groups
        const allGroups = contributorList.querySelectorAll('.contributor-group');
        let totalMatches = 0;

        allGroups.forEach(group => {
            const contributions = group.querySelectorAll('.contribution');
            let visibleContributions = 0;

            contributions.forEach(contrib => {
                // A contribution matches when, for every active filter, it has at least one
                // of the selected values.
                const matches = active.every(filter => {
                    const attr = contrib.getAttribute(filter.attr) || '';
                    const values = attr.split(',').filter(v => v.trim()).map(v => v.trim());
                    return params[filter.param].some(value => values.includes(value));
                });

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
            if (!window.filterData) {
                console.warn('Filter data not available yet');
            }

            // Start from the values in the URL, then build the searchable lists
            const params = getURLParams();
            FILTERS.forEach(filter => {
                selected[filter.id] = new Set(params[filter.param]);
                buildFilter(filter);
            });

            // Add event listener to apply filter button
            const applyButton = document.getElementById('apply-filter');
            if (applyButton) {
                applyButton.addEventListener('click', applyFilter);
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
