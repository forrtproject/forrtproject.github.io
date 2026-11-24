+++
widget = "blank"
headless = true
active = true
weight = 10

title = "Awards & Impact"
subtitle = ""

[design]
  columns = "1"

[design.background]
  text_color_light = false

[design.spacing]
  padding = ["60px", "0", "60px", "0"]

[advanced]
  css_style = ""
  css_class = ""
+++

<script src="/js/js-confetti.browser.js"></script>
<script>
  window.addEventListener("load", () => {
    const jsConfetti = new JSConfetti();

    // Once, and only for visitors who have not asked for reduced motion.
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const triggerConfetti = () => {
      jsConfetti.addConfetti({
        emojis: ['🎉', '🥳', '👏', '✨', '⭐', '🏆'],
        emojiSize: 40,
        confettiNumber: 150,
      });
    };

    triggerConfetti();
  });
</script>

<div class="awards-head">
  <p class="awards-intro">Thanks to our amazing community, FORRT has become an <strong>award-winning</strong> grassroots interdisciplinary international organization integrating open and reproducible research training into higher education.</p>
  <nav class="awards-jump" aria-label="Jump to awards by year">
    <a href="#featured-recognitions">Featured</a>
    <a href="#awards-2025">2025 (5)</a>
    <a href="#awards-2023">2023 (6)</a>
    <a href="#awards-2022">2022 (4)</a>
    <a href="#awards-2021">2021 (3)</a>
    <a href="#awards-2020">2020 (1)</a>
    <a href="#impact-and-achievements">Impact &amp; achievements</a>
  </nav>
</div>

<h2 id="featured-recognitions" class="awards-section-heading">Featured recognitions</h2>

<div class="awards-featured-grid">
  <article class="award-featured">
    <p class="award-kicker">2026 · Open Science NL</p>
    <h3><a href="https://www.openscience.nl/en/news/forrt-awarded-with-the-leo-waaijers-open-science-award-2026" target="_blank" rel="noopener">The Leo Waaijers Open Science Award 2026</a></h3>
    <div class="award-gallery">
      <img src="./Leo_Waaijers_Open_Science_Award_2026/1.webp" width="600" height="750" alt="NWO and UKB announcement card: Leo Waaijers Open Science Award, The winner is...">
      <img src="./Leo_Waaijers_Open_Science_Award_2026/2.webp" width="600" height="750" alt="FORRT members receiving the Leo Waaijers Open Science Award on stage">
      <img src="./Leo_Waaijers_Open_Science_Award_2026/3.webp" width="600" height="750" alt="Jury quote: FORRT has made an excellent contribution to the Dutch and international open science community">
      <img src="./Leo_Waaijers_Open_Science_Award_2026/4.webp" width="600" height="750" alt="Summary card describing FORRT as a community-driven initiative promoting open science, reproducibility, and ethical research practices">
    </div>
    <p><strong>The Leo Waaijers Open Science Award</strong> aims to recognise and reward outstanding contributions to open science in the Netherlands by highlighting these achievements. The award seeks to inspire others to apply and promote open science, stimulate innovation and strengthen the open science movement.</p>
    <p class="award-featured-actions"><a href="https://www.openscience.nl/en/news/forrt-awarded-with-the-leo-waaijers-open-science-award-2026" class="btn dir-btn" target="_blank" rel="noopener">Read more <i class="fas fa-external-link-alt" aria-hidden="true"></i><span class="visually-hidden"> (another website)</span></a></p>
  </article>

  <article class="award-featured award-featured-unesco">
    <p class="award-kicker">2024–2033 · UNESCO &amp; United Nations</p>
    <h3><a href="../educators-corner/023-forward-a-unesco-decade-of-science-programme/">FORWARD: A UNESCO Decade of Science Programme</a></h3>
    <div class="award-unesco-body">
      <img src="unesco_recognition.webp" width="200" height="207" alt="FORWARD: A UNESCO Decade of Science Programme" class="award-unesco-badge">
      <div>
        <p><strong>FORRT</strong> is one of the few initiatives worldwide to be formally endorsed as a <strong>Programme</strong> of the <a href="https://www.un-sciences-decade.org/en/endorsed-activities/forward-forrt-world-development-fostering-open-research-reproducibility-worldwide-accessible?hub=63" target="_blank" rel="noopener">International Decade of Sciences for Sustainable Development (IDSSD, 2024–2033)</a>, led by UNESCO and the United Nations (UN). This endorsement reflects the highest level of UN policy recognition and positions FORRT’s work in Education &amp; Pedagogy (Curriculum Hub), Metascience &amp; Research (Replication Hub) and Social Justice &amp; DEIA as an <strong>essential contribution to the UN’s strategy for achieving the Sustainable Development Goals (SDGs)</strong>.</p>
        <p class="award-featured-actions"><a href="https://www.un-sciences-decade.org/en/endorsed-activities/forward-forrt-world-development-fostering-open-research-reproducibility-worldwide-accessible?hub=63" class="btn dir-btn" target="_blank" rel="noopener">Read the official UNESCO announcement <i class="fas fa-external-link-alt" aria-hidden="true"></i><span class="visually-hidden"> (another website)</span></a></p>
      </div>
    </div>
    {{< forward_unesco_sdgs_card >}}
  </article>
