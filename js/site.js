(() => {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const path = location.pathname.replace(/\/+$/, "") || "/";
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const services = [
    ["Estrategia", "Saber qué decir… y cuándo hacer que pase.", ["Diseño de Estrategia 360º","Consultoría en marketing y comunicación","Análisis reputacional","Plataforma de marca","Identificación de insights","Brand storytelling","Branded Content","Desarrollo Conceptual","Gestión de crisis"]],
    ["Comunicación", "Cuando el mensaje deja de ser tuyo y pasa a ser de todos.", ["Estrategia de comunicación integral","Comunicación corporativa","Comunicación interna","Gestión de imagen y reputación","Comunicación de crisis","Portavocía y media training"]],
    ["Dirección Creativa", "El diseño habla el idioma del concepto.", ["Dirección de arte","Diseño Gráfico","Branding & Naming","Desarrollo de Identidad Corporativa","Creación de contenidos amplificables","Copywriting","Producción Gráfica","Packaging & Material POS"]],
    ["Eventos", "Precisión detrás, magia delante.", ["Eventos Corporativos Nacionales e Internacionales","Convenciones","Desfilés","RoadShow","Presentación de Productos","Ferias & Trade Shows","Conceptualización","Food & Beverage","Localización","Staff","AV y Producción Técnica","Logística y traslados"]],
    ["Activaciones y Experiencias", "La diferencia entre estar y dejar huella.", ["Brand Experience","Activación de Marca","Marketing de Guerilla","Sampling","Acciones disruptivas","Team Buildings"]],
    ["Marketing Digital", "Internet está lleno de ruido. Hagamos otra cosa.", ["Estrategia de RRSS y amplificación digital","Creación y planificación de contenidos","Gestión, crecimiento y fidelización de comunidades digitales","Influencer marketing y gestión de colaboraciones","Estrategia, compra y optimización de Social Ads"]],
    ["Desarrollo y Soluciones Digitales", "Tecnología al servicio de la experiencia.", ["Desarrollo web y de aplicaciones","Diseño UI/UX","Soluciones e-learning","Soluciones de inteligencia artificial","Soluciones cloud","Automatización de procesos"]],
    ["Foto y Vídeo", "Contenido que se mueve… y mueve.", ["Shooting Foto & Video","Guión","Edición de Video","Producción Audiovisual"]],
    ["RRPP y Prensa", "Construimos conversación alrededor de las marcas.", ["Estrategia de relaciones públicas","Ruedas de Prensa","Convocatoria de medios","Convocatorias sociales","Gestión de protocolo","Identificación y gestión de relaciones con prescriptores, líderes de opinión","Contratación nacional e internacional de celebrities y embajadores de marca"]]
  ];
  const clients = [
    ["Alcon","Alcon-Emblem.png"],["Novartis","novartis.png"],["Coca-Cola","cocacola.png"],["SAP","SAP_2011_logo.svg.png"],["Porsche","porsche-logo-0.png"],["Meliá Hotels","melia-logo.png"],["Puig","Logo_puig.png"],["Chopard","chopard-1-logo-png-transparent.png"],["Carolina Herrera","carolina-herrera-logo-0.png"],["Haribo","Haribo-logo.png"],["Glenfiddich","glenfiddich-logo-png-2-Transparent-Images.png"],["IKEA","ikea.png"],["Perrier","Perrier_logo.svg.png"],["ISDIN","isdin.png"],["Ipsen Farma","Ipsen_logo.svg.png"],["Coty Prestige","Coty_Inc_logo_2016.png"],["GFT","GFT-Technologies_Logo_SafeSpace_DarkBlue_rgb_2025.svg.png"],["Applus","LOGO-APPLUS.png"],["Walk Me","walkme-eu-icon-unplated.png"],["Avianca","Avianca-Logo.wine.png"]
  ];
  const esc = s => String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
  function nosotros() {
    return `<section class="about-film"><canvas id="about-canvas"></canvas><div class="about-film__veil"></div><div class="about-film__label">// 01 · Nosotros</div>
      <div class="about-annotation" data-from=".08" data-to=".27"><span>01</span><p>Somos un equipo multidisciplinar y versátil con una amplia experiencia en el Universo de la Comunicación y los Eventos.</p></div>
      <div class="about-annotation about-annotation--right" data-from=".35" data-to=".55"><span>02</span><p>Cada proyecto implica la creación de un equipo ad hoc, formado por las personas que mejor se ajustan al perfil de cada cliente.</p></div>
      <div class="about-annotation" data-from=".62" data-to=".79"><span>03</span><p>Planificamos con precisión, pero también sabemos adaptarnos y reaccionar en tiempo real, porque en comunicación, la improvisación es parte de la Estrategia.</p></div>
      <div class="about-annotation about-annotation--right" data-from=".84" data-to="1"><span>04</span><p>Multiplicamos nuestras capacidades a través de aliados de nuestra red internacional.</p></div>
      </section>
      <section class="team-section"><div><p>Nosotros</p><h1>El equipo</h1></div><div class="team-copy">
        <p>Somos un equipo multidisciplinar y versátil con una amplia experiencia en el Universo de la Comunicación y los Eventos.</p>
        <p>Cada proyecto implica la creación de un equipo ad hoc, formado por las personas que mejor se ajustan al perfil de cada cliente.</p>
        <p>Planificamos con precisión, pero también sabemos adaptarnos y reaccionar en tiempo real, porque en comunicación, la improvisación es parte de la Estrategia.</p>
        <p>Multiplicamos nuestras capacidades a través de aliados de nuestra red internacional.</p>
      </div></section>
      <section class="clients"><div class="clients__head"><p>Confían en nosotros</p><span>20 marcas</span></div><div class="clients__grid">${clients.map(([name,file],i)=>`<figure><span>${String(i+1).padStart(2,"0")}</span><img src="/assets/client-logos/${encodeURIComponent(file)}" alt="${esc(name)}"></figure>`).join("")}</div></section>`;
  }
  function servicios() {
    return `<section class="services-intro"><p>Servicios</p><h1>Comunicación y eventos que convierten ideas en resultados.</h1></section>
      <section class="service-story"><aside class="service-stage"><div class="service-stage__count"><span id="service-current">01</span> / 09</div><p id="service-name">Estrategia</p><h2 id="service-title">Saber qué decir… y cuándo hacer que pase.</h2><div class="service-stage__line"></div></aside>
      <div class="service-chapters">${services.map((s,i)=>`<article class="service-panel" data-service="${i}">
        <div class="service-panel__index">${String(i+1).padStart(2,"0")}</div>
        <div class="service-panel__mobile"><p>${esc(s[0])}</p><h2>${esc(s[1])}</h2></div>
        <ul>${s[2].map(x=>`<li>${esc(x)}</li>`).join("")}</ul>
      </article>`).join("")}</div></section>
      <section class="service-call"><a class="magnetic" href="/contacto">Call Johnny →</a></section>`;
  }
  function contacto() {
    const options = ["Estrategia","Comunicación","Dirección Creativa","Eventos","Activación y Experiencias","Marketing Digital","IA & Automatizaciones","Foto y Video","RR.PP. y Prensa"];
    return `<section class="contact-exact"><div class="call-rings" aria-hidden="true"><i></i><i></i><i></i></div>
      <div class="contact-exact__copy"><p>Contacto</p><h1>Dónde lo necesites,<br>cuando lo necesites.<br><span>¿Empezamos?</span><span>Call Johnny</span></h1>
        <div class="social-links"><a href="mailto:info@jotsagency.com">Email</a><a href="https://www.instagram.com/jotsagency?igsh=MXJteW8zam5saGNvcg==" target="_blank">Instagram</a><a href="https://www.linkedin.com/company/johnny-on-the-spot-agency/" target="_blank">LinkedIn</a></div>
      </div>
      <div class="phone-wrap"><div class="incoming-call"><span>Llamada entrante</span><img src="/assets/logos/logo-white.png" alt="Johnny on the Spot"><div><button type="button">Rechazar</button><button type="button" data-answer>Aceptar</button></div></div><div class="phone"><div class="phone__bar">9:41 <span>Johnny on the Spot</span></div><form>
        <p>Johnny on the Spot</p><h2>Queremos conocerte</h2>
        <label>Nombre<input type="text" placeholder="Tu nombre"></label>
        <label>Empresa<input type="text" placeholder="Nombre de tu empresa"></label>
        <label>Email<input type="email" placeholder="tu@email.com"></label>
        <label>Servicios<select><option>Selecciona servicios...</option>${options.map(x=>`<option>${esc(x)}</option>`).join("")}</select></label>
        <label>¿En qué te ayudamos?<textarea rows="4" placeholder="Cuéntanos tu proyecto..."></textarea></label>
        <button type="submit">Enviar →</button>
      </form></div></div>
    </section>`;
  }
  function init() {
    const button = $(".menu-toggle"), menu = $(".menu");
    button.addEventListener("click",()=>{const open=button.getAttribute("aria-expanded")!=="true";button.setAttribute("aria-expanded",open);menu.setAttribute("aria-hidden",!open);document.body.classList.toggle("menu-open",open);gsap.to(menu,{autoAlpha:open?1:0,duration:.4})});
    gsap.registerPlugin(ScrollTrigger);
    if(!reduce&&window.Lenis){const lenis=new Lenis({duration:1.05});lenis.on("scroll",ScrollTrigger.update);gsap.ticker.add(t=>lenis.raf(t*1000));gsap.ticker.lagSmoothing(0)}
    $$("[data-reveal],.team-copy p,.service-panel>*").forEach(el=>gsap.from(el,{y:35,opacity:0,duration:.8,ease:"expo.out",scrollTrigger:{trigger:el,start:"top 88%"}}));
    ScrollTrigger.create({start:0,end:"max",onUpdate:self=>gsap.set(".progress span",{scaleX:self.progress})});
    if(path==="/nosotros") initFrames();
    if(path==="/servicios") initServices();
    if(path==="/contacto") initContact();
    initCursor();
    $(".contact-exact form")?.addEventListener("submit",e=>{e.preventDefault();e.currentTarget.querySelector("button").textContent="Mensaje enviado"});
  }
  function initCursor(){
    const cursor=$(".cursor");
    if(!cursor||reduce||!matchMedia("(pointer:fine)").matches)return;
    const xTo=gsap.quickTo(cursor,"x",{duration:.35,ease:"power3"});
    const yTo=gsap.quickTo(cursor,"y",{duration:.35,ease:"power3"});
    addEventListener("mousemove",e=>{xTo(e.clientX);yTo(e.clientY)});
    $$("a,button,input,select,textarea,.clients figure").forEach(el=>{
      el.addEventListener("mouseenter",()=>cursor.classList.add("is-hover"));
      el.addEventListener("mouseleave",()=>cursor.classList.remove("is-hover"));
    });
    $$(".magnetic").forEach(el=>{
      el.addEventListener("mousemove",e=>{
        const rect=el.getBoundingClientRect();
        gsap.to(el,{x:(e.clientX-rect.left-rect.width/2)*.22,y:(e.clientY-rect.top-rect.height/2)*.22,duration:.35,ease:"power3.out"});
      });
      el.addEventListener("mouseleave",()=>gsap.to(el,{x:0,y:0,duration:.8,ease:"elastic.out(1,.35)"}));
    });
  }
  function initFrames(){
    const canvas=$("#about-canvas"),ctx=canvas.getContext("2d"),frames=[],count=95,state={frame:0};
    const resize=()=>{const d=Math.min(devicePixelRatio,2);canvas.width=innerWidth*d;canvas.height=innerHeight*d;draw(Math.round(state.frame))};
    const draw=i=>{const img=frames[i];if(!img?.complete)return;const r=Math.max(canvas.width/img.width,canvas.height/img.height),w=img.width*r,h=img.height*r;ctx.clearRect(0,0,canvas.width,canvas.height);ctx.drawImage(img,(canvas.width-w)/2,(canvas.height-h)/2,w,h)};
    for(let i=1;i<=count;i++){const img=new Image();img.src=`/assets/frames/frame_${String(i).padStart(4,"0")}.jpg`;frames.push(img)}
    addEventListener("resize",resize);resize();
    gsap.to(state,{frame:count-1,snap:"frame",ease:"none",scrollTrigger:{trigger:".about-film",start:"top top",end:"bottom bottom",scrub:.3},onUpdate:()=>{draw(Math.round(state.frame));const p=state.frame/(count-1);$$(".about-annotation").forEach(card=>{const visible=p>=+card.dataset.from&&p<=+card.dataset.to;gsap.to(card,{autoAlpha:visible?1:0,y:visible?0:35,duration:.25,overwrite:true})})}});
  }
  function initServices(){
    const name=$("#service-name"),title=$("#service-title"),current=$("#service-current"),line=$(".service-stage__line");
    $$(".service-panel").forEach((panel,i)=>{
      ScrollTrigger.create({trigger:panel,start:"top 55%",end:"bottom 45%",onEnter:()=>activate(i),onEnterBack:()=>activate(i)});
    });
    function activate(i){current.textContent=String(i+1).padStart(2,"0");name.textContent=services[i][0];title.textContent=services[i][1];gsap.fromTo([name,title],{y:25,opacity:0},{y:0,opacity:1,duration:.55,stagger:.06,ease:"expo.out"});gsap.to(line,{scaleX:(i+1)/services.length,duration:.5,transformOrigin:"left"})}
  }
  function initContact(){
    gsap.from(".phone-wrap",{xPercent:35,rotate:5,opacity:0,duration:1.1,ease:"expo.out"});
    gsap.to(".call-rings i",{scale:2.2,opacity:0,stagger:.45,duration:2,repeat:-1,ease:"power1.out"});
    const answer=$("[data-answer]"),call=$(".incoming-call");
    answer?.addEventListener("click",()=>gsap.to(call,{yPercent:-110,opacity:0,duration:.65,ease:"expo.inOut"}));
  }
  addEventListener("DOMContentLoaded",()=>{
    const page=$("#page");
    if(path==="/nosotros"){page.innerHTML=nosotros();document.title="Nosotros: Agencia de Comunicación Integral | Johnny on the Spot"}
    else if(path==="/servicios"){page.innerHTML=servicios();document.title="Servicios de Comunicación Integral | Johnny on the Spot"}
    else if(path==="/contacto"){page.innerHTML=contacto();document.title="Johnny on the Spot: Agencia de Comunicación Integral | Barcelona"}
    else{page.innerHTML='<section class="services-intro"><h1>Página no disponible.</h1></section>'}
    init();
  });
})();
