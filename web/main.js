/* =============================================================
   stackdigital — main.js
   Patrón IIFE, sin módulos. Cada init aislado en safe().
   El HTML ya trae todo el contenido: acá solo se anima y enriquece.
   ============================================================= */
(function () {
  "use strict";

  var data = window.__BRAND__ || {};

  var $  = function (sel, scope) { return (scope || document).querySelector(sel); };
  var $$ = function (sel, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(sel)); };
  var reduced   = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fineHover = matchMedia("(hover: hover) and (pointer: fine)").matches;

  function safe(fn, name) {
    try { fn(); } catch (e) { console.warn("[" + name + "]", e); }
  }

  /* ---------------------------------------------------------
     Navegación: fondo al scrollear + menú móvil
     --------------------------------------------------------- */
  function initNav() {
    var nav = $("[data-nav]");
    if (!nav) return;

    var onScroll = function () {
      nav.classList.toggle("is-stuck", window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initDrawer() {
    var toggle = $("[data-nav-toggle]");
    var drawer = $("[data-drawer]");
    if (!toggle || !drawer) return;

    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      drawer.hidden = !open;
      document.body.style.overflow = open ? "hidden" : "";
    };

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    drawer.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });

    // Si pasamos a escritorio, el drawer no debe quedar abierto
    matchMedia("(min-width: 960px)").addEventListener("change", function (ev) {
      if (ev.matches) setOpen(false);
    });
  }

  /* ---------------------------------------------------------
     Scroll suave nativo para anclas (sin Lenis)
     --------------------------------------------------------- */
  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute("href");
      if (!id || id === "#") return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      var navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-h"), 10) || 80;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - navH - 12,
        behavior: reduced ? "auto" : "smooth"
      });
    });
  }

  /* ---------------------------------------------------------
     Split de palabras — preserva <br> y elementos inline
     --------------------------------------------------------- */
  function escHTML(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function splitWords(el) {
    el.setAttribute("aria-label", el.textContent.trim().replace(/\s+/g, " "));

    var wrap = function (text) {
      return text.split(/(\s+)/).map(function (w) {
        return /^\s*$/.test(w) ? w
          : '<span class="split-word" aria-hidden="true">' + escHTML(w) + "</span>";
      }).join("");
    };

    var html = Array.prototype.slice.call(el.childNodes).map(function (node) {
      if (node.nodeType === 3) return wrap(node.textContent);
      if (node.nodeName === "BR") return "<br>";
      if (node.nodeType === 1) {
        var tag = node.tagName.toLowerCase();
        return "<" + tag + ">" + wrap(node.textContent) + "</" + tag + ">";
      }
      return "";
    }).join("");

    el.innerHTML = html;
    return $$(".split-word", el);
  }

  function initSplitText() {
    $$("[data-split]").forEach(function (el) {
      if (el.dataset.splitDone) return;
      el.dataset.splitDone = "1";
      el.classList.remove("reveal");           // defensa secundaria (la CSS es la principal)

      var words = splitWords(el);
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          words.forEach(function (w, i) {
            w.style.transitionDelay = Math.min(i * 28, 700) + "ms";
            w.classList.add("is-visible");
          });
          io.unobserve(entry.target);
        });
      }, { threshold: 0.01, rootMargin: "0px 0px -4% 0px" });

      io.observe(el);
    });
  }

  /* ---------------------------------------------------------
     Reveals al entrar en pantalla
     --------------------------------------------------------- */
  function initReveals() {
    var items = $$(".reveal:not([data-split])");
    if (!items.length) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var siblings = Array.prototype.slice.call(el.parentElement ? el.parentElement.children : []);
        var idx = siblings.indexOf(el);
        el.style.transitionDelay = Math.min(Math.max(idx, 0) * 70, 350) + "ms";
        el.classList.add("is-visible");
        io.unobserve(el);
      });
    }, { threshold: 0.01, rootMargin: "0px 0px -3% 0px" });

    items.forEach(function (el) { io.observe(el); });

    // Red de seguridad: a los 6s, revelar lo que siga oculto y ya esté en pantalla
    setTimeout(function () {
      $$(".reveal:not(.is-visible)").forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight * 1.2) {
          el.classList.add("is-visible");
        }
      });
      $$(".split-word:not(.is-visible)").forEach(function (w) {
        if (w.getBoundingClientRect().top < window.innerHeight * 1.2) {
          w.classList.add("is-visible");
        }
      });
    }, 6000);
  }

  /* ---------------------------------------------------------
     Gradiente que sigue al cursor
     --------------------------------------------------------- */
  function initMouseGradient() {
    var mesh = $("[data-mouse-gradient]");
    if (!mesh || !fineHover) return;

    var blobs = $$(".blob", mesh);
    if (!blobs.length) return;

    // Cada mancha se desplaza distinto, para que el fondo tenga profundidad
    var factores = [0.26, -0.18, 0.12];
    var tx = 0, ty = 0, cx = 0, cy = 0, raf = null;

    var loop = function () {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      for (var i = 0; i < blobs.length; i++) {
        var f = factores[i % factores.length];
        blobs[i].style.setProperty("--bx", (cx * f).toFixed(1) + "px");
        blobs[i].style.setProperty("--by", (cy * f).toFixed(1) + "px");
      }
      if (Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = null;
      }
    };

    window.addEventListener("mousemove", function (e) {
      tx = e.clientX - window.innerWidth / 2;
      ty = e.clientY - window.innerHeight / 2;
      if (!raf) raf = requestAnimationFrame(loop);
    }, { passive: true });
  }

  /* ---------------------------------------------------------
     Contadores de las métricas del caso
     --------------------------------------------------------- */
  function formatNum(n) {
    return Math.round(n).toLocaleString("es-AR");
  }

  function initCounters() {
    var nums = $$("[data-count]");
    if (!nums.length) return;

    var run = function (el) {
      var target = parseFloat(el.dataset.count);
      if (isNaN(target)) return;
      var prefix = el.dataset.prefix || "";
      var dur = 1500;
      var t0 = null;

      var step = function (ts) {
        if (t0 === null) t0 = ts;
        var p = Math.min((ts - t0) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = prefix + formatNum(target * eased);
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = prefix + formatNum(target);
      };

      requestAnimationFrame(step);
    };

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        run(entry.target);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.05 });

    nums.forEach(function (el) { io.observe(el); });
  }

  /* ---------------------------------------------------------
     Vista previa del proyecto al pasar el cursor
     --------------------------------------------------------- */
  function initProjectPeek() {
    var peek = $("[data-peek]");
    var img = peek && peek.querySelector("img");
    if (!peek || !img || !fineHover) return;

    $$(".proyecto[data-img]").forEach(function (row) {
      if (row.dataset.peekBound) return;
      row.dataset.peekBound = "1";

      row.addEventListener("mouseover", function (e) {
        if (row.contains(e.relatedTarget)) return;
        img.src = row.dataset.img;
        peek.classList.add("is-on");
      });
      row.addEventListener("mouseout", function (e) {
        if (row.contains(e.relatedTarget)) return;
        peek.classList.remove("is-on");
      });
    });

    window.addEventListener("mousemove", function (e) {
      if (!peek.classList.contains("is-on")) return;
      peek.style.left = e.clientX + "px";
      peek.style.top = e.clientY + "px";
    }, { passive: true });
  }

  /* ---------------------------------------------------------
     Inclinación suave de las tarjetas de servicio
     --------------------------------------------------------- */
  function initTilt() {
    if (!fineHover) return;

    $$("[data-tilt]").forEach(function (card) {
      if (card.dataset.tiltBound) return;
      card.dataset.tiltBound = "1";

      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform =
          "translateY(-4px) perspective(900px) rotateX(" + (-py * 4).toFixed(2) +
          "deg) rotateY(" + (px * 4).toFixed(2) + "deg)";
      });

      card.addEventListener("mouseout", function (e) {
        if (card.contains(e.relatedTarget)) return;
        card.style.transform = "";
      });
    });
  }

  /* ---------------------------------------------------------
     Acordeón: una sola pregunta abierta por vez
     --------------------------------------------------------- */
  function initFaqs() {
    var faqs = $$(".faq");
    faqs.forEach(function (faq) {
      faq.addEventListener("toggle", function () {
        if (!faq.open) return;
        faqs.forEach(function (other) {
          if (other !== faq) other.open = false;
        });
      });
    });
  }

  /* ---------------------------------------------------------
     Datos del manifiesto que sí conviene tener en un solo lugar
     --------------------------------------------------------- */
  function initYear() {
    var el = $("[data-year]");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  function initContactFromData() {
    // Si alguien edita lib/manifest.js, los enlaces se actualizan solos.
    var c = data.contact;
    if (!c || !c.whatsapp) return;

    var href = "https://wa.me/" + c.whatsapp +
      (c.whatsappMsg ? "?text=" + encodeURIComponent(c.whatsappMsg) : "");

    $$('a[href*="wa.me/"]').forEach(function (a) { a.href = href; });

    var num = $(".wa-num");
    if (num && c.whatsappLabel) num.textContent = c.whatsappLabel;
  }

  /* ---------------------------------------------------------
     Arranque
     --------------------------------------------------------- */
  function boot() {
    safe(initNav, "initNav");
    safe(initDrawer, "initDrawer");
    safe(initAnchors, "initAnchors");
    safe(initSplitText, "initSplitText");
    safe(initReveals, "initReveals");
    safe(initMouseGradient, "initMouseGradient");
    safe(initCounters, "initCounters");
    safe(initProjectPeek, "initProjectPeek");
    safe(initTilt, "initTilt");
    safe(initFaqs, "initFaqs");
    safe(initYear, "initYear");
    safe(initContactFromData, "initContactFromData");

    if (window.gsap && window.ScrollTrigger) {
      try { gsap.registerPlugin(ScrollTrigger); } catch (e) {}
    }

    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