</div>

<h2 id="awards-2025" class="awards-year-heading">2025</h2>

<div class="awards-grid">
  <article class="award-card">
    <div class="award-card-head">
      <div class="award-logo-plate"><img src="sips.webp" width="200" height="70" alt="Society for the Improvement of Psychological Science logo" loading="lazy"></div>
      <p class="award-org">Society for the Improvement of Psychological Science</p>
    </div>
    <h3>Mission Award — Educational resources on the replication crisis</h3>
    <p>In 2025, FORRT received the <strong><a href="/positive-changes-replication-crisis/">Mission Award for Educational resources on the replication crisis</a></strong> from the Society for the Improvement of Psychological Science.</p>
    <p class="award-card-links"><a href="https://improvingpsych.org/mission/awards/#:~:text=SEMA3-,June%202025,Educational%20resources%20on%20the%20replication%20crisis,-June%202025" target="_blank" rel="noopener">Announcement <i class="fas fa-external-link-alt" aria-hidden="true"></i><span class="visually-hidden"> (another website)</span></a></p>
  </article>

  <article class="award-card">
    <div class="award-card-head">
      <div class="award-logo-plate"><img src="sips.webp" width="200" height="70" alt="Society for the Improvement of Psychological Science logo" loading="lazy"></div>
      <p class="award-org">Society for the Improvement of Psychological Science</p>
    </div>
    <h3>Commendation Award — Pownall et al. (2023)</h3>
    <p>In 2025, FORRT received a <strong>Commendation Award for <a href="https://doi.org/10.1098/rsos.221255" target="_blank" rel="noopener">Pownall et al. (2023): Teaching open and reproducible scholarship: a critical review of the evidence base for current pedagogical methods and their outcomes</a></strong> from the Society for the Improvement of Psychological Science.</p>
    <p class="award-card-links"><a href="https://improvingpsych.org/mission/awards/" target="_blank" rel="noopener">Announcement <i class="fas fa-external-link-alt" aria-hidden="true"></i><span class="visually-hidden"> (another website)</span></a></p>
  </article>

  <article class="award-card">
    <div class="award-card-head">
      <div class="award-logo-plate"><img src="sips.webp" width="200" height="70" alt="Society for the Improvement of Psychological Science logo" loading="lazy"></div>
      <p class="award-org">Society for the Improvement of Psychological Science</p>
    </div>
    <h3>Commendation Award — Open Science in the Developing World</h3>
    <p>In 2025, FORRT received a <strong>Commendation Award for <a href="/os-developing-world/">Open Science in the Developing World: A Collection of Practical Guides for Researchers in Developing Countries</a></strong> from the Society for the Improvement of Psychological Science.</p>
    <p class="award-card-links"><a href="https://doi.org/10.1177/25152459251357565" target="_blank" rel="noopener">Published article <i class="fas fa-external-link-alt" aria-hidden="true"></i><span class="visually-hidden"> (another website)</span></a> <a href="https://improvingpsych.org/mission/awards/" target="_blank" rel="noopener">Announcement <i class="fas fa-external-link-alt" aria-hidden="true"></i><span class="visually-hidden"> (another website)</span></a></p>
  </article>

  <article class="award-card">
    <div class="award-card-head">
      <div class="award-logo-plate"><img src="sips.webp" width="200" height="70" alt="Society for the Improvement of Psychological Science logo" loading="lazy"></div>
      <p class="award-org">Society for the Improvement of Psychological Science</p>
    </div>
    <h3>Commendation Award — International Initiatives Systematic Mapping Review</h3>
    <p>In 2025, FORRT received a <strong>Commendation Award for <a href="https://doi.org/10.1098/rsos.241726" target="_blank" rel="noopener">International Initiatives to Enhance Awareness and Uptake of Open Research in Psychology: A Systematic Mapping Review</a></strong> from the Society for the Improvement of Psychological Science.</p>
    <p class="award-card-links"><a href="https://improvingpsych.org/mission/awards/" target="_blank" rel="noopener">Announcement <i class="fas fa-external-link-alt" aria-hidden="true"></i><span class="visually-hidden"> (another website)</span></a></p>
  </article>

  <article class="award-card">
    <div class="award-card-head">
      <div class="award-logo-plate"><img src="sips.webp" width="200" height="70" alt="Society for the Improvement of Psychological Science logo" loading="lazy"></div>
      <p class="award-org">Society for the Improvement of Psychological Science</p>
    </div>
    <h3>Commendation Award — FORRT Credit Project</h3>
    <p>In 2025, FORRT received a <strong><a href="/contributors/">Commendation Award for FORRT Credit Project</a></strong> from the Society for the Improvement of Psychological Science.</p>
    <p class="award-card-links"><a href="https://improvingpsych.org/mission/awards/" target="_blank" rel="noopener">Announcement <i class="fas fa-external-link-alt" aria-hidden="true"></i><span class="visually-hidden"> (another website)</span></a></p>
  </article>
