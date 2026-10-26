/**
 * BYTE FIX - Official Website Scripts
 * Features:
 * - Dynamic FPS & Latency Simulator per Game / GPU
 * - Interactive Byte Fix Optimizer Software UI Mockup with simulated scan
 * - Animated Number Counters (IntersectionObserver)
 * - Scroll Progress Indicator
 * - Currency Switcher (USD <-> ARS)
 * - FAQ Accordion with smooth transitions
 * - Direct WhatsApp Lead & Quote Generator
 * - 3D Mouse Parallax on Mascot Showcase
 */

const BYTEFIX_PHONE = '5492914380467'; // WhatsApp Oficial: +54 291 438-0467

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollProgress();
  initStatCounters();
  initAdvancedSimulator();
  initSoftwareMockup();
  init3DParallax();
  initFaqAccordion();
  initQuoteForm();
  initCurrencySwitcher();
  initSmoothScroll();
});

/* ==========================================================================
   1. Navbar & Scroll Progress Indicator
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
  });

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

function initScrollProgress() {
  const progressBar = document.getElementById('scrollProgress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }
  });
}

/* ==========================================================================
   2. Animated Number Counters (Stats Bar)
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
          // Ease out cubic
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
   3. Interactive Performance & FPS Simulator
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

  if (!gameSelect || !gpuSelect || !fpsBar) return;

  // Real gaming benchmark simulation dataset
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

  // Initial call
  updateSimulator();
}

/* ==========================================================================
   4. Interactive Byte Fix Optimizer Software GUI Mockup
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

  // Simulated 1-click optimization button
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
   5. 3D Mouse Parallax on Mascot Showcase
   ========================================================================== */
function init3DParallax() {
  const visualWrapper = document.querySelector('.hero-visual-wrapper');
  const mascotCard = document.querySelector('.hero-mascot-card');

  if (!visualWrapper || !mascotCard) return;

  visualWrapper.addEventListener('mousemove', (e) => {
    const rect = visualWrapper.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateX = -(y / rect.height) * 15;
    const rotateY = (x / rect.width) * 15;

    mascotCard.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  visualWrapper.addEventListener('mouseleave', () => {
    mascotCard.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  });
}

/* ==========================================================================
   6. FAQ Accordion
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
   7. Currency Switcher (USD <-> ARS)
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
   8. WhatsApp Lead Generator Form
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
   9. Direct WhatsApp Plan Ordering Helper
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
   10. Smooth Scrolling for Anchor Links
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 90;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
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
