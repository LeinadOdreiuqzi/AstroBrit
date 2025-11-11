import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

// Exponer GSAP y sus plugins globalmente
window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;
window.Flip = Flip;

// Registrar plugins
gsap.registerPlugin(ScrollTrigger, Flip);