</div>

<h2 id="awards-2023" class="awards-year-heading">2023</h2>

<div class="awards-grid">
  <article class="award-card">
    <div class="award-card-head">
      <div class="award-logo-plate"><img src="ukrn.webp" width="200" height="73" alt="UK Reproducibility Network logo" loading="lazy"></div>
      <p class="award-org">UK Reproducibility Network</p>
    </div>
    <h3>Dorothy Bishop Prize</h3>
    <p>In 2023, FORRT was awarded the <strong><a href="https://www.ukrn.org/2023/03/21/db-prize-winners-mar2023/" target="_blank" rel="noopener">Dorothy Bishop Prize</a></strong> from the UK Reproducibility Network, for its work towards integrating open science principles into higher education and advancing research transparency, reproducibility, rigor, and ethics through pedagogical reform.</p>
  </article>

  <article class="award-card">
    <div class="award-card-head">
      <div class="award-logo-plate"><img src="Einstein.webp" width="200" height="139" alt="Einstein Foundation Award logo" loading="lazy"></div>
      <p class="award-org">Einstein Foundation</p>
    </div>
    <h3>Early Career Award finalist</h3>
    <p>In 2023, FORRT was a <strong>finalist</strong> for the <strong><a href="https://award.einsteinfoundation.de/award-winners-finalists/recipients-2023/early-career-researcher-award-2023-finalists" target="_blank" rel="noopener">Early Career Award</a></strong> for Promoting Quality in Research from the Einstein Foundation for its <a href="/replication-hub/">Replication Hub</a> initiative.</p>
  </article>

  <article class="award-card">
    <div class="award-card-head">
      <div class="award-logo-plate"><img src="inosc.webp" width="200" height="60" alt="International Network of Open Science Communities (INOSC) logo" loading="lazy"></div>
      <p class="award-org">Open Science Community Amsterdam (INOSC)</p>
    </div>
    <h3>OSC Award — Open Educational Resources</h3>
    <p>In 2023, FORRT received an <strong><a href="https://osc-international.com/osc-amsterdam/looking-back-oscawards/" target="_blank" rel="noopener">OSC Award</a></strong> in the Open Educational Resources / Open Education / Open Online Courses category from Open Science Community Amsterdam, receiving €200. This was for our paper, <a href="https://doi.org/10.1186/s13104-022-05944-1" target="_blank" rel="noopener">The role of pedagogical communities</a>.</p>
    <p class="award-card-links"><a href="https://youtu.be/7wYW7xpqbUY" target="_blank" rel="noopener">Watch our successful pitch on YouTube <i class="fas fa-external-link-alt" aria-hidden="true"></i><span class="visually-hidden"> (another website)</span></a></p>
  </article>

  <article class="award-card">
    <div class="award-card-head">
      <div class="award-logo-plate"><img src="sips.webp" width="200" height="70" alt="Society for the Improvement of Psychological Science logo" loading="lazy"></div>
      <p class="award-org">Society for the Improvement of Psychological Science</p>
    </div>
    <h3>Mission Award</h3>
    <p>In 2023, FORRT received the <strong>Mission Award</strong> from the Society for the Improvement of Psychological Science for its overall initiatives.</p>
    <p class="award-card-links"><a href="https://improvingpsych.org/mission/awards/" target="_blank" rel="noopener">Announcement by SIPS <i class="fas fa-external-link-alt" aria-hidden="true"></i><span class="visually-hidden"> (another website)</span></a></p>
  </article>

  <article class="award-card">
    <div class="award-card-head">
      <div class="award-logo-plate"><img src="Jisc.webp" width="78" height="78" alt="Jisc logo" loading="lazy"></div>
      <p class="award-org">JISC</p>
    </div>
    <h3>Community Champion</h3>
    <p>In 2023, FORRT was named a <strong><a href="https://www.jisc.ac.uk/news/all/jisc-announces-2023-community-champions" target="_blank" rel="noopener">Community Champion for UK education and research communities</a></strong> by JISC.</p>
  </article>

  <article class="award-card">
    <div class="award-card-head">
      <div class="award-logo-plate"><img src="sips.webp" width="200" height="70" alt="Society for the Improvement of Psychological Science logo" loading="lazy"></div>
      <p class="award-org">Society for the Improvement of Psychological Science</p>
    </div>
    <h3>Commendation Award — Replications &amp; Reversals</h3>
    <p>In 2023, FORRT received a <strong>Commendation award</strong> from the Society for the Improvement of Psychological Science for its <a href="/reversals/">Replications &amp; Reversals</a> project.</p>
    <p class="award-card-links"><a href="https://improvingpsych.org/2023/08/22/sips-2023-awards-announced/" target="_blank" rel="noopener">Announcement by SIPS <i class="fas fa-external-link-alt" aria-hidden="true"></i><span class="visually-hidden"> (another website)</span></a></p>
  </article>
