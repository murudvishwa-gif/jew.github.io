const menu=document.querySelector('.menu:not(.dash-menu)');
const links=document.querySelector('.nav-links');
menu?.setAttribute('aria-expanded','false');
menu?.addEventListener('click',()=>{
  const isOpen=links.classList.toggle('open');
  menu.setAttribute('aria-expanded',String(isOpen));
});
links?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
  links.classList.remove('open');
  menu?.setAttribute('aria-expanded','false');
}));
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in');observer.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.querySelectorAll('form[data-demo]').forEach(form=>form.addEventListener('submit',event=>{
  event.preventDefault();
  const message=form.querySelector('.message');
  if(message) message.textContent=form.dataset.message||'Thank you. Your request has been received.';
  form.reset();
}));
document.querySelectorAll('form[data-auth]').forEach(form=>form.addEventListener('submit',event=>{
  event.preventDefault();
  const role=form.querySelector('[name="domain"]').value;
  const message=form.querySelector('.message');
  if(message) message.textContent=`Opening your ${role} dashboard…`;
  window.setTimeout(()=>{window.location.href=role==='admin'?'admin-dashboard.html':'user-dashboard.html'},450);
}));
document.querySelector('.dash-menu')?.addEventListener('click',()=>document.querySelector('.sidebar')?.classList.toggle('open'));
