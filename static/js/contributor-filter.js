(function() {
    'use strict';

    // A page generated from the older template shows filter results in a block in the filter panel; it is noted
    // before collapse-filter mode takes the panel away, so that page keeps its old behaviour in both modes.
    let olderPage = false;

    const FOLD_LETTERS = { 'ø': 'o', 'æ': 'ae', 'œ': 'oe', 'ß': 'ss', 'ł': 'l', 'đ': 'd', 'ð': 'd', 'þ': 'th', 'ı': 'i' };

    // Fold accents, case and non-decomposing Latin letters for search matching.
    function plain(text) {
        if (!text) return '';
        return String(text)
            .toLowerCase()
            .normalize('NFD')
            .replace(/\p{M}/gu, '')
            .replace(/[øæœßłđðþı]/g, c => FOLD_LETTERS[c])
            .replace(/\s+/g, ' ')
            .trim();
    }

    // Normalize text for comparison (matches tenzing.py's normalize_for_attribute).
    function normalize(text) {
        if (!text) return '';
        return String(text)
            .toLowerCase()
            .trim()
            .replace(/&/g, 'and')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    }

    // Format text for display when filterData has no matching label.
    function formatForDisplay(text) {
        if (!text) return '';
        return text
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
            .replace(/\band\b/i, '&');
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Parse URL parameters (supports single ?role=a, comma-separated ?role=a,b, and repeated ?role=a&role=b).
    function getURLParams() {
        const params = new URLSearchParams(window.location.search);
        const rawProject = params.get('project');
        const roleValues = [];
        params.getAll('role').forEach(entry => {
            entry.split(',').forEach(part => {
                const norm = normalize(part);
                if (norm && !roleValues.includes(norm)) roleValues.push(norm);
            });
        });
        return {
            project: rawProject ? normalize(rawProject) : '',
            roles: roleValues,
            collapseFilter: params.has('collapse-filter')
        };
    }

    function formatListOr(items) {
        if (items.length === 0) return '';
        if (items.length === 1) return items[0];
        if (items.length === 2) return `${items[0]} or ${items[1]}`;
        return `${items.slice(0, -1).join(', ')} or ${items[items.length - 1]}`;
    }

    // Deduplicate filterData arrays by normalized value so older and newer pages stay consistent.
    function dedupeItems(items) {
        const seen = new Map();
        (items || []).forEach(item => {
            if (!item || !item.value) return;
            const value = normalize(item.value);
            const label = String(item.label || '').trim();
            if (!value || !label) return;
            if (!seen.has(value)) {
                seen.set(value, { value, label, plain: plain(label) });
            }
        });
        return [...seen.values()];
    }

    document.addEventListener('DOMContentLoaded', function() {
        const contributorList = document.getElementById('contributor-list');
        if (!contributorList) return;

        // Sticky A–Z jump bar offset & mobile scroll-end fade.
        const letterIndex = document.querySelector('.contributor-az');
        let markAzEnd = () => {};
        if (letterIndex && window.ResizeObserver) {
            new ResizeObserver(() => {
                document.documentElement.style.setProperty('--contributor-az', letterIndex.offsetHeight + 'px');
            }).observe(letterIndex);
        }
        if (letterIndex) {
            markAzEnd = () => {
                letterIndex.classList.toggle(
                    'is-at-end',
                    letterIndex.scrollLeft + letterIndex.clientWidth >= letterIndex.scrollWidth - 2
                );
            };
            letterIndex.addEventListener('scroll', markAzEnd, { passive: true });
            window.addEventListener('resize', markAzEnd);
            markAzEnd();
        }

        // Ranked board of the largest projects.
        const board = document.querySelector('.project-board');
        const tiles = board && board.querySelector('.project-tiles');
        const initialParams = getURLParams();
        if (tiles) {
            const items = [...tiles.children];
            items.forEach((item, i) => item.style.setProperty('--i', i));
            const chosen = items.findIndex(item => item.querySelector('a').dataset.project === initialParams.project);
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

        // Index all contributor groups and contributions once for fast live filtering and counts.
        const groups = [...contributorList.querySelectorAll('.contributor-group')].map(group => {
            const nameEl = group.querySelector('.contributor-name') || group.querySelector('strong');
            const nameText = nameEl ? nameEl.textContent : '';
            const items = [...group.querySelectorAll('.contribution')].map(el => {
                // Wrap bare text project names so hiding/restoring them in single-project view is symmetric.
                const projectNodes = [];
                [...el.childNodes].forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE && !node.classList.contains('contribution-roles')) {
                        projectNodes.push(node);
                    } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
                        const span = document.createElement('span');
                        span.className = 'contribution-project';
                        node.replaceWith(span);
                        span.append(node);
                        projectNodes.push(span);
                    }
                });
                const projects = (el.getAttribute('data-projects') || '')
                    .split(',').map(p => normalize(p)).filter(Boolean);
                const roles = (el.getAttribute('data-roles') || '')
                    .split(',').map(r => normalize(r)).filter(Boolean);
                return { el, projects, roles, projectNodes };
            });
            const more = group.querySelector('.contributions-more');
            const moreSummary = more ? more.querySelector('summary') : null;
            const moreItems = more ? items.filter(item => more.contains(item.el)) : [];
            const topList = group.querySelector(':scope > .contributions-list');
            return {
                group,
                name: plain(nameText),
                items,
                more,
                moreSummary,
                moreItems,
                topList
            };
        });

        const letterSections = [...contributorList.querySelectorAll('.contributor-letter')].map(section => ({
            section,
            id: section.id,
            groups: groups.filter(g => section.contains(g.group))
        }));
        const azLinks = letterIndex
            ? [...letterIndex.querySelectorAll('a[href^="#"]')].map(link => ({
                link,
                targetId: link.getAttribute('href').slice(1)
            }))
            : [];

        // Build canonical project and role lists from window.filterData.
        const projects = dedupeItems(window.filterData && window.filterData.projects);
        const roles = dedupeItems(window.filterData && window.filterData.roles);
        const projectMap = new Map(projects.map(p => [p.value, p]));
        const roleMap = new Map(roles.map(r => [r.value, r]));

        const labelFor = (kind, value) => {
            const norm = normalize(value);
            const map = kind === 'projects' ? projectMap : roleMap;
            return map.has(norm) ? map.get(norm).label : formatForDisplay(norm);
        };

        // Mutable filter state.
        const state = {
            project: initialParams.project,
            roles: initialParams.roles.slice(),
            nameQuery: '',
            collapseFilter: initialParams.collapseFilter
        };

        // Handle collapsed filter mode (?collapse-filter).
        if (state.collapseFilter) {
            const filterMenu = document.getElementById('filter-menu');
            if (filterMenu) {
                const collapsedView = document.createElement('div');
                collapsedView.id = 'filter-collapsed';
                collapsedView.innerHTML = `<a href="${escapeHtml(window.location.pathname)}">\u2190 Show contributions to all projects</a>`;
                filterMenu.parentNode.replaceChild(collapsedView, filterMenu);
            }
            if (board) board.hidden = true;
        }

        // UI references (populated when not in collapse-filter mode).
        let projectInput = null;
        let projectClearBtn = null;
        let projectWrap = null;
        let projectStatus = null;
        let projectListbox = null;
        let projectActiveIndex = -1;
        let projectVisibleMatches = [];

        let roleTrigger = null;
        let roleTriggerText = null;
        let rolePanel = null;
        let roleClearBtn = null;
        const roleCheckboxes = new Map();
        const roleCountEls = new Map();

        let nameInput = null;
        let countEl = null;
        let liveStatusEl = null;
        let activeFiltersEl = null;
        let wasFacetFiltered = false;
        let initialized = false;

        // Compute live contributor counts for projects (given active roles + name) and roles (given active project + name).
        function computeCounts() {
            const nameQ = plain(state.nameQuery);
            const projectCounts = new Map();
            const roleCounts = new Map();

            groups.forEach(entry => {
                if (nameQ && !entry.name.includes(nameQ)) return;
                const seenProjects = new Set();
                const seenRoles = new Set();
                entry.items.forEach(item => {
                    const roleOk = !state.roles.length || item.roles.some(r => state.roles.includes(r));
                    const projectOk = !state.project || item.projects.includes(state.project);
                    if (roleOk) {
                        item.projects.forEach(p => seenProjects.add(p));
                    }
                    if (projectOk) {
                        item.roles.forEach(r => seenRoles.add(r));
                    }
                });
                seenProjects.forEach(p => projectCounts.set(p, (projectCounts.get(p) || 0) + 1));
                seenRoles.forEach(r => roleCounts.set(r, (roleCounts.get(r) || 0) + 1));
            });

            return { projectCounts, roleCounts };
        }

        function writeURL(push) {
            if (state.collapseFilter) return;
            const params = new URLSearchParams(window.location.search);
            params.delete('project');
            params.delete('role');
            if (state.project) params.set('project', state.project);
            if (state.roles.length) params.set('role', state.roles.join(','));
            const query = params.toString();
            const url = query ? `${window.location.pathname}?${query}` : window.location.pathname;
            if (url === window.location.pathname + window.location.search) return;
            if (push) {
                history.pushState(null, '', url);
            } else {
                history.replaceState(null, '', url);
            }
        }

        function rankProjectMatch(project, tokens, count) {
            if (!tokens.length) return [0, -count, project.plain];
            const text = project.plain;
            const full = tokens.join(' ');
            let tier = 3;
            if (text === full) tier = 0;
            else if (text.startsWith(full)) tier = 1;
            else if (tokens.every(t => text.startsWith(t) || text.includes(' ' + t) || text.includes('-' + t))) tier = 2;
            return [tier, -count, project.plain];
        }

        function renderProjectOptions(queryText, counts) {
            if (!projectListbox || !projectWrap || !projectStatus) return;
            const tokens = plain(queryText).split(' ').filter(Boolean);
            const matched = projects
                .filter(p => tokens.every(t => p.plain.includes(t)))
                .map(p => ({ project: p, count: counts.get(p.value) || 0 }))
                .sort((a, b) => {
                    const ra = rankProjectMatch(a.project, tokens, a.count);
                    const rb = rankProjectMatch(b.project, tokens, b.count);
                    if (ra[0] !== rb[0]) return ra[0] - rb[0];
                    if (ra[1] !== rb[1]) return ra[1] - rb[1];
                    return ra[2].localeCompare(rb[2]);
                });

            projectVisibleMatches = matched;
            projectListbox.innerHTML = '';

            if (!matched.length) {
                projectListbox.hidden = true;
                projectStatus.hidden = false;
                projectStatus.textContent = `No projects match \u201c${queryText.trim()}\u201d`;
                projectActiveIndex = -1;
                if (projectInput) projectInput.removeAttribute('aria-activedescendant');
                return;
            }

            projectListbox.hidden = false;
            if (tokens.length) {
                projectStatus.hidden = false;
                projectStatus.textContent = `${matched.length} matching project${matched.length === 1 ? '' : 's'}`;
            } else {
                projectStatus.hidden = true;
                projectStatus.textContent = '';
            }

            const frag = document.createDocumentFragment();
            matched.forEach((entry, index) => {
                const li = document.createElement('li');
                li.id = `project-opt-${index}`;
                li.setAttribute('role', 'option');
                li.dataset.value = entry.project.value;
                const isSelected = entry.project.value === state.project;
                li.setAttribute('aria-selected', isSelected ? 'true' : 'false');
                if (isSelected) li.classList.add('is-selected');
                if (entry.count === 0) li.classList.add('is-zero');

                const nameSpan = document.createElement('span');
                nameSpan.className = 'project-opt-name';
                nameSpan.textContent = entry.project.label;

                const countSpan = document.createElement('span');
                countSpan.className = 'project-opt-count';
                countSpan.textContent = String(entry.count);
                const sr = document.createElement('span');
                sr.className = 'visually-hidden';
                sr.textContent = ` contributor${entry.count === 1 ? '' : 's'}`;
                countSpan.append(sr);

                li.append(nameSpan, countSpan);
                li.addEventListener('mousedown', e => {
                    // Keep focus in the combobox input until selection completes.
                    e.preventDefault();
                });
                li.addEventListener('click', () => {
                    selectProject(entry.project.value, true);
                });
                frag.append(li);
            });
            projectListbox.append(frag);

            // Reset highlight cleanly.
            const selectedIdx = matched.findIndex(m => m.project.value === state.project);
            projectActiveIndex = tokens.length ? 0 : selectedIdx;
            updateActiveProjectOption();
        }

        function updateActiveProjectOption() {
            if (!projectListbox || !projectInput) return;
            const opts = projectListbox.children;
            for (let i = 0; i < opts.length; i++) {
                opts[i].classList.toggle('is-active', i === projectActiveIndex);
            }
            if (projectActiveIndex >= 0 && opts[projectActiveIndex]) {
                projectInput.setAttribute('aria-activedescendant', opts[projectActiveIndex].id);
                opts[projectActiveIndex].scrollIntoView({ block: 'nearest' });
            } else {
                projectInput.removeAttribute('aria-activedescendant');
            }
        }

        function openProjectListbox(filterText) {
            if (!projectWrap || !projectInput) return;
            closeRolePanel(false);
            const { projectCounts } = computeCounts();
            renderProjectOptions(filterText, projectCounts);
            projectWrap.hidden = false;
            projectInput.setAttribute('aria-expanded', 'true');
        }

        function closeProjectListbox(restoreLabel) {
            if (!projectWrap || !projectInput) return;
            projectWrap.hidden = true;
            projectInput.setAttribute('aria-expanded', 'false');
            projectInput.removeAttribute('aria-activedescendant');
            projectActiveIndex = -1;
            if (restoreLabel) {
                projectInput.value = state.project ? labelFor('projects', state.project) : '';
            }
        }

        function selectProject(value, pushUrl) {
            state.project = value ? normalize(value) : '';
            if (projectInput) {
                projectInput.value = state.project ? labelFor('projects', state.project) : '';
            }
            closeProjectListbox(false);
            writeURL(Boolean(pushUrl));
            applyAll();
        }

        function openRolePanel() {
            if (!rolePanel || !roleTrigger) return;
            closeProjectListbox(true);
            rolePanel.hidden = false;
            roleTrigger.setAttribute('aria-expanded', 'true');
        }

        function closeRolePanel(returnFocus) {
            if (!rolePanel || !roleTrigger || rolePanel.hidden) return;
            rolePanel.hidden = true;
            roleTrigger.setAttribute('aria-expanded', 'false');
            if (returnFocus) roleTrigger.focus();
        }

        function syncRoleUI(roleCounts) {
            if (!roleTriggerText) return;
            roleCheckboxes.forEach((cb, value) => {
                cb.checked = state.roles.includes(value);
            });
            roleCountEls.forEach((el, value) => {
                const n = roleCounts.get(value) || 0;
                el.textContent = String(n);
                const row = el.closest('li');
                if (row) row.classList.toggle('is-zero', n === 0 && !state.roles.includes(value));
            });
            if (state.roles.length === 0) {
                roleTriggerText.textContent = 'All roles';
            } else if (state.roles.length === 1) {
                roleTriggerText.textContent = labelFor('roles', state.roles[0]);
            } else {
                roleTriggerText.textContent = `${state.roles.length} roles selected`;
            }
            if (roleClearBtn) roleClearBtn.hidden = state.roles.length === 0;
        }

        function syncProjectUI() {
            if (!projectInput) return;
            if (document.activeElement !== projectInput) {
                projectInput.value = state.project ? labelFor('projects', state.project) : '';
            }
            if (projectClearBtn) {
                projectClearBtn.hidden = !state.project && !projectInput.value.trim();
            }
        }

        function renderActiveChips() {
            if (!activeFiltersEl) return;
            activeFiltersEl.innerHTML = '';
            // Older generated pages already show active filters inside #filter-results.
            if (olderPage) {
                activeFiltersEl.hidden = true;
                return;
            }
            const hasProject = Boolean(state.project);
            const hasRoles = state.roles.length > 0;
            if (!hasProject && !hasRoles) {
                activeFiltersEl.hidden = true;
                return;
            }
            activeFiltersEl.hidden = false;

            const addChip = (label, ariaLabel, onRemove) => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'contributor-active-chip';
                btn.setAttribute('aria-label', ariaLabel);
                btn.textContent = label;
                btn.addEventListener('click', onRemove);
                activeFiltersEl.append(btn);
            };

            if (hasProject) {
                const pLabel = labelFor('projects', state.project);
                addChip(pLabel, `Remove project filter: ${pLabel}`, () => {
                    selectProject('', true);
                    if (projectInput) projectInput.focus();
                });
            }
            state.roles.forEach(roleVal => {
                const rLabel = labelFor('roles', roleVal);
                addChip(rLabel, `Remove role filter: ${rLabel}`, () => {
                    state.roles = state.roles.filter(r => r !== roleVal);
                    writeURL(true);
                    applyAll();
                    if (roleTrigger) roleTrigger.focus();
                });
            });
            if ((hasProject ? 1 : 0) + state.roles.length >= 2) {
                const clearAll = document.createElement('button');
                clearAll.type = 'button';
                clearAll.className = 'contributor-clear-all';
                clearAll.textContent = 'Clear all';
                clearAll.addEventListener('click', () => clearAllFilters(true));
                activeFiltersEl.append(clearAll);
            }
        }

        function clearAllFilters(pushUrl) {
            state.project = '';
            state.roles = [];
            state.nameQuery = '';
            if (nameInput) nameInput.value = '';
            if (projectInput) projectInput.value = '';
            closeProjectListbox(false);
            closeRolePanel(false);
            writeURL(Boolean(pushUrl));
            applyAll();
        }

        // Set up upgraded interactive controls inside #filter-menu.
        if (!state.collapseFilter) {
            const filterMenu = document.getElementById('filter-menu');
            const projectSelect = document.getElementById('project-select');
            const roleSelect = document.getElementById('role-select');
            const applyButton = document.getElementById('apply-filter');
            const clearButton = document.getElementById('clear-filters');
            nameInput = document.getElementById('name-search');
            countEl = document.getElementById('contributor-count');
            activeFiltersEl = document.getElementById('active-contributor-filters');

            // Hide the submit button because all filters now apply live.
            if (applyButton) {
                const applyField = applyButton.closest('.filter-field');
                if (applyField) applyField.hidden = true;
                else applyButton.hidden = true;
            }
            if (clearButton) {
                clearButton.addEventListener('click', () => clearAllFilters(true));
            }

            // Always keep an unhidden visually-hidden live region so screen readers hear every filter update.
            if (filterMenu) {
                if (countEl) countEl.removeAttribute('role');
                liveStatusEl = document.createElement('p');
                liveStatusEl.id = 'contributor-live-status';
                liveStatusEl.className = 'visually-hidden';
                liveStatusEl.setAttribute('role', 'status');
                liveStatusEl.setAttribute('aria-live', 'polite');
                filterMenu.append(liveStatusEl);
            }
            if (filterMenu && !activeFiltersEl && !olderPage) {
                activeFiltersEl = document.createElement('div');
                activeFiltersEl.id = 'active-contributor-filters';
                activeFiltersEl.className = 'contributor-active-filters';
                activeFiltersEl.hidden = true;
                const grid = filterMenu.querySelector('.filter-grid');
                if (grid) grid.after(activeFiltersEl);
            }
            if (filterMenu && !countEl && !olderPage) {
                countEl = document.createElement('p');
                countEl.id = 'contributor-count';
                countEl.className = 'contributor-count';
                filterMenu.append(countEl);
            }

            // Upgrade #project-select into a live searchable combobox.
            if (projectSelect) {
                const field = projectSelect.closest('.filter-field') || projectSelect.parentElement;
                field.classList.add('filter-project');
                const label = field.querySelector('label[for="project-select"]');
                if (label) {
                    label.setAttribute('for', 'project-search');
                    label.textContent = 'Project';
                }

                const combo = document.createElement('div');
                combo.className = 'project-combobox';

                projectInput = document.createElement('input');
                projectInput.id = 'project-search';
                projectInput.type = 'text';
                projectInput.setAttribute('role', 'combobox');
                projectInput.setAttribute('autocomplete', 'off');
                projectInput.setAttribute('spellcheck', 'false');
                projectInput.setAttribute('aria-autocomplete', 'list');
                projectInput.setAttribute('aria-expanded', 'false');
                projectInput.setAttribute('aria-controls', 'project-listbox');
                projectInput.placeholder = projects.length ? `Search ${projects.length} projects` : 'Search projects';

                projectClearBtn = document.createElement('button');
                projectClearBtn.type = 'button';
                projectClearBtn.id = 'project-clear';
                projectClearBtn.className = 'combobox-clear';
                projectClearBtn.setAttribute('aria-label', 'Clear project filter');
                projectClearBtn.textContent = '\u00d7';
                projectClearBtn.hidden = true;

                projectWrap = document.createElement('div');
                projectWrap.className = 'project-listbox-wrap';
                projectWrap.hidden = true;

                projectStatus = document.createElement('p');
                projectStatus.className = 'project-listbox-status';
                projectStatus.setAttribute('aria-live', 'polite');
                projectStatus.hidden = true;

                projectListbox = document.createElement('ul');
                projectListbox.id = 'project-listbox';
                projectListbox.className = 'project-listbox';
                projectListbox.setAttribute('role', 'listbox');
                projectListbox.setAttribute('aria-label', 'Projects');
                projectListbox.tabIndex = -1;

                projectWrap.append(projectStatus, projectListbox);
                combo.append(projectInput, projectClearBtn, projectWrap);
                projectSelect.replaceWith(combo);

                // Open on click, typing or ArrowDown (not plain Tab focus) so keyboard users can tab past cleanly.
                projectInput.addEventListener('click', () => {
                    if (projectWrap.hidden) {
                        const currentLabel = state.project ? labelFor('projects', state.project) : '';
                        const query = projectInput.value.trim() === currentLabel ? '' : projectInput.value;
                        openProjectListbox(query);
                    }
                });
                combo.addEventListener('focusout', e => {
                    if (!projectWrap.hidden && (!e.relatedTarget || !combo.contains(e.relatedTarget))) {
                        closeProjectListbox(true);
                    }
                });
                projectInput.addEventListener('input', () => {
                    const val = projectInput.value;
                    if (projectClearBtn) projectClearBtn.hidden = !state.project && !val.trim();
                    if (!val.trim() && state.project) {
                        state.project = '';
                        writeURL(false);
                        applyAll();
                    }
                    openProjectListbox(val);
                });
                projectInput.addEventListener('keydown', e => {
                    if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        if (projectWrap.hidden) {
                            openProjectListbox(projectInput.value);
                        } else if (projectVisibleMatches.length) {
                            projectActiveIndex = Math.min(projectActiveIndex + 1, projectVisibleMatches.length - 1);
                            updateActiveProjectOption();
                        }
                    } else if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        if (!projectWrap.hidden && projectVisibleMatches.length) {
                            projectActiveIndex = Math.max(projectActiveIndex - 1, 0);
                            updateActiveProjectOption();
                        }
                    } else if (e.key === 'Enter') {
                        if (!projectWrap.hidden && projectVisibleMatches.length) {
                            e.preventDefault();
                            const idx = projectActiveIndex >= 0 ? projectActiveIndex : (projectVisibleMatches.length === 1 ? 0 : -1);
                            if (idx >= 0) {
                                selectProject(projectVisibleMatches[idx].project.value, true);
                            }
                        }
                    } else if (e.key === 'Escape') {
                        if (!projectWrap.hidden) {
                            e.preventDefault();
                            closeProjectListbox(true);
                        } else if (state.project || projectInput.value) {
                            e.preventDefault();
                            selectProject('', true);
                        }
                    }
                });
                projectClearBtn.addEventListener('click', () => {
                    selectProject('', true);
                    projectInput.focus();
                });
            }

            // Upgrade #role-select into a multi-role checklist menu.
            if (roleSelect) {
                const field = roleSelect.closest('.filter-field') || roleSelect.parentElement;
                field.classList.add('filter-role');
                const origLabel = field.querySelector('label[for="role-select"]');
                const roleLabelEl = document.createElement('span');
                roleLabelEl.id = 'role-filter-label';
                roleLabelEl.className = 'filter-field-label';
                roleLabelEl.textContent = 'Role';
                if (origLabel) origLabel.replaceWith(roleLabelEl);
                else field.prepend(roleLabelEl);

                const dropdown = document.createElement('div');
                dropdown.className = 'role-dropdown';

                roleTrigger = document.createElement('button');
                roleTrigger.id = 'role-trigger';
                roleTrigger.type = 'button';
                roleTrigger.className = 'role-trigger';
                roleTrigger.setAttribute('aria-labelledby', 'role-filter-label role-trigger-text');
                roleTrigger.setAttribute('aria-expanded', 'false');
                roleTrigger.setAttribute('aria-controls', 'role-panel');

                roleTriggerText = document.createElement('span');
                roleTriggerText.id = 'role-trigger-text';
                roleTriggerText.textContent = 'All roles';
                roleTrigger.append(roleTriggerText);

                rolePanel = document.createElement('div');
                rolePanel.id = 'role-panel';
                rolePanel.className = 'role-panel';
                rolePanel.setAttribute('role', 'group');
                rolePanel.setAttribute('aria-labelledby', 'role-filter-label');
                rolePanel.hidden = true;

                const panelHead = document.createElement('div');
                panelHead.className = 'role-panel-head';
                const hint = document.createElement('span');
                hint.className = 'role-panel-hint';
                hint.textContent = 'Select one or more';
                roleClearBtn = document.createElement('button');
                roleClearBtn.type = 'button';
                roleClearBtn.id = 'role-clear';
                roleClearBtn.className = 'role-clear-btn';
                roleClearBtn.textContent = 'Clear';
                roleClearBtn.hidden = true;
                roleClearBtn.addEventListener('click', () => {
                    state.roles = [];
                    writeURL(true);
                    applyAll();
                    roleTrigger.focus();
                });
                panelHead.append(hint, roleClearBtn);

                const list = document.createElement('ul');
                list.className = 'role-options';
                roles.forEach(role => {
                    const li = document.createElement('li');
                    const label = document.createElement('label');
                    label.className = 'role-option';

                    const cb = document.createElement('input');
                    cb.type = 'checkbox';
                    cb.value = role.value;
                    cb.addEventListener('change', () => {
                        if (cb.checked) {
                            if (!state.roles.includes(role.value)) state.roles.push(role.value);
                        } else {
                            state.roles = state.roles.filter(r => r !== role.value);
                        }
                        writeURL(true);
                        applyAll();
                    });

                    const nameSpan = document.createElement('span');
                    nameSpan.className = 'role-option-name';
                    nameSpan.textContent = role.label;

                    const countSpan = document.createElement('span');
                    countSpan.className = 'role-option-count';
                    countSpan.textContent = '0';

                    roleCheckboxes.set(role.value, cb);
                    roleCountEls.set(role.value, countSpan);

                    label.append(cb, nameSpan, countSpan);
                    li.append(label);
                    list.append(li);
                });

                rolePanel.append(panelHead, list);
                dropdown.append(roleTrigger, rolePanel);
                roleSelect.replaceWith(dropdown);

                roleTrigger.addEventListener('click', () => {
                    if (rolePanel.hidden) openRolePanel();
                    else closeRolePanel(false);
                });
                rolePanel.addEventListener('keydown', e => {
                    if (e.key === 'Escape') {
                        e.preventDefault();
                        closeRolePanel(true);
                    }
                });
                roleTrigger.addEventListener('keydown', e => {
                    if (e.key === 'Escape' && !rolePanel.hidden) {
                        e.preventDefault();
                        closeRolePanel(true);
                    }
                });
                dropdown.addEventListener('focusout', e => {
                    if (!rolePanel.hidden && (!e.relatedTarget || !dropdown.contains(e.relatedTarget))) {
                        closeRolePanel(false);
                    }
                });
            }

            // Close open dropdowns when clicking outside.
            document.addEventListener('click', e => {
                if (projectWrap && !projectWrap.hidden && !e.target.closest('.project-combobox')) {
                    closeProjectListbox(true);
                }
                if (rolePanel && !rolePanel.hidden && !e.target.closest('.role-dropdown')) {
                    closeRolePanel(false);
                }
            });

            // Name search field.
            if (nameInput) {
                const nameField = nameInput.closest('.filter-field');
                if (nameField) nameField.hidden = false;
                nameInput.addEventListener('input', () => {
                    state.nameQuery = nameInput.value;
                    applyAll();
                });
            }
        }

        // Ranked project board links filter live without reloading the page.
        if (tiles) {
            tiles.querySelectorAll('a[data-project]').forEach(tile => {
                tile.addEventListener('click', e => {
                    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                    e.preventDefault();
                    const clicked = normalize(tile.dataset.project);
                    const nextProject = state.project === clicked ? '' : clicked;
                    selectProject(nextProject, true);
                    if (nextProject) {
                        const resultEl = document.getElementById('contributor-results');
                        if (resultEl) resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                });
            });
        }

        // Browser Back / Forward navigation keeps filters synced with the URL.
        window.addEventListener('popstate', () => {
            const params = getURLParams();
            state.project = params.project;
            state.roles = params.roles;
            applyAll();
        });

        // Apply all active filters (project, roles, name) and update rows, board, A–Z bar, heading, and counts.
        function applyAll() {
            const hasProject = Boolean(state.project);
            const hasRoles = state.roles.length > 0;
            const hasFacetFilter = hasProject || hasRoles;
            const nameQ = plain(state.nameQuery);
            const hasNameQuery = Boolean(nameQ);

            // Sync project board active tile state.
            document.querySelectorAll('.project-tiles a[data-project]').forEach(tile => {
                if (hasProject && normalize(tile.dataset.project) === state.project) {
                    tile.setAttribute('aria-current', 'true');
                } else {
                    tile.removeAttribute('aria-current');
                }
            });

            // Toggle project-filtered display mode (hide project names inside rows when filtered to one project).
            contributorList.classList.toggle('is-project-filtered', hasProject && !olderPage);

            let facetMatches = 0;
            let visibleMatches = 0;

            groups.forEach(entry => {
                let visibleContribs = 0;

                entry.items.forEach(item => {
                    let matches = true;
                    if (hasProject && !item.projects.includes(state.project)) matches = false;
                    if (hasRoles && matches && !item.roles.some(r => state.roles.includes(r))) matches = false;

                    item.el.style.display = matches ? '' : 'none';
                    if (matches) visibleContribs++;

                    // Show/hide project title inside each row symmetrically.
                    if (!olderPage) {
                        item.projectNodes.forEach(node => {
                            node.hidden = hasProject;
                        });
                    }
                });

                const matchesFacets = visibleContribs > 0;
                const matchesName = !hasNameQuery || entry.name.includes(nameQ);
                if (matchesFacets) facetMatches++;

                entry.group.style.display = matchesFacets ? '' : 'none';
                entry.group.classList.toggle('is-name-hidden', matchesFacets && !matchesName);
                if (matchesFacets && matchesName) visibleMatches++;

                // Manage "+N more projects" disclosures symmetrically without collapsing user-opened rows on name typing.
                if (entry.more) {
                    const moreList = entry.more.querySelector('.contributions-list');
                    if (hasFacetFilter) {
                        const moreVisible = entry.moreItems.filter(item => item.el.style.display !== 'none').length;
                        const hasVisibleMore = moreVisible > 0;
                        entry.more.open = hasVisibleMore;
                        if (entry.moreSummary) entry.moreSummary.hidden = true;
                        entry.more.hidden = !hasVisibleMore;
                        if (moreList) moreList.classList.toggle('is-single-visible', moreVisible === 1);
                    } else if (wasFacetFiltered) {
                        entry.more.hidden = false;
                        if (entry.moreSummary) entry.moreSummary.hidden = false;
                        entry.more.open = false;
                        if (moreList) moreList.classList.remove('is-single-visible');
                    }
                }

                // Hide an empty top list when all matches sit inside ".contributions-more", so the row stays
                // baseline-aligned with the contributor's name, and mark single-visible lists for 2-column alignment.
                if (entry.topList) {
                    const topVisible = [...entry.topList.children].filter(el => el.style.display !== 'none').length;
                    entry.topList.hidden = hasFacetFilter && topVisible === 0;
                    entry.topList.classList.toggle('is-single-visible', topVisible === 1);
                }
            });

            // Update letter sections and A–Z jump bar.
            const visibleLetters = new Set();
            letterSections.forEach(({ section, id, groups: sectionGroups }) => {
                const anyShown = sectionGroups.some(
                    g => g.group.style.display !== 'none' && !g.group.classList.contains('is-name-hidden')
                );
                section.hidden = !anyShown;
                if (anyShown) visibleLetters.add(id);
            });

            if (letterIndex) {
                const showAz = (!hasFacetFilter && !hasNameQuery) || (visibleMatches > 20 && visibleLetters.size > 1);
                letterIndex.hidden = !showAz;
                azLinks.forEach(({ link, targetId }) => {
                    link.hidden = (hasFacetFilter || hasNameQuery) && !visibleLetters.has(targetId);
                });
                markAzEnd();
            }

            // Update counts, active chips, combobox & role checklist.
            const { projectCounts, roleCounts } = computeCounts();
            syncProjectUI();
            syncRoleUI(roleCounts);
            renderActiveChips();
            if (projectWrap && !projectWrap.hidden && projectInput) {
                renderProjectOptions(projectInput.value, projectCounts);
            }

            const peopleText = n => `${n} contributor${n === 1 ? '' : 's'}`;

            // Older generated page uses #filter-results / #filter-info inside #filter-menu.
            const filterResults = document.getElementById('filter-results');
            const filterInfo = document.getElementById('filter-info');
            if (olderPage && filterResults && filterInfo) {
                if (!hasFacetFilter) {
                    filterResults.style.display = 'none';
                    filterInfo.innerHTML = '';
                } else {
                    filterResults.style.display = 'block';
                    const lines = [];
                    if (hasProject) lines.push(`<strong>Project:</strong> ${escapeHtml(labelFor('projects', state.project))}`);
                    if (hasRoles) {
                        const rLabels = state.roles.map(r => labelFor('roles', r));
                        lines.push(`<strong>Role${rLabels.length > 1 ? 's' : ''}:</strong> ${escapeHtml(rLabels.join(', '))}`);
                    }
                    lines.push(`<strong>Matches:</strong> ${peopleText(visibleMatches)}`);
                    filterInfo.innerHTML = lines.join('<br>');
                }
            }

            // Newer generated page shows #contributor-results heading above the list when filtered by project or role.
            let resultEl = document.getElementById('contributor-results');
            if (!olderPage) {
                if (hasFacetFilter) {
                    if (!resultEl) {
                        resultEl = document.createElement('div');
                        resultEl.className = 'contributor-result';
                        resultEl.id = 'contributor-results';
                        const before = letterIndex || contributorList;
                        before.parentNode.insertBefore(resultEl, before);
                    }
                    const roleLabels = state.roles.map(r => labelFor('roles', r));
                    const headingText = peopleText(visibleMatches)
                        + (hasProject ? ` to ${labelFor('projects', state.project)}` : '')
                        + (roleLabels.length ? ` as ${formatListOr(roleLabels)}` : '');
                    resultEl.innerHTML = '';
                    const h2 = document.createElement('h2');
                    h2.textContent = headingText;
                    resultEl.append(h2);
                    if (!state.collapseFilter) {
                        const clearBtn = document.createElement('button');
                        clearBtn.type = 'button';
                        clearBtn.className = 'contributor-result-clear';
                        clearBtn.textContent = 'Clear filter';
                        clearBtn.addEventListener('click', () => clearAllFilters(true));
                        resultEl.append(clearBtn);
                    }
                } else if (resultEl) {
                    resultEl.remove();
                }
            }

            // Visual count line under the filters and always-mounted screen-reader status announcement.
            const trimmedName = state.nameQuery.trim();
            let statusText;
            if (!hasNameQuery) {
                if (hasFacetFilter) {
                    const roleLabels = state.roles.map(r => labelFor('roles', r));
                    statusText = peopleText(visibleMatches)
                        + (hasProject ? ` to ${labelFor('projects', state.project)}` : '')
                        + (roleLabels.length ? ` as ${formatListOr(roleLabels)}` : '');
                } else {
                    statusText = peopleText(facetMatches);
                }
            } else if (visibleMatches) {
                statusText = `${visibleMatches} of ${peopleText(facetMatches)} match \u201c${trimmedName}\u201d`;
            } else {
                statusText = `No contributor\u2019s name contains \u201c${trimmedName}\u201d`;
            }

            if (countEl) {
                countEl.hidden = hasFacetFilter && !hasNameQuery && Boolean(document.getElementById('contributor-results'));
                countEl.textContent = !hasNameQuery
                    ? `${peopleText(facetMatches)}${hasFacetFilter ? ' match the filter' : ''}`
                    : statusText;
            }
            if (liveStatusEl && initialized) {
                liveStatusEl.textContent = statusText;
            }
            wasFacetFiltered = hasFacetFilter;
            initialized = true;
        }

        applyAll();

        if (window.location.hash === '#contributor-results') {
            const resultEl = document.getElementById('contributor-results');
            if (resultEl) resultEl.scrollIntoView();
        }
    });
})();
