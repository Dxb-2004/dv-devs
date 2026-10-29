/**
 * BYTE FIX - Official Website Scripts (Scroll-World & Awwwards Experience)
 * Features:
 * - Lenis Smooth Inertial Scrolling synced with GSAP ScrollTrigger (120Hz/240Hz feel)
 * - Persistent Real-Time Telemetry HUD Overlay (Dynamic Pipeline Monitor)
 * - Interactive Hero Cyber Canvas & 3D Holographic Core
 * - Scroll-Scrubbed Performance Simulator & Live Frametime Jitter Waveform Canvas
 * - Desktop Horizontal Scroll Pan for Custom PC Builds Showcase (#armados)
 * - Interactive Byte Fix Optimizer Software UI Mockup with simulated scan
 * - Animated Number Counters (IntersectionObserver & ScrollTrigger)
 * - Currency Switcher (USD <-> ARS)
 * - FAQ Accordion with smooth transitions
 * - Direct WhatsApp Lead & Quote Generator
 */

const BYTEFIX_PHONE = '5492914380467'; // WhatsApp Oficial: +54 291 438-0467
let lenisInstance = null;

document.addEventListener('DOMContentLoaded', () => {
  initLenisAndScrollWorld();
  initNavbar();
  initHeroCanvas();
  initHeroCurtainPortal();
  initTelemetryHUD();
  initStatCounters();
  initAdvancedSimulator();
  initSoftwareMockup();
  init3DParallax();
  init3DHardwarePanels();
  initFaqAccordion();
  initQuoteForm();
  initCurrencySwitcher();
  initSmoothScroll();
});

/* ==========================================================================
   1. Lenis Smooth Scroll & Scroll-World Pipeline Engine
   ========================================================================== */
function initLenisAndScrollWorld() {
  if (typeof Lenis !== 'undefined') {
    lenisInstance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 1.5
    });

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      lenisInstance.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenisInstance.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        lenisInstance.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    lenisInstance.on('scroll', ({ progress }) => {
      updateTelemetryHUD(progress);
      updateScrollProgressBar(progress);
    });
  } else {
    // Fallback if Lenis CDN is blocked or unavailable
    window.addEventListener('scroll', () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
      updateTelemetryHUD(progress);
      updateScrollProgressBar(progress);
    }, { passive: true });
  }
}

function updateScrollProgressBar(progress) {
  const progressBar = document.getElementById('scrollProgress');
  if (progressBar) {
    progressBar.style.width = `${Math.min(100, Math.max(0, progress * 100))}%`;
  }
}

/* ==========================================================================
   2. Persistent Real-Time Telemetry HUD Overlay
   ========================================================================== */
function initTelemetryHUD() {
  const hud = document.getElementById('telemetryHud');
  const toggleBtn = document.getElementById('hudToggleBtn');
  if (!hud || !toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    hud.classList.toggle('minimized');
  });

  // Initial update
  updateTelemetryHUD(0);
}

function updateTelemetryHUD(progress) {
  const p = Math.min(1, Math.max(0, progress));
  const percentText = document.getElementById('hudProgressPercent');
  const barFill = document.getElementById('hudProgressBar');
  const fpsVal = document.getElementById('hudFpsVal');
  const latencyVal = document.getElementById('hudLatencyVal');
  const dpcVal = document.getElementById('hudDpcVal');
  const stutterVal = document.getElementById('hudStutterVal');
  const stateText = document.getElementById('hudStateText');

  if (percentText) percentText.textContent = `${Math.round(p * 100)}% OPT`;
  if (barFill) barFill.style.width = `${p * 100}%`;

  // Telemetry metric interpolations based on scroll progress:
  // 0% (Stock) -> 50% (Tuned) -> 100% (Zero Delay Peak)
  const currentFps = Math.round(92 + (240 - 92) * p);
  const currentLatency = (18.5 - (18.5 - 3.2) * p).toFixed(1);

  if (fpsVal) {
    fpsVal.textContent = p > 0.85 ? `${currentFps}+ FPS (Locked)` : `${currentFps} FPS`;
    fpsVal.style.color = p > 0.6 ? '#00ff88' : (p > 0.3 ? '#f59e0b' : '#ef4444');
  }

  if (latencyVal) {
    latencyVal.textContent = `${currentLatency} ms`;
    latencyVal.style.color = p > 0.6 ? '#00ff88' : (p > 0.3 ? '#00f0ff' : '#ef4444');
  }

  if (dpcVal) {
    if (p < 0.35) {
      dpcVal.textContent = '1.840 µs (High)';
      dpcVal.style.color = '#ef4444';
    } else if (p < 0.75) {
      dpcVal.textContent = '120 µs (Med)';
      dpcVal.style.color = '#f59e0b';
    } else {
      dpcVal.textContent = '32 µs (Zero Delay)';
      dpcVal.style.color = '#00ff88';
    }
  }

  if (stutterVal) {
    if (p < 0.35) {
      stutterVal.textContent = 'Activo';
      stutterVal.style.color = '#ef4444';
    } else if (p < 0.75) {
      stutterVal.textContent = '5% Leve';
      stutterVal.style.color = '#f59e0b';
    } else {
      stutterVal.textContent = '0% Eliminado';
      stutterVal.style.color = '#00ff88';
    }
  }

  if (stateText) {
    if (p < 0.35) {
      stateText.textContent = 'STOCK / UNTUNED';
      stateText.style.color = '#ef4444';
    } else if (p < 0.75) {
      stateText.textContent = 'CALIBRATING KERNEL';
      stateText.style.color = '#f59e0b';
    } else {
      stateText.textContent = 'BYTE FIX ZERO DELAY';
      stateText.style.color = '#00ff88';
    }
  }
}

