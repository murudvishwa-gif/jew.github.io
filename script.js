const isReduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const menu=document.querySelector('.menu:not(.dash-menu)');
const links=document.querySelector('.nav-links');

if(links&&!links.querySelector('.mobile-auth-link')){
  links.insertAdjacentHTML('beforeend','<a class="mobile-auth-link" href="login.html">Log in</a><a class="mobile-auth-link mobile-join" href="signup.html">Sign up</a>');
}
menu?.setAttribute('aria-expanded','false');
menu?.addEventListener('click',()=>{
  const open=links.classList.toggle('open');
  menu.setAttribute('aria-expanded',String(open));
  menu.textContent=open?'×':'☰';
  menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');
  document.body.classList.toggle('nav-open',open);
});
links?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
  links.classList.remove('open');
  menu?.setAttribute('aria-expanded','false');
  if(menu){menu.textContent='☰';menu.setAttribute('aria-label','Open navigation');}
  document.body.classList.remove('nav-open');
}));

const footer=document.querySelector('.site-footer');
if(footer){
  footer.innerHTML=`<div class="wrap">
    <div class="footer-grid premium-footer-grid">
      <div class="foot-intro"><a class="brand" href="index.html" aria-label="Stackly home"><img src="assets/stackly-logo.webp" alt="Stackly"></a><p>Fine jewellery shaped by Indian craft, transparent practice and a belief that the most meaningful pieces live beyond one lifetime.</p><div class="social-links"><a href="404.html" aria-label="Instagram"></a><a href="404.html" aria-label="Facebook"></a><a href="404.html" aria-label="YouTube"></a><a href="404.html" aria-label="Pinterest"></a></div></div>
      <div><h4>Quick Links</h4><ul><li><a href="index.html">Home</a></li><li><a href="about.html">About Us</a></li><li><a href="services.html">Services</a></li><li><a href="blogs.html">Blogs</a></li><li><a href="contact.html">Contact</a></li></ul></div>
      <div><h4>Client Services</h4><ul><li><a href="contact.html">Book an appointment</a></li><li><a href="404.html">Track an order</a></li><li><a href="404.html">Shipping & returns</a></li><li><a href="404.html">Gold exchange</a></li><li><a href="404.html">Jewellery care</a></li></ul></div>
      <div><h4>Visit & Contact</h4><p>12 Vittal Mallya Road<br>Bengaluru, Karnataka</p><p>Mon–Sat · 10:30 AM–7:30 PM</p><p><a href="404.html">+91 80 4567 1958</a><br><a href="404.html">care@stackly.example</a></p></div>
    </div>
    <div class="footer-subscribe"><div><p class="eyebrow">Private updates</p><h3>A little brilliance, occasionally.</h3><p>New collections, atelier stories and private previews.</p></div><form class="footer-signup" data-route="404.html"><input type="email" required aria-label="Email address" placeholder="Email address"><button type="submit">Join</button></form></div>
    <div class="footer-bottom"><span>© 2026 Stackly Jewellers. All rights reserved.</span><div><a href="404.html">Privacy</a><a href="404.html">Terms</a><a href="404.html">Accessibility</a></div></div>
  </div>`;
}

const animated=[...document.querySelectorAll('main section, .footer-grid > div, .footer-subscribe, .footer-bottom, .metric, .dash-panel')];
animated.forEach((el,index)=>{
  el.classList.add('scroll-animate');
  el.style.setProperty('--delay',`${(index%4)*70}ms`);
});
document.querySelectorAll('.grid,.steps,.testimonial-grid,.stat-band,.auth-benefits,.dash-grid').forEach(group=>{
  [...group.children].forEach((child,index)=>{
    child.classList.add('scroll-animate');
    child.style.setProperty('--delay',`${Math.min(index,5)*85}ms`);
  });
});

if(isReduced){
  document.querySelectorAll('.reveal,.scroll-animate').forEach(el=>el.classList.add('in'));
}else{
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('in');observer.unobserve(entry.target);}
  }),{threshold:.1,rootMargin:'0px 0px -7% 0px'});
  document.querySelectorAll('.reveal,.scroll-animate').forEach(el=>observer.observe(el));
}

document.querySelectorAll('a[href="#"]').forEach(link=>link.setAttribute('href','404.html'));

document.querySelectorAll('form[data-demo],form[data-route]').forEach(form=>form.addEventListener('submit',event=>{
  event.preventDefault();
  if(!form.checkValidity()){form.reportValidity();return;}
  window.location.href=form.dataset.route||'404.html';
}));

