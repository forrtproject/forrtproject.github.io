/* The contributor network on /contributor-analysis/. People and projects are drawn on a canvas from
   the JSON in the page, at positions computed when the data is generated, so nothing moves on its
   own. Everything the drawing shows can also be reached with the two search boxes and read as text. */
const root = document.querySelector('[data-analysis-network]');
const canvas = root && root.querySelector('[data-network-canvas]');

if (canvas) {
  const raw = JSON.parse(document.getElementById('network-data').textContent);
  const projects = raw.projects.map(([name, x, y]) => ({ kind: 'project', name, x, y, members: [] }));
  const people = raw.people.map(([name, roles, x, y, joined]) => ({
    kind: 'person', name, roles, x, y, projects: joined.map((index) => projects[index]),
  }));
  people.forEach((person) => person.projects.forEach((project) => project.members.push(person)));
  projects.forEach((project) => {
    // Data from the older generated file has no positions for projects.
    if (project.x === undefined) {
      project.x = project.members.reduce((sum, person) => sum + person.x, 0) / project.members.length;
      project.y = project.members.reduce((sum, person) => sum + person.y, 0) / project.members.length;
    }
    project.radius = Math.min(11, 3 + Math.sqrt(project.members.length) * 0.6);
  });
  people.forEach((person) => { person.radius = Math.min(7, 2 + Math.sqrt(person.roles) * 0.45); });
  const byMembers = [...projects].sort((a, b) => b.members.length - a.members.length);
  const byName = [...projects].sort((a, b) => a.name.localeCompare(b.name));

  const colleagues = (person) => {
    const found = new Set();
    person.projects.forEach((project) => project.members.forEach((other) => found.add(other)));
    found.delete(person);
    return [...found].sort((a, b) => a.name.localeCompare(b.name));
  };
  const count = (n, one, many) => `${n.toLocaleString('en')} ${n === 1 ? one : many}`;

  const context = canvas.getContext('2d');
  const panel = root.querySelector('[data-network-panel]');
  const stage = root.querySelector('[data-network-stage]');
  const tip = root.querySelector('[data-network-tip]');
  const status = root.querySelector('[data-network-status]');
  const detail = root.querySelector('[data-network-detail]');
  const guide = root.querySelector('[data-network-guide]');
  const chips = root.querySelector('[data-network-chips]');
  const css = getComputedStyle(document.documentElement);
  const colour = (name) => css.getPropertyValue(`--${name}`).trim();
  const ink = { ink: colour('ink'), soft: colour('soft'), project: colour('res'), focus: colour('jus'), card: '#fff' };

  const phone = window.matchMedia('(max-width:760px)');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const PAD = 34;
  const MAX_ZOOM = 14;

  const state = { person: null, chosen: new Set(), hover: null };
  const view = { k: 1, x: 0, y: 0, width: 0, height: 0, fitted: 1, tall: 1 };
  let followFit = true;
  let raf = 0;
  let animation = 0;

  /* What is shown. Choosing a person replaces chosen projects, and the other way round. */
  function emphasis() {
    const lit = new Set();
    const hubs = new Set();
    if (state.person) {
      lit.add(state.person);
      state.person.projects.forEach((project) => {
        hubs.add(project);
        project.members.forEach((member) => lit.add(member));
      });
    } else if (state.chosen.size) {
      state.chosen.forEach((project) => {
        hubs.add(project);
        project.members.forEach((member) => lit.add(member));
      });
    }
    return { lit, hubs, active: lit.size > 0 };
  }

  /* View */
  const screenX = (x) => x * view.k + view.x;
  const screenY = (y) => y * view.tall * view.k + view.y;

  function bounds(items) {
    const xs = items.map((item) => item.x);
    const ys = items.map((item) => item.y * view.tall);
    return { left: Math.min(...xs), right: Math.max(...xs), top: Math.min(...ys), bottom: Math.max(...ys) };
  }

  function frameFor(items, limit) {
    const box = bounds(items);
    const width = Math.max(box.right - box.left, 1);
    const height = Math.max(box.bottom - box.top, 1);
    const k = Math.min((view.width - PAD * 2) / width, (view.height - PAD * 2) / height, limit);
    return { k, x: view.width / 2 - ((box.left + box.right) / 2) * k, y: view.height / 2 - ((box.top + box.bottom) / 2) * k };
  }

  function moveTo(target) {
    cancelAnimationFrame(animation);
    if (reduced.matches) {
      Object.assign(view, target);
      draw();
      return;
    }
    const start = { k: view.k, x: view.x, y: view.y };
    const began = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - began) / 260);
      const eased = 1 - (1 - t) ** 3;
      view.k = start.k + (target.k - start.k) * eased;
      view.x = start.x + (target.x - start.x) * eased;
      view.y = start.y + (target.y - start.y) * eased;
      paint();
      if (t < 1) animation = requestAnimationFrame(step);
    };
    animation = requestAnimationFrame(step);
  }

  const everything = () => [...people, ...projects];

  function fitAll(animate = false) {
    followFit = true;
    const frame = frameFor(everything(), Infinity);
    view.fitted = frame.k;
    if (animate) moveTo(frame);
    else {
      Object.assign(view, frame);
      draw();
    }
  }

  function frameSelection() {
    const { lit, hubs } = emphasis();
    if (!lit.size) {
      fitAll(true);
      return;
    }
    followFit = false;
    moveTo(frameFor([...lit, ...hubs], view.fitted * 4));
  }

  function zoomAt(factor, cx = view.width / 2, cy = view.height / 2) {
    cancelAnimationFrame(animation);
    followFit = false;
    const k = Math.max(view.fitted * 0.7, Math.min(view.fitted * MAX_ZOOM, view.k * factor));
    const applied = k / view.k;
    view.x = cx - (cx - view.x) * applied;
    view.y = cy - (cy - view.y) * applied;
    view.k = k;
    draw();
  }

  function resize() {
    const box = canvas.getBoundingClientRect();
    if (!box.width || !box.height) return;
    const scale = window.devicePixelRatio || 1;
    canvas.width = Math.round(box.width * scale);
    canvas.height = Math.round(box.height * scale);
    const cx = (view.width / 2 - view.x) / view.k;
    const cy = (view.height / 2 - view.y) / view.k / view.tall;
    view.width = box.width;
    view.height = box.height;
    // How wide a force layout runs means nothing, so it can take the stage's proportions.
    view.tall = 1;
    const all = bounds(everything());
    const proportion = ((view.height - PAD * 2) / (view.width - PAD * 2)) / ((all.bottom - all.top) / (all.right - all.left));
    view.tall = Math.max(0.8, Math.min(1.6, proportion));
    view.fitted = frameFor(everything(), Infinity).k;
    if (followFit) {
      fitAll();
    } else {
      view.x = view.width / 2 - cx * view.k;
      view.y = view.height / 2 - cy * view.tall * view.k;
      draw();
    }
    // On a phone it is a picture. Elsewhere it takes keys of its own, and says so.
    canvas.tabIndex = phone.matches ? -1 : 0;
    canvas.setAttribute('role', phone.matches ? 'img' : 'application');
    if (phone.matches) canvas.removeAttribute('aria-describedby');
    else canvas.setAttribute('aria-describedby', 'network-hint');
  }

  /* Drawing */
  function draw() {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(paint);
  }

  const dotScale = () => Math.min(1.7, Math.max(0.75, Math.sqrt(view.k / view.fitted))) * (view.width < 500 ? 0.62 : 1);

  function dot(person, radius, fill) {
    context.fillStyle = fill;
    context.beginPath();
    context.arc(screenX(person.x), screenY(person.y), radius, 0, Math.PI * 2);
    context.fill();
  }

  function square(project, half, fill) {
    const x = screenX(project.x);
    const y = screenY(project.y);
    context.fillStyle = fill;
    context.beginPath();
    if (context.roundRect) context.roundRect(x - half, y - half, half * 2, half * 2, 2);
    else context.rect(x - half, y - half, half * 2, half * 2);
    context.fill();
  }

  function lines(pairs, stroke, width) {
    context.strokeStyle = stroke;
    context.lineWidth = width;
    context.beginPath();
    pairs.forEach(([from, to]) => {
      context.moveTo(screenX(from.x), screenY(from.y));
      context.lineTo(screenX(to.x), screenY(to.y));
    });
    context.stroke();
  }

  const spokes = (items) => items.flatMap((project) => project.members.map((member) => [member, project]));

  /* Greedy labels: most important first, skipping any that would land on another. */
  function labels(wanted) {
    const placed = [];
    context.textBaseline = 'middle';
    context.lineJoin = 'round';
    wanted.forEach(({ text, item, weight, fill, force }) => {
      context.font = `${weight} ${phone.matches ? 14 : 15}px "Source Sans 3", system-ui, sans-serif`;
      const width = context.measureText(text).width;
      const x = screenX(item.x);
      const y = screenY(item.y) - (item.radius || 3) * dotScale() - 11;
      if (x < -20 || x > view.width + 20 || y < -10 || y > view.height + 10) return;
      const left = Math.max(4, Math.min(view.width - width - 4, x - width / 2));
      const box = { left: left - 3, right: left + width + 3, top: y - 10, bottom: y + 10 };
      const clash = placed.some((b) => b.left < box.right && box.left < b.right && b.top < box.bottom && box.top < b.bottom);
      if (clash && !force) return;
      placed.push(box);
      context.globalAlpha = 0.82;
      context.fillStyle = ink.card;
      context.fillRect(box.left, box.top + 1, box.right - box.left, box.bottom - box.top - 2);
      context.globalAlpha = 1;
      context.fillStyle = fill;
      context.fillText(text, left, y);
    });
  }

  function paint() {
    const scale = canvas.width / (view.width || 1);
    context.setTransform(scale, 0, 0, scale, 0, 0);
    context.clearRect(0, 0, view.width, view.height);
    if (!view.width) return;
    const { lit, hubs, active } = emphasis();
    const size = dotScale();
    const hovered = state.hover;

    // Everything at rest, faint when something is selected.
    context.globalAlpha = active ? 0.1 : 0.2;
    lines(spokes(projects), ink.soft, 0.6);
    context.globalAlpha = active ? 0.22 : 1;
    people.forEach((person) => dot(person, person.radius * size, ink.ink));
    projects.forEach((project) => square(project, project.radius * size, ink.project));
    context.globalAlpha = 1;

    if (active) {
      lines(spokes([...hubs]), ink.project, 0.9);
      if (state.person) lines(state.person.projects.map((project) => [state.person, project]), ink.focus, 2.2);
      lit.forEach((person) => dot(person, person.radius * size + 0.5, ink.ink));
      hubs.forEach((project) => square(project, project.radius * size + 1, ink.project));
      if (state.person) {
        dot(state.person, state.person.radius * size + 6, ink.card);
        dot(state.person, state.person.radius * size + 4, ink.focus);
      }
    }

    // What the pointer is on, over everything else.
    if (hovered) {
      if (hovered.kind === 'person') {
        lines(hovered.projects.map((project) => [hovered, project]), ink.focus, 1.8);
        hovered.projects.forEach((project) => square(project, project.radius * size + 1, ink.project));
        dot(hovered, hovered.radius * size + 4, ink.card);
        dot(hovered, hovered.radius * size + 2.5, ink.focus);
      } else {
        lines(spokes([hovered]), ink.focus, 1.2);
        hovered.members.forEach((member) => dot(member, member.radius * size + 0.5, ink.ink));
        square(hovered, hovered.radius * size + 3, ink.card);
        square(hovered, hovered.radius * size + 1.5, ink.focus);
      }
    }

    const wanted = [];
    if (state.person) wanted.push({ text: state.person.name, item: state.person, weight: 700, fill: ink.focus, force: true });
    [...hubs].sort((a, b) => b.members.length - a.members.length).slice(0, Math.max(10, state.chosen.size))
      .forEach((project) => wanted.push({ text: project.name, item: project, weight: 600, fill: ink.project, force: state.chosen.has(project) }));
    // At rest the largest projects get names, and more come in with zooming.
    if (!active) {
      const room = Math.max(4, Math.min(12, (view.width * view.height) / 60000)) * (view.k / view.fitted) ** 2;
      byMembers.slice(0, Math.round(room)).forEach((project) => wanted.push({ text: project.name, item: project, weight: 600, fill: ink.project }));
    }
    // Names of people come in once they have room.
    if (view.k > view.fitted * 2.4) {
      (active ? [...lit] : people).forEach((person) => wanted.push({ text: person.name, item: person, weight: 400, fill: ink.ink }));
    }
    labels(wanted);
  }

  /* The panel of text */
  function linkButton(text, onClick) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'network-link';
    button.textContent = text;
    button.addEventListener('click', onClick);
    return button;
  }

  function element(tag, text) {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    return node;
  }

  function linkList(items, onPick) {
    const list = element('ul');
    items.forEach((item) => {
      const row = element('li');
      row.append(linkButton(item.name, () => onPick(item)));
      list.append(row);
    });
    return list;
  }

  function clearButton() {
    const button = linkButton('Clear and show everyone', () => { clearAll(); fitAll(true); });
    button.classList.add('network-clear');
    return button;
  }

  function showPanelText() {
    // Rebuilding removes the control just used, so keyboard users need somewhere to land.
    const hadFocus = detail.contains(document.activeElement) || chips.contains(document.activeElement);
    const inChips = chips.contains(document.activeElement);
    detail.replaceChildren();
    const person = state.person;
    if (person) {
      const others = colleagues(person);
      status.textContent = `${person.name}: ${count(person.projects.length, 'project', 'projects')}, connected to ${count(others.length, 'person', 'people')}.`;
      detail.append(clearButton());
      detail.append(element('h3', person.name));
      detail.append(element('p', `${count(person.roles, 'role', 'roles')} on record`));
      detail.append(element('h4', count(person.projects.length, 'project', 'projects')));
      detail.append(linkList([...person.projects].sort((a, b) => a.name.localeCompare(b.name)), chooseOnly));
      if (others.length) {
        detail.append(element('h4', `Connected to ${count(others.length, 'person', 'people')}`));
        detail.append(linkList(others, choosePerson));
      }
    } else if (state.chosen.size) {
      const chosen = [...state.chosen];
      const everyone = new Set(chosen.flatMap((project) => project.members));
      status.textContent = chosen.length === 1
        ? `${chosen[0].name}: ${count(everyone.size, 'person', 'people')}.`
        : `${count(chosen.length, 'project', 'projects')}: ${count(everyone.size, 'person', 'people')} in all.`;
      detail.append(clearButton());
      chosen.forEach((project) => {
        detail.append(element('h3', project.name));
        detail.append(element('p', count(project.members.length, 'person', 'people')));
        detail.append(linkList([...project.members].sort((a, b) => a.name.localeCompare(b.name)), choosePerson));
      });
    } else {
      status.textContent = 'Nothing selected. Showing everyone.';
    }
    detail.hidden = !(person || state.chosen.size);
    guide.hidden = !detail.hidden;
    chips.replaceChildren();
    state.chosen.forEach((project) => {
      const item = element('li');
      const chip = element('button');
      chip.type = 'button';
      chip.className = 'network-chip';
      chip.setAttribute('aria-label', `Stop showing ${project.name}`);
      chip.append(element('span', project.name));
      const cross = element('span', '×');
      cross.setAttribute('aria-hidden', 'true');
      chip.append(cross);
      chip.addEventListener('click', () => toggleProject(project));
      item.append(chip);
      chips.append(item);
    });
    chips.hidden = !state.chosen.size;
    if (hadFocus) {
      const heading = detail.querySelector('h3');
      if (heading) heading.tabIndex = -1;
      const next = inChips ? chips.querySelector('button') || projectBox.input : heading || personBox.input;
      next.focus();
    }
  }

  function choosePerson(person) {
    state.person = person;
    state.chosen.clear();
    personBox.input.value = person.name;
    showPanelText();
    frameSelection();
  }

  function toggleProject(project) {
    state.person = null;
    personBox.input.value = '';
    if (state.chosen.has(project)) state.chosen.delete(project);
    else state.chosen.add(project);
    showPanelText();
    frameSelection();
  }

  function chooseOnly(project) {
    state.person = null;
    personBox.input.value = '';
    state.chosen.clear();
    state.chosen.add(project);
    showPanelText();
    frameSelection();
  }

  function clearAll() {
    state.person = null;
    state.chosen.clear();
    personBox.input.value = '';
    showPanelText();
    draw();
  }

  /* A search box with a list of matches: the ARIA combobox pattern. */
  const fold = (text) => text.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();

  function combobox(input, list, options, onPick) {
    let shown = [];
    let active = -1;

    function close() {
      list.hidden = true;
      input.setAttribute('aria-expanded', 'false');
      input.removeAttribute('aria-activedescendant');
      active = -1;
    }

    // Fixed, so that the list can run past the panel, which clips its overflow.
    function place() {
      const box = input.getBoundingClientRect();
      list.style.left = `${box.left}px`;
      list.style.width = `${Math.max(box.width, 280)}px`;
      // Opens upwards when that leaves more of it on the screen.
      const below = window.innerHeight - box.bottom - 12;
      const above = box.top - 12;
      const upwards = below < 200 && above > below;
      list.style.maxHeight = `${Math.max(0, Math.min(280, upwards ? above : below))}px`;
      list.style.top = `${upwards ? box.top - 4 - list.offsetHeight : box.bottom + 4}px`;
    }

    function highlight(index) {
      active = index;
      [...list.children].forEach((row, i) => row.setAttribute('aria-selected', String(i === index)));
      if (index >= 0) {
        input.setAttribute('aria-activedescendant', list.children[index].id);
        list.children[index].scrollIntoView({ block: 'nearest' });
      } else {
        input.removeAttribute('aria-activedescendant');
      }
    }

    function open() {
      const query = fold(input.value.trim());
      shown = options(query);
      list.replaceChildren();
      shown.slice(0, 60).forEach((option, i) => {
        const row = element('li');
        row.id = `${list.id}-${i}`;
        row.setAttribute('role', 'option');
        row.setAttribute('aria-selected', 'false');
        row.append(element('span', option.label));
        if (option.note) row.append(element('span', option.note));
        // Before the box's blur would close the list.
        row.addEventListener('mousedown', (event) => event.preventDefault());
        row.addEventListener('click', () => { close(); onPick(option.value); });
        list.append(row);
      });
      if (!shown.length) {
        const row = element('li', 'No match');
        row.setAttribute('role', 'option');
        row.setAttribute('aria-disabled', 'true');
        row.setAttribute('aria-selected', 'false');
        list.append(row);
      }
      list.hidden = false;
      input.setAttribute('aria-expanded', 'true');
      active = -1;
      place();
    }

    input.addEventListener('input', open);
    input.addEventListener('click', open);
    input.addEventListener('blur', close);
    input.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        if (list.hidden) open();
        const count = Math.min(shown.length, 60);
        const next = event.key === 'ArrowDown' ? active + 1 : (active < 0 ? count : active) - 1;
        highlight(count ? (next + count) % count : -1);
      } else if (event.key === 'Enter') {
        if (!list.hidden && shown.length) {
          event.preventDefault();
          const pick = shown[active < 0 ? 0 : active];
          close();
          onPick(pick.value);
        }
      } else if (event.key === 'Escape') {
        if (!list.hidden) {
          event.stopPropagation();
          close();
        }
      }
    });
    // Capturing, to hear the side panel's own scrolling as well as the page's.
    window.addEventListener('scroll', (event) => {
      if (list.hidden || event.target === list) return;
      place();
      const box = input.getBoundingClientRect();
      const frame = input.closest('.network-controls').getBoundingClientRect();
      if (frame.height && (box.bottom < frame.top || box.top > frame.bottom)) close();
    }, { passive: true, capture: true });
    window.addEventListener('resize', () => { if (!list.hidden) place(); });
    return { input };
  }

  const peopleIndex = people.map((person) => ({
    value: person, search: fold(person.name), label: person.name, note: count(person.projects.length, 'project', 'projects'),
  }));
  const projectIndex = byName.map((project) => ({
    value: project, search: fold(project.name), label: project.name, note: String(project.members.length),
  }));

  const personBox = combobox(
    root.querySelector('#network-person'),
    root.querySelector('#network-person-list'),
    (query) => (query ? peopleIndex.filter((option) => option.search.includes(query)) : peopleIndex),
    choosePerson,
  );
  const projectBox = combobox(
    root.querySelector('#network-project'),
    root.querySelector('#network-project-list'),
    (query) => (query ? projectIndex.filter((option) => option.search.includes(query)) : projectIndex)
      .filter((option) => !state.chosen.has(option.value)),
    (project) => { projectBox.input.value = ''; toggleProject(project); },
  );

  /* Pointer and keyboard on the drawing */
  function nodeAt(cx, cy, slack) {
    let best = null;
    let bestDistance = Infinity;
    const size = dotScale();
    const test = (item) => {
      const distance = Math.hypot(screenX(item.x) - cx, screenY(item.y) - cy) - item.radius * size;
      if (distance < slack && distance < bestDistance) {
        best = item;
        bestDistance = distance;
      }
    };
    people.forEach(test);
    projects.forEach(test);
    return best;
  }

  function showTip(item, cx, cy) {
    tip.replaceChildren();
    tip.append(element('b', item.name));
    tip.append(item.kind === 'person'
      ? `${count(item.roles, 'role', 'roles')} on ${count(item.projects.length, 'project', 'projects')}, connected to ${count(colleagues(item).length, 'person', 'people')}`
      : count(item.members.length, 'person', 'people'));
    tip.hidden = false;
    const left = Math.max(6, Math.min(view.width - tip.offsetWidth - 6, cx + 12));
    const above = cy - tip.offsetHeight - 12;
    const top = above < 6 ? Math.min(cy + 14, view.height - tip.offsetHeight - 6) : above;
    tip.style.left = `${left}px`;
    tip.style.top = `${top}px`;
  }

  function setHover(item, cx, cy) {
    clearTimeout(hoverEnd);
    if (item) showTip(item, cx, cy);
    else tip.hidden = true;
    if (item !== state.hover) {
      state.hover = item;
      canvas.style.cursor = item ? 'pointer' : '';
      draw();
    }
  }

  // The name stays long enough to move the pointer onto it, and stays while it is there.
  function endHover() {
    clearTimeout(hoverEnd);
    hoverEnd = setTimeout(() => setHover(null), 300);
  }

  tip.addEventListener('pointerenter', () => clearTimeout(hoverEnd));
  tip.addEventListener('pointerleave', endHover);

  let press = null;
  let hoverEnd = 0;

  canvas.addEventListener('pointerdown', (event) => {
    cancelAnimationFrame(animation);
    press = { x: event.clientX, y: event.clientY, viewX: view.x, viewY: view.y, moved: false, touch: event.pointerType === 'touch' };
    if (event.pointerType === 'mouse') canvas.setPointerCapture(event.pointerId);
  });

  canvas.addEventListener('pointermove', (event) => {
    const box = canvas.getBoundingClientRect();
    const cx = event.clientX - box.left;
    const cy = event.clientY - box.top;
    if (press && !phone.matches) {
      if (!press.moved && Math.hypot(event.clientX - press.x, event.clientY - press.y) > 4) {
        press.moved = true;
        followFit = false;
        canvas.classList.add('dragging');
        setHover(null);
      }
      if (press.moved) {
        view.x = press.viewX + event.clientX - press.x;
        view.y = press.viewY + event.clientY - press.y;
        draw();
        return;
      }
    }
    if (event.pointerType === 'mouse') {
      const item = nodeAt(cx, cy, 7);
      if (item) setHover(item, cx, cy);
      else if (state.hover) endHover();
    }
  });

  canvas.addEventListener('pointerup', (event) => {
    const box = canvas.getBoundingClientRect();
    if (press && !press.moved) {
      const item = nodeAt(event.clientX - box.left, event.clientY - box.top, press.touch ? 16 : 7);
      if (item && item.kind === 'person') choosePerson(item);
      else if (item) chooseOnly(item);
      else if (state.person || state.chosen.size) clearAll();
    }
    press = null;
    canvas.classList.remove('dragging');
  });

  canvas.addEventListener('pointercancel', () => {
    press = null;
    canvas.classList.remove('dragging');
  });

  canvas.addEventListener('pointerleave', endHover);

  // The page keeps scrolling over the drawing. Only a pinch or Ctrl and the wheel zooms it.
  canvas.addEventListener('wheel', (event) => {
    if (!event.ctrlKey && !event.metaKey) return;
    event.preventDefault();
    const box = canvas.getBoundingClientRect();
    zoomAt(Math.exp(-event.deltaY * 0.004), event.clientX - box.left, event.clientY - box.top);
  }, { passive: false });

  canvas.addEventListener('keydown', (event) => {
    const step = 60;
    const moves = { ArrowLeft: [step, 0], ArrowRight: [-step, 0], ArrowUp: [0, step], ArrowDown: [0, -step] };
    if (moves[event.key]) {
      event.preventDefault();
      cancelAnimationFrame(animation);
      followFit = false;
      view.x += moves[event.key][0];
      view.y += moves[event.key][1];
      draw();
    } else if (event.key === '+' || event.key === '=') {
      event.preventDefault();
      zoomAt(1.3);
    } else if (event.key === '-') {
      event.preventDefault();
      zoomAt(1 / 1.3);
    } else if (event.key === '0') {
      event.preventDefault();
      fitAll(true);
    }
  });

  // Escape first dismisses a name shown by hovering, wherever the focus is.
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || tip.hidden) return;
    setHover(null);
    event.stopPropagation();
  }, { capture: true });

  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && (state.person || state.chosen.size)) {
      clearAll();
      fitAll(true);
    }
  });

  root.querySelectorAll('[data-network-zoom]').forEach((button) => {
    button.addEventListener('click', () => {
      const kind = button.dataset.networkZoom;
      if (kind === 'in') zoomAt(1.4);
      else if (kind === 'out') zoomAt(1 / 1.4);
      else fitAll(true);
    });
  });

  // For scripts/rebrand/check_design.py, which has to point at a node it can only see as pixels.
  root.networkPosition = (name) => {
    const item = [...people, ...projects].find((candidate) => candidate.name === name);
    return item && { x: screenX(item.x), y: screenY(item.y) };
  };

  panel.hidden = false;
  showPanelText();
  new ResizeObserver(resize).observe(stage);
  resize();
  // Labels are measured in the page's type, which may arrive after the first drawing.
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw);
}