/* ==========================================================================
   3. Navbar Sticky & Mobile Menu
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.header');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.className = navMenu.classList.contains('open') ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });
  }
}

/* ==========================================================================
   4. Hero Cyber Particles Canvas (High-FPS Background)
   ========================================================================== */
function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = canvas.parentElement.offsetWidth || window.innerWidth);
  let height = (canvas.height = canvas.parentElement.offsetHeight || window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
    height = canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
  }, { passive: true });

  const particlesCount = Math.min(50, Math.floor(width / 30));
  const particles = [];

  for (let i = 0; i < particlesCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      size: Math.random() * 2 + 1,
      color: Math.random() > 0.4 ? 'rgba(0, 240, 255, 0.4)' : 'rgba(245, 158, 11, 0.4)'
    });
  }

  let mouse = { x: width / 2, y: height / 2, active: false };
  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  }, { passive: true });

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines between nearby particles
    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i];
      p1.x += p1.vx;
      p1.y += p1.vy;

      if (p1.x < 0) p1.x = width;
      if (p1.x > width) p1.x = 0;
      if (p1.y < 0) p1.y = height;
      if (p1.y > height) p1.y = 0;

      ctx.beginPath();
      ctx.arc(p1.x, p1.y, p1.size, 0, Math.PI * 2);
      ctx.fillStyle = p1.color;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   4b. Hero Curtain Gates Portal (RR Estudio Style Scroll Opening)
   ========================================================================== */
function initHeroCurtainPortal() {
  const portal = document.getElementById('heroPortal');
  const curtainLeft = document.getElementById('curtainLeft');
  const curtainRight = document.getElementById('curtainRight');
  const gateSeal = document.getElementById('gateSeal');
  const entryIndicator = document.getElementById('entryIndicator');
  const watermark = document.getElementById('gateWatermark');
  const revealedContent = document.getElementById('heroRevealedContent');

  if (!portal || !curtainLeft || !curtainRight) return;

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: portal,
        start: 'top top',
        end: '+=70%',
        scrub: 0.8,
        pin: true,
        anticipatePin: 1
      }
    });

    tl.to(curtainLeft, { xPercent: -102, ease: 'power2.inOut' }, 0)
      .to(curtainRight, { xPercent: 102, ease: 'power2.inOut' }, 0)
      .to(gateSeal, { scale: 0.5, opacity: 0, ease: 'power2.in' }, 0)
      .to(entryIndicator, { opacity: 0, y: 25, ease: 'power2.in' }, 0)
      .to(watermark, { scale: 1.1, opacity: 0.12, ease: 'power1.out' }, 0)
      .fromTo(revealedContent,
        { scale: 0.94, opacity: 0.2 },
        { scale: 1, opacity: 1, ease: 'power2.out' },
        0.1
      );
  }

  // Smooth scroll past gates on indicator click
  if (entryIndicator) {
    entryIndicator.addEventListener('click', () => {
      if (lenisInstance) {
        lenisInstance.scrollTo(window.innerHeight * 0.85, { duration: 1.2 });
      } else {
        window.scrollTo({ top: window.innerHeight * 0.85, behavior: 'smooth' });
      }
    });
  }
}