</div>

<h2 id="awards-2022" class="awards-year-heading">2022</h2>

<div class="awards-grid">
  <article class="award-card">
    <div class="award-card-head">
      <div class="award-logo-plate"><img src="osc-galway.webp" width="200" height="88" alt="Open Scholarship Community Galway logo" loading="lazy"></div>
      <p class="award-org">Atlantic Technological University &amp; OSC Galway</p>
    </div>
    <h3>Open Scholarship Prize (1st Place)</h3>
    <p>In 2022, FORRT received an <strong>Open Scholarship Prize (1st Place)</strong> award from the Atlantic Technological University and the Open Science Community Galway for its several initiatives aiming to help researchers integrate Open Science into their educational pipeline, receiving €200/£189.</p>
  </article>

  <article class="award-card">
    <div class="award-card-head">
      <div class="award-logo-plate"><img src="sips.webp" width="200" height="70" alt="Society for the Improvement of Psychological Science logo" loading="lazy"></div>
      <p class="award-org">Society for the Improvement of Psychological Science</p>
    </div>
    <h3>Grants-In-Aid — Neurodiversity initiative</h3>
    <p>In 2022, FORRT received a <strong>Grants-In-Aid to Reduce Barriers to Improving Psychological Science</strong> from the Society for the Improvement of Psychological Science for the FORRT's Neurodiversity initiative, receiving $1250.</p>
  </article>

  <article class="award-card">
    <div class="award-card-head">
      <div class="award-logo-plate"><img src="alt.webp" width="200" height="121" alt="Association for Learning Technology logo" loading="lazy"></div>
      <p class="award-org">Association for Learning Technology</p>
    </div>
    <h3>Open Scholarship Conference award</h3>
    <p>In 2022, FORRT received an <strong>Open Scholarship Conference award</strong> from the Association for Learning Technology for its initiatives, receiving €200/£189. This was linked to our presentation at the OER22 Conference.</p>
  </article>

  <article class="award-card">
    <div class="award-card-head">
      <div class="award-logo-plate"><img src="sips.webp" width="200" height="70" alt="Society for the Improvement of Psychological Science logo" loading="lazy"></div>
      <p class="award-org">Society for the Improvement of Psychological Science</p>
    </div>
    <h3>Commendation — Summaries of Open Science</h3>
    <p>In 2022, FORRT received a <strong><a href="https://improvingpsych.org/mission/awards/" target="_blank" rel="noopener">Commendation</a></strong> from the Society for the Improvement of Psychological Science for its <a href="/summaries/">Summaries of Open Science</a> project.</p>
  </article>
</div>

