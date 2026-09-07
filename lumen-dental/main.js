(function () {
  "use strict";

  var data = window.__BRAND__ || {};
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fineHover = matchMedia("(hover: hover) and (pointer: fine)").matches;

  function $(sel, scope) { return (scope || document).querySelector(sel); }
  function $$(sel, scope) { return Array.from((scope || document).querySelectorAll(sel)); }
  function safe(fn, name) {
    try { fn(); } catch (e) { console.warn("[" + name + "]", e); }
  }

  /* ---------------- Nav ---------------- */
  function initNav() {
    var nav = $(".nav");
    if (!nav) return;
    var onScroll = function () {
      nav.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    var toggle = $(".nav-toggle");
    var mobile = $(".nav-mobile");
    if (toggle && mobile) {
      toggle.addEventListener("click", function () {
        var isOpen = toggle.classList.toggle("is-open");
        mobile.classList.toggle("is-open", isOpen);
        toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        document.body.style.overflow = isOpen ? "hidden" : "";
      });
      $$("a", mobile).forEach(function (a) {
        a.addEventListener("click", function () {
          toggle.classList.remove("is-open");
          mobile.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
          document.body.style.overflow = "";
        });
      });
    }
  }

  /* ---------------- Scroll reveals ---------------- */
  function initReveals() {
    var targets = $$("[data-reveal]");
    if (!targets.length) return;

    targets.forEach(function (el, i) {
      el.classList.add("reveal");
      el.style.setProperty("--i", i % 6);
    });

    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.01, rootMargin: "0px 0px -2% 0px" });

    targets.forEach(function (el) { io.observe(el); });

    setTimeout(function () {
      targets.forEach(function (el) {
        if (!el.classList.contains("is-visible") && el.getBoundingClientRect().top < innerHeight) {
          el.classList.add("is-visible");
        }
      });
    }, 6000);
  }

  /* ---------------- Count-up stats ---------------- */
  function initCounters() {
    var counters = $$("[data-count-to]");
    if (!counters.length) return;

    function animateCount(el) {
      var target = parseFloat(el.getAttribute("data-count-to"));
      var decimals = el.getAttribute("data-decimals") ? parseInt(el.getAttribute("data-decimals"), 10) : 0;
      var suffix = el.getAttribute("data-suffix") || "";
      if (reduced) { el.textContent = target.toFixed(decimals) + suffix; return; }
      var duration = 1600;
      var start = null;
      function step(ts) {
        if (start === null) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = (target * eased).toFixed(decimals) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    if (!("IntersectionObserver" in window)) {
      counters.forEach(animateCount);
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    counters.forEach(function (el) { io.observe(el); });
  }

  /* ---------------- Magnetic buttons ---------------- */
  function initMagnetic() {
    if (!fineHover || reduced) return;
    var els = $$("[data-magnetic]");
    els.forEach(function (el) {
      var strength = 0.25;
      el.addEventListener("mousemove", function (e) {
        var rect = el.getBoundingClientRect();
        var x = (e.clientX - rect.left - rect.width / 2) * strength;
        var y = (e.clientY - rect.top - rect.height / 2) * strength;
        el.style.transform = "translate(" + x + "px," + y + "px)";
      });
      el.addEventListener("mouseout", function (e) {
        if (el.contains(e.relatedTarget)) return;
        el.style.transform = "translate(0,0)";
      });
    });
  }

  /* ---------------- Before / After compare slider ---------------- */
  function initCompare() {
    var compare = $(".compare");
    if (!compare) return;
    var range = $(".compare-range", compare);
    var before = $(".compare-before", compare);
    if (!range || !before) return;

    function update(value) {
      compare.style.setProperty("--pos", value + "%");
    }
    update(range.value || 50);
    range.addEventListener("input", function () { update(range.value); });
  }

  /* ---------------- Contact form (simulated submit) ---------------- */
  function initForm() {
    var form = $("[data-contact-form]");
    if (!form) return;
    var success = $(".form-success", form.parentElement) || $(".form-success");
    var submitBtn = $("button[type=submit]", form);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Enviando…";
      }
      setTimeout(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Enviar mensaje";
        }
        if (success) success.classList.add("is-visible");
        form.reset();
      }, 900);
    });
  }

  /* ---------------- Back to top ---------------- */
  function initBackTop() {
    var btn = $(".back-top");
    if (!btn) return;
    window.addEventListener("scroll", function () {
      btn.classList.toggle("is-visible", window.scrollY > 700);
    }, { passive: true });
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    });
  }

  /* ---------------- WhatsApp link build ---------------- */
  function initWhatsapp() {
    if (!data.whatsappNumber) return;
    var links = $$("[data-whatsapp-link]");
    var msg = encodeURIComponent(data.whatsappMessage || "Hola! Quiero pedir un turno.");
    links.forEach(function (a) {
      a.href = "https://wa.me/" + data.whatsappNumber + "?text=" + msg;
    });
  }

  /* ---------------- Footer year ---------------- */
  function initYear() {
    var el = $("[data-year]");
    if (el) el.textContent = new Date().getFullYear();
  }

  function boot() {
    safe(initNav, "initNav");
    safe(initReveals, "initReveals");
    safe(initCounters, "initCounters");
    safe(initMagnetic, "initMagnetic");
    safe(initCompare, "initCompare");
    safe(initForm, "initForm");
    safe(initBackTop, "initBackTop");
    safe(initWhatsapp, "initWhatsapp");
    safe(initYear, "initYear");
    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
