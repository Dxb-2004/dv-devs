/**
 * ==========================================================================
 * D&V DEVS - OFFICIAL CORE CLIENT SCRIPT
 * Architecture: Three.js 3D WebGL, Lenis Smooth Scroll, GSAP 3 + ScrollTrigger
 * Features: 
 *   - Custom Cyber Magnetic Cursor
 *   - WebGL 3D Cyber Grid Tunnel & Particle Matrix with Scroll Acceleration
 *   - Scene 1: Dimensional Code Portal (3D Bracket Split & Parallax Hero Logo)
 *   - Scene 2: Horizontal Scroll Pinning & 3D Tilt on 4 Bento Service Cards
 *   - Scene 3: Live Synchronized Architecture Simulation (Admin -> Conduit -> Store)
 *   - Scene 4: Vertical Laser Timeline Illumination
 *   - Scene 5: Digital Particle Vortex & Magnetic Spring CTA
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. LENIS SMOOTH SCROLL & GSAP SCROLLTRIGGER SYNCHRONIZATION
  // ==========================================================================
  let lenis = null;

  try {
    if (typeof Lenis !== 'undefined') {
      lenis = new Lenis({
        duration: 1.25,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.8,
        infinite: false
      });

      // Synchronize Lenis with GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }
  } catch (err) {
    console.warn('Lenis could not be initialized, falling back to native scroll:', err);
  }

  // Smooth scroll helper for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(targetEl, { offset: -60, duration: 1.4 });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }

        // Close mobile drawer if open
        const mobileDrawer = document.getElementById('mobileDrawer');
        if (mobileDrawer && mobileDrawer.classList.contains('open')) {
          mobileDrawer.classList.remove('open');
        }
      }
    });
  });

  // Track global scroll for HUD & Nav
  const navScrollGlow = document.getElementById('navScrollGlow');
  const scrollPercentage = document.getElementById('scrollPercentage');
  const mainHeader = document.getElementById('mainHeader');

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) : 0;
    const pct = Math.min(100, Math.max(0, Math.round(progress * 100)));

    if (navScrollGlow) {
      navScrollGlow.style.width = `${pct}%`;
    }
    if (scrollPercentage) {
      scrollPercentage.textContent = `SCRL: ${String(pct).padStart(3, '0')}%`;
    }
    if (mainHeader) {
      if (window.scrollY > 40) {
        mainHeader.classList.add('header-scrolled');
      } else {
        mainHeader.classList.remove('header-scrolled');
      }
    }
  }, { passive: true });


  // ==========================================================================
  // 2. CUSTOM CYBER CURSOR (Neon Red Dot + Trailing Expanding Ring)
  // ==========================================================================
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  if (cursorDot && cursorRing && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    }, { passive: true });

    // Smooth Lerp loop for trailing ring
    function renderCursorRing() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
      requestAnimationFrame(renderCursorRing);
    }
    requestAnimationFrame(renderCursorRing);

    // Hover detection for interactive items
    const hoverTargets = document.querySelectorAll('a, button, .magnetic-target, .service-bento-card, input[type="range"], .step-card-content, .qty-btn, .ctl-chip-btn, .feature-chip-toggle, .nudge-btn');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
        if (typeof SoundFX !== 'undefined') SoundFX.hover();
      });
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
      el.addEventListener('click', () => {
        if (typeof SoundFX !== 'undefined') SoundFX.click();
      });
    });

    window.addEventListener('mousedown', () => document.body.classList.add('cursor-active'));
    window.addEventListener('mouseup', () => document.body.classList.remove('cursor-active'));
  }

  // ==========================================================================
  // CYBER AUDIO SYNTHESIZER (Native Web Audio API - Polite & Synthetic)
  // ==========================================================================
  let audioCtx = null;
  let isAudioEnabled = false;
  const hudAudioToggle = document.getElementById('hudAudioToggle');
  const audioIcon = document.getElementById('audioIcon');
  const audioStatusText = document.getElementById('audioStatusText');

  function initAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playTone(freqStart, freqEnd, duration, type = 'sine', volume = 0.05) {
    if (!isAudioEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freqStart, audioCtx.currentTime);
      if (freqEnd && freqEnd !== freqStart) {
        osc.frequency.exponentialRampToValueAtTime(Math.max(1, freqEnd), audioCtx.currentTime + duration);
      }
      gain.gain.setValueAtTime(volume, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Ignore audio errors silently
    }
  }

  const SoundFX = {
    hover: () => playTone(800, 1200, 0.035, 'sine', 0.025),
    click: () => playTone(1200, 500, 0.04, 'triangle', 0.05),
    zap: () => playTone(300, 1600, 0.08, 'sawtooth', 0.035),
    success: () => {
      playTone(523, 659, 0.07, 'sine', 0.04);
      setTimeout(() => playTone(659, 1046, 0.1, 'sine', 0.04), 60);
    }
  };

  if (hudAudioToggle) {
    hudAudioToggle.addEventListener('click', () => {
      initAudioContext();
      isAudioEnabled = !isAudioEnabled;
      if (isAudioEnabled) {
        hudAudioToggle.classList.add('active');
        if (audioIcon) audioIcon.className = 'fa-solid fa-volume-high';
        if (audioStatusText) audioStatusText.textContent = 'SFX: ON';
        SoundFX.success();
      } else {
        hudAudioToggle.classList.remove('active');
        if (audioIcon) audioIcon.className = 'fa-solid fa-volume-xmark';
        if (audioStatusText) audioStatusText.textContent = 'SFX: OFF';
      }
    });
  }


  // ==========================================================================
  // 3. THREE.JS 3D WEBGL CYBER BACKGROUND
  //    (Grid Tunnel Floor, Volumetric Fog & Flowing Particle Matrix)
  // ==========================================================================
  const canvasContainer = document.getElementById('webglContainer');
  const canvasEl = document.getElementById('cyberCanvas');

  if (canvasEl && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070709, 0.015);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1.8, 8);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasEl,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 1. Cyber Wireframe Ground Grid
    const gridHelper = new THREE.GridHelper(160, 80, 0xFF1E27, 0x1E1E26);
    gridHelper.position.y = -2;
    scene.add(gridHelper);

    // 2. Ceiling Cyber Grid for Tunnel sensation
    const gridHelperCeil = new THREE.GridHelper(160, 80, 0x8A0006, 0x14141A);
    gridHelperCeil.position.y = 8;
    scene.add(gridHelperCeil);

    // 3. Particle Starfield / Matrix (Particles moving in Z depth)
    const particleCount = 1200;
    const particleGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);

    const colorNeonRed = new THREE.Color(0xFF1E27);
    const colorCrimson = new THREE.Color(0x8A0006);
    const colorWhite = new THREE.Color(0xFFFFFF);

    for (let i = 0; i < particleCount; i++) {
      posArray[i * 3 + 0] = (Math.random() - 0.5) * 60;
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 30 + 2;
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 120;

      // Color variation
      const rand = Math.random();
      const pColor = rand > 0.6 ? colorNeonRed : (rand > 0.25 ? colorCrimson : colorWhite);
      colorArray[i * 3 + 0] = pColor.r;
      colorArray[i * 3 + 1] = pColor.g;
      colorArray[i * 3 + 2] = pColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    // Generate circular soft particle texture
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext('2d');
    const grad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.3, 'rgba(255,30,39,0.8)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    pCtx.fillStyle = grad;
    pCtx.fillRect(0, 0, 32, 32);

    const pTexture = new THREE.CanvasTexture(pCanvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.8,
      vertexColors: true,
      map: pTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Parallax mouse variables
    let targetCameraX = 0;
    let targetCameraY = 1.8;
    let scrollSpeedMultiplier = 1;
    let lastScrollY = window.scrollY;

    window.addEventListener('mousemove', (e) => {
      const normX = (e.clientX / window.innerWidth) - 0.5;
      const normY = (e.clientY / window.innerHeight) - 0.5;
      targetCameraX = normX * 1.5;
      targetCameraY = 1.8 - (normY * 0.8);
    }, { passive: true });

    // Track scroll velocity for camera thrust
    window.addEventListener('scroll', () => {
      const delta = Math.abs(window.scrollY - lastScrollY);
      scrollSpeedMultiplier = 1 + Math.min(delta * 0.08, 4);
      lastScrollY = window.scrollY;
    }, { passive: true });

    // Animation Loop
    let clock = new THREE.Clock();

    function animateThree() {
      requestAnimationFrame(animateThree);
      const delta = clock.getDelta();

      // Camera parallax interpolation
      camera.position.x += (targetCameraX - camera.position.x) * 0.05;
      camera.position.y += (targetCameraY - camera.position.y) * 0.05;
      camera.lookAt(0, 1.5, -20);

      // Scroll speed decay
      scrollSpeedMultiplier += (1 - scrollSpeedMultiplier) * 0.05;

      // Animate Grid movement forward
      const gridSpeed = 6 * delta * scrollSpeedMultiplier;
      gridHelper.position.z = (gridHelper.position.z + gridSpeed) % 4;
      gridHelperCeil.position.z = (gridHelperCeil.position.z + gridSpeed) % 4;

      // Animate Particles traveling forward
      const positions = particleGeo.attributes.position.array;
      const pSpeed = 12 * delta * scrollSpeedMultiplier;

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 2] += pSpeed;
        if (positions[i * 3 + 2] > 15) {
          positions[i * 3 + 2] = -90;
          positions[i * 3 + 0] = (Math.random() - 0.5) * 60;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 30 + 2;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    }
    animateThree();

    // Handle Resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }


  // ==========================================================================
  // 4. SCENE 1: HERO DIMENSIONAL CODE PORTAL
  //    (3D Brackets Split Apart & Parallax 3D Logo on Scroll)
  // ==========================================================================
  const bracketLeft = document.getElementById('bracketLeft');
  const bracketRight = document.getElementById('bracketRight');
  const heroLogoCard = document.getElementById('heroLogoCard');
  const heroSection = document.getElementById('hero');

  if (bracketLeft && bracketRight && heroSection && typeof gsap !== 'undefined') {
    
    // Initial entrance animation
    gsap.fromTo([bracketLeft, bracketRight], 
      { opacity: 0, scale: 0.6 },
      { opacity: 1, scale: 1, duration: 1.6, ease: 'power3.out', stagger: 0.15 }
    );

    // ScrollTrigger to open the portal brackets outward
    gsap.to(bracketLeft, {
      x: '-35vw',
      y: '5vh',
      scale: 1.8,
      rotationY: 35,
      opacity: 0.1,
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2
      }
    });

    gsap.to(bracketRight, {
      x: '35vw',
      y: '5vh',
      scale: 1.8,
      rotationY: -35,
      opacity: 0.1,
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2
      }
    });

    // Hero Logo Card 3D Depth Travel
    if (heroLogoCard) {
      gsap.to(heroLogoCard, {
        scale: 0.8,
        y: 80,
        opacity: 0.7,
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });

      // Mouse Parallax on Hero Logo
      window.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        if (rect.bottom < 0) return;
        const normX = (e.clientX / window.innerWidth) - 0.5;
        const normY = (e.clientY / window.innerHeight) - 0.5;
        heroLogoCard.style.transform = `perspective(800px) rotateY(${normX * 22}deg) rotateX(${-normY * 22}deg) translateZ(10px)`;
      }, { passive: true });
    }
  }


  // ==========================================================================
  // 5. SCENE 2: SERVICIOS INTERACTIVOS (Horizontal Scroll Pinning)
  //    (Pinned Track + 3D Tilt Effect on mousemove)
  // ==========================================================================
  const servicesTrack = document.getElementById('servicesTrack');
  const servicesSection = document.getElementById('servicios');
  const pinViewport = document.getElementById('pinViewport');

  if (servicesTrack && servicesSection && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    
    // Only apply horizontal pinning on desktop (width > 900px)
    ScrollTrigger.matchMedia({
      "(min-width: 901px)": function() {
        const totalScrollWidth = servicesTrack.scrollWidth;
        const viewportWidth = window.innerWidth;
        const distanceToScroll = totalScrollWidth - viewportWidth + 120;

        gsap.to(servicesTrack, {
          x: () => -distanceToScroll,
          ease: "none",
          scrollTrigger: {
            trigger: pinViewport,
            pin: true,
            start: "top top",
            end: () => `+=${distanceToScroll * 1.2}`,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true
          }
        });
      }
    });

    // 3D Tilt Effect for Bento Cards
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const cardX = e.clientX - rect.left;
        const cardY = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((cardY - centerY) / centerY) * -12;
        const rotateY = ((cardX - centerX) / centerX) * 12;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });

    // --------------------------------------------------------------------------
    // Micro-Simulators in Bento Cards
    // --------------------------------------------------------------------------
    // Card 1: PageSpeed Audit runner
    const runSpeedTestBtn = document.getElementById('runSpeedTestBtn');
    const speedScoreText = document.getElementById('speedScoreText');
    if (runSpeedTestBtn && speedScoreText) {
      runSpeedTestBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (typeof SoundFX !== 'undefined') SoundFX.click();
        speedScoreText.textContent = 'PROBANDO...';
        runSpeedTestBtn.style.opacity = '0.7';

        let count = 20;
        const interval = setInterval(() => {
          count += 16;
          if (count >= 100) {
            count = 100;
            clearInterval(interval);
            speedScoreText.textContent = '100/100 SPEED';
            runSpeedTestBtn.style.opacity = '1';
            if (typeof SoundFX !== 'undefined') SoundFX.success();
          } else {
            speedScoreText.textContent = `${count}/100`;
          }
        }, 60);
      });
    }

    // Card 2: Interactive Store Counter & WhatsApp Order
    const qtyMinusBtn = document.getElementById('qtyMinusBtn');
    const qtyPlusBtn = document.getElementById('qtyPlusBtn');
    const qtyNumDisplay = document.getElementById('qtyNumDisplay');
    const cardStorePriceDisplay = document.getElementById('cardStorePriceDisplay');
    const waOrderBtnText = document.getElementById('waOrderBtnText');
    const mockOrderBtn = document.getElementById('mockOrderBtn');
    const cardCartFeedback = document.getElementById('cardCartFeedback');

    let storeItemQty = 1;
    const basePrice = 42000;

    function updateCardStoreItem() {
      if (qtyNumDisplay) qtyNumDisplay.textContent = storeItemQty;
      const currentTotal = storeItemQty * basePrice;
      const formatted = `$${currentTotal.toLocaleString('es-AR')}`;
      if (cardStorePriceDisplay) {
        cardStorePriceDisplay.innerHTML = `${formatted} <small>EN STOCK</small>`;
      }
      if (waOrderBtnText) {
        waOrderBtnText.textContent = `Pedir por WhatsApp (${storeItemQty} u. - ${formatted})`;
      }
    }

    if (qtyMinusBtn && qtyPlusBtn) {
      qtyMinusBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (storeItemQty > 1) {
          storeItemQty--;
          updateCardStoreItem();
          if (typeof SoundFX !== 'undefined') SoundFX.click();
        }
      });
      qtyPlusBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (storeItemQty < 20) {
          storeItemQty++;
          updateCardStoreItem();
          if (typeof SoundFX !== 'undefined') SoundFX.click();
        }
      });
    }

    if (mockOrderBtn && cardCartFeedback) {
      mockOrderBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (typeof SoundFX !== 'undefined') SoundFX.success();
        cardCartFeedback.innerHTML = `<i class="fa-solid fa-check-double text-green"></i> <span>¡Listo! ${storeItemQty} producto(s) añadidos al WhatsApp</span>`;
        cardCartFeedback.style.color = '#10B981';
        setTimeout(() => {
          cardCartFeedback.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>Pedido directo sin comisiones</span>`;
          cardCartFeedback.style.color = '';
        }, 3000);
      });
    }

    // Card 3: Admin Controller Quick Percents & Stock Toggle
    const adminCardStockToggle = document.getElementById('adminCardStockToggle');
    const adminCardStockText = document.getElementById('adminCardStockText');
    let adminStockState = 0; // 0: Normal, 1: Alerta, 2: Agotado

    if (adminCardStockToggle && adminCardStockText) {
      adminCardStockToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        adminStockState = (adminStockState + 1) % 3;
        if (adminStockState === 0) {
          adminCardStockToggle.className = 'stock-toggle-btn';
          adminCardStockText.textContent = '14 u. (Normal)';
        } else if (adminStockState === 1) {
          adminCardStockToggle.className = 'stock-toggle-btn alert';
          adminCardStockText.textContent = '3 u. (Crítico)';
        } else {
          adminCardStockToggle.className = 'stock-toggle-btn empty';
          adminCardStockText.textContent = '0 u. (Agotado)';
        }
        if (typeof SoundFX !== 'undefined') SoundFX.click();
      });
    }

    const ctlChipBtns = document.querySelectorAll('.ctl-chip-btn');
    const adminCardInflationDisplay = document.getElementById('adminCardInflationDisplay');
    const adminCardApplyBtn = document.getElementById('adminCardApplyBtn');

    ctlChipBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        ctlChipBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const pct = btn.getAttribute('data-percent');
        if (adminCardInflationDisplay) {
          adminCardInflationDisplay.textContent = `+${pct}% Seleccionado`;
        }
        if (typeof SoundFX !== 'undefined') SoundFX.click();
      });
    });

    if (adminCardApplyBtn) {
      adminCardApplyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (typeof SoundFX !== 'undefined') SoundFX.zap();
        const activePct = document.querySelector('.ctl-chip-btn.active')?.getAttribute('data-percent') || '15';
        if (adminCardInflationDisplay) {
          adminCardInflationDisplay.textContent = `¡+${activePct}% Aplicado!`;
          setTimeout(() => {
            adminCardInflationDisplay.textContent = `+${activePct}% Inflación`;
          }, 2000);
        }
      });
    }

    // Card 4: Dev Feature Chips
    const featureChipToggles = document.querySelectorAll('.feature-chip-toggle');
    const graphCentralNode = document.getElementById('graphCentralNode');
    featureChipToggles.forEach(chip => {
      chip.addEventListener('click', (e) => {
        e.stopPropagation();
        chip.classList.toggle('active');
        if (typeof SoundFX !== 'undefined') SoundFX.click();
        if (graphCentralNode) {
          graphCentralNode.classList.add('neon');
          setTimeout(() => graphCentralNode.classList.remove('neon'), 400);
        }
      });
    });
  }


  // ==========================================================================
  // 6. SCENE 3: EL "CORE" TECNOLÓGICO (Interactive Architecture Simulation)
  //    (Admin Simulator -> Conduit Energy Pulse -> Store Simulator)
  // ==========================================================================
  const priceInputRange = document.getElementById('priceInputRange');
  const adminPriceDisplay = document.getElementById('adminPriceDisplay');
  const storePriceDisplay = document.getElementById('storePriceDisplay');
  const triggerSyncBtn = document.getElementById('triggerSyncBtn');
  const storeSimulator = document.getElementById('storeSimulator');
  const productLiveFlash = document.getElementById('productLiveFlash');
  const latencyDisplay = document.getElementById('latencyDisplay');
  const conduitSpark = document.getElementById('conduitSpark');
  const stockBadge = document.getElementById('stockBadge');
  const stockBadgeText = document.getElementById('stockBadgeText');
  const storeStockStateBadge = document.getElementById('storeStockStateBadge');
  const storeSyncToast = document.getElementById('storeSyncToast');
  const syncToastMsg = document.getElementById('syncToastMsg');

  let currentStockLevel = 0; // 0: Normal, 1: Crítico, 2: Agotado

  function updateStockDisplays() {
    if (currentStockLevel === 0) {
      if (stockBadge) stockBadge.className = 'sim-badge-stock-interactive magnetic-target';
      if (stockBadgeText) stockBadgeText.textContent = '14 Unidades (Normal)';
      if (storeStockStateBadge) {
        storeStockStateBadge.className = 'product-stock-banner';
        storeStockStateBadge.innerHTML = '<i class="fa-solid fa-check"></i> DISPONIBLE PARA ENTREGA INMEDIATA';
      }
    } else if (currentStockLevel === 1) {
      if (stockBadge) stockBadge.className = 'sim-badge-stock-interactive magnetic-target alert';
      if (stockBadgeText) stockBadgeText.textContent = '3 Unidades (Crítico)';
      if (storeStockStateBadge) {
        storeStockStateBadge.className = 'product-stock-banner alert';
        storeStockStateBadge.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> ¡ÚLTIMAS 3 UNIDADES!';
      }
    } else {
      if (stockBadge) stockBadge.className = 'sim-badge-stock-interactive magnetic-target empty';
      if (stockBadgeText) stockBadgeText.textContent = '0 Unidades (Agotado)';
      if (storeStockStateBadge) {
        storeStockStateBadge.className = 'product-stock-banner empty';
        storeStockStateBadge.innerHTML = '<i class="fa-solid fa-ban"></i> PRODUCTO AGOTADO (POR ENCARGO)';
      }
    }
  }

  if (stockBadge) {
    stockBadge.addEventListener('click', () => {
      currentStockLevel = (currentStockLevel + 1) % 3;
      updateStockDisplays();
      executeDataSync(priceInputRange ? priceInputRange.value : 58000, true);
    });
  }

  function executeDataSync(newPrice, isStockOnly = false) {
    const formattedPrice = `$${Number(newPrice).toLocaleString('es-AR')}`;
    
    if (adminPriceDisplay) adminPriceDisplay.textContent = formattedPrice;

    // Trigger visual energy surge down conduit
    if (conduitSpark) {
      conduitSpark.style.animation = 'none';
      void conduitSpark.offsetWidth; // trigger reflow
      conduitSpark.style.animation = 'sparkStream 0.5s 2 linear';
    }

    if (typeof SoundFX !== 'undefined') SoundFX.zap();

    // Flash and update storefront
    setTimeout(() => {
      if (storePriceDisplay) {
        storePriceDisplay.textContent = formattedPrice;
        storePriceDisplay.classList.add('highlight');
        setTimeout(() => storePriceDisplay.classList.remove('highlight'), 1000);
      }

      if (storeSimulator) {
        storeSimulator.classList.add('flash-update');
        setTimeout(() => storeSimulator.classList.remove('flash-update'), 800);
      }

      if (productLiveFlash) {
        productLiveFlash.classList.add('flash');
        productLiveFlash.innerHTML = isStockOnly 
          ? '<i class="fa-solid fa-check"></i> INVENTARIO ACTUALIZADO EN VIVO'
          : '<i class="fa-solid fa-check"></i> PRECIO ACTUALIZADO EN TIEMPO REAL';
        setTimeout(() => {
          productLiveFlash.classList.remove('flash');
          productLiveFlash.innerHTML = '<i class="fa-solid fa-arrows-rotate"></i> PRECIO ACTUALIZADO';
        }, 2200);
      }

      if (latencyDisplay) {
        const randomLatency = (Math.random() * 0.3 + 0.2).toFixed(1);
        latencyDisplay.textContent = `${randomLatency}ms`;
        if (syncToastMsg) {
          syncToastMsg.textContent = `Base de datos sincronizada en ${randomLatency}ms`;
        }
      }

      if (typeof SoundFX !== 'undefined') SoundFX.success();
    }, 260);
  }

  if (priceInputRange) {
    priceInputRange.addEventListener('input', (e) => {
      executeDataSync(e.target.value);
    });
  }

  const nudgeBtns = document.querySelectorAll('.nudge-btn');
  nudgeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const delta = parseInt(btn.getAttribute('data-nudge'), 10) || 0;
      if (priceInputRange) {
        let current = parseInt(priceInputRange.value, 10);
        let updated = Math.min(95000, Math.max(30000, current + delta));
        priceInputRange.value = updated;
        executeDataSync(updated);
      }
    });
  });

  if (triggerSyncBtn) {
    triggerSyncBtn.addEventListener('click', () => {
      const val = priceInputRange ? priceInputRange.value : 65000;
      executeDataSync(val);
    });
  }

  // Automatic trigger once when scrolling into view
  const assemblyStage = document.getElementById('assemblyStage');
  if (assemblyStage && typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.create({
      trigger: assemblyStage,
      start: 'top 70%',
      once: true,
      onEnter: () => {
        executeDataSync(58000);
      }
    });
  }


  // ==========================================================================
  // 7. SCENE 4: PROCESO DE TRABAJO (Vertical Laser Timeline Illumination)
  // ==========================================================================
  const laserTrack = document.getElementById('laserTrack');
  const laserBeamProgress = document.getElementById('laserBeamProgress');
  const laserSparkHead = document.getElementById('laserSparkHead');
  const timelineAssembly = document.getElementById('timelineAssembly');
  const stepNodes = document.querySelectorAll('.timeline-step-node');

  if (timelineAssembly && laserBeamProgress && typeof ScrollTrigger !== 'undefined') {
    
    ScrollTrigger.create({
      trigger: timelineAssembly,
      start: 'top 65%',
      end: 'bottom 65%',
      scrub: true,
      onUpdate: (self) => {
        const pct = self.progress * 100;
        laserBeamProgress.style.height = `${pct}%`;
        if (laserSparkHead) {
          laserSparkHead.style.opacity = self.progress > 0.02 ? '1' : '0';
        }

        // Activate step cards as laser advances
        stepNodes.forEach((node, idx) => {
          const stepThreshold = (idx + 0.4) / stepNodes.length;
          if (self.progress >= stepThreshold) {
            node.classList.add('active');
          } else {
            node.classList.remove('active');
          }
        });
      }
    });
  }


  // ==========================================================================
  // 8. SCENE 5: CTA FINAL (Digital Compiler Particle Vortex & Magnetic Button)
  // ==========================================================================
  const vortexCanvas = document.getElementById('vortexCanvas');
  if (vortexCanvas) {
    const vCtx = vortexCanvas.getContext('2d');
    let vWidth = (vortexCanvas.width = vortexCanvas.offsetWidth || window.innerWidth);
    let vHeight = (vortexCanvas.height = vortexCanvas.offsetHeight || window.innerHeight);

    window.addEventListener('resize', () => {
      vWidth = vortexCanvas.width = vortexCanvas.offsetWidth || window.innerWidth;
      vHeight = vortexCanvas.height = vortexCanvas.offsetHeight || window.innerHeight;
    });

    const vParticles = [];
    const vCount = 180;

    for (let i = 0; i < vCount; i++) {
      vParticles.push({
        angle: Math.random() * Math.PI * 2,
        radius: Math.random() * (Math.min(vWidth, vHeight) * 0.45) + 30,
        speed: (Math.random() * 0.008 + 0.004) * (Math.random() > 0.5 ? 1 : -1),
        size: Math.random() * 2.2 + 0.8,
        color: Math.random() > 0.4 ? 'rgba(255, 30, 39, ' : 'rgba(138, 0, 6, ',
        alpha: Math.random() * 0.7 + 0.3
      });
    }

    function renderVortex() {
      vCtx.clearRect(0, 0, vWidth, vHeight);
      const centerX = vWidth / 2;
      const centerY = vHeight / 2;

      for (let i = 0; i < vCount; i++) {
        const p = vParticles[i];
        p.angle += p.speed;

        const x = centerX + Math.cos(p.angle) * p.radius;
        const y = centerY + Math.sin(p.angle) * p.radius;

        vCtx.beginPath();
        vCtx.arc(x, y, p.size, 0, Math.PI * 2);
        vCtx.fillStyle = p.color + p.alpha + ')';
        vCtx.fill();

        // Subtle trailing line to center
        if (i % 8 === 0) {
          vCtx.beginPath();
          vCtx.moveTo(x, y);
          vCtx.lineTo(centerX, centerY);
          vCtx.strokeStyle = 'rgba(255, 30, 39, 0.04)';
          vCtx.stroke();
        }
      }

      requestAnimationFrame(renderVortex);
    }
    renderVortex();
  }

  // Magnetic Button Physics
  const magneticBtn = document.getElementById('finalMagneticBtn');
  if (magneticBtn && window.matchMedia('(pointer: fine)').matches) {
    let btnX = 0;
    let btnY = 0;
    let targetX = 0;
    let targetY = 0;

    magneticBtn.addEventListener('mousemove', (e) => {
      const rect = magneticBtn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      targetX = (e.clientX - centerX) * 0.35;
      targetY = (e.clientY - centerY) * 0.35;
    });

    magneticBtn.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
    });

    function updateMagneticBtn() {
      btnX += (targetX - btnX) * 0.15;
      btnY += (targetY - btnY) * 0.15;
      magneticBtn.style.transform = `translate3d(${btnX}px, ${btnY}px, 0)`;
      requestAnimationFrame(updateMagneticBtn);
    }
    requestAnimationFrame(updateMagneticBtn);
  }


  // ==========================================================================
  // 9. GENERAL REVEAL ANIMATIONS (Data-Reveal Elements)
  // ==========================================================================
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    const revealElements = document.querySelectorAll('[data-reveal]');
    revealElements.forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }


  // ==========================================================================
  // 10. MOBILE HAMBURGER MENU DRAWER
  // ==========================================================================
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileClose = document.getElementById('mobileClose');
  const mobileDrawer = document.getElementById('mobileDrawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
    });
  }

  if (mobileClose && mobileDrawer) {
    mobileClose.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
    });
  }

  // Close drawer if backdrop is clicked
  const mobileBackdrop = document.querySelector('.mobile-nav-backdrop');
  if (mobileBackdrop && mobileDrawer) {
    mobileBackdrop.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
    });
  }

  console.log('%c [D&V DEVS] Digital Agency Core Initialized // 120Hz Smooth Experience ', 'background: #FF1E27; color: #fff; font-weight: bold; padding: 4px 8px; border-radius: 4px;');
});
