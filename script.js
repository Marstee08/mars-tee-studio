/* =========================================================
   MARS TEE STUDIO — INTERACTIONS
========================================================= */
(function(){
  const body=document.body;
  const header=document.getElementById('site-header');
  const navToggle=document.getElementById('nav-toggle');
  const navMenu=document.getElementById('nav-menu');
  const themeToggle=document.getElementById('theme-toggle');
  const backTop=document.getElementById('backToTop');

  function onScroll(){
    if(header) header.classList.toggle('scrolled',window.scrollY>30);
    if(backTop) backTop.classList.toggle('visible',window.scrollY>500);
  }
  window.addEventListener('scroll',onScroll,{passive:true}); onScroll();

  if(navToggle && navMenu){
    navToggle.addEventListener('click',()=>{
      const open=navMenu.classList.toggle('open');
      body.classList.toggle('menu-open',open);
      navToggle.setAttribute('aria-expanded',open);
      navToggle.innerHTML=open?'<i class="fa-solid fa-xmark"></i>':'<i class="fa-solid fa-bars"></i>';
    });
    navMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{navMenu.classList.remove('open');body.classList.remove('menu-open');navToggle.setAttribute('aria-expanded','false');navToggle.innerHTML='<i class="fa-solid fa-bars"></i>';}));
  }

  const saved=localStorage.getItem('mars-theme');
  if(saved==='dark'){body.classList.add('dark-mode');if(themeToggle) themeToggle.checked=true;}
  if(themeToggle) themeToggle.addEventListener('change',()=>{body.classList.toggle('dark-mode');localStorage.setItem('mars-theme',body.classList.contains('dark-mode')?'dark':'light');});

  if(backTop) backTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

  const reveals=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.12});
    reveals.forEach(el=>observer.observe(el));
  }else reveals.forEach(el=>el.classList.add('visible'));

  // Portfolio filters
  const filterButtons=document.querySelectorAll('.filter-btn');
  const portfolioCards=document.querySelectorAll('.portfolio-card[data-category]');
  filterButtons.forEach(btn=>btn.addEventListener('click',()=>{
    filterButtons.forEach(b=>b.classList.remove('active'));btn.classList.add('active');
    const filter=btn.dataset.filter;
    portfolioCards.forEach(card=>{card.style.display=(filter==='all'||card.dataset.category===filter)?'':'none';});
  }));

  // Auto-select service/package from URL
  const params=new URLSearchParams(window.location.search);
  const service=params.get('service');
  const serviceField=document.getElementById('service');
  if(service && serviceField){
    [...serviceField.options].some(opt=>{if(opt.text.toLowerCase()===service.toLowerCase()||opt.text.toLowerCase().includes(service.toLowerCase())){serviceField.value=opt.value;return true;}return false;});
  }

  // Optional EmailJS setup. Existing IDs are retained for compatibility with the user's current setup.
  const emailReady=typeof emailjs!=='undefined';
  if(emailReady) emailjs.init({publicKey:'aUIqFhKJXEPEKGVKd'});

  const contactForm=document.getElementById('contact-form');
  if(contactForm){contactForm.addEventListener('submit',e=>{
    e.preventDefault(); const status=document.getElementById('status');
    if(!emailReady){status.textContent='Your form is ready. Please connect EmailJS to receive submissions.';status.style.color='#b26a00';return;}
    status.textContent='Sending your enquiry…';status.style.color='';
    emailjs.sendForm('service_15ay3dd','template_91i42c8',contactForm).then(()=>{status.textContent='✓ Enquiry sent successfully. We will get back to you soon.';status.style.color='#16824a';contactForm.reset();}).catch(err=>{console.error(err);status.textContent='We could not send the form right now. Please use WhatsApp instead.';status.style.color='#c2410c';});
  });}

  const quoteForm=document.getElementById('quoteForm');
  if(quoteForm){quoteForm.addEventListener('submit',e=>{
    e.preventDefault(); const status=document.getElementById('quote-status');
    const data=new FormData(quoteForm); const text=`Hello Mars Tee Studio, I want to start a project.%0A%0AName: ${encodeURIComponent(data.get('from_name')||'')}%0AService: ${encodeURIComponent(data.get('service')||'')}%0APackage: ${encodeURIComponent(data.get('package')||'')}%0ADeadline: ${encodeURIComponent(data.get('deadline')||'')}%0A%0AProject: ${encodeURIComponent(data.get('message')||'')}%0AReference: ${encodeURIComponent(data.get('reference')||'')}`;
    status.innerHTML=`<span style="color:#16824a">✓ Brief prepared.</span> <a href="https://wa.me/2349124147362?text=${text}" target="_blank" rel="noopener" style="color:#2563eb;font-weight:800">Continue on WhatsApp →</a>`;
  });}
})();
