
  window.fbAsyncInit = function() {
    FB.init({
      appId            : 'your-app-id',
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v3.2'
    });
    function init() {
FB.api(
  '/charlotteone',
  'GET',
  {"access_token":"EAADNHAoGEygBAFKTnW2p7XY4dHnkA7Y4hjNeq7rAjfw3z98nVeBz68yAnlkKai9ZA43ZA0ZBVQnYuxwyt9ggsZBtoFwXHSppMgzZBcCXgIxn2V3IdTBETJXWZA8GMrNIJvu9isdTyDZA2v5vXH8yLmwi9QGslh9fPNH64x6KhwJX2ZBDrRivsoUhhqQJVoFwnqgZD",
    "fields":"events"},
    function(response) {
    $res = response.events.data;
    for (let item of $res) {
    	date = item.start_time;
			date = new Date(date);
			month = date.getMonth();
			day = date.getDate();
    	description = item.description;
    	place = item.place.name;
      
		};
    $scrollerTitle = document.getElementById('scroller-title');
    $scrollerSubtitle = document.getElementById('scroller-subtitle');
    $scrollerDescription = document.getElementById('scroller-description');
    function newEvent(response) {
    $scrollerTitle.innerText = month + "." + day;
    $scrollerSubtitle.innerText = place;
    $scrollerDescription.innerText = description;
    newEvent();
    
}
}


    );    
  } init();
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));


var scroller = document.getElementById('scroller');
var clone1 = scroller.lastElementChild;
var clone2 = clone1.previousSibling;
function addClones() {
    clone1.classList.add('is-clone');
    clone2.classList.add('is-clone');
}
addClones();
var doc = window.document,
  context = doc.querySelector('.scroller'),
  clones = context.querySelectorAll('.is-clone'),
  disableScroll = false,
  scrollHeight = 0,
  scrollPos = 0,
  clonesHeight = 0,
  i = 0;

function getScrollPos () {
  return (context.pageYOffset || context.scrollTop) - (context.clientTop || 0);
}

function setScrollPos (pos) {
  context.scrollTop = pos;
}

function getClonesHeight () {
  clonesHeight = 0;

  for (i = 0; i < clones.length; i += 1) {
    clonesHeight = clonesHeight + clones[i].offsetHeight;
  }

  return clonesHeight;
}

function reCalc () {
  scrollPos = getScrollPos();
  scrollHeight = context.scrollHeight;
  clonesHeight = getClonesHeight();

  if (scrollPos <= 0) {
    setScrollPos(1); // Scroll 1 pixel to allow upwards scrolling
  }
}

function scrollUpdate () {
  if (!disableScroll) {
    scrollPos = getScrollPos();

    if (clonesHeight + scrollPos >= scrollHeight) {
      // Scroll to the top when you’ve reached the bottom
      setScrollPos(1); // Scroll down 1 pixel to allow upwards scrolling
      disableScroll = true;
    } else if (scrollPos <= 0) {
      // Scroll to the bottom when you reach the top
      setScrollPos(scrollHeight - clonesHeight);
      disableScroll = true;
    }
  }

  if (disableScroll) {
    // Disable scroll-jumping for a short time to avoid flickering
    window.setTimeout(function () {
      disableScroll = false;
    }, 40);
  }
}

function init () {
  reCalc();
  
  context.addEventListener('scroll', function () {
    window.requestAnimationFrame(scrollUpdate);
  }, false);

  window.addEventListener('resize', function () {
    window.requestAnimationFrame(reCalc);
  }, false);
}

if (document.readyState !== 'loading') {
  init()
} else {
  doc.addEventListener('DOMContentLoaded', init, false)
}








// Just for this demo: Center the middle block on page load
window.onload = function () {
  setScrollPos(Math.round(clones[0].getBoundingClientRect().top + getScrollPos() - (context.offsetHeight - clones[0].offsetHeight) / 2));
};