<h2 id="awards-2021" class="awards-year-heading">2021</h2>

<div class="awards-grid">
  <article class="award-card">
    <div class="award-card-head">
      <div class="award-logo-plate"><img src="hiddenref.webp" width="200" height="79" alt="The Hidden REF logo" loading="lazy"></div>
      <p class="award-org">The Hidden REF</p>
    </div>
    <h3>HiddenREF Commendation</h3>
    <p>In 2021, FORRT has received a <strong>Commendation</strong> from the <a href="https://hidden-ref.org/" target="_blank" rel="noopener">HiddenREF</a> for its initiatives advancing training materials and resources on open and reproducible science.</p>
    <p class="award-card-links"><a href="https://youtu.be/btjRNG0NANg?t=1070" target="_blank" rel="noopener">Watch a recording of the award ceremony on YouTube <i class="fas fa-external-link-alt" aria-hidden="true"></i><span class="visually-hidden"> (another website)</span></a></p>
  </article>

  <article class="award-card">
    <div class="award-card-head">
      <div class="award-logo-plate"><img src="osc-galway.webp" width="200" height="88" alt="Open Scholarship Community Galway logo" loading="lazy"></div>
      <p class="award-org">Open Scholarship Community Galway</p>
    </div>
    <h3>Open Scholarship Award (2nd Place)</h3>
    <p>In 2021, FORRT has received an <strong>Open Scholarship Award (2nd Place)</strong> from the <a href="https://osc-galway.ie/competition/" target="_blank" rel="noopener">Open Scholarship Community Galway</a> for its overall initiatives.</p>
  </article>

  <article class="award-card">
    <div class="award-card-head award-card-head-plain">
      <p class="award-org">Kellogg School of Management</p>
    </div>
    <h3>Consultancy on “Leading &amp; Managing Teams”</h3>
    <p>In 2021, FORRT has received a <strong>consultancy on “Leading &amp; Managing Teams”</strong> from the Kellogg School of Management.</p>
  </article>
</div>

<h2 id="awards-2020" class="awards-year-heading">2020</h2>

<div class="awards-grid awards-grid-single">
  <article class="award-card">
    <div class="award-card-head">
      <div class="award-logo-plate"><img src="sips.webp" width="200" height="70" alt="Society for the Improvement of Psychological Science logo" loading="lazy"></div>
      <p class="award-org">Society for the Improvement of Psychological Science</p>
    </div>
    <h3>Commendation — Introducing FORRT</h3>
    <p>In 2020, FORRT has received a <strong>Commendation</strong> from the <a href="https://improvingpsych.org/mission/awards/" target="_blank" rel="noopener">Society for the Improvement of Psychological Science</a> for its manuscript <a href="https://osf.io/bnh7p/" target="_blank" rel="noopener">“Introducing a Framework for Open and Reproducible Research Training (FORRT)”</a>.</p>
  </article>
</div>

<h2 id="impact-and-achievements" class="awards-section-heading">Impact and achievements</h2>

<p class="awards-intro">Our work is sharing open scholarship with a wide audience. Our highlights include...</p>

<ul class="impact-list">
  <li><strong>Four</strong> of our projects are featured in UNESCO's <a href="https://www.unesco.org/en/open-science/list?hub=686" target="_blank" rel="noopener">Open Science Capacity Building Index</a>.</li>
  <li>FORRT projects have been discussed in podcasts in <strong>four</strong> different languages: English, Polish, Finnish and Dutch.</li>
  <li>We've shared our expertise in <strong>three</strong> policy briefings to the UK House of Commons Science and Technology Committee, British Psychological Society, and Quality Assurance Agency for Higher Education (see our <a href="/publications/">Publications</a> page for more information).</li>
  <li>FORRT has broken <strong>two</strong> Google Docs by exceeding their 1.02 <strong>million</strong> character limit!</li>
  <li>Our work is cited in <strong>two</strong> Wikipedia pages.</li>
  <li>The FORRT Glossary has been featured on television <strong>once</strong>, <a href="https://twitter.com/Ali_AlHoorie/status/1497622163788115981" target="_blank" rel="noopener">in a segment on Al Ekhbariya</a>.</li>
  <li>Our work has been <a href="https://web.archive.org/web/20220919002540/https://science.nasa.gov/open-science/transform-to-open-science/stories/dr-flavio-azevedo?s=09" target="_blank" rel="noopener">highlighted by NASA</a> <strong>once</strong>.</li>
</ul>
