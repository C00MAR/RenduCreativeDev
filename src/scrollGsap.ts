import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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



 

// class App {
//   private scrollTween: gsap.core.Tween;

//   constructor() {
//     this.initHorizontalScroll();
//   }

//   private initHorizontalScroll(): void {
//     const slider = document.querySelector('.slider') as HTMLElement;
//     const pages = gsap.utils.toArray('.slider__Page') as HTMLElement[];
    
//     // S'assurer que le conteneur a la bonne hauteur pour le scroll
//     const containerHeight = pages.length * 100;
//     slider.style.height = `${containerHeight}vh`;

//     // Créer l'animation
//     this.scrollTween = gsap.to(pages, {
//       xPercent: -100 * (pages.length - 1),
//       ease: 'none',
//       scrollTrigger: {
//         trigger: slider,
//         pin: true,
//         start: 'top top',
//         end: 'bottom bottom',
//         scrub: 1,
//         snap: 1 / (pages.length - 1),
//         invalidateOnRefresh: true, // Recalcule les valeurs au redimensionnement
//         markers: true // Pour déboguer - à retirer en production
//       }
//     });

//     // Style des pages
//     gsap.set(pages, {
//       position: 'fixed', // Les pages restent fixes pendant le scroll
//       top: 0,
//       left: 0,
//       width: '100%'
//     });

//     // Rafraîchir ScrollTrigger lors du redimensionnement
//     window.addEventListener('resize', () => {
//       ScrollTrigger.refresh();
//     });
//   }
// }

// // Initialiser quand le DOM est chargé
// document.addEventListener('DOMContentLoaded', () => {
//   new App();
// });