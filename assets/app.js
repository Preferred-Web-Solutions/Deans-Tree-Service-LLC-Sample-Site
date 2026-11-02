(function(){
var d=document,hdr=d.querySelector('header.site');
// start each new page at the top (not on Back/Forward or #links)
try{var nav=performance.getEntriesByType('navigation')[0];if(!location.hash&&(!nav||nav.type!=='back_forward')){history.scrollRestoration='manual';
 // some viewers restore the previous page's scroll after load, so hold the top until the visitor scrolls
 var moved=false,top=function(){if(!moved&&scrollY)scrollTo(0,0)};['wheel','touchstart','keydown','mousedown'].forEach(function(t){addEventListener(t,function(){moved=true},{once:true,passive:true})});
 d.documentElement.scrollIntoView();top();addEventListener('DOMContentLoaded',top);addEventListener('load',function(){top();setTimeout(top,60);setTimeout(top,250);setTimeout(top,600)});requestAnimationFrame(top)}}catch(e){}
// header shadow
function sc(){if(hdr)hdr.classList.toggle('scrolled',scrollY>4)}addEventListener('scroll',sc,{passive:true});sc();
// services dropdown
var sb=d.querySelector('.sub-btn'),sm=d.getElementById('submenu');
function setSub(o,focusBtn){if(!sb)return;sb.setAttribute('aria-expanded',o);sm.hidden=!o;if(!o&&focusBtn)sb.focus()}
if(sb){sb.addEventListener('click',function(){setSub(sb.getAttribute('aria-expanded')!=='true')});
 sb.parentNode.addEventListener('keydown',function(e){if(e.key==='Escape'&&sb.getAttribute('aria-expanded')==='true'){setSub(false,true);e.stopPropagation()}});
 sb.parentNode.addEventListener('focusout',function(e){if(e.relatedTarget&&!sb.parentNode.contains(e.relatedTarget))setSub(false)});
 d.addEventListener('click',function(e){if(!sb.parentNode.contains(e.target))setSub(false)})}
// mobile menu
var nb=d.querySelector('.navbtn'),mn=d.getElementById('mainnav');
function setNav(o,focusBtn){nb.setAttribute('aria-expanded',o);mn.classList.toggle('open',o);if(!o&&focusBtn)nb.focus()}
if(nb){nb.addEventListener('click',function(){setNav(nb.getAttribute('aria-expanded')!=='true')});
 d.addEventListener('keydown',function(e){if(e.key==='Escape'&&nb.getAttribute('aria-expanded')==='true')setNav(false,true)});
 d.addEventListener('click',function(e){if(nb.getAttribute('aria-expanded')==='true'&&!mn.contains(e.target)&&!nb.contains(e.target))setNav(false)});
 mn.addEventListener('focusout',function(e){if(e.relatedTarget&&!mn.contains(e.relatedTarget)&&e.relatedTarget!==nb&&nb.getAttribute('aria-expanded')==='true')setNav(false)})}
// reveal on scroll (anything already on screen shows at once)
var els=[].slice.call(d.querySelectorAll('[data-reveal]'));
if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches){els.forEach(function(e){e.classList.add('in')})}
else{var vh=innerHeight;els.forEach(function(e){if(e.getBoundingClientRect().top<vh*0.98)e.classList.add('in')});
 var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}})},{rootMargin:'0px 0px -6% 0px'});
 els.forEach(function(e){if(!e.classList.contains('in'))io.observe(e)})}

// scroll down the tree (services section)
(function(){
 var hero=d.querySelector('.treesec');if(!hero)return;
 var rm=matchMedia('(prefers-reduced-motion: reduce)');if(rm.matches){d.documentElement.classList.add('no-scrolly');return}
 d.documentElement.classList.add('scrolly');
 var sticky=hero.querySelector('.tree-pin'),track=hero.querySelector('.tree-track'),stage=hero.querySelector('.tree-stage'),world=hero.querySelector('.tree-world'),
     depth=hero.querySelector('.depth-n'),hots=[].slice.call(hero.querySelectorAll('.hot')),navs=[].slice.call(d.querySelectorAll('[data-stopnav]')),
     STOPS=[330,1000,1320,1800],G=1880,FT=1840/70,mq=matchMedia('(max-width:900px)'),cur=-1,ticking=false;
 function hdr(){var h=d.querySelector('header.site');return h?h.offsetHeight:0}
 function frame(){ticking=false;
  var el=mq.matches?track:hero,pin=mq.matches?stage:sticky,range=el.offsetHeight-pin.offsetHeight;if(range<=0)return;
  var p=Math.min(1,Math.max(0,(hdr()-el.getBoundingClientRect().top)/range));
  var travel=Math.max(0,world.offsetHeight-stage.clientHeight),ty=-travel*p;
  world.style.transform='translate3d(0,'+ty.toFixed(1)+'px,0)';
  var cy=(-ty+stage.clientHeight*.5)/world.offsetHeight*2000;
  if(depth)depth.textContent=Math.round(Math.max(0,Math.min(70,(G-cy)/FT)));
  var cp=STOPS[0]+p*(STOPS[3]-STOPS[0]),best=0,bd=1e9;STOPS.forEach(function(y,i){var dd=Math.abs(y-cp);if(dd<bd){bd=dd;best=i}});
  if(best!==cur){cur=best;world.className='tree-world s'+best;
   hots.forEach(function(h){h.classList.toggle('on',+h.getAttribute('data-stop')===best)});
   navs.forEach(function(a){a.classList.toggle('on',+a.getAttribute('data-stopnav')===best)})}
 }
 function req(){if(!ticking){ticking=true;requestAnimationFrame(frame)}}
 addEventListener('scroll',req,{passive:true});addEventListener('resize',req);frame();
 // keyboard: focusing a hotspot scrolls the tree to it
 hots.forEach(function(h){h.addEventListener('focus',function(){var i=+h.getAttribute('data-stop'),el=mq.matches?track:hero,pin=mq.matches?stage:sticky,range=el.offsetHeight-pin.offsetHeight;
  var travel=Math.max(1,world.offsetHeight-stage.clientHeight),wy=STOPS[i]/2000*world.offsetHeight-stage.clientHeight*.5,p=Math.min(1,Math.max(0,wy/travel));
  var top=el.getBoundingClientRect().top+scrollY-hdr()+p*range;scrollTo(0,top)})});
})();
// demo quote form (not connected)
var f=d.getElementById('qform');
if(f){f.addEventListener('submit',function(e){e.preventDefault();var s=d.getElementById('qstatus');
 if(!f.checkValidity()){s.textContent='Please add your name, a phone number and a few words about the problem.';var b=f.querySelector(':invalid');if(b)b.focus();return}
 s.textContent='This is a working demo and is not connected yet, so nothing was sent. For now, please call or text (937) 605-7544.'})}
})();
