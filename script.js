(() => {
  // TYPEWRITER
  const titles = ['Frontend Developer', 'UI/UX Enthusiast', 'Performance-driven', 'Accessibility Advocate'];
  const twEl = document.getElementById('typewriter');
  let tIdx = 0, cIdx = 0, deleting = false;
  function tick(){
    if(!twEl) return;
    const full = titles[tIdx];
    if(!deleting){
      cIdx++;
      twEl.textContent = full.slice(0,cIdx) + '\u2588';
      if(cIdx === full.length){ setTimeout(()=> deleting = true, 900); }
    } else {
      cIdx--;
      twEl.textContent = full.slice(0,cIdx) + '\u2588';
      if(cIdx === 0){ deleting = false; tIdx = (tIdx+1) % titles.length; }
    }
    const speed = deleting ? 40 : 80;
    setTimeout(tick, speed + Math.random()*50);
  }
  document.addEventListener('DOMContentLoaded', ()=> tick());

  // REVEAL ON SCROLL
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('visible');
        // animate bars and circles when revealed
        if(e.target.querySelectorAll) animateChildren(e.target);
      }
    });
  },{threshold:0.12});
  reveals.forEach(r=>io.observe(r));

  function animateChildren(el){
    // bars
    const bars = el.querySelectorAll('.bar');
    bars.forEach(b=>{
      const v = b.getAttribute('data-value') || b.dataset.value || 60;
      b.querySelector(':scope::after');
      // set width of pseudo-element by manipulating inline style via CSS custom property
      // Instead we'll animate a child overlay to avoid pseudo-element manipulation
      if(!b.querySelector('.fill')){
        const f = document.createElement('div');
        f.className='fill';
        f.style.height='100%';
        f.style.width='0%';
        f.style.borderRadius='inherit';
        f.style.transition='width 1.6s cubic-bezier(.2,.9,.2,1)';
        f.style.background='linear-gradient(90deg, var(--accent), var(--accent-2))';
        b.appendChild(f);
        requestAnimationFrame(()=>{ f.style.width = v + '%'; });
      }
    });

    // circles
    const circles = el.querySelectorAll('.circle');
    circles.forEach(c=>{
      const pct = c.getAttribute('data-percent') || c.dataset.percent || 60;
      c.style.background = `conic-gradient(var(--accent) 0% ${pct}%, rgba(255,255,255,0.06) ${pct}% 100%)`;
    });
  }

  // NAV SMOOTH SCROLL
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',(ev)=>{
      const href = a.getAttribute('href');
      if(href.length>1){
        ev.preventDefault();
        document.querySelector(href).scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

  // THEME TOGGLE
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  function setTheme(dark){
    if(dark) root.classList.add('dark'); else root.classList.remove('dark');
    localStorage.setItem('pref-dark', dark? '1':'0');
  }
  themeToggle && themeToggle.addEventListener('click', ()=> setTheme(!root.classList.contains('dark')));
  // restore
  const pref = localStorage.getItem('pref-dark');
  if(pref === null){
    const dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(dark);
  } else setTheme(pref==='1');

  // PRINT shortcut
  document.getElementById('downloadResume')?.addEventListener('click', ()=> window.print());
  document.getElementById('printSmall')?.addEventListener('click', ()=> window.print());

  // PROJECT CARD TILT (subtle, low-cost)
  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card=>{
    card.addEventListener('mousemove', (e)=>{
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(800px) rotateX(${ -y * 6 }deg) rotateY(${ x * 8 }deg) translateZ(0)`;
    });
    card.addEventListener('mouseleave', ()=>{ card.style.transform = ''; });
  });

  // footer year
  document.getElementById('year').textContent = new Date().getFullYear();

})();