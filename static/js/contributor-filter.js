(function() {
    'use strict';

    // A page generated from the older template shows filter results in a block in the filter panel; it is noted
    // before collapse-filter mode takes the panel away, so that page keeps its old behaviour in both modes.
    let olderPage = false;

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
            ? `${window.location.pathname}?${params.toString()}${olderPage ? '' : '#contributor-results'}` 
            : window.location.pathname;
        window.location.href = newURL;
    }

    // Filter contributors based on URL parameters
    function filterContributors() {
        const params = getURLParams();
        const contributorList = document.getElementById('contributor-list');
        const filterResults = document.getElementById('filter-results');
        const filterInfo = document.getElementById('filter-info');

        // The letter index and sections (newer generated markup) only make sense for the whole list.
        const filtering = Boolean(params.project || params.role);
        const letterIndex = document.querySelector('.contributor-az');
        if (letterIndex) letterIndex.hidden = filtering;

        // If no filters, hide results section and show everything
        if (!filtering) {
            if (filterResults) filterResults.style.display = 'none';
            
            document.querySelectorAll('.contributor-group').forEach(group => {
                group.style.display = '';
            });
            document.querySelectorAll('.contribution').forEach(contrib => {
                contrib.style.display = '';
            });
            return;
        }

        // Show filter results section
        if (filterResults) filterResults.style.display = 'block';

        // Build filter info text, with the project's and role's own names where the filter data has them
        const label = (kind, value) => {
            const found = window.filterData && (window.filterData[kind] || []).find(item => item.value === normalize(value));
            return found ? found.label : formatForDisplay(value);
        };
        let filterText = [];
        if (params.project) {
            filterText.push(`<strong>Project:</strong> ${escapeHtml(label('projects', params.project))}`);
        }
        if (params.role) {
            filterText.push(`<strong>Role:</strong> ${escapeHtml(label('roles', params.role))}`);
        }
        // The board marks the project the list is filtered to.
        document.querySelectorAll('.project-tiles a[data-project]').forEach(tile => {
            if (params.project && tile.dataset.project === normalize(params.project)) tile.setAttribute('aria-current', 'true');
        });
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
                    contrib.style.display = '';
                    visibleContributions++;
                } else {
                    contrib.style.display = 'none';
                }
            });

            // Show/hide the entire group based on visible contributions
            if (visibleContributions > 0) {
                group.style.display = '';
                totalMatches++;
            } else {
                group.style.display = 'none';
            }
        });

        // A match may sit among a contributor's further projects: open them. A letter left with no one hides.
        if (filtering) {
            contributorList.querySelectorAll('.contributions-more').forEach(more => {
                more.open = true;
                more.querySelector('summary').hidden = true;
                more.hidden = ![...more.querySelectorAll('.contribution')].some(contrib => contrib.style.display !== 'none');
            });
            contributorList.querySelectorAll('.contributor-letter').forEach(letter => {
                letter.hidden = ![...letter.querySelectorAll('.contributor-group')].some(group => group.style.display !== 'none');
            });
        }

        // Update filter info with count (the older generated page shows it in the filter panel)
        const matchesText = `${totalMatches} contributor${totalMatches !== 1 ? 's' : ''}`;
        if (filterInfo) {
            filterInfo.innerHTML += `<br><strong>Matches:</strong> ${matchesText}`;
        }
        // The newer page names the filter and its count in a heading above the list, with the way back to everyone. A
        // project chosen on the board lands on this heading (its link ends in #contributor-results).
        if (!olderPage) {
            const heading = matchesText
                + (params.project ? ` to ${label('projects', params.project)}` : '')
                + (params.role ? ` as ${label('roles', params.role)}` : '');
            const result = document.createElement('div');
            result.className = 'contributor-result';
            result.id = 'contributor-results';
            result.innerHTML = `<h2>${escapeHtml(heading)}</h2>`
                + (params.collapseFilter ? '' : `<a href="${window.location.pathname}">Clear filter</a>`);
            const before = document.querySelector('.contributor-az') || contributorList;
            before.parentNode.insertBefore(result, before);
            // Filtered to one project, the rows need not name it again: each shows its roles (sections.css).
            // The project's name (a link, or plain text where the sheet gives no address) is hidden, not just made
            // invisible, so it also leaves the Tab order.
            if (params.project) {
                contributorList.classList.add('is-project-filtered');
                contributorList.querySelectorAll('.contribution').forEach(contrib => {
                    [...contrib.childNodes].forEach(node => {
                        if (node.nodeType === Node.ELEMENT_NODE && !node.classList.contains('contribution-roles')) {
                            node.hidden = true;
                        } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
                            const name = document.createElement('span');
                            name.hidden = true;
                            node.replaceWith(name);
                            name.append(node);
                        }
                    });
                });
            }
            if (window.location.hash === '#contributor-results') result.scrollIntoView();
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

        // Replace the filter menu with the collapsed view; the board of projects goes with it
        filterMenu.parentNode.replaceChild(collapsedView, filterMenu);
        const board = document.querySelector('.project-board');
        if (board) board.hidden = true;

        return true;
    }

    // Find a name: as the visitor types, only the people whose name contains it stay, with their whole rows, and
    // the line under the filters counts them. Accents, case and letters such as ø and ß are folded, so "aczel" finds "Aczél" and "jorgen" finds "Jørgen". It works
    // together with the project and role filters, which reload the page, and is left out of the URL.
    function setUpNameSearch() {
        const input = document.getElementById('name-search');
        const count = document.getElementById('contributor-count');
        const list = document.getElementById('contributor-list');
        if (!input || !list) return;
        // Letters that are not a base letter plus an accent (ø, æ, ß, ł, ...) are spelled out, so "jorgen" finds "Jørgen".
        const letters = { 'ø': 'o', 'æ': 'ae', 'œ': 'oe', 'ß': 'ss', 'ł': 'l', 'đ': 'd', 'ð': 'd', 'þ': 'th', 'ı': 'i' };
        const plain = text => text.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '')
            .replace(/[øæœßłđðþı]/g, c => letters[c]).replace(/\s+/g, ' ').trim();
        const groups = [...list.querySelectorAll('.contributor-group')].map(group => {
            const name = group.querySelector('.contributor-name');
            return { group, name: plain(name ? name.textContent : '') };
        });
        const letterIndex = document.querySelector('.contributor-az');
        const filtered = Boolean(getURLParams().project || getURLParams().role);
        const shown = ({ group }) => group.style.display !== 'none' && !group.classList.contains('is-name-hidden');
        const people = n => `${n} contributor${n === 1 ? '' : 's'}`;
        const update = () => {
            const query = plain(input.value);
            groups.forEach(entry => entry.group.classList.toggle('is-name-hidden', Boolean(query) && !entry.name.includes(query)));
            list.querySelectorAll('.contributor-letter').forEach(letter => {
                letter.hidden = ![...letter.querySelectorAll('.contributor-group')].some(group => shown({ group }));
            });
            if (letterIndex) letterIndex.hidden = filtered || Boolean(query);
            const total = groups.filter(entry => entry.group.style.display !== 'none').length;
            const matches = groups.filter(shown).length;
            // Filtered, the heading above the list gives the count, so the line waits for a name.
            count.hidden = filtered && !query && Boolean(document.getElementById('contributor-results'));
            count.textContent = !query ? `${people(total)}${filtered ? ' match the filter' : ''}`
                : matches ? `${matches} of ${people(total)} match \u201c${input.value.trim()}\u201d`
                : `No contributor\u2019s name contains \u201c${input.value.trim()}\u201d`;
        };
        input.closest('.filter-field').hidden = false;
        input.addEventListener('input', update);
        update();
    }

    // Initialize on page load
    document.addEventListener('DOMContentLoaded', function() {
        // The letter index stays at the top of the screen; a letter jumped to stops below it, however many rows it takes.
        const letterIndex = document.querySelector('.contributor-az');
        if (letterIndex && window.ResizeObserver) {
            new ResizeObserver(() => document.documentElement.style.setProperty('--contributor-az', letterIndex.offsetHeight + 'px')).observe(letterIndex);
        }
        // On a phone the letters scroll sideways; the fade at the right edge goes once the last letter is in view.
        if (letterIndex) {
            const markEnd = () => letterIndex.classList.toggle('is-at-end', letterIndex.scrollLeft + letterIndex.clientWidth >= letterIndex.scrollWidth - 2);
            letterIndex.addEventListener('scroll', markEnd, { passive: true });
            window.addEventListener('resize', markEnd);
            markEnd();
        }

        // The board of projects: on a phone the first six show until "Show all"; the first time it is in view, each bar
        // grows to its length (sections.css), unless the visitor prefers reduced motion.
        const board = document.querySelector('.project-board');
        const tiles = board && board.querySelector('.project-tiles');
        if (tiles) {
            const items = [...tiles.children];
            items.forEach((item, i) => item.style.setProperty('--i', i));
            const chosen = items.findIndex(item => item.querySelector('a').dataset.project === normalize(getURLParams().project || ''));
            if (items.length > 6 && chosen < 6) {
                tiles.classList.add('is-short');
                const more = document.createElement('button');
                more.type = 'button';
                more.className = 'project-board-more';
                more.textContent = `Show all ${items.length} projects`;
                more.addEventListener('click', () => {
                    tiles.classList.remove('is-short');
                    more.hidden = true;
                    items[6].querySelector('a').focus();
                });
                tiles.after(more);
            }
            if ('IntersectionObserver' in window && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
                board.classList.add('is-previewing');
                const seen = new IntersectionObserver(entries => {
                    if (!entries.some(entry => entry.isIntersecting)) return;
                    seen.disconnect();
                    requestAnimationFrame(() => requestAnimationFrame(() => board.classList.add('is-seen')));
                    setTimeout(() => board.classList.remove('is-previewing', 'is-seen'), 400 + items.length * 25 + 200);
                }, { threshold: 0.25 });
                seen.observe(tiles);
            }
        }

        olderPage = Boolean(document.getElementById('filter-results'));

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
        setUpNameSearch();
    });
})();