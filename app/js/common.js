$(function() {

  //burger-menu
  const burger = document.getElementById('burger');
const burgerSpan = document.querySelector('.burger-span');
const nav = document.querySelector('.header-menu');
const header = document.querySelector('.header');
const body = document.querySelector("body")
const navItem = document.querySelectorAll('.header-menu_item');
const html = document.querySelector("html")

burger.addEventListener('click', (e) => {
    e.preventDefault()
    nav.classList.toggle('header-menu--active');
    burgerSpan.classList.toggle('active');
    nav.classList.contains('header-menu--active') ? html.style.overflowY = 'hidden' : html.style.overflowY = ''

    
    
})

navItem.forEach(element => element.addEventListener('click',(e) => {
    e.preventDefault()
    if(nav.classList.contains('header-menu--active')){
        nav.classList.toggle('header-menu--active');
        burgerSpan.classList.toggle('active');
    
        // nav.classList.contains('header_nav-active') ? body.style.overflowY = 'hidden' : body.style.overflowY = ''
        nav.classList.contains('header-menu--active') ? html.style.overflowY = 'hidden' : html.style.overflowY = ''

    }
   
    
    
}));
////menu -end

	//slick slider
	let $current = $('#current-slide-count');
	let $all = $('#all-slide-count');

  //////maim-slider
	
	$('.slide_wrap').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
	  //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
	  let i = (currentSlide ? currentSlide : 0) + 1;
	  $current.text(i );
	  $all.text(slick.slideCount);
	});
	$('.slide_wrap').slick({
		prevArrow:$(".slider_btn-prev"),
		nextArrow:$(".slider_btn-next"),
		fade:true,
	});

  //projeckt section adaptive slider
  const PRJCKT_SLIDER_CONFIG = {
    slider:false
  }
  function rjcktSlider(config){
    if($(window).width() < 1200 && !config.slider){
      $('.projekts_item-wrap').slick({
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              infinite: true,
              speed: 300,
              slidesToShow: 1,
              centerMode: true,
              variableWidth: true,
              arrows: false,
              autoplay: true,
              autoplaySpeed: 2000,
              
            }
          },
          {
            breakpoint: 768,
            settings: {
              infinite: true,
              speed: 300,
              slidesToShow: 1,
              centerMode: false,
              variableWidth: true,
              arrows: false,
              autoplay: true,
              autoplaySpeed: 2000,
              
            }
          },
          {
            breakpoint: 9999,
            settings:"unslick"
          },]
    
      });
      config.slider = true;
     
    } else if ($(window).width() > 1200 && config.slider){
      $('.projekts_item-wrapp').slick('unslick');
      config.slider = false;
    }
  };
  rjcktSlider(PRJCKT_SLIDER_CONFIG)
  $(window).on('resize', function(){
       
    rjcktSlider(PRJCKT_SLIDER_CONFIG)
  });

	//slick slider-end



//gsap scroll anim
gsap.registerPlugin(ScrollTrigger);

function animLeft(el){
  gsap.from(el, {
    duration:1, x:"-300",opacity: 0, ease:Power3.easeOut, 
      scrollTrigger: {
      trigger:el,
      markers:false,
      start:"top 75%", //when top of herman passes 75% viewport height
      end:"bottom 25%", //when bottom of herman passes 25% viewport height
      
         //events: onEnter onLeave onEnterBack onLeaveBack
      toggleActions:"play"
        //options: play, pause, resume, reset, restart, complete, reverse,none
      },
      stagger: 0.2
    }) 
}
function animRight(el,stagger = 0.2){
  gsap.from(el, {
      duration:1, x:"110%",opacity: 0, ease:Power3.easeOut, 
      scrollTrigger: {
      trigger:el,
      markers:false,
      start:"top 75%", //when top of herman passes 75% viewport height
      end:"bottom 25%", //when bottom of herman passes 25% viewport height
      
         //events: onEnter onLeave onEnterBack onLeaveBack
      toggleActions:"play",
        //options: play, pause, resume, reset, restart, complete, reverse,none
   
      
      },
      onComplete: () => { 
        // console.log(el)
        if(el ==".spiner_item"){
          gsap.utils.toArray(el).forEach(elem => {
            let hover = gsap.to(elem,
              {
                scale: 1.1,
                rotate:10,
                duration: 0.3,
                paused: true,
                ease: "power1.inOut"
              });
            elem.addEventListener("mouseenter", () => hover.play());
            elem.addEventListener("mouseleave", () => hover.reverse());
          });
        }
       
        
    },
      stagger: stagger
    }) 
}
function animUp(el,trigger,stagger = 0.2){
  gsap.from(el, {
    duration:1, y:"110%",opacity: 0, ease:Power3.easeOut, 
      scrollTrigger: {
      trigger:trigger||el,
      markers:false,
      start:"top 100%", //when top of herman passes 75% viewport height
      end:"bottom 25%", //when bottom of herman passes 25% viewport height
      
         //events: onEnter onLeave onEnterBack onLeaveBack
      toggleActions:"play"
        //options: play, pause, resume, reset, restart, complete, reverse,none
      },
      onComplete: () => { 
        // console.log(el)
        if(el ==".value_card"||".loved_card"){
          gsap.utils.toArray(el).forEach(elem => {
            let hover = gsap.to(elem,
              {
                y: -4,
                duration: 0.3,
                paused: true,
                ease: "power1.inOut"
              });
            elem.addEventListener("mouseenter", () => hover.play());
            elem.addEventListener("mouseleave", () => hover.reverse());
          });
        }
       
        
    },
      
      stagger: stagger
    }) 
}
animUp('.about_images img')
animRight('.about_col--right *')
animRight('.tasks_item--two')
animRight('.feedback_content img')
animLeft('.tasks_item--one')
animLeft('.feedback-form')


});