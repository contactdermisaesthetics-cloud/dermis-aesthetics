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
    const headerCta = "";

    return html`
      <header class="site-header">
        <a class="brand logo-container" href="/" aria-label="${data.clinic.name} home">
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
          ${headerCta}
        </div>
      </header>
    `;
  }

  function renderFooter() {
    return html`
      <footer class="site-footer dermis-clean-footer">
        <div class="footer-contact-row">
          <section>
            <h3>Opening Hours</h3>
            <p>Monday to Saturday</p>
            <p>4:30 PM - 8:30 PM</p>
            <p>Sunday: 11:30 AM - 2:00 PM</p>
          </section>
          <section>
            <h3>Call Us</h3>
            <p><a href="${data.clinic.phoneUrl}">${data.clinic.phone}</a></p>
          </section>
          <section>
            <h3>Email Us</h3>
            <p><a href="mailto:${data.clinic.email}">${data.clinic.email}</a></p>
          </section>
        </div>
        <div class="footer-divider" aria-hidden="true"></div>
        <div class="footer-link-row">
          <section>
            <h3>Overview</h3>
            <a href="/">Home</a>
            <a href="about.html">About</a>
            <a href="treatments.html">Treatments</a>
            <a href="blog.html">Blog</a>
            <a href="qa.html">FAQ</a>
            <a href="contact.html">Contact</a>
          </section>
          <section>
            <h3>Quick Help</h3>
            <a href="${data.clinic.whatsappUrl}" target="_blank" rel="noopener">WhatsApp Now</a>
            <a href="${data.clinic.phoneUrl}">Enquire Now</a>
            <a href="${data.clinic.googleProfile}" target="_blank" rel="noopener">Google Profile</a>
            <a href="${data.clinic.mapUrl}" target="_blank" rel="noopener">Location</a>
          </section>
          <section>
            <h3>Office</h3>
            <p>${data.clinic.address},<br>${data.clinic.location}</p>
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

  function renderWhatsAppPopup() {
    return html`
      <button class="whatsapp-float" type="button" aria-label="Open WhatsApp chat">
        ${whatsappIcon()}
      </button>
      <aside class="whatsapp-popup" aria-live="polite" aria-label="WhatsApp appointment message">
        <button class="whatsapp-popup-close" type="button" aria-label="Close WhatsApp message">&times;</button>
        <div class="whatsapp-popup-icon">${whatsappIcon()}</div>
        <div class="whatsapp-popup-copy">
          <strong>Need help booking?</strong>
          <span>Tell us your concern and continue on WhatsApp.</span>
        </div>
        <label class="whatsapp-popup-field">
          <span>Your concern or question</span>
          <textarea rows="3" placeholder="Example: I need acne treatment consultation"></textarea>
        </label>
        <a class="whatsapp-popup-button" href="${data.clinic.whatsappUrl}" target="_blank" rel="noopener">
          ${whatsappIcon()} Chat on WhatsApp
        </a>
      </aside>
    `;
  }

  function pageHero(eyebrow, title, text) {
    return html`
      <section class="page-hero">
        ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ""}
        <h1>${title}</h1>
        ${text ? `<p>${text}</p>` : ""}
      </section>
    `;
  }

  function renderWhatsAppChatbox() {
    return html`
      <button class="whatsapp-float" type="button" aria-label="Open WhatsApp chat">
        ${whatsappIcon()}
      </button>
      <aside class="whatsapp-popup whatsapp-chatbox" aria-live="polite" aria-label="WhatsApp chat preview">
        <div class="whatsapp-chat-header">
          <div class="whatsapp-chat-avatar">${whatsappIcon()}</div>
          <div class="whatsapp-chat-title">
            <strong>Dermis Aesthetics</strong>
          </div>
          <button class="whatsapp-popup-close" type="button" aria-label="Close WhatsApp chat">&times;</button>
        </div>
        <div class="whatsapp-chat-body">
          <div class="whatsapp-bubble incoming">Hi, welcome to Dermis Aesthetics.</div>
          <div class="whatsapp-bubble incoming">Tell us what is bothering you. We will guide you with the next step.</div>
        </div>
        <div class="whatsapp-chat-compose">
          <label class="sr-only" for="whatsappConcern">Your concern or question</label>
          <textarea id="whatsappConcern" class="whatsapp-chat-input" rows="1" placeholder="Type your concern"></textarea>
          <a class="whatsapp-popup-button" href="${data.clinic.whatsappUrl}" target="_blank" rel="noopener" aria-label="Send message on WhatsApp">
            <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
              <path d="M5 6.8 27 16 5 25.2v-7.4L17.5 16 5 14.2V6.8Z"/>
            </svg>
          </a>
        </div>
      </aside>
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

  function instagramShowcase() {
    const featuredReel = {
      title: "Check out our Instagram",
      label: "Testimonial",
      image: "assets/images/instagram-covers/dermis-featured-reel.jpg",
      url: "https://www.instagram.com/reel/DRRWjlyEXaU/",
      text: "Watch our latest Dermis Aesthetics reel and follow us for treatment videos, clinic updates and skin care guidance from our side."
    };

    const treatmentVideos = [
      {
        title: "Carbon laser treatment",
        label: "Treatment Reel",
        image: "assets/images/instagram-covers/carbon-laser-reel.jpg",
        url: "https://www.instagram.com/reel/DRFX-Zzk82n/",
        text: "See how carbon laser care is shown at Dermis Aesthetics."
      },
      {
        title: "Microneedling treatment",
        label: "Treatment Reel",
        image: "assets/images/instagram-covers/microneedling-reel.jpg",
        url: "https://www.instagram.com/reel/DVajMJ-Er5z/",
        text: "A short microneedling treatment video from Dermis Aesthetics."

      },
      {
        title: "PRP treatment",
        label: "Treatment Reel",
        image: "assets/images/instagram-covers/prp-reel.jpg",
        url: "https://www.instagram.com/reel/DQYtwMPkcSd/",
        text: "A short PRP treatment video from Dermis Aesthetics."

      }
    ];

    return html`
      <section class="section instagram-section">
        <article class="instagram-featured-card" aria-label="Featured Dermis Instagram reel">
          <a class="featured-reel-frame reel-cover-link" href="${escapeHtml(featuredReel.url)}" target="_blank" rel="noopener" aria-label="Open ${escapeHtml(featuredReel.title)} on Instagram">
            <img src="${escapeHtml(featuredReel.image)}" alt="${escapeHtml(featuredReel.title)}" loading="lazy">
            <span class="reel-play" aria-hidden="true"></span>
          </a>
          <div class="featured-reel-copy">
            <span>${escapeHtml(featuredReel.label)}</span>
            <h3>${escapeHtml(featuredReel.title)}</h3>
            <p class="instagram-featured-description">${escapeHtml(featuredReel.text)}</p>
            <a href="${escapeHtml(featuredReel.url)}" target="_blank" rel="noopener">Visit Instagram</a>
          </div>
        </article>
        <div class="instagram-reels treatment-video-grid" aria-label="Dermis treatment video showcase">
          ${treatmentVideos.map((reel) => html`
            <article class="instagram-card treatment-video-card">
              <a class="reel-frame reel-cover-link" href="${escapeHtml(reel.url)}" target="_blank" rel="noopener" aria-label="Open ${escapeHtml(reel.title)} on Instagram">
                <img src="${escapeHtml(reel.image)}" alt="${escapeHtml(reel.title)}" loading="lazy">
                <span class="reel-play" aria-hidden="true"></span>
              </a>
              <div class="reel-copy">
                <span>${escapeHtml(reel.label)}</span>
                <h3>${escapeHtml(reel.title)}</h3>
                <p>${escapeHtml(reel.text)}</p>

              </div>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }

  function testimonialMarquee() {
    const testimonials = [
      {
        quote: "I came in with dandruff and scalp irritation that kept returning. The team explained the possible causes clearly and guided me with a simple care plan.",
        name: "Dermis Patient",
        detail: "Scalp care visit",
        initials: "DP"
      },
      {
        quote: "The consultation felt calm and personal. My acne concern was heard properly before treatment options were explained.",
        name: "Dermis Patient",
        detail: "Acne care visit",
        initials: "AC"
      },
      {
        quote: "I liked that the process was explained before starting. It helped me understand what to expect and how to care for my skin after the session.",
        name: "Dermis Patient",
        detail: "Skin treatment visit",
        initials: "ST"
      },
      {
        quote: "The clinic experience felt comfortable and professional. The guidance was clear without pressure.",
        name: "Dermis Patient",
        detail: "Aesthetic care visit",
        initials: "DA"
      }
    ];
    const cards = testimonials.map((item) => html`
      <article class="testimonial-marquee-card">
        <span class="testimonial-quote-mark" aria-hidden="true">&ldquo;</span>
        <p>${escapeHtml(item.quote)}</p>
        <div class="testimonial-person">
          <span>${escapeHtml(item.initials)}</span>
          <div>
            <strong>${escapeHtml(item.name)}</strong>
            <small>${escapeHtml(item.detail)}</small>
          </div>
        </div>
      </article>
    `).join("");

    return html`
      <section class="section testimonial-marquee-section" aria-label="Patient experiences at Dermis Aesthetics">
        <div class="testimonial-marquee-heading">
          <span class="eyebrow">Patient Experiences</span>
          <h2>What patients say after visiting Dermis.</h2>
        </div>
        <div class="testimonial-marquee-track" aria-hidden="false">
          <div class="testimonial-marquee-row">${cards}${cards}</div>
        </div>
      </section>
    `;
  }
  function homeFindUsSection() {
    const hours = data.clinic.hours.map((item) => html`
      <p><strong>${escapeHtml(item.days)}</strong><span>${escapeHtml(item.time)}</span></p>
    `).join("");

    return html`
      <section class="section home-find-section" aria-label="Find Dermis Aesthetics">
        <div class="home-find-info">
          <span class="eyebrow">Find Us</span>
          <h2>Visit Dermis Aesthetics</h2>

          <div class="home-find-list" aria-label="Clinic contact details">
            <a href="${escapeHtml(data.clinic.mapUrl)}" target="_blank" rel="noopener">
              <span>01</span>
              <p>${escapeHtml(data.clinic.address)}<br>${escapeHtml(data.clinic.location)}</p>
            </a>
            <a href="mailto:${escapeHtml(data.clinic.email)}">
              <span>02</span>
              <p>${escapeHtml(data.clinic.email)}</p>
            </a>
            <div>
              <span>03</span>
              <div class="home-find-hours">${hours}</div>
            </div>
          </div>
          <div class="home-find-map">
            <iframe src="${escapeHtml(data.clinic.mapEmbed)}" title="Dermis Aesthetics location map" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
        <form class="home-contact-form formspree-form" action="https://formspree.io/f/xzdnkebb" method="POST" aria-label="Send enquiry to Dermis Aesthetics">
          <input type="hidden" name="_subject" value="New Dermis Aesthetics website enquiry">
          <span class="eyebrow">Contact Dermis</span>
          <h2>Tell us your concern</h2>
          <label>
            <span>Your Name</span>
            <input type="text" name="name" placeholder="Your Name" autocomplete="name">
          </label>
          <label>
            <span>Your Phone</span>
            <input type="tel" name="phone" placeholder="Your Phone" autocomplete="tel">
          </label>
          <label>
            <span>Concern</span>
            <input type="text" name="subject" placeholder="Acne, hair fall, pigmentation...">
          </label>
          <label>
            <span>Message</span>
            <textarea name="message" rows="5" placeholder="Tell us briefly what you need help with"></textarea>
          </label>
          <button type="submit">Send Message</button>
        </form>
      </section>
    `;
  }
  function processSteps() {
    const steps = [
      ["01", "Consultation", "We begin by listening to your concern, history, goals and previous treatment experience."],
      ["02", "Analysis", "Your skin, hair or scalp concern is assessed before recommending suitable care options."],
      ["03", "Treatment", "A personalised plan is carried out with clear explanation, comfort and clinical guidance."],
      ["04", "Follow-up", "Maintenance advice and review support help protect progress and long-term confidence."]
    ];

    return steps.map(([number, title, text]) => html`
      <article class="process-step">
        <span>${number}</span>
        <h3>${title}</h3>
        <p>${text}</p>
      </article>
    `).join("");
  }
  function whyChooseCards() {
    const reasons = [
      {
        title: "Consultation-led care",
        text: "Every visit begins with careful listening, assessment and treatment choices suited to your concern.",
        icon: `<path d="M76 26c20 18 34 36 34 58a34 34 0 0 1-68 0c0-22 14-40 34-58Z"/><path d="M62 84h28"/><path d="M76 70v28"/>`
      },
      {
        title: "Personalised treatment planning",
        text: "Your skin type, history, lifestyle and goals are considered before recommending acne, pigmentation, hair or laser care.",
        icon: `<path d="M42 44h68v68H42z"/><path d="M58 62h36"/><path d="M58 78h28"/><path d="M58 94h20"/><path d="M104 36l12 12"/>`
      },
      {
        title: "Clear, honest guidance",
        text: "We explain what is suitable, what to expect and how to maintain results, so every decision feels informed.",
        icon: `<path d="M42 78l22 22 46-52"/><path d="M44 44c20-20 52-20 72 0"/><path d="M44 112c20 20 52 20 72 0"/>`
      },
      {
        title: "Modern aesthetic experience",
        text: "A calm clinic environment, advanced procedures and result-focused care designed around comfort and confidence.",
        icon: `<path d="M76 30v20"/><path d="M76 102v20"/><path d="M30 76h20"/><path d="M102 76h20"/><path d="M48 48l14 14"/><path d="M90 90l14 14"/><path d="M104 48 90 62"/><path d="M62 90l-14 14"/><circle cx="76" cy="76" r="18"/>`
      }
    ];

    return html`
      <div class="why-panel">
        <span>Dermis Care Standard</span>
        <strong>We guide you clearly before choosing any treatment.</strong>
        <p>Our aim is to make every patient feel informed, comfortable and confident before beginning care.</p>
      </div>
      <div class="why-feature-list">
        ${reasons.map((reason) => html`
          <article class="why-card">
            <span class="why-icon"><svg viewBox="0 0 152 152" aria-hidden="true" focusable="false">${reason.icon}</svg></span>
            <div>
              <h2>${escapeHtml(reason.title)}</h2>
              <p>${escapeHtml(reason.text)}</p>
            </div>
          </article>
        `).join("")}
      </div>
    `;
  }
  const pages = {
    home: () => html`
      <main>
        <section class="hero hero-full-cover">
          <video class="hero-video" data-src="${data.clinic.heroVideo}" poster="${data.clinic.heroPoster}" muted loop playsinline preload="none" aria-hidden="true"></video>
          <div class="hero-overlay"></div>
          <div class="hero-content">
            <h1 class="hero-styled-title"><span>Personal skin care</span><em>planned around you</em></h1>
            <p class="hero-short-line">Dermis Aesthetics listens first, checks your concern and explains appropriate skin, hair and laser care clearly.</p>
            <div class="actions hero-conversion-actions">
              <a class="button primary call-button" href="${data.clinic.phoneUrl}">Book Consultation</a>
              <a class="button secondary whatsapp-button" href="${data.clinic.whatsappUrl}" target="_blank" rel="noopener">${whatsappIcon()} WhatsApp Now</a>
            </div>
            <div class="hero-trust-row" aria-label="Dermis Aesthetics trust highlights">
              <span>Skin &amp; hair clinic</span>
              <span>Chemmad, Malappuram</span>
              <span>Assessment-first care</span>
            </div>
          </div>
        </section>

        <section class="section dermis-about-showcase" aria-label="Why choose Dermis Aesthetics">
          <div class="dermis-showcase-copy">
            <h2>Dermis Aesthetics <em>Where Confidence Begins</em></h2>
          </div>
          <figure class="dermis-showcase-portrait">
            <img src="assets/images/showcase/confident-glow-face.png" alt="Confident glowing face for Dermis Aesthetics skin care" loading="lazy">
          </figure>
          <div class="dermis-showcase-points">
            <article>
              <h3>Why Dermis Aesthetics</h3>
              <p>Every skin and hair concern is different. We listen first, understand your concern, and suggest care that feels personal, clear and appropriate for your concern.</p>
            </article>
            <article>
              <h3>Modern aesthetic care</h3>
              <p>Our clinic combines careful assessment, advanced treatment options and a calm patient experience for skin, hair, laser and aesthetic concerns.</p>
            </article>
          </div>
        </section>

        <section class="section home-treatments-section">
          <div class="home-treatments-title"><h2>Treatments</h2></div>
          <div class="treatment-list home-treatment-list">${treatmentCards()}</div>
          <div class="section-actions">
            ${button("View Full Treatments", "treatments.html", "secondary")}
          </div>
        </section>

        ${instagramShowcase()}


                ${homeFindUsSection()}
</main>
    `,

    about: () => html`
      <main>
        <section class="section about-choice-hero" aria-label="About Dermis Aesthetics">
          <div class="about-choice-media reveal-on-load">
            <img src="assets/images/showcase/confident-glow-face.png" alt="Healthy glowing skin care at Dermis Aesthetics in Chemmad" loading="eager">
          </div>
          <div class="about-choice-copy reveal-on-load">
            <p class="eyebrow">About the clinic</p>
            <article class="about-story-block">
              <h1>Why <em>Dermis Aesthetics?</em></h1>
              <p>Dermis Aesthetics is a skin, hair, laser and aesthetic clinic in Chemmad, Malappuram, focused on thoughtful assessment, comfortable care and treatment planning that feels personal to each patient.</p>
              <p>We care for concerns such as acne, pigmentation, hair fall, dandruff, tanning, acne marks, open pores, dull skin, unwanted hair and aesthetic needs after understanding your concern, history and clinical context.</p>
            </article>
            <article class="about-story-block">
              <h2>Why choose us?</h2>
              <p>Every visit begins with listening. We explain appropriate options in simple language, including expected sessions, aftercare, healing time and realistic improvement, so you can make decisions with confidence.</p>
              <p>Our approach combines modern treatment options such as chemical peeling, carbon laser peel, medical hydra facial, microneedling, PRP, GFC and laser hair reduction with calm, respectful patient guidance.</p>
            </article>
          </div>
        </section>
        <section class="section about-standards-section" aria-label="Dermis Aesthetics care standards">
          <article class="about-standard-card">
            <span class="about-standard-icon" aria-hidden="true">
              <svg viewBox="0 0 48 48"><path d="M10 12h28v18H22l-8 7v-7h-4V12Z"/></svg>
            </span>
            <h3>Assessment First</h3>
            <p>No treatment is recommended before understanding your concern, history and clinical context.</p>
          </article>
          <article class="about-standard-card">
            <span class="about-standard-icon" aria-hidden="true">
              <svg viewBox="0 0 48 48"><path d="M24 8a10 10 0 1 1 0 20 10 10 0 0 1 0-20Z"/><path d="m17 27-3 13 10-5 10 5-3-13"/></svg>
            </span>
            <h3>7 Years of Experience</h3>
            <p>Years of consistent clinic experience across skin, hair and aesthetic concerns.</p>
          </article>
          <article class="about-standard-card">
            <span class="about-standard-icon" aria-hidden="true">
              <svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="16"/><path d="M24 15v18M15 24h18"/></svg>
            </span>
            <h3>Transparent Guidance</h3>
            <p>Clear, upfront explanation of cost, sessions, downtime and aftercare.</p>
          </article>
          <article class="about-standard-card">
            <span class="about-standard-icon" aria-hidden="true">
              <svg viewBox="0 0 48 48"><path d="M12 26a12 12 0 0 1 24 0"/><path d="M9 30h30"/></svg>
            </span>
            <h3>Calm Clinic Setting</h3>
            <p>A private, comfortable space designed to make consultations easy and unhurried.</p>
          </article>
        </section>
        <section class="section meet-team-section" aria-label="Meet the Dermis Aesthetics team">
          <div class="meet-team-copy">
            <h2>Meet our <em>team</em></h2>
            <p>At Dermis Aesthetics, care is guided by clear consultation, thoughtful planning and a calm clinic experience. Our team helps patients understand their concern, prepare for treatment and follow aftercare with confidence.</p>
          </div>
          <div class="team-showcase" aria-label="Dermis Aesthetics care team">
            <article class="team-profile primary-profile">
              <div class="team-avatar photo-avatar"><img src="assets/images/team/dr-raoof-malayil.png" alt="Dr. Raoof Malayil, Clinic Lead at Dermis Aesthetics"></div>
              <h3>Dr. Raoof Malayil</h3>
              <p>MBBS, Clinic Lead</p>
              <span>Aesthetic skin and hair care guidance</span>
            </article>
          </div></section>

        <section class="section equipment-showcase" aria-label="Dermis Aesthetics equipment details">
          <div>
            <p class="eyebrow">Technology and equipment</p>
            <h2>Modern support for skin, hair and laser care.</h2>
          </div>

          <div class="equipment-card-grid" aria-label="Dermis Aesthetics treatment equipment">
            <article class="equipment-card">
              <img src="assets/images/equipment/hydra-facial-machine-product.png" alt="Hydra facial equipment at Dermis Aesthetics" loading="lazy">
              <div>
                <span>Facials &amp; glow</span>
                <h3>Hydra Facial</h3>
                <p>Used for cleansing, hydration and refreshed skin glow after assessment.</p>
              </div>
            </article>
            <article class="equipment-card">
              <img src="assets/images/equipment/laser-machine-product.png" alt="Laser treatment equipment at Dermis Aesthetics" loading="lazy">
              <div>
                <span>Laser care</span>
                <h3>Laser</h3>
                <p>Supports laser hair reduction and suitable laser-based skin procedures.</p>
              </div>
            </article>
            <article class="equipment-card">
              <img src="assets/images/equipment/carbon-laser-machine-product.png" alt="Carbon laser equipment at Dermis Aesthetics" loading="lazy">
              <div>
                <span>Carbon peel</span>
                <h3>Carbon Laser</h3>
                <p>Used for carbon laser peel planning where the skin check supports it.</p>
              </div>
            </article>
          </div>
        </section>
      </main>
    `,    treatments: () => html`
      <main>
        <section class="section treatment-list">${treatmentCards()}</section>
      </main>
    `,

    why: () => html`
      <main>
        <section class="why-hero">
          <div class="why-hero-inner">
            <p class="eyebrow">Why choose us</p>
            <h1>Why patients choose Dermis Aesthetics</h1>
            <p>We focus on clear communication, comfortable care and treatment planning that suits your concern.</p>
          </div>
          <div class="why-grid">
            ${whyChooseCards()}
          </div>
        </section>
        <section class="section why-detail">
          <div>
            <p class="eyebrow">Care approach</p>
            <h2>From consultation to follow-up, we stay clear with you.</h2>
          </div>
          <div>
            <p>At Dermis Aesthetics, we begin by listening. We understand your concern, explain suitable options and guide you with care that feels calm, professional and realistic.</p>
            <p>Whether you visit for acne, pigmentation, dandruff, hair fall, laser hair reduction or aesthetic skin treatments, our focus is clear planning, simple communication and steady follow-up.</p>
            <div class="actions">
              ${button("View Treatments", "treatments.html")}
              ${button("Contact Clinic", "contact.html", "secondary")}
            </div>
          </div>
        </section>
      </main>
    `,

    blog: () => {
      const posts = [
        {
          title: "Acne care starts with understanding your skin",
          category: "Acne & Skin Clarity",
          time: "3 min read",
          image: "https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?auto=compress&cs=tinysrgb&w=1200",
          text: "Breakouts, oily skin, acne marks and recurring pimples need a calm look at your skin type, routine and triggers before choosing care.",
          url: "treatments.html"
        },
        {
          title: "When dandruff keeps coming back",
          category: "Scalp Comfort",
          time: "2 min read",
          image: "https://images.pexels.com/photos/3993466/pexels-photo-3993466.jpeg?auto=compress&cs=tinysrgb&w=1200",
          text: "Flakes, itching and scalp irritation can have different causes. We explain what may be happening and how scalp care can be planned.",
          url: "treatments.html"
        },
        {
          title: "Pigmentation and dark spots: what to know",
          category: "Tone & Pigmentation",
          time: "3 min read",
          image: "assets/images/treatments/carbon-laser.jpg",
          text: "Dark spots, tanning, melasma and uneven tone are approached differently depending on your skin type and depth of pigmentation.",
          url: "treatments.html"
        },
        {
          title: "Hair fall care needs proper assessment",
          category: "Hair & Scalp",
          time: "3 min read",
          image: "assets/images/instagram-covers/prp-reel.jpg",
          text: "Hair fall may be linked to scalp health, stress, lifestyle, nutrition or history. The first step is understanding the reason clearly.",
          url: "treatments.html"
        },
        {
          title: "Hydra facial and skin glow treatments",
          category: "Skin Glow",
          time: "2 min read",
          image: "assets/images/instagram-covers/dermis-featured-reel.jpg",
          text: "Skin glow care should feel fresh and suitable for your skin. We explain what to expect before starting any facial treatment.",
          url: "treatments.html"
        },
        {
          title: "Laser hair reduction: simple patient guidance",
          category: "Laser Care",
          time: "3 min read",
          image: "assets/images/instagram-covers/carbon-laser-reel.jpg",
          text: "Laser hair reduction works best when sessions, skin type, hair growth and maintenance are explained properly from the beginning.",
          url: "treatments.html"
        },
        {
          title: "Microneedling for texture and acne marks",
          category: "Skin Texture",
          time: "2 min read",
          image: "assets/images/treatments/microneedling.jpg",
          text: "For texture concerns, microneedling may be discussed after checking sensitivity, goals and aftercare needs.",
          url: "treatments.html"
        },
        {
          title: "PRP and GFC care for appropriate hair concerns",
          category: "Regenerative Care",
          time: "3 min read",
          image: "assets/images/treatments/GFC.jpg",
          text: "PRP and GFC are discussed only after understanding the concern, scalp condition and whether the treatment is appropriate for the patient.",
          url: "treatments.html"
        }
      ];

      return html`
        <main class="blog-page">
          <h1 class="sr-only">Dermis Blog</h1>
          <section class="section blog-grid blog-grid-premium" aria-label="Dermis blog articles">
            ${posts.map((post, index) => html`
              <article class="blog-card ${index === 0 ? "featured-blog-card" : ""}">
                <a class="blog-card-media" href="${escapeHtml(post.url)}" aria-label="Read ${escapeHtml(post.title)}">
                  <img src="${escapeHtml(post.image)}" alt="${escapeHtml(post.title)}" loading="${index === 0 ? "eager" : "lazy"}" onerror="this.closest('.blog-card-media').classList.add('blog-image-missing'); this.remove();">
                  <span class="blog-image-label">${escapeHtml(post.category)}</span>
                </a>
                <div class="blog-card-body">
                  <div class="blog-meta"><span>${escapeHtml(post.category)}</span><small>${escapeHtml(post.time)}</small></div>
                  <h2>${escapeHtml(post.title)}</h2>
                  <p>${escapeHtml(post.text)}</p>
                  <a class="blog-read-link" href="${escapeHtml(post.url)}">Read more</a>
                </div>
              </article>
            `).join("")}
          </section>
        </main>
      `;
    },
    qa: () => html`
      <main>
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
      <main class="contact-page-standard">
        <section class="section contact-standard-section">
          <div class="contact-standard-intro">
            <div>
              <p class="eyebrow">Contact Dermis</p>
              <h1>Visit Dermis Aesthetics</h1>
            </div>
          </div>

          <div class="contact-standard-grid">
            <article class="contact-standard-card">
              <h2>Clinic Details</h2>
              <div class="contact-detail-list">
                <div>
                  <span>Clinic</span>
                  <strong>${data.clinic.name}</strong>
                </div>
                <div>
                  <span>Address</span>
                  <p>${data.clinic.address}<br>${data.clinic.location}</p>
                </div>
                <div>
                  <span>Phone</span>
                  <a href="${data.clinic.phoneUrl}">${data.clinic.phone}</a>
                </div>
                <div>
                  <span>Email</span>
                  <a href="mailto:${data.clinic.email}">${data.clinic.email}</a>
                </div>
              </div>

              <div class="contact-hours-panel">
                <strong>Clinic Hours</strong>
                ${clinicHours()}
              </div>

              <div class="contact-actions">
                <a class="button primary call-button" href="${data.clinic.phoneUrl}">Enquire Now</a>
                <a class="button secondary whatsapp-button" href="${data.clinic.whatsappUrl}" target="_blank" rel="noopener">${whatsappIcon()} WhatsApp</a>
              </div>
            </article>

            <article class="contact-map-card">
              <div class="contact-map-head">
                <div>
                  <p class="eyebrow">Location</p>
                  <h2>Find us easily</h2>
                </div>
                <a href="${data.clinic.mapUrl}" target="_blank" rel="noopener">Open in Google Maps</a>
              </div>
              <div class="map-wrap contact-map-wrap" aria-label="Google Map location for ${data.clinic.name}">
                <div class="map-fallback">
                  <strong>${data.clinic.name}</strong>
                  <span>${data.clinic.address}, ${data.clinic.location}</span>
                  <a class="button primary" href="${data.clinic.mapUrl}" target="_blank" rel="noopener">Open in Google Maps</a>
                </div>
                <iframe
                  title="${data.clinic.name} Google Map"
                  src="${data.clinic.mapEmbed}"
                  width="600"
                  height="520"
                  style="border:0;"
                  allowfullscreen
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </article>
          </div>
        </section>
      </main>
    `
  };

  root.innerHTML = renderHeader() + (pages[page] || pages.home)() + renderFooter() + renderWhatsAppChatbox();
  const revealTargets = document.querySelectorAll([
    "main .page-hero h1",
    "main .page-hero p",
    "main section:not(.hero) .eyebrow",
    "main section:not(.hero) h2",
    "main section:not(.hero) p",
    ".card",
    ".key-treatment-card",
    ".why-card",
    ".process-step",
    ".testimonial-card",
    ".blog-card",
    ".info-panel",
    ".service-page-links a",
    ".contact-card",
    ".map-wrap",
    ".final-cta-panel",
    ".home-find-section",
    ".home-contact-form"
  ].join(","));

  if (revealTargets.length) {
    document.body.classList.add("reveal-ready");
    revealTargets.forEach((element, index) => {
      element.classList.add("reveal-on-scroll");
      element.style.setProperty("--reveal-delay", `${Math.min(index % 5, 4) * 70}ms`);
    });

    if ("IntersectionObserver" in window) {
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            entry.target.classList.remove("is-visible");
          }
        });
      }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });

      revealTargets.forEach((element) => revealObserver.observe(element));
    } else {
      revealTargets.forEach((element) => element.classList.add("is-visible"));
    }
  }
  const popTargets = document.querySelectorAll(".dermis-showcase-portrait");
  if (popTargets.length) {
    popTargets.forEach((element) => element.classList.add("pop-on-scroll"));
    if ("IntersectionObserver" in window) {
      const popObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      }, { threshold: 0.28, rootMargin: "0px 0px -6% 0px" });
      popTargets.forEach((element) => popObserver.observe(element));
    } else {
      popTargets.forEach((element) => element.classList.add("is-visible"));
    }
  }




  const showcaseImage = document.querySelector(".dermis-showcase-portrait img");
  if (showcaseImage) {
    showcaseImage.style.removeProperty("--showcase-zoom");
  }
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
    const canUseHeroVideo = !navigator.connection?.saveData;
    if (canUseHeroVideo && heroVideo.dataset.src) {
      heroVideo.src = heroVideo.dataset.src;
      heroVideo.setAttribute("autoplay", "");
      const clipStart = Number(heroVideo.dataset.clipStart || 0);
      const clipEnd = Number(heroVideo.dataset.clipEnd || 0);
      const hasClipRange = Number.isFinite(clipStart) && Number.isFinite(clipEnd) && clipEnd > clipStart;

      const playHeroVideo = () => {
        heroVideo.muted = true;
        heroVideo.play().catch(() => {});
      };

      const jumpToClipStart = () => {
        if (hasClipRange && Math.abs(heroVideo.currentTime - clipStart) > 0.25) {
          heroVideo.currentTime = clipStart;
        }
      };

      heroVideo.addEventListener("loadedmetadata", () => {
        jumpToClipStart();
        playHeroVideo();
      });

      heroVideo.addEventListener("timeupdate", () => {
        if (hasClipRange && (heroVideo.currentTime >= clipEnd || heroVideo.currentTime < clipStart - 0.2)) {
          heroVideo.currentTime = clipStart;
          playHeroVideo();
        }
      });

      heroVideo.addEventListener("ended", () => {
        if (hasClipRange) heroVideo.currentTime = clipStart;
        playHeroVideo();
      });

      heroVideo.load();
      playHeroVideo();
    }
  }

  const reelVideos = document.querySelectorAll(".reel-frame video");
  if (reelVideos.length) {
    const playReel = (video) => {
      video.muted = true;
      video.play().catch(() => {});
    };

    if ("IntersectionObserver" in window) {
      const reelObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            playReel(video);
          } else {
            video.pause();
          }
        });
      }, { threshold: 0.45 });

      reelVideos.forEach((video) => reelObserver.observe(video));
    } else {
      reelVideos.forEach(playReel);
    }
  }
  const whatsappPopup = document.querySelector(".whatsapp-popup");
  const whatsappFloat = document.querySelector(".whatsapp-float");
  const whatsappPopupClose = document.querySelector(".whatsapp-popup-close");
  const whatsappPopupInput = document.querySelector(".whatsapp-chat-input");
  const whatsappPopupButton = document.querySelector(".whatsapp-popup-button");
  const defaultWhatsappText = "Hi Dermis Aesthetics, I would like to book an appointment.";
  const whatsappBaseUrl = "https://api.whatsapp.com/send?phone=918113860971&text=";
  const updateWhatsappMessage = () => {
    if (!whatsappPopupButton) return;
    const concern = whatsappPopupInput?.value.trim();
    const message = concern
      ? `Hi Dermis Aesthetics, I would like to ask about: ${concern}`
      : defaultWhatsappText;
    whatsappPopupButton.setAttribute("href", whatsappBaseUrl + encodeURIComponent(message));
  };
  if (whatsappFloat) {
    window.setTimeout(() => whatsappFloat.classList.add("is-visible"), 900);
    whatsappFloat.addEventListener("click", () => {
      whatsappFloat.classList.remove("is-visible");
      whatsappPopup?.classList.add("is-visible");
      whatsappPopupInput?.focus();
    });
  }
  whatsappPopupInput?.addEventListener("input", updateWhatsappMessage);
  updateWhatsappMessage();
  whatsappPopupButton?.addEventListener("click", (event) => {
    updateWhatsappMessage();
    const targetUrl = whatsappPopupButton.getAttribute("href");
    if (!targetUrl) return;
    event.preventDefault();
    window.open(targetUrl, "_blank", "noopener");
  });
  const formspreeForms = document.querySelectorAll(".formspree-form");
  formspreeForms.forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const button = form.querySelector("button[type='submit']");
      const status = form.querySelector(".form-status");
      const originalText = button?.textContent || "Send Message";
      if (button) {
        button.disabled = true;
        button.textContent = "Sending...";
      }
      if (status) {
        status.textContent = "";
        status.className = "form-status";
      }
      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" }
        });
        if (!response.ok) throw new Error("Form submission failed");
        form.reset();
        if (status) {
          status.textContent = "Thank you. Your enquiry has been sent to Dermis Aesthetics.";
          status.classList.add("is-success");
        }
      } catch (error) {
        if (status) {
          status.textContent = "Sorry, the message could not be sent. Please try WhatsApp or call us.";
          status.classList.add("is-error");
        }
      } finally {
        if (button) {
          button.disabled = false;
          button.textContent = originalText;
        }
      }
    });
  });
  const contactWhatsappForms = document.querySelectorAll(".contact-whatsapp-form");
  contactWhatsappForms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const name = String(formData.get("name") || "").trim();
      const phone = String(formData.get("phone") || "").trim();
      const subject = String(formData.get("subject") || "").trim();
      const message = String(formData.get("message") || "").trim();
      const lines = [
        "Hi Dermis Aesthetics, I would like to enquire about a consultation.",
        name ? `Name: ${name}` : "",
        phone ? `Phone: ${phone}` : "",
        subject ? `Concern: ${subject}` : "",
        message ? `Message: ${message}` : ""
      ].filter(Boolean);
      window.open(whatsappBaseUrl + encodeURIComponent(lines.join("\\n")), "_blank", "noopener");
    });
  });
  if (whatsappPopup && whatsappPopupClose) {
    whatsappPopupClose.addEventListener("click", () => {
      whatsappPopup.classList.remove("is-visible");
      whatsappFloat?.classList.add("is-visible");
    });
  }
})();

















































































