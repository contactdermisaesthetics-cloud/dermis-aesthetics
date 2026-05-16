(function () {
  const data = window.DERMIS_SITE;
  const page = document.body.dataset.page || "home";
  const root = document.getElementById("site-root");

  const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const html = (strings, ...values) => strings
    .map((string, index) => string + (values[index] ?? ""))
    .join("");

  function renderHeader() {
    const navItems = data.nav.map((item) => html`
      <a href="${item.url}" class="${item.id === page ? "active" : ""}">${item.label}</a>
    `).join("");

    return html`
      <header class="site-header">
        <a class="brand logo-container" href="index.html" aria-label="${data.clinic.name} home">
          <img src="${data.clinic.logo}" alt="${data.clinic.name} Logo" class="site-logo">
        </a>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu">
          <span></span>
          <span></span>
          <span></span>
          <span class="sr-only">Menu</span>
        </button>
        <div class="header-right">
          <nav class="nav" id="mobile-menu" aria-label="Main navigation">${navItems}</nav>
          <a class="nav-cta" href="contact.html">Book Appointment</a>
        </div>
      </header>
    `;
  }

  function renderFooter() {
    return html`
      <footer class="site-footer">
        <div class="footer-top">
          <img src="${data.clinic.logo}" alt="${data.clinic.name} Logo" class="footer-logo">
          <nav class="footer-nav" aria-label="Footer navigation">
            ${data.nav.map((item) => `<a href="${item.url}">${item.label}</a>`).join("")}
          </nav>
          <a class="footer-cta" href="contact.html">Book Appointment</a>
        </div>
        <div class="footer-main">
          <section>
            <h3>Meet Dr. ${data.doctor.name}</h3>
            <p><strong>${data.doctor.qualification}</strong></p>
            <p>${data.doctor.bio}</p>
          </section>
          <section>
            <h3>Get In Touch</h3>
            <p><strong>Address</strong><br>${data.clinic.address}<br>${data.clinic.location}</p>
            <div class="footer-hours">
              <strong>Clinic Hours</strong>
              ${data.clinic.hours.map((item) => `<p><span>${item.days}</span><em>${item.time}</em></p>`).join("")}
            </div>
            <p><strong>Phone</strong><br><a href="${data.clinic.phoneUrl}">${data.clinic.phone}</a></p>
            <p><strong>Email</strong><br><a href="mailto:${data.clinic.email}">${data.clinic.email}</a></p>
          </section>
          <section>
            <h3>Help</h3>
            <div class="footer-link-list">
              ${data.footerLinks.map((item) => `<a href="${item.url}">${item.label}</a>`).join("")}
            </div>
          </section>
        </div>
      </footer>
    `;
  }

  function button(label, url, type = "primary") {
    return `<a class="button ${type}" href="${url}">${label}</a>`;
  }

  function whatsappIcon() {
    return html`
      <svg class="whatsapp-icon" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <path d="M16.04 3.2A12.72 12.72 0 0 0 5.1 22.46L3.2 29l6.7-1.76A12.72 12.72 0 1 0 16.04 3.2Zm0 22.92a10.17 10.17 0 0 1-5.18-1.42l-.37-.22-3.98 1.04 1.06-3.88-.25-.4A10.17 10.17 0 1 1 16.04 26.12Zm5.58-7.62c-.3-.15-1.8-.89-2.08-.99-.28-.1-.48-.15-.68.15-.2.3-.78.99-.96 1.19-.18.2-.35.23-.65.08-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.78-1.68-2.08-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.68-1.64-.93-2.25-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.53.08-.81.38-.28.3-1.06 1.04-1.06 2.53s1.09 2.94 1.24 3.14c.15.2 2.15 3.28 5.2 4.6.73.31 1.3.5 1.74.64.73.23 1.4.2 1.93.12.59-.09 1.8-.74 2.06-1.45.25-.71.25-1.32.17-1.45-.07-.13-.27-.2-.58-.35Z"/>
      </svg>
    `;
  }

  function pageHero(eyebrow, title, text) {
    return html`
      <section class="page-hero">
        ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ""}
        <h1>${title}</h1>
        <p>${text}</p>
      </section>
    `;
  }

  function checkList(items, extraClass = "") {
    return html`
      <ul class="check-list ${extraClass}">
        ${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
    `;
  }

  function treatmentIcon(title) {
    const icons = {
      "Chemical Peeling": `<path d="M45 42c18 9 44 9 62 0 0 28-12 48-31 60-19-12-31-32-31-60Z"/><path d="M60 62c10 5 22 5 32 0"/>`,
      "PRP Therapy": `<path d="M52 30h48v18H52z"/><path d="M60 48v52c0 8 8 14 16 14s16-6 16-14V48"/><path d="M60 78h32"/><path d="M76 58v36"/>`,
      "GFC Treatment": `<path d="M76 28c16 18 28 36 28 54a28 28 0 0 1-56 0c0-18 12-36 28-54Z"/><path d="M64 82h24"/><path d="M76 70v24"/>`,
      "Mesotherapy": `<path d="M42 94l62-62"/><path d="M88 24l16 16"/><path d="M34 102l16 16"/><path d="M56 80l22 22"/><path d="M54 46l36 36"/>`,
      "Microneedling": `<path d="M44 40h64v56H44z"/><path d="M56 40V28h40v12"/><path d="M56 58v18M68 58v28M80 58v18M92 58v28"/>`,
      "Laser Hair Reduction": `<path d="M40 88h34l34-48"/><path d="M82 52l24 18"/><path d="M42 104c18-8 44-8 68 0"/><path d="M40 76c10 2 20 2 30 0"/>`,
      "Carbon Laser Peel": `<path d="M46 88c12-30 48-30 60 0"/><path d="M54 56c12-12 32-12 44 0"/><path d="M34 42h36"/><path d="M70 42l16 24"/><path d="M108 30l-26 36"/>`,
      "Medical Hydra Facial": `<path d="M76 28c16 18 26 34 26 50a26 26 0 1 1-52 0c0-16 10-32 26-50Z"/><path d="M58 82c10 8 26 8 36 0"/><path d="M64 68h.1M88 68h.1"/>`,
      "Vampire Facial": `<path d="M76 30c16 18 26 34 26 50a26 26 0 1 1-52 0c0-16 10-32 26-50Z"/><path d="M76 58v34"/><path d="M62 76h28"/><path d="M54 102c12 12 32 12 44 0"/>`,
      "IV Glutathione": `<path d="M64 28h24v20H64z"/><path d="M58 48h36v46c0 12-8 22-18 22s-18-10-18-22V48Z"/><path d="M58 76h36"/><path d="M98 92h20v22"/>`,
      "Earlobe Repair": `<path d="M76 28c20 0 34 17 34 38 0 30-26 50-34 50s-34-20-34-50c0-21 14-38 34-38Z"/><path d="M76 58c8 0 14 6 14 14s-6 14-14 14-14-6-14-14 6-14 14-14Z"/><path d="M76 86v24"/>`,
      "Minor Cosmetic Surgery": `<path d="M42 92c20-34 48-48 76-42"/><path d="M46 104c28 8 54 2 76-18"/><path d="M60 62l40 40"/><path d="M94 40l22 22"/>`,
      "Nail Surgery": `<path d="M76 28c18 0 30 14 30 34v22c0 20-12 34-30 34S46 104 46 84V62c0-20 12-34 30-34Z"/><path d="M58 78h36"/><path d="M76 50v56"/><path d="M62 106c8 6 20 6 28 0"/>`,
      "Circumcision": `<path d="M48 76c12-20 44-20 56 0"/><path d="M44 92c18 18 46 18 64 0"/><path d="M76 42v46"/><path d="M58 58h36"/>`
    };
    return icons[title] || `<path d="M44 44h64v64H44z"/><path d="M56 76h40"/>`;
  }

  function treatmentVisual(treatment) {
    return html`
      <div class="treatment-visual" aria-hidden="true">
        <svg viewBox="0 0 152 152" focusable="false">
          ${treatmentIcon(treatment.title)}
        </svg>
        <span>${escapeHtml(treatment.title)}</span>
      </div>
    `;
  }

  function clinicHours() {
    return html`
      <div class="clinic-hours">
        ${data.clinic.hours.map((item) => html`
          <p><strong>${escapeHtml(item.days)}</strong><span>${escapeHtml(item.time)}</span></p>
        `).join("")}
      </div>
    `;
  }

  function treatmentCards(limit) {
    return data.treatments.slice(0, limit || data.treatments.length).map((treatment) => html`
      <article class="card">
        <div class="card-media">
          <img src="${escapeHtml(treatment.image)}" alt="${escapeHtml(treatment.title)} treatment at ${escapeHtml(data.clinic.name)}" loading="lazy" onerror="this.closest('.card-media').classList.add('image-missing'); this.remove();">
        </div>
        <div class="card-body">
          <span class="card-kicker">${escapeHtml(treatment.category || "Treatment")}</span>
          <h3>${escapeHtml(treatment.title)}</h3>
          <p>${escapeHtml(treatment.text)}</p>
        </div>
      </article>
    `).join("");
  }

  const pages = {
    home: () => html`
      <main>
        <section class="hero hero-full-cover">
          <video class="hero-video" src="${data.clinic.heroVideo}" poster="${data.clinic.heroPoster}" autoplay muted loop playsinline preload="auto" aria-hidden="true"></video>
          <div class="hero-overlay"></div>
          <div class="hero-content">
            <p class="eyebrow">Premium skin, hair and laser clinic in Chemmad</p>
            <h1>Refined dermatology and aesthetic care for healthier, confident skin.</h1>
            <p>Dermis Aesthetics provides personalised acne treatment, pigmentation care, dandruff treatment, scalp consultation and skin rejuvenation near Parappanangadi and Tirurangadi.</p>
            <div class="actions">
              ${button("Book Appointment", "contact.html")}
              <a class="button secondary call-button" href="${data.clinic.phoneUrl}">Call Now</a>
              ${button("View Treatments", "treatments.html", "secondary")}
            </div>
          </div>
        </section>

        <section class="section intro-grid section-soft">
          <div>
            <p class="eyebrow">About Dermis Aesthetics</p>
            <h2>Premium local care with a soft, medical-aesthetic approach.</h2>
          </div>
          <p>Conveniently located for patients from Chemmad, Parappanangadi, Tirurangadi and nearby areas, Dermis Aesthetics focuses on clean diagnosis, personalised treatment plans and graceful aesthetic outcomes.</p>
        </section>

        <section class="section">
          <div class="section-heading">
            <p class="eyebrow">Treatments</p>
            <h2>Skin, scalp and aesthetic services.</h2>
          </div>
          <div class="cards">${treatmentCards()}</div>
        </section>

        <section class="section split expertise-section">
          <div>
            <p class="eyebrow">Doctor and clinic expertise</p>
            <h2>Thoughtful care for visible skin concerns and long-term confidence.</h2>
            <p>Every skin and scalp concern has its own triggers. At Dermis Aesthetics, treatments are recommended after understanding your history, skin type, lifestyle and treatment goals.</p>
          </div>
          ${checkList(data.expertise)}
        </section>

        <section class="section">
          <div class="section-heading">
            <p class="eyebrow">Google Reviews</p>
            <h2>Patient experiences from Google.</h2>
          </div>
          <div class="testimonial-grid">
            ${data.googleReviews.map((item) => html`
              <article class="testimonial-card">
                <div class="stars" aria-label="${item.rating} out of 5 stars">${"★".repeat(item.rating)}</div>
                <p>“${escapeHtml(item.quote)}”</p>
                <strong>${escapeHtml(item.name)}</strong>
                <span>Google Review</span>
              </article>
            `).join("")}
          </div>
          <div class="review-actions">
            <a class="button primary" href="${data.clinic.googleProfile}" target="_blank" rel="noopener">View Google Reviews</a>
            <a class="button secondary" href="${data.clinic.googleProfile}" target="_blank" rel="noopener">Review Us on Google</a>
          </div>
        </section>

        <section class="section contact-grid contact-home">
          <div>
            <p class="eyebrow">Contact</p>
            <h2>Book a consultation at Dermis Aesthetics.</h2>
            <p><strong>Phone:</strong> ${data.clinic.phone}</p>
            <p><strong>WhatsApp:</strong> ${data.clinic.whatsapp}</p>
            <p><strong>Location:</strong> ${data.clinic.location}</p>
            <div class="actions">
              ${button("Book Appointment", "contact.html")}
              <a class="button secondary call-button" href="${data.clinic.phoneUrl}">Call Now</a>
              <a class="button outline whatsapp-button" href="${data.clinic.whatsappUrl}">${whatsappIcon()} Message on WhatsApp</a>
            </div>
          </div>
          <div class="map-wrap home-map" aria-label="Google Map location for ${data.clinic.name}">
            <div class="map-fallback">
              <strong>${data.clinic.name}</strong>
              <span>${data.clinic.address}, ${data.clinic.location}</span>
              <a class="button primary" href="${data.clinic.mapUrl}" target="_blank" rel="noopener">Open in Google Maps</a>
            </div>
            <iframe
              title="${data.clinic.name} Google Map"
              src="${data.clinic.mapEmbed}"
              width="600"
              height="450"
              style="border:0;"
              allowfullscreen
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </section>
      </main>
    `,

    about: () => html`
      <main>
        <section class="page-hero about-hero">
          <div>
            <p class="eyebrow">ABOUT THE CLINIC</p>
            <h1>Personalised care for skin, hair and laser wellness.</h1>
            <p>Dermis Aesthetics is a modern clinic focused on thoughtful consultation, advanced treatments, and comfortable care for every skin and hair concern.</p>
          </div>
          <img class="about-hero-image" src="assets/images/clinic-hero.jpg" alt="Modern dermatology clinic treatment room">
        </section>
        <section class="section split about-content">
          <div>
            <h2>Care built around your concern</h2>
            <p>We take time to understand your concern, explain suitable treatment options, and guide you with clear, personalised care.</p>
            <p>With years of clinical experience in skin, hair and aesthetic care, Dermis Aesthetics combines careful assessment with advanced treatment options in a calm, professional environment.</p>
          </div>
          <aside class="info-panel">
            <h3>Clinic Information</h3>
            <p><strong>${data.clinic.name}</strong><br>${data.clinic.tagline} Clinic<br>Chemmad, Kerala</p>
            <p><strong>Phone:</strong><br><a href="${data.clinic.phoneUrl}">${data.clinic.phone}</a></p>
          </aside>
        </section>
        <section class="section about-story">
          <div class="section-heading">
            <p class="eyebrow">Our Approach</p>
            <h2>Thoughtful dermatology and aesthetic care.</h2>
          </div>
          <div class="about-story-copy">
            <p>Dermis Aesthetics is a trusted skin and hair clinic in Chemmad, Malappuram, offering advanced dermatology and aesthetic treatments tailored to individual skin and hair concerns. With a focus on patient-centered care, the clinic combines medical expertise, modern technology, and personalized treatment plans to deliver safe, effective, and natural-looking results.</p>
            <p>At Dermis Aesthetics, every patient receives detailed attention from consultation to treatment. Our approach begins with understanding your skin type, concerns, lifestyle, and treatment goals before recommending the most suitable solutions. We believe that effective skin and hair care starts with the right diagnosis, honest guidance, and treatments designed specifically for you.</p>
            <p>Our clinic provides treatment for a wide range of concerns including acne, pigmentation, acne scars, hair fall, dandruff, uneven skin tone, ageing skin, and other common dermatological conditions. Along with clinical skin care, Dermis Aesthetics also offers advanced aesthetic treatments aimed at enhancing skin health and confidence while maintaining natural results.</p>
            <p>Known for professional care and a comfortable patient experience, Dermis Aesthetics has become a preferred choice for people seeking expert skin and hair treatment in Malappuram. Our commitment is simple: to provide quality dermatology and aesthetic care with transparency, expertise, and lasting results.</p>
          </div>
        </section>
      </main>
    `,

    treatments: () => html`
      <main>
        ${pageHero(
          "",
          "Advanced skin, hair, laser and minor procedure services.",
          "Dermis Aesthetics offers personalised aesthetic and dermatology-focused treatments including peeling, PRP, GFC, mesotherapy, microneedling, laser hair reduction, hydra facial and selected minor procedures."
        )}
        <section class="local-seo-note" aria-label="Clinic location">
          <p>Located on Kozhilode Road, Chemmad, Dermis Aesthetics is a skin, hair and laser clinic for patients seeking professional aesthetic care in the area.</p>
        </section>
        <section class="section treatment-list">${treatmentCards()}</section>
      </main>
    `,

    qa: () => html`
      <main>
        ${pageHero(
          "Questions and answers",
          "Skin and hair treatment Q&A.",
          "Find quick answers about our skin, hair, laser, and aesthetic treatments before your visit."
        )}
        <section class="section faq">
          ${data.faqs.map((faq, index) => html`
            <details ${index === 0 ? "open" : ""}>
              <summary>${escapeHtml(faq.question)}</summary>
              <p>${escapeHtml(faq.answer)}</p>
            </details>
          `).join("")}
        </section>
      </main>
    `,

    contact: () => html`
      <main>
        ${pageHero(
          "",
          "Let’s Connect",
          "Book appointments and consultations for skin, hair, and aesthetic treatments."
        )}
        <section class="section contact-grid">
          <div class="contact-card">
            <h2>Clinic Details</h2>
            <p><strong>${data.clinic.name}</strong></p>
            <p>${data.clinic.location}<br>${data.clinic.address}</p>
            <p><strong>Phone:</strong> ${data.clinic.phone}</p>
            <div class="hours-block">
              <strong>Clinic Opens</strong>
              ${clinicHours()}
            </div>
            <div class="contact-actions">
              <a class="button primary whatsapp-button" href="${data.clinic.whatsappUrl}">${whatsappIcon()} Chat on WhatsApp</a>
              <a class="button secondary call-button" href="${data.clinic.phoneUrl}">Call Now</a>
            </div>
            <p><a href="${data.clinic.googleProfile}" target="_blank" rel="noopener">View Dermis Aesthetics on Google</a></p>
          </div>
      <div class="map-wrap" aria-label="Google Map location for ${data.clinic.name}">
        <div class="map-fallback">
          <strong>${data.clinic.name}</strong>
          <span>${data.clinic.address}, ${data.clinic.location}</span>
          <a class="button primary" href="${data.clinic.mapUrl}" target="_blank" rel="noopener">Open in Google Maps</a>
        </div>
        <iframe
          title="${data.clinic.name} Google Map"
          src="${data.clinic.mapEmbed}"
              width="600"
              height="450"
              style="border:0;"
              allowfullscreen
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </section>

        <section class="section citation-list">
          <h2>Local listing consistency checklist</h2>
          <p>Use the exact same clinic name, address and phone number everywhere. This improves local search trust.</p>
          ${checkList(data.clinic.listings, "columns")}
        </section>
      </main>
    `
  };

  root.innerHTML = renderHeader() + (pages[page] || pages.home)() + renderFooter();

  const menuToggle = document.querySelector(".menu-toggle");
  const headerRight = document.querySelector(".header-right");
  if (menuToggle && headerRight) {
    menuToggle.addEventListener("click", () => {
      const isOpen = headerRight.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  const heroVideo = document.querySelector(".hero-video");
  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.load();
    heroVideo.play().catch(() => {});
  }
})();
