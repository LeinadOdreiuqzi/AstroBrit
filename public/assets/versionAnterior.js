const gsap = window.gsap
const ScrollTrigger = window.ScrollTrigger

gsap.registerPlugin(ScrollTrigger)

// Cargar y configurar la animación de frames
const framesContainer = document.getElementById("frames-animation")
const totalFrames = 89
let currentFrame = 0
const frames = []
let framesLoaded = 0

// Variables para controlar el estado de las timelines
let firstTimelineComplete = false
let isHiding = false 
let lastScrollProgress = 0 

// Precargar y crear elementos de imagen para cada frame
function preloadFrames() {
  return new Promise((resolve) => {
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.src = `../frames/1 (${i}).webp`
      img.alt = `Frame ${i}`
      img.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0;
        pointer-events: none;
        image-rendering: -webkit-optimize-contrast;
        image-rendering: crisp-edges;
      `

      img.onload = () => {
        framesLoaded++
        if (framesLoaded === totalFrames) {
          resolve()
        }
      }

      img.onerror = () => {
        console.warn(`Failed to load frame ${i}`)
        framesLoaded++
        if (framesLoaded === totalFrames) {
          resolve()
        }
      }

      framesContainer.appendChild(img)
      frames.push(img)
    }
  })
}

let isAnimating = false;
let lastRenderedFrame = -1;

function showFrame(frameIndex) {
  // Evitar actualizaciones innecesarias
  if (frameIndex === lastRenderedFrame || !frames[frameIndex]) return;
  
  // Evitar solapamiento de animaciones
  if (isAnimating) return;
  isAnimating = true;
  
  // Usar requestAnimationFrame para sincronizar con el renderizado del navegador
  requestAnimationFrame(() => {
    try {
      // Ocultar el frame actual si existe
      if (frames[currentFrame] && currentFrame !== frameIndex) {
        frames[currentFrame].style.display = 'none';
      }
      
      // Mostrar el nuevo frame
      const targetFrame = frames[frameIndex];
      targetFrame.style.display = 'block';
      targetFrame.style.opacity = '1';
      
      // Actualizar el frame actual
      currentFrame = frameIndex;
      lastRenderedFrame = frameIndex;
    } catch (error) {
      console.error('Error in showFrame:', error);
    } finally {
      isAnimating = false;
    }
  });
}

// Función para inicializar el contenido de la segunda timeline
function initializeSecondTimeline() {
  const secondTimelineContent = document.querySelector("main")
  if (secondTimelineContent) {
    gsap.set(secondTimelineContent, {
      opacity: 0,
      x: "100%", 
      scale: 0.7,
      rotationY: 45, 
      visibility: "visible", 
      pointerEvents: "none", 
    })
    console.log("Segunda timeline inicializada y ocultada")
  }
}

// Función para ocultar la segunda timeline
function hideSecondTimeline() {
  const secondTimelineContent = document.querySelector("main")
  const logoMask = document.querySelector("#logo-mask")

  // Ocultar instantáneamente el contenido de la segunda timeline
  if (secondTimelineContent) {
    gsap.set(secondTimelineContent, { 
      opacity: 0, 
      pointerEvents: "none" 
    })
  }
  if (logoMask) {
    gsap.set(logoMask, { opacity: 1 })
  }
  
  // IMPORTANTE: No reiniciamos firstTimelineComplete a false
  // para que la animación de entrada no se repita.
}

// Función para activar la segunda timeline con animaciones rápidas
window.activateSecondTimeline = () => {
  if (firstTimelineComplete) {
    console.log("Segunda timeline ya está activa, saltando...")
    return 
  }

  firstTimelineComplete = true
  isHiding = false 
  console.log("Activando segunda timeline...")

  const secondTimelineContent = document.querySelector("main")
  const logoMask = document.querySelector("#logo-mask")
  const header = document.querySelector("main .header")
  const logoText = document.querySelector("main .logo-text")
  const mainContent = document.querySelector("main .main-content")
  const title = document.querySelector("main .main-content h1")
  const paragraph = document.querySelector("main .main-content p")

  if (!secondTimelineContent) {
    console.error("No se encontró el contenido de la segunda timeline")
    return
  }

  // Timeline de entrada rápida y dinámica
  const entryTimeline = gsap.timeline({
    ease: "power3.out",
  })

  // 1. Ocultar logo-mask rápidamente
  entryTimeline.to(logoMask, {
    opacity: 0,
    duration: 1.5, 
    ease: "power3.inOut",
  })

  // 2. Preparar el contenedor 
  entryTimeline.set(secondTimelineContent, {
    pointerEvents: "auto", 
    zIndex: 100,
  })

  // 3. Animación principal de entrada - slide desde la derecha con rotación
  entryTimeline.to(
    secondTimelineContent,
    {
      x: "0%",
      scale: 1,
      rotationY: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power3.out",
    },
    "<0.1",
  )

  // 4. Header entra desde arriba rápidamente
  if (header && logoText) {
    entryTimeline.fromTo(
      header,
      {
        y: -60,
        opacity: 0,
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(2)",
      },
      "<0.2",
    )
  }

  // 5. Título entra desde la derecha 
  if (title) {
    entryTimeline.fromTo(
      title,
      {
        x: 80,
        y: 30,
        opacity: 0,
        scale: 0.7,
        rotation: 5,
      },
      {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.6,
        ease: "back.out(1.8)",
      },
      "<0.1",
    )
  }

  // 6. Párrafo entra desde abajo con slide
  if (paragraph) {
    entryTimeline.fromTo(
      paragraph,
      {
        y: 50,
        x: -30,
        opacity: 0,
        scale: 0.9,
      },
      {
        y: 0,
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "power3.out",
      },
      "<0.15",
    )
  }

  // 7. Efecto final sutil en el título
  entryTimeline.to(
    title,
    {
      scale: 1.03,
      duration: 0.2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: 1,
    },
    "<0.3",
  )

  console.log("Segunda timeline activada completamente")
}

// Mostrar el gradiente al cargar la página
document.addEventListener("DOMContentLoaded", async () => {
  initializeSecondTimeline();

  await preloadFrames();

  // Mostrar el primer frame
  if (frames[0]) {
    frames[0].style.opacity = "1";
  }

  // Configurar la animación principal después de cargar los frames
  setupMainAnimation();
});

function setupMainAnimation() {
  // Timeline principal con ScrollTrigger
  const mainTimeline = gsap.timeline({
    ease: "power2.inOut",
    scrollTrigger: {
      trigger: "#main-content",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;
        const frameSectionProgress = Math.min(progress / 0.7, 1);

        if (progress <= 0.7) {
          // Solo actualizar la opacidad si es necesario
          if (self.direction === 1 && progress > 0.1) {
            gsap.set("#frames-animation", { opacity: 1, immediateRender: false });
          }
          
          // Calcular el frame actual basado en el progreso
          const targetFrame = Math.min(Math.floor(frameSectionProgress * (totalFrames - 1)), totalFrames - 1);
          
          // Solo actualizar si el frame es diferente al anterior
          if (targetFrame !== lastRenderedFrame) {
            showFrame(targetFrame);
          }
        } else if (progress > 0.7 && self.direction === 1) {
          // Solo ocultar cuando se hace scroll hacia abajo
          gsap.to("#frames-animation", { 
            opacity: 0, 
            duration: 0.5, 
            ease: "power2.in",
            onComplete: () => {
              // Asegurarse de que todos los frames estén ocultos
              frames.forEach(frame => {
                if (frame) frame.style.display = 'none';
              });
            }
          });
        }
      },
      onLeave: () => {
        // Mostrar el header fijo
        const header = document.querySelector(".header");
        gsap.to(header, { opacity: 1, visibility: "visible", duration: 0.5 });

        if (!firstTimelineComplete) {
          // Ejecutar la animación de entrada solo la primera vez
          window.activateSecondTimeline();
        } else {
          // Si ya se mostró, solo hacerlo visible instantáneamente
          const secondTimelineContent = document.querySelector("main");
          const logoMask = document.querySelector("#logo-mask");
          gsap.set(secondTimelineContent, { opacity: 1, pointerEvents: "auto" });
          // Asegurarse de que la máscara también se oculte
          if (logoMask) {
            gsap.set(logoMask, { opacity: 0 });
          }
        }
      },
      onEnterBack: () => {
        // Ocultar el header fijo
        const header = document.querySelector(".header");
        gsap.to(header, { opacity: 0, visibility: "hidden", duration: 0.5 });

        // Ocultar la segunda timeline al volver a subir
        hideSecondTimeline();
      },
      onLeaveBack: () => {
        // Restaurar el estado inicial de la primera animación
        gsap.set("#frames-animation", { opacity: 1 });
        showFrame(0);
      },
    },
  })

  // Ajustar la posición de inicio de la animación de la máscara
  mainTimeline
    .to(
      "#hero-key",
      {
        duration: 1.5,
        scale: 1,
        ease: "power2.out",
      },
      0.5,
    ) // Retrasar ligeramente el inicio
    .to(
      "#hero-footer",
      {
        opacity: 0,
        duration: 0.8,
        ease: "power2.in",
      },
      "<0.2",
    )
    .to(
      "#hero-play-button",
      {
        opacity: 0,
        duration: 0.8,
        ease: "power2.in",
      },
      "<0.1",
    )
    // Animación de la máscara con mejor sincronización
    .to(
      "#logo-mask",
      {
        maskSize: "clamp(80vh, 50%, 60vh)",
        webkitMaskSize: "clamp(80vh, 50%, 60vh)",
        duration: 2,
        ease: "power2.inOut",
      },
      0.7, // Iniciar después de que los frames estén ocultándose
    )
    .to(
      "#hero-key",
      {
        opacity: 0,
        duration: 1,
        ease: "power2.in",
      },
      0.8,
    )
    // Hacer que el logo vuelva a aparecer después de la animación de la máscara
    .to(
      ".logo-text",
      {
        opacity: 1,
        duration: 1.2,
        ease: "power2.inOut",
      },
      0.6,
    )
}

// Animaciones adicionales (mantener solo las que no son repetitivas)
gsap.to(".keep-scrolling", {
  y: -5,
  duration: 1,
  repeat: -1,
  yoyo: true,
  ease: "power2.inOut",
})
