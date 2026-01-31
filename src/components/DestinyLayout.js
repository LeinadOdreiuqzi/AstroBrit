export const DestinyLayout = {
   getHTML(data) {
      const { src, rank, rankTitle, userDescription, elogios, username } = data;
      const safeDesc = userDescription || "Temporada 28 // R1 // L0";
      const safeElogios = elogios || "0";
      const safeUsername = username || "cabotercero";

      return `
      <style>
        :host { display: contents; }
        .lightbox { 
          position: fixed; inset: 0; 
          background: rgba(12, 16, 20, 0.96); 
          backdrop-filter: blur(12px); 
          display: flex; flex-direction: column; 
          height: 100vh; width: 100vw; 
          z-index: 10000; overflow: hidden; 
          color: #fff; font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }
         .lightbox[hidden] { display: none; }
        
        /* HEADER */
        .destiny-nav {
          display: flex; align-items: center; justify-content: space-between;
          height: 64px; padding: 0 40px;
          background: rgba(255, 255, 255, 0.03);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          flex: 0 0 auto;
        }
        .nav-left { display: flex; align-items: center; gap: 24px; }
        .emblem-icon { width: 40px; height: 40px; background: #33e; border-radius: 2px; display: grid; place-items: center; font-weight: bold; }
        .user-details { display: flex; flex-direction: column; line-height: 1.1; }
        .user-name { font-weight: 700; font-size: 1.1rem; letter-spacing: 0.5px; }
        .user-season { font-size: 0.8rem; opacity: 0.7; display: flex; gap: 10px; }
        
        .nav-tabs { display: flex; gap: 0; height: 100%; }
        .tab { 
          padding: 0 24px; display: grid; place-items: center; 
          font-weight: 600; font-size: 0.95rem; letter-spacing: 1px; color: rgba(255,255,255,0.6); 
          cursor: pointer; position: relative; height: 100%; text-transform: uppercase;
          transition: color 0.2s;
        }
        .tab:hover { color: #fff; background: rgba(255,255,255,0.05); }
        .tab.active { color: #fff; }
        .tab.active::after { 
          content: ""; position: absolute; bottom: 0; left: 0; right: 0; height: 3px; background: #fff; 
        }

        .box-close { 
           background: transparent; border: none; color: #ccc; font-size: 24px; cursor: pointer;
        }
        .box-close:hover { color: #fff; }

        /* MAIN BODY */
        .destiny-body {
          flex: 1; display: grid; grid-template-columns: 45% 55%; 
          overflow: hidden; 
        }
        
        /* LEFT: Character View */
        .character-view {
           position: relative; 
           background: radial-gradient(circle at 50% 40%, rgba(40,60,80,0.4), transparent 70%);
           display: flex; align-items: center; justify-content: center;
        }
        .guardian-model {
          height: 90%; width: 100%; object-fit: contain;
          filter: drop-shadow(0 10px 30px rgba(0,0,0,0.6));
          mask-image: linear-gradient(to bottom, black 85%, transparent 100%);
        }
        .rank-overlay {
          position: absolute; left: 60px; top: 50%; transform: translateY(-20%);
          display: flex; flex-direction: column; align-items: flex-start;
        }
        .rank-label { font-size: 0.85rem; letter-spacing: 2px; font-weight: 600; text-transform: uppercase; opacity: 0.9; margin-bottom: 4px; }
        .rank-title { font-size: 3.5rem; font-weight: 800; letter-spacing: 1px; line-height: 1; text-transform: uppercase; margin: 0; }
        .rank-btn { 
           margin-top: 16px; background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.3); 
           color: #fff; padding: 8px 16px; font-size: 0.8rem; letter-spacing: 1px; text-transform: uppercase; 
           cursor: pointer; transition: all 0.2s;
        }
        .rank-btn:hover { background: rgba(255,255,255,0.1); border-color: #fff; }

        /* RIGHT: Stats */
        .stats-view {
           padding: 60px 80px 40px 40px;
           display: flex; flex-direction: column; gap: 40px;
           overflow-y: auto;
        }
        
        .section-header { 
           font-size: 0.85rem; letter-spacing: 2px; text-transform: uppercase; 
           color: rgba(255,255,255,0.6); border-bottom: 1px solid rgba(255,255,255,0.2); 
           padding-bottom: 8px; margin-bottom: 20px; display: block; width: 100%;
        }

        /* Elogios */
        .elogios-score { display: flex; align-items: center; gap: 16px; font-size: 2.5rem; font-weight: 700; }
        .elogios-icon { color: #fff; width: 32px; height: 32px; }
        .score-bars { flex: 1; height: 8px; display: flex; gap: 4px; }
        .bar { height: 100%; border-radius: 4px; }
        .b1 { width: 30%; background: #29bca6; }
        .b2 { width: 20%; background: #d97825; }
        .b3 { width: 35%; background: #c63962; }
        .b4 { width: 15%; background: #3fa1e0; }

        /* Grid Cards */
        .grid-row { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .card { 
           background: rgba(255,255,255,0.05); height: 220px; border-top: 2px solid rgba(255,255,255,0.2);
           display: flex; flex-direction: column; align-items: center; justify-content: center;
           transition: background 0.2s; cursor: pointer; position: relative;
        }
        .card:hover { background: rgba(255,255,255,0.1); border-top-color: #fff; }
        .card-icon { width: 80px; height: 80px; margin-bottom: 16px; border-radius: 50%; background: #222; border: 2px solid #555; }
        .card-title { font-size: 1.1rem; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; text-align: center; }
        .card-sub { font-size: 0.8rem; opacity: 0.6; margin-top: 4px; text-transform: uppercase; }

        @media (max-width: 900px) {
           .destiny-body { grid-template-columns: 1fr; overflow-y: auto; }
           .character-view { height: 400px; }
           .rank-overlay { left: 20px; }
           .rank-title { font-size: 2.5rem; }
           .stats-view { padding: 40px 20px; overflow-y: visible; }
           .destiny-nav { padding: 0 16px; overflow-x: auto; }
           .tab { padding: 0 16px; }
        }
      </style>

      <div class="lightbox" role="dialog" aria-modal="true" hidden aria-hidden="true">
         <!-- NAV -->
         <header class="destiny-nav">
            <div class="nav-left">
               <div class="emblem-icon">B</div>
               <div class="user-details">
                  <span class="user-name">${safeUsername}</span>
                  <span class="user-season">${safeDesc}</span>
               </div>
            </div>
            <nav class="nav-tabs">
               <div class="tab">Clan</div>
               <div class="tab">Colecciones</div>
               <div class="tab active">Trayectoria</div>
               <div class="tab">Personaje</div>
               <div class="tab">Inventario</div>
            </nav>
            <button class="box-close" aria-label="Cerrar">×</button>
         </header>

         <div class="destiny-body">
            <!-- Left: Guardian -->
            <section class="character-view">
               <canvas id="destiny-canvas" class="guardian-model"></canvas>
               
               <div class="rank-overlay">
                  <span class="rank-label">Rango de jugador ${rank || "1"}</span>
                  <h1 class="rank-title">${rankTitle || "Aventurero"}</h1>
                  <button class="rank-btn">Ver Progreso De Rango</button>
                  <!-- Progress bar simulated -->
                  <div style="width: 300px; height: 40px; background: rgba(0,0,0,0.5); margin-top:12px; display:flex; align-items:center; padding:0 12px; border-left: 2px solid #fff;">
                     <span style="font-size:0.75rem; font-weight:700; letter-spacing:1px; text-transform:uppercase;">Progreso de rango</span>
                  </div>
               </div>
            </section>

            <!-- Right: Stats -->
            <section class="stats-view">
               <div>
                  <span class="section-header">Elogios</span>
                  <div class="elogios-score">
                     <span>★</span> <!-- Placeholder icon -->
                     <span>${safeElogios}</span>
                     <div class="score-bars">
                        <div class="bar b1"></div>
                        <div class="bar b2"></div>
                        <div class="bar b3"></div>
                        <div class="bar b4"></div>
                     </div>
                  </div>
               </div>

               <div>
                  <div class="grid-row">
                     <div class="container-col">
                        <span class="section-header">Títulos</span>
                        <div class="card">
                           <div class="card-icon" style="display: flex; align-items: center; justify-content: center; background-color:#333; font-size: 2rem;"></div>
                           <span class="card-title">Señor de Hierro</span>
                        </div>
                     </div>
                     <div class="container-col">
                        <span class="section-header">Triunfos</span>
                        <div class="card">
                           <div class="card-icon" style="background:radial-gradient(circle, #5a7 0%, #234 100%);"></div>
                           <span class="card-title">Temporada 28</span>
                           <span class="card-sub">Sin Ley</span>
                        </div>
                     </div>
                  </div>
               </div>
               
               <div style="margin-top:auto; opacity:0.5; font-size:0.9rem;">
                  No hay objetivos seguidos --
               </div>
            </section>
         </div>
      </div>
    `;
   },

   init(shadowRoot, data, onClose) {
      const { src } = data;
      const closeBtn = shadowRoot.querySelector(".box-close");
      closeBtn?.addEventListener("click", onClose);

      return new Promise((resolve) => {
         setTimeout(async () => {
            const canvas = shadowRoot.getElementById("destiny-canvas");
            if (canvas && window.skinview3d) {
               let viewer = null;
               try {
                  viewer = new skinview3d.SkinViewer({
                     canvas: canvas,
                     width: 450,
                     height: 700
                  });

                  viewer.animation = new skinview3d.IdleAnimation();
                  viewer.camera.position.set(0, 15, 55);
                  viewer.camera.lookAt(0, 15, 0);
                  viewer.autoRotate = true;
                  viewer.autoRotateSpeed = 0.6;
                  viewer.globalLight.intensity = 2.4;
                  viewer.cameraLight.intensity = 2.0;

                  // Explicitly load the skin and catch errors
                  await viewer.loadSkin(src);
                  resolve(viewer);
               } catch (e) {
                  console.error("DestinyLayout: Skin load failed or init error", e);
                  if (viewer) viewer.dispose();
                  resolve(null);
               }
            } else {
               resolve(null);
            }
         }, 50);
      });
   }
};
