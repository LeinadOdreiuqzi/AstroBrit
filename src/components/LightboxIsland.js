class LightboxIsland extends HTMLElement {
  static get observedAttributes() {
    return ["open", "items", "indices", "layout"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._open = false;
    this._items = [];
    this._indices = null; // optional: array of positions to render
    this._layout = null; // optional: array of { index, className }
    this._prevFocus = null;
    this._contentEl = null;
    this._wheelHandler = null;
    this._leftHandler = null;
    this._rightHandler = null;
    this._scrollHandler = null;
    this._scrollRaf = 0;
    this._fullEl = null;
    this._fullOpen = false;

    this._onKeydown = this._onKeydown.bind(this);
    this._onClose = this._onClose.bind(this);
  }

  attributeChangedCallback(name, _old, value) {
    if (name === "open") {
      this._open = value !== null;
      this._syncOpenState();
    } else if (name === "items") {
      try {
        this._items = JSON.parse(value || "[]");
      } catch {
        this._items = [];
      }
      this._render();
    } else if (name === "indices") {
      try {
        this._indices = value ? JSON.parse(value) : null;
      } catch {
        this._indices = null;
      }
      this._render();
    } else if (name === "layout") {
      try {
        this._layout = value ? JSON.parse(value) : null;
      } catch {
        this._layout = null;
      }
      this._render();
    }
  }

  connectedCallback() {
    if (!this.shadowRoot.innerHTML) {
      this._render();
      this._syncOpenState();
    }
  }

  open() {
    if (!this.hasAttribute("open")) this.setAttribute("open", "");
    // focus handling
    this._prevFocus = document.activeElement;
    const closeBtn = this.shadowRoot.querySelector(".lightbox-close");
    closeBtn?.focus();
    document.addEventListener("keydown", this._onKeydown);
    this._installFocusTrap();
    document.documentElement.classList.add("lb-open");
    document.body.classList.add("lb-open");
    this._installScrollHandlers();
    this._animateOpen();
  }

  close() {
    document.removeEventListener("keydown", this._onKeydown);
    this._removeFocusTrap();
    const root = this.shadowRoot.querySelector(".lightbox");
    const g = window.gsap;
    if (g && root) {
      g.to(root, { autoAlpha: 0, y: 18, duration: 0.35, ease: "power2.in", onComplete: () => {
        document.documentElement.classList.remove("lb-open");
        document.body.classList.remove("lb-open");
        this.removeAttribute("open");
        if (this._prevFocus && typeof this._prevFocus.focus === "function") {
          try { this._prevFocus.focus(); } catch {}
        }
        this._removeScrollHandlers();
        g.set(root, { clearProps: "opacity,transform" });
      }});
    } else {
      document.documentElement.classList.remove("lb-open");
      document.body.classList.remove("lb-open");
      this.removeAttribute("open");
      if (this._prevFocus && typeof this._prevFocus.focus === "function") {
        try { this._prevFocus.focus(); } catch {}
      }
      this._removeScrollHandlers();
    }
  }

  _onKeydown(e) {
    if (e.key === "Escape") {
      if (this._fullOpen) this._closeFull();
      else this.close();
    }
    if (!this._fullOpen && e.key === "ArrowRight") this._scrollBy(1);
    if (!this._fullOpen && e.key === "ArrowLeft") this._scrollBy(-1);
  }

  _onClose() {
    this.close();
  }

  _getRenderableItems() {
    const items = Array.isArray(this._items) ? this._items : [];
    // If layout provided, it wins and dictates order and classes
    if (Array.isArray(this._layout) && this._layout.length) {
      const used = new Set();
      const laidOut = this._layout
        .map((entry, pos) => {
          const idx = entry?.index;
          const data = typeof idx === "number" ? items[idx] : null;
          if (!data) return null;
          used.add(idx);
          return { data, className: entry.className || "", key: `l-${pos}-${idx}` };
        })
        .filter(Boolean);

      const remaining = items
        .map((data, idx) => ({ data, className: "", key: `r-${idx}` }))
        .filter((_, idx) => !used.has(idx));

      return laidOut.concat(remaining);
    }
    // Else, if indices provided, use those in order
    if (Array.isArray(this._indices) && this._indices.length) {
      return this._indices
        .map((i, pos) => {
          const data = items[i];
          if (!data) return null;
          return { data, className: "", key: `i-${pos}-${i}` };
        })
        .filter(Boolean);
    }
    // Default: all items in given order
    return items.map((data, pos) => ({ data, className: "", key: `d-${pos}` }));
  }

  _installFocusTrap() {
    this._focusTrapHandler = (e) => {
      if (e.key !== "Tab") return;
      const root = this.shadowRoot;
      const focusables = root.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const list = Array.from(focusables).filter((el) => !el.hasAttribute("disabled"));
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    this.shadowRoot.addEventListener("keydown", this._focusTrapHandler);
  }

  _removeFocusTrap() {
    if (this._focusTrapHandler) {
      this.shadowRoot.removeEventListener("keydown", this._focusTrapHandler);
      this._focusTrapHandler = null;
    }
  }

  _syncOpenState() {
    const root = this.shadowRoot.querySelector(".lightbox");
    if (!root) return;
    const opened = this._open;
    root.toggleAttribute("hidden", !opened);
    root.setAttribute("aria-hidden", String(!opened));
  }

  _render() {
    const items = this._getRenderableItems();
    const first = items[0] && (items[0].data || items[0]);
    const rest = items.slice(1);
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: contents; }
        .lightbox { position: fixed; inset: 0; background: radial-gradient(1200px 80% at 50% 40%, rgba(255,128,0,0.08) 0%, rgba(32,16,8,0.96) 60%, rgba(24,12,6,0.98) 100%); backdrop-filter: blur(6px); display: flex; flex-direction: column; height: 100vh; width: 100vw; z-index: 1000; overflow: hidden; }
        .lightbox[hidden] { display: none; }
        .lightbox-close { align-self: flex-end; margin: 16px; appearance: none; border: none; background: rgba(255,255,255,.15); color: #fff; font-size: 22px; width: 36px; height: 36px; border-radius: 50%; cursor: pointer; flex-shrink: 0; }
        
        .lightbox-content { flex: 1; overflow-x: auto; overflow-y: hidden; padding: 32px 48px 40px; display: flex; flex-direction: row; align-items: stretch; gap: 32px; height: 100%; box-sizing: border-box; }
        .hero { flex: 0 0 auto; display: grid; grid-template-columns: minmax(0, 1fr) 420px; gap: 20px; width: min(1200px, 92vw); height: min(70vh, 640px); border-radius: 16px; }
        .hero-media { position: relative; border-radius: 16px; overflow: hidden; background: #111; }
        .hero-media img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .hero-info { display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start; text-align: left; padding: 20px 22px; color: #fff; background: transparent; border-radius: 16px; }
        .hero-caption { font-size: clamp(0.9rem, 1.6vw, 1.05rem); font-weight: 600; color: rgba(255,180,90,0.95); letter-spacing: 0.3px; margin: 0 0 6px; }
        .hero-title { font-size: clamp(1.6rem, 2.6vw, 2.2rem); font-weight: 800; margin: 0 0 10px; line-height: 1.15; }
        .hero-sub { font-size: clamp(1rem, 1.8vw, 1.15rem); opacity: .92; line-height: 1.4; }
        .gallery-items { flex: 0 0 auto; display: flex; flex-direction: row; align-items: flex-start; gap: 52px; height: 100%; perspective: 800px; padding-top: 24px; }
        .gi-item { position: relative; flex: 0 0 auto; border-radius: 12px; overflow: hidden; background: #111; transform: translateY(calc(var(--y,0px) + var(--hy,0px))) translateZ(0) scale(var(--s,1)) rotate(var(--r,0deg)); transition: transform .25s ease, box-shadow .25s ease; box-shadow: 0 10px 24px rgba(0,0,0,.35); }
        .gi-item:not(:first-child) { margin-left: var(--ml,0px); }
        .gi-item:hover { --s: 1.02; --hy: -4px; z-index: 2; box-shadow: 0 14px 32px rgba(0,0,0,.45); }
        .gi-item:hover img { filter: brightness(1.06) saturate(1.04); }
        .gi-item img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .gi-item { z-index: var(--z,1); margin-top: var(--mt,0px); }
        .gi-xl { width: 420px; height: 300px; }
        .gi-lg { width: 360px; height: 240px; }
        .gi-md { width: 280px; height: 200px; }
        .gi-sm { width: 200px; height: 160px; }
        .full-view { position: fixed; inset: 0; background: rgba(0,0,0,.92); display: grid; place-items: center; z-index: 1001; }
        .full-view[hidden] { display: none; }
        .full-view img { max-width: min(92vw, 1400px); max-height: 86vh; object-fit: contain; border-radius: 8px; background: #000; }
        .full-close { position: absolute; top: 16px; right: 16px; appearance: none; border: none; background: rgba(255,255,255,.18); color: #fff; font-size: 26px; width: 44px; height: 44px; border-radius: 50%; cursor: pointer; }
        @media (max-width: 860px) { .hero { grid-template-columns: 1fr; height: auto; } .hero-info { height: auto; } }
      </style>
      <div class="lightbox" role="dialog" aria-modal="true" hidden aria-hidden="true">
        <button class="lightbox-close" aria-label="Cerrar">×</button>
        
        <div class="lightbox-content">
          ${(() => {
            const fid = (first && (first.id || "hero")) || "hero";
            const falt = (first && (first.title || "Imagen")) || "Imagen";
            const fsrc = (first && first.src) || "/assets/servi.webp";
            const ftitle = (first && first.title) || "";
            const fsub = (first && first.subtitle) || "";
            const fcap = "Spawn Britannia CocoCraft";
            return `<section class=\"hero\" data-id=\"${fid}\"><div class=\"hero-media\"><img alt=\"${falt}\" loading=\"eager\" src=\"${fsrc}\" /></div><aside class=\"hero-info\"><div class=\"hero-caption\">${fcap}</div><h2 class=\"hero-title\">${ftitle}</h2><p class=\"hero-sub\">${fsub}</p></aside></section>`;
          })()}
          <section class="gallery-items">
            ${(() => {
              const count = rest.length;
              return rest.map((entry, i) => {
                const it = entry.data || entry;
                const id = (it && it.id) || `it-${i+1}`;
                const alt = (it && (it.title || "Imagen")) || "Imagen";
                const src = (it && it.src) || "/assets/servi.webp";
                const ratio = count > 1 ? i / (count - 1) : 0;
                const cycle = ["gi-md","gi-xl","gi-sm","gi-lg","gi-md","gi-lg","gi-xl","gi-sm"];
                const cls = cycle[i % cycle.length];
              const amp = 46;
              const wave = Math.sin(i * 0.85) * amp;
              const jitter = (Math.random() * 24) - 12;
              const off = Math.round(wave + jitter);
              const rotBase = Math.cos(i * 0.9) * 3 + ((Math.random() * 3) - 1.5);
              const rot = Math.round(rotBase * 100) / 100;
              const scl = 1 + (Math.sin(i * 0.6) * 0.03) + ((Math.random() * 0.02) - 0.01);
              const px = (cls === "gi-xl" ? 0.06 : cls === "gi-lg" ? 0.07 : cls === "gi-md" ? 0.08 : 0.09) * (i % 2 === 0 ? 1 : -1);
              const z = cls === "gi-xl" ? 4 : cls === "gi-lg" ? 3 : cls === "gi-md" ? 2 : 1;
              const baseH = cls === "gi-xl" ? 420 : cls === "gi-lg" ? 340 : cls === "gi-md" ? 260 : 180;
              const hJitter = Math.round((Math.sin(i * 0.65) * 40) + ((Math.random() * 120) - 60));
              const h = Math.max(160, baseH + hJitter);
              const mtAmp = 120;
              const mtWave = Math.sin(i * 0.7) * mtAmp;
              const mtJ = (Math.random() * 80) - 20;
              const mt = Math.max(0, Math.round(mtWave + mtJ));
              const ml = 0;
                return `<article class=\"gi-item ${cls}\" data-id=\"${id}\" data-parallax=\"${px}\" data-base-offset=\"${off}\" data-rot=\"${rot}\" style=\"--y:${off}px; --ml:${ml}px; --mt:${mt}px; --r:${rot}deg; --s:${scl}; --z:${z}; height:${h}px;\"><img alt=\"${alt}\" loading=\"lazy\" src=\"${src}\" /></article>`;
              }).join("");
            })()}
          </section>
        </div>
        <div class="full-view" hidden aria-hidden="true">
          <button class="full-close" aria-label="Cerrar imagen">×</button>
          <img alt="Imagen" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==" />
        </div>
      </div>
    `;

    const closeBtn = this.shadowRoot.querySelector(".lightbox-close");
    closeBtn?.addEventListener("click", this._onClose, { once: false });
    this._contentEl = this.shadowRoot.querySelector(".lightbox-content");
    
    this._fullEl = this.shadowRoot.querySelector(".full-view");
    const fullClose = this.shadowRoot.querySelector(".full-close");
    fullClose?.addEventListener("click", () => this._closeFull());
    const tiles = Array.from(this.shadowRoot.querySelectorAll(".gi-item"));
    tiles.forEach((t) => {
      t.addEventListener("click", () => {
        const img = t.querySelector("img");
        const src = img?.getAttribute("src") || "";
        const alt = img?.getAttribute("alt") || "Imagen";
        this._openFull(src, alt);
      });
    });
  }

  _animateOpen() {
    const root = this.shadowRoot.querySelector(".lightbox");
    const hero = this.shadowRoot.querySelector(".hero");
    const items = Array.from(this.shadowRoot.querySelectorAll(".gi-item"));
    const g = window.gsap;
    if (!g || !root) return;
    g.set(root, { autoAlpha: 0, y: 14 });
    g.to(root, { autoAlpha: 1, y: 0, duration: 0.45, ease: "power3.out" });
    if (hero) g.from(hero, { autoAlpha: 0, y: 12, duration: 0.4, ease: "power3.out" }, "<0.05");
    if (items.length) g.from(items, { autoAlpha: 0, y: 20, duration: 0.5, ease: "power3.out", stagger: 0.05 }, "<0.05");
  }

  _openFull(src, alt) {
    const el = this._fullEl || this.shadowRoot.querySelector(".full-view");
    if (!el) return;
    const img = el.querySelector("img");
    if (img) {
      img.setAttribute("src", src || "");
      img.setAttribute("alt", alt || "Imagen");
    }
    el.removeAttribute("hidden");
    el.setAttribute("aria-hidden", "false");
    this._fullOpen = true;
    const g = window.gsap;
    if (g) {
      g.set(el, { autoAlpha: 0 });
      if (img) g.set(img, { scale: 0.96, autoAlpha: 0 });
      g.to(el, { autoAlpha: 1, duration: 0.2, ease: "power2.out" });
      if (img) g.to(img, { autoAlpha: 1, scale: 1, duration: 0.3, ease: "power3.out" }, "<0.05");
    }
  }

  _closeFull() {
    const el = this._fullEl || this.shadowRoot.querySelector(".full-view");
    if (!el) return;
    const g = window.gsap;
    if (g) {
      const img = el.querySelector("img");
      g.to(img || el, {
        autoAlpha: 0,
        scale: 0.96,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          el.setAttribute("hidden", "");
          el.setAttribute("aria-hidden", "true");
          this._fullOpen = false;
          if (img) g.set(img, { clearProps: "opacity,transform" });
          g.set(el, { clearProps: "opacity" });
        }
      });
    } else {
      el.setAttribute("hidden", "");
      el.setAttribute("aria-hidden", "true");
      this._fullOpen = false;
    }
  }

  _installScrollHandlers() {
    const el = this._contentEl;
    if (!el) return;
    this._wheelHandler = (e) => {
      if (!this._open) return;
      const d = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (d === 0) return;
      e.preventDefault();
      const target = el.scrollLeft + d;
      const g = window.gsap;
      if (g) g.to(el, { scrollLeft: target, duration: 0.35, ease: "power3.out" });
      else el.scrollLeft = target;
    };
    el.addEventListener("wheel", this._wheelHandler, { passive: false });
    const tiles = Array.from(this.shadowRoot.querySelectorAll(".gi-item"));
    this._scrollHandler = () => {
      if (this._scrollRaf) return;
      this._scrollRaf = requestAnimationFrame(() => {
        const x = el.scrollLeft;
        for (const t of tiles) {
          const base = parseFloat(t.dataset.baseOffset || "0");
          const p = parseFloat(t.dataset.parallax || "0");
          const y = base + x * p * 0.06;
          t.style.setProperty("--y", y + "px");
          const bRot = parseFloat(t.dataset.rot || "0");
          const r = bRot + x * p * 0.003;
          t.style.setProperty("--r", r + "deg");
        }
        this._scrollRaf = 0;
      });
    };
    el.addEventListener("scroll", this._scrollHandler, { passive: true });
  }

  _removeScrollHandlers() {
    const el = this._contentEl;
    if (el && this._wheelHandler) el.removeEventListener("wheel", this._wheelHandler);
    if (el && this._scrollHandler) el.removeEventListener("scroll", this._scrollHandler);
    this._wheelHandler = null;
    this._scrollHandler = null;
  }

  _scrollBy(dir) {
    const el = this._contentEl;
    if (!el) return;
    const step = Math.max(240, Math.floor(el.clientWidth * 0.9));
    const target = el.scrollLeft + step * dir;
    const g = window.gsap;
    if (g) g.to(el, { scrollLeft: target, duration: 0.45, ease: "power2.out" });
    else el.scrollLeft = target;
  }
}

if (!customElements.get("lightbox-island")) {
  customElements.define("lightbox-island", LightboxIsland);
}