/* ==========================================================================
   5. Animated Number Counters (Scene 2 Telemetry Bar)
   ========================================================================== */
function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10);
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        
        let start = 0;
        const duration = 1200; // ms
        const startTime = performance.now();

        function updateCount(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const currentVal = Math.floor(start + (target - start) * easeProgress);

          el.textContent = `${prefix}${currentVal}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            el.textContent = `${prefix}${target}${suffix}`;
          }
        }

        requestAnimationFrame(updateCount);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  statNumbers.forEach(num => observer.observe(num));
}

/* ==========================================================================
   6. Interactive Performance Simulator & Live Frametime Canvas
   ========================================================================== */
function initAdvancedSimulator() {
  const gameSelect = document.getElementById('simGameSelect');
  const gpuSelect = document.getElementById('simGpuSelect');
  const toggleBtns = document.querySelectorAll('.toggle-opt-btn');

  const fpsText = document.getElementById('benchmarkFpsText');
  const fpsBar = document.getElementById('benchmarkFpsBar');
  const latencyText = document.getElementById('benchmarkLatencyText');
  const latencyBar = document.getElementById('benchmarkLatencyBar');
  const sim1PercentVal = document.getElementById('sim1PercentVal');
  const sim1PercentGain = document.getElementById('sim1PercentGain');
  const simDpcVal = document.getElementById('simDpcVal');
  const simWpBtn = document.getElementById('simWpBtn');

  const frametimeCanvas = document.getElementById('frametimeCanvas');
  const frametimeStatus = document.getElementById('frametimeStatus');
  const frametimeVariance = document.getElementById('frametimeVariance');

  if (!gameSelect || !gpuSelect || !fpsBar) return;

  const benchmarkData = {
    cs2: {
      name: 'Counter-Strike 2',
      entry: { beforeFps: 115, afterFps: 195, beforeLat: 19.4, afterLat: 4.8, lowBefore: 55, lowAfter: 125, dpc: '42 µs' },
      mid:   { beforeFps: 165, afterFps: 275, beforeLat: 16.8, afterLat: 4.1, lowBefore: 85, lowAfter: 185, dpc: '38 µs' },
      high:  { beforeFps: 245, afterFps: 390, beforeLat: 13.9, afterLat: 3.4, lowBefore: 135, lowAfter: 260, dpc: '32 µs' }
    },
    valorant: {
      name: 'Valorant',
      entry: { beforeFps: 145, afterFps: 235, beforeLat: 17.2, afterLat: 4.2, lowBefore: 75, lowAfter: 155, dpc: '39 µs' },
      mid:   { beforeFps: 225, afterFps: 365, beforeLat: 14.5, afterLat: 3.8, lowBefore: 125, lowAfter: 245, dpc: '35 µs' },
      high:  { beforeFps: 330, afterFps: 530, beforeLat: 12.0, afterLat: 3.1, lowBefore: 190, lowAfter: 350, dpc: '30 µs' }
    },
    warzone: {
      name: 'Call of Duty: Warzone',
      entry: { beforeFps: 58,  afterFps: 98,  beforeLat: 28.5, afterLat: 6.8, lowBefore: 28, lowAfter: 68, dpc: '48 µs' },
      mid:   { beforeFps: 92,  afterFps: 148, beforeLat: 22.1, afterLat: 5.4, lowBefore: 52, lowAfter: 110, dpc: '42 µs' },
      high:  { beforeFps: 135, afterFps: 215, beforeLat: 17.4, afterLat: 4.3, lowBefore: 80, lowAfter: 160, dpc: '36 µs' }
    },
    fortnite: {
      name: 'Fortnite (Rendimiento)',
      entry: { beforeFps: 105, afterFps: 180, beforeLat: 18.9, afterLat: 4.5, lowBefore: 50, lowAfter: 120, dpc: '40 µs' },
      mid:   { beforeFps: 165, afterFps: 265, beforeLat: 15.2, afterLat: 3.9, lowBefore: 88, lowAfter: 180, dpc: '36 µs' },
      high:  { beforeFps: 240, afterFps: 395, beforeLat: 12.8, afterLat: 3.2, lowBefore: 140, lowAfter: 270, dpc: '31 µs' }
    },
    apex: {
      name: 'Apex Legends',
      entry: { beforeFps: 82,  afterFps: 138, beforeLat: 21.0, afterLat: 5.2, lowBefore: 42, lowAfter: 95, dpc: '44 µs' },
      mid:   { beforeFps: 135, afterFps: 210, beforeLat: 16.5, afterLat: 4.2, lowBefore: 75, lowAfter: 150, dpc: '38 µs' },
      high:  { beforeFps: 185, afterFps: 290, beforeLat: 13.8, afterLat: 3.5, lowBefore: 110, lowAfter: 210, dpc: '33 µs' }
    },
    rust: {
      name: 'Rust',
      entry: { beforeFps: 48,  afterFps: 82,  beforeLat: 29.0, afterLat: 7.2, lowBefore: 24, lowAfter: 58, dpc: '50 µs' },
      mid:   { beforeFps: 78,  afterFps: 128, beforeLat: 23.4, afterLat: 5.8, lowBefore: 45, lowAfter: 92, dpc: '42 µs' },
      high:  { beforeFps: 115, afterFps: 180, beforeLat: 18.2, afterLat: 4.6, lowBefore: 70, lowAfter: 135, dpc: '37 µs' }
    }
  };

  let currentMode = 'after'; // 'before' | 'after'

  // Live Frametime Graph Waveform Canvas Engine
  let fCtx = frametimeCanvas ? frametimeCanvas.getContext('2d') : null;
  let historyPoints = new Array(60).fill(16);
  let animationFrameId = null;

  function renderFrametime() {
    if (!fCtx || !frametimeCanvas) return;
    const w = (frametimeCanvas.width = frametimeCanvas.offsetWidth || 300);
    const h = (frametimeCanvas.height = frametimeCanvas.offsetHeight || 80);

    fCtx.clearRect(0, 0, w, h);

    // Shift and push a new simulated frametime value
    historyPoints.shift();
    if (currentMode === 'after') {
      // Very flat line at ~4ms with tiny variance
      const val = 15 + (Math.random() - 0.5) * 2;
      historyPoints.push(val);
    } else {
      // Spiky jagged line with big frame spikes
      const isSpike = Math.random() < 0.15;
      const val = isSpike ? (40 + Math.random() * 30) : (22 + (Math.random() - 0.5) * 16);
      historyPoints.push(val);
    }

    // Draw baseline
    fCtx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    fCtx.lineWidth = 1;
    fCtx.setLineDash([4, 4]);
    fCtx.beginPath();
    fCtx.moveTo(0, h * 0.75);
    fCtx.lineTo(w, h * 0.75);
    fCtx.stroke();
    fCtx.setLineDash([]);

    // Draw frametime wave
    fCtx.beginPath();
    const step = w / (historyPoints.length - 1);
    for (let i = 0; i < historyPoints.length; i++) {
      const ptY = h - (historyPoints[i] / 80) * h;
      if (i === 0) fCtx.moveTo(0, ptY);
      else fCtx.lineTo(i * step, ptY);
    }

    if (currentMode === 'after') {
      fCtx.strokeStyle = '#00ff88';
      fCtx.shadowColor = 'rgba(0, 255, 136, 0.6)';
      fCtx.shadowBlur = 8;
    } else {
      fCtx.strokeStyle = '#ef4444';
      fCtx.shadowColor = 'rgba(239, 68, 68, 0.6)';
      fCtx.shadowBlur = 8;
    }
    fCtx.lineWidth = 2.2;
    fCtx.stroke();
    fCtx.shadowBlur = 0;

    animationFrameId = requestAnimationFrame(renderFrametime);
  }

  if (frametimeCanvas) renderFrametime();

  function updateSimulator() {
    const gameKey = gameSelect.value;
    const gpuKey = gpuSelect.value;
    const data = benchmarkData[gameKey][gpuKey];

    if (currentMode === 'after') {
      fpsBar.style.width = '92%';
      fpsBar.className = 'metric-bar-fill after-fps';
      fpsText.innerHTML = `<span class="highlight-blue">+${data.afterFps} FPS</span> (Ultra Fluido)`;

      latencyBar.style.width = '88%';
      latencyBar.className = 'metric-bar-fill after-latency';
      latencyText.innerHTML = `<span class="highlight-blue">${data.afterLat} ms</span> (Zero Delay)`;

      if (sim1PercentVal) sim1PercentVal.textContent = `${data.lowAfter} FPS`;
      if (sim1PercentGain) sim1PercentGain.textContent = `+${Math.round(((data.lowAfter - data.lowBefore) / data.lowBefore) * 100)}% Estabilidad`;
      if (simDpcVal) simDpcVal.textContent = data.dpc;

      if (frametimeStatus) {
        frametimeStatus.textContent = 'ZERO DELAY LOCKED';
        frametimeStatus.className = 'frametime-graph-status status-good';
      }
      if (frametimeVariance) frametimeVariance.textContent = 'Varianza: ±0.3 ms';
    } else {
      fpsBar.style.width = '45%';
      fpsBar.className = 'metric-bar-fill before';
      fpsText.innerHTML = `${data.beforeFps} FPS (Inestable)`;

      latencyBar.style.width = '35%';
      latencyBar.className = 'metric-bar-fill before';
      latencyText.innerHTML = `${data.beforeLat} ms (Alto Retardo)`;

      if (sim1PercentVal) sim1PercentVal.textContent = `${data.lowBefore} FPS`;
      if (sim1PercentGain) sim1PercentGain.textContent = 'Caídas Bruscas';
      if (simDpcVal) simDpcVal.textContent = '1.840 µs (Spikes)';

      if (frametimeStatus) {
        frametimeStatus.textContent = 'PICOS INESTABLES (STUTTER)';
        frametimeStatus.className = 'frametime-graph-status status-bad';
      }
      if (frametimeVariance) frametimeVariance.textContent = 'Varianza: ±14.8 ms';
    }

    // Update WhatsApp link dynamically with selected setup
    if (simWpBtn) {
      const msg = `👋 *¡Hola Byte Fix!* Hice la simulación en la web para *${benchmarkData[gameKey].name}* en gráfica *${gpuSelect.options[gpuSelect.selectedIndex].text}*.%0A%0A` +
        `🎯 *Resultado esperado:* +${data.afterFps} FPS estables y ${data.afterLat} ms de delay.%0A` +
        `¿Podrían indicarme qué optimización o software me conviene para lograrlo? ¡Gracias!`;
      simWpBtn.href = `https://wa.me/${BYTEFIX_PHONE}?text=${msg}`;
    }
  }

  gameSelect.addEventListener('change', updateSimulator);
  gpuSelect.addEventListener('change', updateSimulator);

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentMode = btn.getAttribute('data-mode');
      updateSimulator();
    });
  });

  // ScrollTrigger for Performance Simulator Scrubbing
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.create({
      trigger: '#optimizacion',
      start: 'top 65%',
      onEnter: () => {
        // Automatically switch to optimized state as visitor arrives
        toggleBtns.forEach(b => b.classList.remove('active'));
        const afterBtn = document.querySelector('.toggle-opt-btn[data-mode="after"]');
        if (afterBtn) afterBtn.classList.add('active');
        currentMode = 'after';
        updateSimulator();
      }
    });
  }

  updateSimulator();
}

