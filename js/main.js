(() => {
  "use strict";

  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(pointer: fine)").matches;
  const frameCount = 95;
  const frames = [];
  let loadedFrames = 0;
  let currentFrame = -1;

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  function frameUrl(index) {
    return `assets/frames/frame_${String(index).padStart(4, "0")}.jpg`;
  }

  function preloadFrames() {
    if (reduceMotion) return Promise.resolve();
    return Promise.all(Array.from({ length: frameCount }, (_, i) => new Promise((resolve) => {
      const image = new Image();
      image.onload = image.onerror = () => {
        loadedFrames += 1;
        $(".preloader__count").textContent = String(Math.round(loadedFrames / frameCount * 100)).padStart(3, "0");
        resolve();
      };
      image.src = frameUrl(i + 1);
      frames.push(image);
    })));
  }

  function setupCanvas() {
    const canvas = $("#frame-canvas");
    const context = canvas.getContext("2d");
    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      if (currentFrame >= 0) draw(currentFrame);
    };
    const draw = (index) => {
      const image = frames[index];
      if (!image || !image.complete || !image.naturalWidth) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const ratio = Math.max(cw / image.naturalWidth, ch / image.naturalHeight);
      const width = image.naturalWidth * ratio;
      const height = image.naturalHeight * ratio;
      context.clearRect(0, 0, cw, ch);
      context.drawImage(image, (cw - width) / 2, (ch - height) / 2, width, height);
    };
    window.addEventListener("resize", resize);
    resize();
    return draw;
  }

  function setupMenu() {
    const button = $(".menu-toggle");
    const menu = $(".menu");
    const toggle = (open) => {
      button.setAttribute("aria-expanded", String(open));
      menu.setAttribute("aria-hidden", String(!open));
      document.body.classList.toggle("menu-open", open);
      gsap.to(menu, { autoAlpha: open ? 1 : 0, duration: .45, ease: "expo.out" });
      gsap.fromTo($$("nav a", menu), { y: open ? 35 : 0 }, { y: 0, stagger: .05, duration: .6, ease: "expo.out" });
    };
    button.addEventListener("click", () => toggle(button.getAttribute("aria-expanded") !== "true"));
    $$("a", menu).forEach((link) => link.addEventListener("click", () => toggle(false)));
  }

  function setupModal() {
    const modal = $(".film-modal");
    const player = $("video", modal);
    const label = $("span", modal);
    const close = () => {
      player.pause();
      player.removeAttribute("src");
      player.load();
      modal.close();
    };
    $$(".project").forEach((project) => project.addEventListener("click", () => {
      label.textContent = project.dataset.title;
      player.src = project.dataset.video;
      modal.showModal();
      player.play().catch(() => {});
    }));
    $("button", modal).addEventListener("click", close);
    modal.addEventListener("click", (event) => { if (event.target === modal) close(); });
  }

  function setupMotion(drawFrame) {
    gsap.registerPlugin(ScrollTrigger);
    let lenis;
    if (!reduceMotion && window.Lenis) {
      lenis = new Lenis({ duration: 1.05, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }

    const heroVideo = $(".hero__video");
    const heroTimeline = gsap.timeline({
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom bottom", scrub: 1 }
    });
    heroTimeline
      .to(".hero__veil", { xPercent: -100, ease: "none", duration: .35 })
      .to(heroVideo, { opacity: 1, scale: 1, ease: "none", duration: .45 }, .35)
      .to(".hero__logo", { scale: .82, opacity: .65, ease: "none", duration: .45 }, .35)
      .to(".hero__veil", { backgroundColor: "#000", opacity: .25, ease: "none", duration: .2 }, .8);
    ScrollTrigger.create({
      trigger: ".hero", start: "top top", end: "bottom bottom",
      onUpdate: ({ progress }) => progress > .34 ? heroVideo.play().catch(() => {}) : heroVideo.pause()
    });

    const sequence = { frame: 0 };
    gsap.to(sequence, {
      frame: frameCount - 1, snap: "frame", ease: "none",
      scrollTrigger: { trigger: ".frame-story", start: "top top", end: "bottom bottom", scrub: .35 },
      onUpdate: () => {
        const next = Math.round(sequence.frame);
        if (next !== currentFrame) {
          currentFrame = next;
          drawFrame(next);
          $("#frame-current").textContent = String(next + 1).padStart(3, "0");
          const progress = next / (frameCount - 1);
          $$(".story-card").forEach((card) => {
            const visible = progress >= Number(card.dataset.show) && progress <= Number(card.dataset.hide);
            gsap.to(card, { autoAlpha: visible ? 1 : 0, y: visible ? 0 : 50, duration: .35, overwrite: true });
          });
        }
      }
    });

    if (innerWidth > 800) {
      $$("[data-hscroll]").forEach((wrap) => {
        const track = $("[data-htrack]", wrap);
        const distance = () => track.scrollWidth - innerWidth;
        gsap.to(track, {
          x: () => -distance(), ease: "none",
          scrollTrigger: { trigger: wrap, start: "top top", end: () => `+=${distance()}`, pin: true, scrub: 1, invalidateOnRefresh: true }
        });
      });
    }

    $$("[data-reveal]").forEach((element) => gsap.from(element, {
      y: 55, opacity: 0, duration: .95, ease: "expo.out",
      scrollTrigger: { trigger: element, start: "top 87%" }
    }));

    $$("[data-count]").forEach((element) => {
      const value = Number(element.dataset.count);
      const state = { value: 0 };
      gsap.to(state, {
        value, duration: 1.8, ease: "expo.out",
        scrollTrigger: { trigger: element, start: "top 85%", once: true },
        onUpdate: () => { element.textContent = Math.round(state.value); }
      });
    });

    $$("[data-marquee]").forEach((track) => {
      track.innerHTML += track.innerHTML;
      gsap.to(track, { xPercent: -50, duration: 24, repeat: -1, ease: "none" });
    });

    ScrollTrigger.create({
      start: 0, end: "max",
      onUpdate: (self) => gsap.set(".progress span", { scaleX: self.progress })
    });
    ScrollTrigger.refresh();
  }

  function setupInteraction() {
    const cursor = $(".cursor");
    if (finePointer && !reduceMotion) {
      const xTo = gsap.quickTo(cursor, "x", { duration: .35, ease: "power3" });
      const yTo = gsap.quickTo(cursor, "y", { duration: .35, ease: "power3" });
      addEventListener("mousemove", (event) => { xTo(event.clientX); yTo(event.clientY); });
      $$("a, button, .project").forEach((item) => {
        item.addEventListener("mouseenter", () => cursor.classList.add("is-hover"));
        item.addEventListener("mouseleave", () => cursor.classList.remove("is-hover"));
      });
      $$(".magnetic").forEach((item) => {
        item.addEventListener("mousemove", (event) => {
          const rect = item.getBoundingClientRect();
          gsap.to(item, { x: (event.clientX - rect.left - rect.width / 2) * .25, y: (event.clientY - rect.top - rect.height / 2) * .25, duration: .35 });
        });
        item.addEventListener("mouseleave", () => gsap.to(item, { x: 0, y: 0, duration: .6, ease: "elastic.out(1,.35)" }));
      });
    }

    $$(".project video").forEach((video) => {
      const project = video.closest(".project");
      project.addEventListener("mouseenter", () => video.play().catch(() => {}));
      project.addEventListener("mouseleave", () => video.pause());
    });

    const sound = $(".sound-toggle");
    const hero = $(".hero__video");
    sound.addEventListener("click", () => {
      hero.muted = !hero.muted;
      sound.textContent = hero.muted ? "Sound on" : "Sound off";
      sound.setAttribute("aria-label", hero.muted ? "Activar sonido" : "Silenciar");
    });
  }

  addEventListener("DOMContentLoaded", async () => {
    setupMenu();
    setupModal();
    if (reduceMotion) {
      $(".preloader").remove();
      setupInteraction();
      return;
    }
    await preloadFrames();
    const drawFrame = setupCanvas();
    drawFrame(0);
    setupMotion(drawFrame);
    setupInteraction();
    gsap.timeline({
      onComplete: () => {
        if (location.hash) {
          document.querySelector(location.hash)?.scrollIntoView();
          ScrollTrigger.refresh();
        }
      }
    })
      .to(".preloader__count", { textContent: 100, snap: { textContent: 1 }, duration: .2 })
      .to(".preloader", { yPercent: -100, duration: .9, ease: "expo.inOut" })
      .set(".preloader", { display: "none" });
  });
})();