const contactForm=document.querySelector('form.form.reveal');
if(contactForm&&!contactForm.hasAttribute('data-auth')&&!contactForm.hasAttribute('data-route')){
  contactForm.addEventListener('submit',event=>{
    event.preventDefault();
    if(contactForm.checkValidity()) window.location.href='404.html';
    else contactForm.reportValidity();
  });
}

document.querySelectorAll('form[data-auth]').forEach(form=>form.addEventListener('submit',event=>{
  event.preventDefault();
  if(!form.checkValidity()){form.reportValidity();return;}
  const email=form.querySelector('input[type="email"]').value.trim();
  const role=form.querySelector('[name="domain"]').value;
  const nameInput=form.querySelector('[autocomplete="name"]');
  const accountKey=email.toLowerCase();
  let accounts={};
  try{accounts=JSON.parse(localStorage.getItem('stacklyAccounts'))||{};}catch{}

  sessionStorage.setItem('stacklyEmail',email);
  sessionStorage.setItem('stacklyRole',role);
  if(nameInput?.value.trim()){
    const name=nameInput.value.trim();
    accounts[accountKey]={name,role};
    localStorage.setItem('stacklyAccounts',JSON.stringify(accounts));
    sessionStorage.setItem('stacklyName',name);
    window.location.href='login.html';
    return;
  }

  const savedName=accounts[accountKey]?.name;
  const emailName=email
    .split('@')[0]
    .split(/[._-]+/)
    .filter(Boolean)
    .map(part=>part.charAt(0).toUpperCase()+part.slice(1))
    .join(' ');
  sessionStorage.setItem('stacklyName',savedName||emailName||'Member');
  window.location.href=role==='admin'?'admin-dashboard.html':'user-dashboard.html';
}));

document.querySelectorAll('[data-profile-email]').forEach(element=>{
  element.textContent=sessionStorage.getItem('stacklyEmail')||element.dataset.fallback;
});
const profileName=sessionStorage.getItem('stacklyName');
document.querySelectorAll('[data-profile-name]').forEach(element=>{
  element.textContent=profileName||element.dataset.fallback||'Vishwa';
});
document.querySelectorAll('[data-profile-initials]').forEach(element=>{
  const source=profileName||element.dataset.fallback||'Vishwa';
  element.textContent=source.split(/\s+/).filter(Boolean).slice(0,2).map(part=>part[0]).join('').toUpperCase();
});

const dashMenu=document.querySelector('.dash-menu');
const sidebar=document.querySelector('.sidebar');
const sidebarClose=document.querySelector('.sidebar-close');
const dashboardViews=[...document.querySelectorAll('.dashboard-view')];
const dashboardLinks=[...document.querySelectorAll('[data-dashboard-target]')];
function closeSidebar(){
  sidebar?.classList.remove('open');
  document.body.classList.remove('sidebar-open');
  dashMenu?.setAttribute('aria-expanded','false');
}
function showDashboardView(id,updateHash=true){
  if(!dashboardViews.length)return;
  const target=document.getElementById(id)||dashboardViews[0];
  dashboardViews.forEach(view=>view.classList.toggle('active',view===target));
  dashboardLinks.forEach(link=>link.classList.toggle('active',link.dataset.dashboardTarget===target.id&&link.closest('.side-nav')));
  target.querySelectorAll('.scroll-animate').forEach(el=>el.classList.add('in'));
  document.getElementById('dashboard-title')?.replaceChildren(document.createTextNode(target.dataset.viewTitle||'Dashboard'));
  if(updateHash) history.replaceState(null,'',`#${target.id}`);
  window.scrollTo({top:0,behavior:isReduced?'auto':'smooth'});
  closeSidebar();
}
dashMenu?.setAttribute('aria-expanded','false');
dashMenu?.addEventListener('click',()=>{
  const open=sidebar.classList.toggle('open');
  document.body.classList.toggle('sidebar-open',open);
  dashMenu.setAttribute('aria-expanded',String(open));
});
sidebarClose?.addEventListener('click',closeSidebar);
dashboardLinks.forEach(link=>link.addEventListener('click',event=>{
  event.preventDefault();
  showDashboardView(link.dataset.dashboardTarget);
}));
sidebar?.querySelectorAll('a:not([data-dashboard-target])').forEach(link=>link.addEventListener('click',closeSidebar));
if(dashboardViews.length) showDashboardView(location.hash.slice(1)||'overview',false);
window.addEventListener('hashchange',()=>showDashboardView(location.hash.slice(1)||'overview',false));