/* ==========================================================================
   7. Interactive 3D Hardware Panels & Spatial Stage (Universal 3D Engine)
   ========================================================================== */
function init3DHardwarePanels() {
  const isDesktop = () => window.innerWidth > 992;

  // 1. Hardware PC Tier Cards (Podium special layout)
  const cards = document.querySelectorAll('.pc-tier-card[data-tilt-card]');
  const podiumStage = document.getElementById('pcBuildsPodium');

  cards.forEach(card => {
    let currentRotX = 0;
    let currentRotY = 0;
    let currentTransZ = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let targetTransZ = 0;
    let isHovered = false;
    let animId = null;

    const isCenter = card.classList.contains('card-podium-center');
    const isLeft = card.classList.contains('card-podium-left');
    const isRight = card.classList.contains('card-podium-right');

    const baseRotY = isLeft ? 6 : (isRight ? -6 : 0);
    const baseTransZ = isCenter ? 45 : 0;
    const baseScale = isCenter ? 1.03 : 1;

    function loop() {
      currentRotX += (targetRotX - currentRotX) * 0.1;
      currentRotY += (targetRotY - currentRotY) * 0.1;
      currentTransZ += (targetTransZ - currentTransZ) * 0.1;

      if (isDesktop()) {
        if (isHovered) {
          card.style.transform = `perspective(1400px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg) translateZ(${currentTransZ.toFixed(1)}px) scale(${baseScale * 1.02})`;
        } else {
          card.style.transform = `perspective(1400px) rotateX(0deg) rotateY(${baseRotY}deg) translateZ(${baseTransZ}px) scale(${baseScale})`;
        }
      } else {
        card.style.transform = isHovered ? `scale(1.02)` : 'none';
      }

      if (isHovered || Math.abs(currentRotX - targetRotX) > 0.05 || Math.abs(currentRotY - targetRotY) > 0.05) {
        animId = requestAnimationFrame(loop);
      } else {
        animId = null;
      }
    }

    card.addEventListener('mouseenter', () => {
      isHovered = true;
      targetTransZ = isCenter ? 80 : 60;
      if (!animId) animId = requestAnimationFrame(loop);
    });

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const pctX = (x / rect.width) * 100;
      const pctY = (y / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${pctX}%`);
      card.style.setProperty('--mouse-y', `${pctY}%`);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      targetRotX = -((y - centerY) / centerY) * 12;
      targetRotY = ((x - centerX) / centerX) * 12;

      if (!animId) animId = requestAnimationFrame(loop);
    }, { passive: true });

    card.addEventListener('mouseleave', () => {
      isHovered = false;
      targetRotX = 0;
      targetRotY = baseRotY;
      targetTransZ = baseTransZ;
      if (!animId) animId = requestAnimationFrame(loop);
    });
  });

  // 2. Universal 3D Tilt & Specular Controller for All Other Panels
  const allOtherPanels = document.querySelectorAll(
    '.service-pillar-card, .pricing-card, .software-pricing-card, .software-app-window, .review-card, .quote-builder-box, .stat-item, .faq-card, .channel-item'
  );

  allOtherPanels.forEach(panel => {
    let currentRotX = 0;
    let currentRotY = 0;
    let currentTransZ = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let targetTransZ = 0;
    let isHovered = false;
    let animId = null;

    function loop() {
      currentRotX += (targetRotX - currentRotX) * 0.12;
      currentRotY += (targetRotY - currentRotY) * 0.12;
      currentTransZ += (targetTransZ - currentTransZ) * 0.12;

      if (isDesktop()) {
        if (isHovered) {
          panel.style.transform = `perspective(1200px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg) translateZ(${currentTransZ.toFixed(1)}px) scale(1.02)`;
        } else {
          panel.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)`;
        }
      } else {
        panel.style.transform = isHovered ? `scale(1.02)` : 'none';
      }

      if (isHovered || Math.abs(currentRotX - targetRotX) > 0.05 || Math.abs(currentRotY - targetRotY) > 0.05 || Math.abs(currentTransZ - targetTransZ) > 0.5) {
        animId = requestAnimationFrame(loop);
      } else {
        animId = null;
      }
    }

    panel.addEventListener('mouseenter', () => {
      isHovered = true;
      targetTransZ = 28;
      if (!animId) animId = requestAnimationFrame(loop);
    });

    panel.addEventListener('mousemove', (e) => {
      const rect = panel.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const pctX = (x / rect.width) * 100;
      const pctY = (y / rect.height) * 100;
      panel.style.setProperty('--mouse-x', `${pctX}%`);
      panel.style.setProperty('--mouse-y', `${pctY}%`);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      targetRotX = -((y - centerY) / centerY) * 9;
      targetRotY = ((x - centerX) / centerX) * 9;

      if (!animId) animId = requestAnimationFrame(loop);
    }, { passive: true });

    panel.addEventListener('mouseleave', () => {
      isHovered = false;
      targetRotX = 0;
      targetRotY = 0;
      targetTransZ = 0;
      if (!animId) animId = requestAnimationFrame(loop);
    });
  });

  // 3. Scroll-Driven Assembly via GSAP ScrollTrigger
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && podiumStage) {
    if (isDesktop()) {
      gsap.fromTo(cards, 
        {
          transform: 'perspective(1400px) translateZ(-300px) rotateX(25deg)',
          opacity: 0
        },
        {
          transform: (i, target) => {
            if (target.classList.contains('card-podium-center')) return 'perspective(1400px) translateZ(45px) rotateY(0deg) scale(1.03)';
            if (target.classList.contains('card-podium-left')) return 'perspective(1400px) translateZ(0px) rotateY(6deg) scale(1)';
            return 'perspective(1400px) translateZ(0px) rotateY(-6deg) scale(1)';
          },
          opacity: 1,
          duration: 1.1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: podiumStage,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
  }
}

/* ==========================================================================
   8. Interactive Byte Fix Optimizer Software GUI Mockup
   ========================================================================== */
function initSoftwareMockup() {
  const tabs = document.querySelectorAll('.app-tab-btn');
  const togglesContainer = document.getElementById('appTogglesList');
  const scanBtn = document.getElementById('btnSimulateScan');
  const scanWrap = document.getElementById('appScanWrap');
  const scanFill = document.getElementById('appScanFill');
  const scanMsg = document.getElementById('appScanMsg');

  if (!tabs.length || !togglesContainer) return;

  const tabContents = {
    boost: [
      { title: 'Kernel Timer Resolution (0.500 ms)', desc: 'Reduce drásticamente el retardo de muestreo entre periféricos y pantalla.' },
      { title: 'Prioridad de Procesos Gaming & Core Affinity', desc: 'Asigna núcleos limpios de CPU a tu juego y desprioriza tareas secundarias.' },
      { title: 'Limpieza Automática de Standby RAM', desc: 'Libera memoria caché saturada en segundo plano para erradicar el stuttering.' },
      { title: 'Eliminación de Telemetría & Cortana Bloat', desc: 'Desactiva registros espías y servicios innecesarios de Windows 10 y 11.' }
    ],
    debloat: [
      { title: 'Desactivar Windows Xbox Game Bar & DVR', desc: 'Elimina grabaciones en segundo plano que consumen 15-20% de rendimiento de GPU.' },
      { title: 'Remover Apps UWP y Bloatware Preinstalado', desc: 'Limpia 38 aplicaciones basura que arrancan con el sistema.' },
      { title: 'Desactivar Indexado de Disco Pesado (Search Index)', desc: 'Reduce el uso de disco y SSD al 0% en reposo.' },
      { title: 'Optimización de Servicios de Red & Diagnósticos', desc: 'Apaga conexiones redundantes a servidores de telemetría de Microsoft.' }
    ],
    latency: [
      { title: 'NVIDIA / AMD Driver Micro-Lag Strip', desc: 'Desactiva buffers innecesarios en la cola de renderizado del driver de video.' },
      { title: 'Algoritmo Nagle & TCP NoDelay', desc: 'Envía paquetes de red inmediatamente reduciendo el ping y jitter en partidas.' },
      { title: 'USB Polling Rate & Interrupt Affinity', desc: 'Asegura que las interrupciones del mouse se procesen en un hilo aislado de CPU.' },
      { title: 'Desactivar HPET (High Precision Event Timer)', desc: 'Evita discrepancias entre timers del motherboard y la CPU para un aim fluido.' }
    ]
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const tabKey = tab.getAttribute('data-tab');
      const rows = tabContents[tabKey] || tabContents.boost;

      togglesContainer.innerHTML = rows.map(item => `
        <div class="app-toggle-row">
          <div class="app-toggle-info">
            <span class="app-toggle-title">${item.title}</span>
            <span class="app-toggle-desc">${item.desc}</span>
          </div>
          <label class="app-switch">
            <input type="checkbox" checked>
            <span class="app-slider"></span>
          </label>
        </div>
      `).join('');
    });
  });

  if (scanBtn && scanWrap && scanFill && scanMsg) {
    scanBtn.addEventListener('click', () => {
      scanBtn.disabled = true;
      scanBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Optimizando Sistema...';
      scanWrap.style.display = 'block';
      scanFill.style.width = '0%';
      scanMsg.style.display = 'none';

      let progress = 0;
      const interval = setInterval(() => {
        progress += 20;
        scanFill.style.width = `${progress}%`;

        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            scanBtn.disabled = false;
            scanBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Sistema 100% Optimizado';
            scanMsg.style.display = 'block';
          }, 300);
        }
      }, 150);
    });
  }
}

