(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);
    const menuButton = $(".menu-toggle");
    const menu = $(".menu");
    menuButton.addEventListener("click", () => {
      const open = menuButton.getAttribute("aria-expanded") !== "true";
      menuButton.setAttribute("aria-expanded", open);
      menu.setAttribute("aria-hidden", !open);
      document.body.classList.toggle("menu-open", open);
      gsap.to(menu, { autoAlpha: open ? 1 : 0, duration: .4 });
    });
    if (!reduce && window.Lenis) {
      const lenis = new Lenis({
        duration: 1.05,
        prevent: node => node.closest?.(".case-viewer")
      });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(t => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    }
    const heroVideo = $(".hero__video");
    heroVideo.load();
    const heroTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: ({ progress }) => {
          if (progress >= .48) {
            heroVideo.play().catch(() => {});
          } else {
            heroVideo.pause();
            heroVideo.currentTime = 0;
          }
        }
      }
    });
    heroTimeline
      .to(".hero__veil", { xPercent: -100, ease: "none", duration: .35 })
      .to(".hero__logo", { scale: .82, opacity: .65, ease: "none", duration: .45 }, .35)
      .to(".hero__logo-wrap", { opacity: 0, ease: "none", duration: .12 }, .8)
      .to(heroVideo, { opacity: 1, scale: 1, ease: "none", duration: .35 }, .8)
      .to(".hero__veil", { opacity: 0, ease: "none", duration: .35 }, .8);
    gsap.to(".name-definition img", { scale: 1.08, scrollTrigger: { trigger: ".name-definition", start: "top top", end: "bottom bottom", scrub: 1 } });
    const caseVideos = $$(".home-case video");
    const playCaseVideos = () => caseVideos.forEach(video => {
      video.muted = true;
      video.defaultMuted = true;
      video.play().catch(() => {
        video.addEventListener("canplay", () => video.play().catch(() => {}), { once: true });
      });
    });
    playCaseVideos();
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) playCaseVideos();
    });
    if (innerWidth > 800) {
      const cases = $(".home-cases");
      const track = $(".home-cases__track");
      const distance = () => track.scrollWidth - innerWidth;
      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: cases,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true
        }
      });
    }
    $$("[data-count]").forEach((el, i) => {
      const target = +el.dataset.count;
      const obj = { n: 0 };
      gsap.to(obj, { n: target, duration: 1.5, delay: i * .1, scrollTrigger: { trigger: el, start: "top 85%", once: true }, onUpdate: () => {
        const n = Math.round(obj.n);
        el.textContent = i === 0 ? `+${n}` : i === 1 ? `${n}+` : i === 3 ? `${n}%` : n;
      }});
    });
    const sound = $(".sound-toggle");
    sound.addEventListener("click", () => { heroVideo.muted = !heroVideo.muted; sound.textContent = heroVideo.muted ? "Sonido" : "Silenciar"; });
    const cases = {
      alcon: {
        video: "https://media.githubusercontent.com/media/UserCreatorrr/johnny-on-the-spot-web-redesign/b7c94ca91a14a567b4f91ca7a9b958373e495305/assets/videos/alcon.mp4", client: "Alcon", title: "The Hydraglyde Family",
        subtitle: "Lanzamiento de Producto (España & Portugal)", productionHeading: "Producción integral",
        production: ["Estrategia", "Concepto", "Desarrollo Creativo", "Producción Gráfica", "Guionización", "Rodaje Mini Serie", "Videos Contenido", "Realidad Aumentada", "Web & App", "Roadshow", "Producción & Logística", "Staff & F&B"],
        services: ["Estrategia", "Comunicación", "Dirección Creativa", "Eventos", "Activación & Experiencias", "Marketing Digital", "Foto & Video"]
      },
      sand: {
        video: "https://media.githubusercontent.com/media/UserCreatorrr/johnny-on-the-spot-web-redesign/b7c94ca91a14a567b4f91ca7a9b958373e495305/assets/videos/sand-games.mp4", client: "SD Distribuciones", title: "The Sand Games",
        subtitle: "Producción Integral de Evento", productionHeading: "Producción integral",
        production: ["Concepto", "Desarrollo Creativo", "Producción Gráfica", "Comunicación Interna", "Web Dedicado", "Videos", "Actividades", "Localizaciones", "Producción", "Staff & F&B", "Logística & Viajes"],
        services: ["Dirección Creativa", "Eventos", "Activación & Experiencias", "Marketing Digital", "Foto & Video"]
      },
      coca: {
        video: "https://media.githubusercontent.com/media/UserCreatorrr/johnny-on-the-spot-web-redesign/b7c94ca91a14a567b4f91ca7a9b958373e495305/assets/videos/coca-cola-kfc.mp4", client: "Coca-Cola & KFC", title: "Coca Cola x KFC",
        subtitle: "Video", productionHeading: "Concepto & Producción",
        production: ["Concepto", "Desarrollo Creativo", "Dirección de Arte", "Edición y Producción Video"],
        services: ["Comunicación", "Dirección Creativa", "Foto & Video"]
      },
      novartis: {
        video: "https://media.githubusercontent.com/media/UserCreatorrr/johnny-on-the-spot-web-redesign/b7c94ca91a14a567b4f91ca7a9b958373e495305/assets/videos/novartis.mp4", client: "Novartis", title: "Mañana Empieza Hoy",
        subtitle: "Congreso Transplant Tomorrow · Certican", productionHeading: "Producción integral",
        production: ["Concepto", "Desarrollo Creativo", "Producción Gráfica", "Congreso", "Stand", "Video", "Localización", "Producción & Logística", "Staff & F&B"],
        services: ["Comunicación", "Dirección Creativa", "Eventos", "Foto & Video"]
      }
    };
    const viewer = $(".case-viewer");
    const viewerScroller = $(".case-viewer__scroller", viewer);
    const viewerVideo = $(".case-viewer__video", viewer);
    const viewerShade = $(".case-viewer__shade", viewer);
    const viewerBlur = $(".case-viewer__blur", viewer);
    const viewerHint = $(".case-viewer__hint", viewer);
    const viewerContent = $(".case-viewer__content", viewer);
    const soundButton = $(".case-viewer__sound", viewer);
    const soundIcon = $(".case-viewer__sound-icon", viewer);
    const soundLabel = $(".case-viewer__sound-label", viewer);
    const renderList = (selector, values) => {
      $(selector, viewer).replaceChildren(...values.map(value => {
        const item = document.createElement("li");
        item.textContent = value;
        return item;
      }));
    };
    const updateViewer = () => {
      const progress = Math.min(viewerScroller.scrollTop / 520, 1);
      const detailProgress = Math.max(0, (progress - .3) / .7);
      viewerShade.style.opacity = String(.15 + progress * .45);
      viewerBlur.style.backdropFilter = `blur(${detailProgress * 10}px)`;
      viewerBlur.style.webkitBackdropFilter = `blur(${detailProgress * 10}px)`;
      viewerHint.style.opacity = String(Math.max(0, 1 - progress * 4));
      viewerContent.style.opacity = String(detailProgress);
      viewerContent.style.transform = `translate3d(0, ${42 * (1 - detailProgress)}px, 0)`;
    };
    const setSoundState = muted => {
      viewerVideo.muted = muted;
      soundButton.setAttribute("aria-label", muted ? "Activar sonido" : "Silenciar");
      soundIcon.textContent = muted ? "◁" : "◀";
      soundLabel.textContent = muted ? "Sonido" : "Sonido on";
    };
    const openCase = caseId => {
      const project = cases[caseId];
      if (!project) return;
      $(".case-viewer__client", viewer).textContent = project.client;
      $(".case-viewer__title", viewer).textContent = project.title;
      $(".case-viewer__subtitle", viewer).textContent = project.subtitle;
      $(".case-viewer__production-heading", viewer).textContent = project.productionHeading;
      renderList(".case-viewer__production", project.production);
      renderList(".case-viewer__services", project.services);
      viewerScroller.scrollTop = 0;
      updateViewer();
      setSoundState(true);
      viewerVideo.src = project.video;
      viewer.classList.add("is-open");
      viewer.setAttribute("aria-hidden", "false");
      document.body.classList.add("case-open");
      viewerVideo.play().catch(() => {});
    };
    const closeCase = () => {
      viewer.classList.remove("is-open");
      viewer.setAttribute("aria-hidden", "true");
      document.body.classList.remove("case-open");
      viewerVideo.pause();
      viewerVideo.removeAttribute("src");
      viewerVideo.load();
    };
    $$("[data-case]").forEach(card => card.addEventListener("click", e => {
      e.preventDefault();
      openCase(card.dataset.case);
    }));
    viewerScroller.addEventListener("scroll", updateViewer, { passive: true });
    viewer.addEventListener("wheel", e => {
      if (!viewer.classList.contains("is-open")) return;
      e.preventDefault();
      viewerScroller.scrollTop += e.deltaY;
    }, { passive: false });
    $(".case-viewer__back", viewer).addEventListener("click", closeCase);
    soundButton.addEventListener("click", () => {
      setSoundState(!viewerVideo.muted);
      viewerVideo.play().catch(() => {});
    });
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && viewer.classList.contains("is-open")) closeCase();
    });
    ScrollTrigger.create({ start: 0, end: "max", onUpdate: self => gsap.set(".progress span", { scaleX: self.progress }) });
    const cursor = $(".cursor");
    if (matchMedia("(pointer:fine)").matches && !reduce) {
      const xTo = gsap.quickTo(cursor, "x", { duration: .35, ease: "power3" });
      const yTo = gsap.quickTo(cursor, "y", { duration: .35, ease: "power3" });
      addEventListener("mousemove", e => { xTo(e.clientX); yTo(e.clientY); });
      $$("a,button,.home-case").forEach(el => {
        el.addEventListener("mouseenter", () => cursor.classList.add("is-hover"));
        el.addEventListener("mouseleave", () => cursor.classList.remove("is-hover"));
      });
      $$(".magnetic").forEach(el => {
        el.addEventListener("mousemove", e => {
          const rect = el.getBoundingClientRect();
          gsap.to(el, {
            x: (e.clientX - rect.left - rect.width / 2) * .22,
            y: (e.clientY - rect.top - rect.height / 2) * .22,
            duration: .35,
            ease: "power3.out"
          });
        });
        el.addEventListener("mouseleave", () => {
          gsap.to(el, { x: 0, y: 0, duration: .8, ease: "elastic.out(1,.35)" });
        });
      });
    }
    gsap.to(".preloader__count", { textContent: 100, snap: { textContent: 1 }, duration: .8 });
    gsap.to(".preloader", { yPercent: -100, duration: .8, delay: .8, ease: "expo.inOut" });
  });
})();
