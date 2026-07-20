/* ═══════════ PENWARS — interactions & motion (dark premium) ═══════════ */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasGSAP = typeof gsap !== "undefined";

  /* ---------- Mobile nav ---------- */
  var burger = document.getElementById("navBurger");
  var links = document.getElementById("navLinks");
  if (burger && links) {
    burger.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Reduced motion / no GSAP fallback ---------- */
  if (prefersReduced || !hasGSAP) {
    document.body.classList.add("reduced");
    var loaderEl = document.getElementById("loader");
    if (loaderEl) loaderEl.style.display = "none";
    var navEl = document.getElementById("nav");
    if (navEl) navEl.classList.add("nav-in");
    document.querySelectorAll(".reveal").forEach(function (el) { el.style.opacity = 1; });
    startCounters(true);
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ---------- Loader ---------- */
  var loader = document.getElementById("loader");

  var intro = gsap.timeline({
    onComplete: function () {
      loader.style.display = "none";
      ScrollTrigger.refresh();
    }
  });

  intro
    .to("#loaderBarFill", { width: "100%", duration: 0.9, ease: "power2.inOut" }, 0)
    .fromTo("#loaderLogo",
      { opacity: 0, scale: 0.9, y: 12 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.1)
    .to(loader, { autoAlpha: 0, duration: 0.5, ease: "power2.inOut" }, "+=0.35")
    .add(function () { document.getElementById("nav").classList.add("nav-in"); }, "-=0.25")
    .fromTo("#heroEyebrow", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, "-=0.15")
    .fromTo("#heroLogo",
      { y: 26, opacity: 0, scale: 0.96 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }, "-=0.35")
    .fromTo("#heroTitle", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.45")
    .fromTo("#heroSub", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: "power3.out" }, "-=0.4")
    .fromTo("#heroCtas .btn",
      { y: 18, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: "power3.out" }, "-=0.35")
    .fromTo(".hero-diamond",
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 0.8, stagger: 0.08, duration: 0.5, ease: "back.out(2)" }, "-=0.4");

  /* hero logo ambient float */
  gsap.to("#heroLogo", { y: -10, duration: 3.2, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 2.4 });

  /* floating diamonds idle drift */
  gsap.utils.toArray(".hero-diamond").forEach(function (el, i) {
    gsap.to(el, {
      y: i % 2 ? 18 : -18,
      rotate: 45 + (i % 2 ? 12 : -12),
      duration: 3 + i * 0.4,
      yoyo: true, repeat: -1, ease: "sine.inOut"
    });
  });

  /* ---------- Ticker ---------- */
  gsap.to("#tickerTrack", { xPercent: -33.333, duration: 22, repeat: -1, ease: "none" });

  /* ---------- Scroll reveals (skip gallery cards; handled below) ---------- */
  gsap.utils.toArray(".reveal").forEach(function (el) {
    if (el.classList.contains("hero-card")) return;
    gsap.fromTo(el,
      { opacity: 0, y: 54 },
      {
        opacity: 1, y: 0,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 86%" }
      });
  });

  /* ---------- Heroes gallery: staggered subtle reveal ---------- */
  var gallery = document.getElementById("heroGallery");
  if (gallery) {
    var cards = gallery.querySelectorAll(".hero-card");
    gsap.fromTo(cards,
      { opacity: 0, y: 60, scale: 0.92 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.7,
        ease: "power3.out",
        stagger: { each: 0.09, from: "start" },
        scrollTrigger: { trigger: gallery, start: "top 82%" }
      });
    /* gentle continuous float, alternating */
    cards.forEach(function (c, i) {
      gsap.to(c, {
        y: i % 2 ? 8 : -8,
        duration: 3 + (i % 4) * 0.35,
        yoyo: true, repeat: -1, ease: "sine.inOut",
        delay: 1 + i * 0.06
      });
    });
  }

  /* hero glows parallax */
  gsap.to(".hero-glow-p", {
    yPercent: 22, ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
  });
  gsap.to(".hero-glow-g", {
    yPercent: -14, ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
  });

  /* diamond stack slow rotate */
  gsap.to(".diamond-stack", {
    rotate: 360, duration: 60, repeat: -1, ease: "none", transformOrigin: "50% 50%"
  });

  /* ---------- Stat counters ---------- */
  startCounters(false);

  function startCounters(instant) {
    document.querySelectorAll(".stat-big[data-count]").forEach(function (el) {
      var end = parseInt(el.getAttribute("data-count"), 10);
      var suffix = el.getAttribute("data-suffix") || "";
      if (instant) { el.textContent = end + suffix; return; }
      var obj = { v: 0 };
      gsap.to(obj, {
        v: end,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
        onUpdate: function () { el.textContent = Math.round(obj.v) + suffix; }
      });
    });
  }

  /* ---------- Ember particle canvas (gold + purple) ---------- */
  var canvas = document.getElementById("emberCanvas");
  if (canvas) {
    var ctx = canvas.getContext("2d");
    var W, H, parts = [];
    var COLORS = ["#E8C87A", "#C13BFF", "#F6E3A8", "#7A1FD0"];
    var COUNT = window.innerWidth < 760 ? 20 : 40;

    function size() {
      W = canvas.width = canvas.offsetWidth * devicePixelRatio;
      H = canvas.height = canvas.offsetHeight * devicePixelRatio;
    }
    size();
    window.addEventListener("resize", size);

    for (var i = 0; i < COUNT; i++) {
      parts.push({
        x: Math.random(), y: Math.random(),
        r: 0.8 + Math.random() * 2,
        vx: (Math.random() - 0.5) * 0.0004,
        vy: -0.0003 - Math.random() * 0.0007,
        c: COLORS[i % COLORS.length],
        tw: Math.random() * Math.PI * 2
      });
    }

    (function tick() {
      ctx.clearRect(0, 0, W, H);
      parts.forEach(function (p) {
        p.x += p.vx; p.y += p.vy; p.tw += 0.03;
        if (p.y < -0.05) { p.y = 1.05; p.x = Math.random(); }
        if (p.x < -0.05) p.x = 1.05;
        if (p.x > 1.05) p.x = -0.05;
        var a = 0.25 + Math.abs(Math.sin(p.tw)) * 0.45;
        ctx.globalAlpha = a;
        ctx.fillStyle = p.c;
        ctx.shadowBlur = 8 * devicePixelRatio;
        ctx.shadowColor = p.c;
        ctx.beginPath();
        ctx.arc(p.x * W, p.y * H, p.r * devicePixelRatio, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      requestAnimationFrame(tick);
    })();
  }
})();