/* ==========================================================================
   9. 3D Mouse Parallax on Mascot Showcase
   ========================================================================== */
function init3DParallax() {
  const visualWrapper = document.querySelector('.hero-visual-wrapper');
  const mascotCard = document.querySelector('.hero-mascot-card');

  if (!visualWrapper || !mascotCard) return;

  visualWrapper.addEventListener('mousemove', (e) => {
    const rect = visualWrapper.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateX = -(y / rect.height) * 16;
    const rotateY = (x / rect.width) * 16;

    mascotCard.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
  }, { passive: true });

  visualWrapper.addEventListener('mouseleave', () => {
    mascotCard.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  });
}

/* ==========================================================================
   10. FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqHeaders = document.querySelectorAll('.faq-header');

  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const card = header.parentElement;
      const body = card.querySelector('.faq-body');
      const isActive = card.classList.contains('active');

      document.querySelectorAll('.faq-card').forEach(otherCard => {
        if (otherCard !== card && otherCard.classList.contains('active')) {
          otherCard.classList.remove('active');
          const otherBody = otherCard.querySelector('.faq-body');
          if (otherBody) otherBody.style.maxHeight = null;
        }
      });

      if (isActive) {
        card.classList.remove('active');
        body.style.maxHeight = null;
      } else {
        card.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
}

/* ==========================================================================
   11. Currency Switcher (USD <-> ARS)
   ========================================================================== */
