import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


if (window.innerWidth > 1440) {
  console.log('scrollGsap.ts');
  let horizontalSections = gsap.utils.toArray(".slider");
  horizontalSections.forEach((container) => {
    let sections = (container as Element).querySelectorAll(".slider__Page");
  
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: container as Element,
        pin: true,
        scrub: 1,
        end: "+=1000",
      }
    });
  })
}