function initCurrencySwitcher() {
  const currBtns = document.querySelectorAll('.curr-btn');
  const priceElements = document.querySelectorAll('[data-usd][data-ars]');

  if (!currBtns.length || !priceElements.length) return;

  currBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedCurr = btn.getAttribute('data-curr');

      priceElements.forEach(el => {
        el.textContent = selectedCurr === 'ars' ? el.getAttribute('data-ars') : el.getAttribute('data-usd');
      });
    });
  });
}

/* ==========================================================================
   12. WhatsApp Lead Generator Form
   ========================================================================== */
function initQuoteForm() {
  const form = document.getElementById('quoteForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const serviceSelect = document.getElementById('formService');
    const clientName = document.getElementById('formName');
    const pcSpecs = document.getElementById('formSpecs');
    const details = document.getElementById('formDetails');

    const service = serviceSelect ? serviceSelect.value : 'Consulta General';
    const name = clientName && clientName.value.trim() ? clientName.value.trim() : 'Cliente';
    const specs = pcSpecs && pcSpecs.value.trim() ? pcSpecs.value.trim() : 'No especificado';
    const notes = details && details.value.trim() ? details.value.trim() : 'Quiero más información y asesoramiento';

    const msg = `👋 *¡Hola Byte Fix!* Quiero consultar por un servicio.%0A%0A` +
      `👤 *Nombre:* ${encodeURIComponent(name)}%0A` +
      `🛠️ *Servicio de interés:* ${encodeURIComponent(service)}%0A` +
      `💻 *Mi PC / Setup:* ${encodeURIComponent(specs)}%0A` +
      `📝 *Detalles:* ${encodeURIComponent(notes)}%0A%0A` +
      `_Enviado desde la web oficial de Byte Fix._`;

    const whatsappUrl = `https://wa.me/${BYTEFIX_PHONE}?text=${msg}`;
    window.open(whatsappUrl, '_blank');
  });
}

/* ==========================================================================
   13. Direct WhatsApp Plan Ordering Helper
   ========================================================================== */
window.contactWhatsAppPlan = function(planName, priceUsd, priceArs) {
  const msg = `👋 *¡Hola Byte Fix!* Quiero adquirir el siguiente servicio:%0A%0A` +
    `⭐ *Plan/Producto:* ${encodeURIComponent(planName)}%0A` +
    `💵 *Precio:* ${encodeURIComponent(priceUsd)} / ${encodeURIComponent(priceArs)}%0A%0A` +
    `¿Podrían indicarme los pasos para el pago y la entrega/servicio? ¡Muchas gracias!`;

  const url = `https://wa.me/${BYTEFIX_PHONE}?text=${msg}`;
  window.open(url, '_blank');
};

/* ==========================================================================
   14. Smooth Scrolling for Anchor Links (Lenis Integration)
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        if (lenisInstance) {
          lenisInstance.scrollTo(targetEl, { offset: -80 });
        } else {
          const headerOffset = 80;
          const elementPosition = targetEl.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

window.copyDiscord = function(tag) {
  navigator.clipboard.writeText(tag).then(() => {
    alert(`¡Tag de Discord copiado!: ${tag}\n¡Agrégalo para soporte y comunidad!`);
  }).catch(() => {
    alert(`Discord: ${tag}`);
  });
};
