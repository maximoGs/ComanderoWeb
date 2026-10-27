/**
 * Martino Wines · Restaurante Bodega 1901
 * Selección Guía MICHELIN · Mayor Drummond, Luján de Cuyo, Mendoza
 * App de Comandas para Mozos & Servicio de Salón
 * - Mapa de Mesas y Acceso Rápido a Comensales
 * - Acordeón para Ampliar y Ver Detalle de Cada Comensal
 * - Menús de Pasos (2, 3, 4 y 7 Pasos) y A la Carta
 * - Secciones de Entrada, Intermedio, Principal y Postre con checks de entrega
 * - Checks de Seguimiento de Platos Entregados (Pendiente / Servido)
 * - Botón de Servicio de Agua con Degradado Dinámico (Verde -> Amarillo -> Rojo)
 * - Envío Directo y Formateado a WhatsApp Persistente
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Catálogo de Platos, Menús y Maridajes de Martino Wines ---
  const MENU_CATALOG = {
    entradas: [
      { id: 'sp_e1', name: 'Empanadilla cuyana de chivo braseado con llajwa fresca', price: 17000, std: 'Martino Varietales Inusuales Marselan', upg: 'Baldomir Serie Terroirs' },
      { id: 'sp_e2', name: 'Remolacha asada de la huerta, queso de cabra y cítricos', price: 16000, std: 'Martino Pedro Ximénez', upg: 'Martino Superiore Chardonnay' },
      { id: 'sp_e3', name: 'Tartar de trucha curada de montaña, palta y emulsión fresca', price: 20000, std: 'Martino Rosé de Sangiovese', upg: 'Martino Extra Brut' },
      { id: 'sp_e4', name: 'Mollejas crocantes glaseadas en reducción Baldomir y coliflor', price: 22000, std: 'Martino Varietales Inusuales Graciano', upg: 'Baldomir Gran Reserva' },
      { id: 'sp_e5', name: 'Provoleta artesanal a las brasas con tomate reliquia y hierbas', price: 18000, std: 'Martino Malbec Drummond', upg: 'Martino Superiore Malbec' }
    ],
    principales: [
      { id: 'sp_p1', name: 'Ojo de bife madurado al sarmiento con papas fondant y vegetales', price: 38000, std: 'Martino Varietales Inusuales Petit Verdot', upg: 'Baldomir Gran Malbec (Ícono)', isMeat: true },
      { id: 'sp_p2', name: 'Costillar de cordero patagónico confitado y puré especiado', price: 37000, std: 'Martino Varietales Inusuales Marselan', upg: 'Baldomir Serie Terroirs', isMeat: true },
      { id: 'sp_p3', name: 'Trucha salmonada a la chapa con cuscús de hierbas andinas', price: 35000, std: 'Martino Pedro Ximénez Reserva', upg: 'Martino Superiore Chardonnay' },
      { id: 'sp_p4', name: 'Sorrentinos artesanales de hongos silvestres y crema trufada', price: 29000, std: 'Martino Sangiovese', upg: 'Baldomir Gran Blend' },
      { id: 'sp_p5', name: 'Arroz cremoso de azafrán con vegetales asados de la huerta', price: 27000, std: 'Martino Pinot Noir', upg: 'Martino Superiore Reserva' }
    ],
    postres: [
      { id: 'sp_d1', name: 'Húmedo de chocolate amargo 70%, frutos rojos y pistacho', price: 16000, std: 'Baldomir Cosecha Tardía', upg: 'Martino Dulce Natural' },
      { id: 'sp_d2', name: 'Pera asada al vino tinto con mousse de brie y crocante', price: 15000, std: 'Martino Pedro Ximénez Especial', upg: 'Martino Superiore' },
      { id: 'sp_d3', name: 'Cremoso de chocolate blanco tostado y duraznos de Drummond', price: 15000, std: 'Martino Rosé Extra Brut', upg: 'Martino Espumoso Millésimé' },
      { id: 'sp_d4', name: 'Selección de quesos de autor y dulces artesanales mendocinos', price: 16000, std: 'Baldomir Gran Reserva Digestif', upg: 'Baldomir Gran Malbec' }
    ],
    pasosConfig: {
      carta: { name: 'A la Carta', price: 0, tag: '🍷 Carta' },
      '2pasos': { name: 'Menú 2 Pasos', price: 44000, tag: '🍽️ 2 Pasos' },
      '3pasos': { name: 'Menú 3 Pasos (Almuerzo)', price: 52000, tag: '🍽️ 3 Pasos' },
      '4pasos': { name: 'Menú 4 Pasos (Estación)', price: 58000, tag: '🌿 4 Pasos' },
      '7pasos': { name: 'Menú 7 Pasos (Experiencia 1901)', price: 69000, tag: '✨ 7 Pasos' }
    },
    pasos7Defaults: [
      { paso: 1, name: 'Paso 1: Snack · Tartar de trucha curada y emulsión fresca', entregado: false },
      { paso: 2, name: 'Paso 2: Remolacha de la huerta al rescoldo · Queso de cabra', entregado: false },
      { paso: 3, name: 'Paso 3: Empanadilla de chivo al sarmiento y salsa llajwa', entregado: false },
      { paso: 4, name: 'Paso 4: Mollejas crocantes en reducción Baldomir y coliflor', entregado: false },
      { paso: 5, name: 'Paso 5: Ojo de Bife madurado al sarmiento con papas fondant', isMeat: true, doneness: 'A Punto', entregado: false },
      { paso: 6, name: 'Paso 6: Granita refrescante de Pedro Ximénez y hierbas', entregado: false },
      { paso: 7, name: 'Paso 7: Húmedo de chocolate amargo 70%, frutos rojos y pistacho', entregado: false }
    ]
  };

  // --- 2. Definición de Sectores y Mesas de Martino Wines ---
  const SECTORS_DEF = [
    { id: 'salon1901', name: '🍷 Cava & Salón 1901', tables: [1, 2, 3, 4, 5] },
    { id: 'galeria', name: '🌿 Galería & Olivos', tables: [6, 7, 8, 9, 10] },
    { id: 'terraza', name: '🍇 Terraza Viñedos', tables: [11, 12, 13, 14] },
    { id: 'privado', name: '🪵 Cava de Barricas (Privado)', tables: [15, 16] }
  ];

  // Helper para generar comensal predeterminado
  function createDefaultComensal(num) {
    return {
      id: 'c_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      num: num,
      tipoMenu: '3pasos', // 'carta' | '2pasos' | '3pasos' | '4pasos' | '7pasos'
      collapsed: false,
      entradas: [
        { id: 'sp_e2', entregado: false } // Remolacha asada por defecto
      ],
      principales: [
        { id: 'sp_p1', doneness: 'A Punto', entregado: false } // Ojo de bife madurado por defecto
      ],
      postres: [
        { id: 'sp_d1', entregado: false } // Húmedo de chocolate por defecto
      ],
      intermedios: [
        { id: 'sp_e1', entregado: false } // Empanadilla de chivo para 4 pasos
      ],
      pasos7: JSON.parse(JSON.stringify(MENU_CATALOG.pasos7Defaults)),
      maridaje: 'standard', // 'none' | 'standard' | 'upgrade'
      tags: [],
      notas: ''
    };
  }

  // --- 3. Inicialización y Persistencia en LocalStorage ---
  let tablesData = {};
  const savedTables = localStorage.getItem('martino_mesas_v1') || localStorage.getItem('bocheros_mesas_v3');
  if (savedTables) {
    try {
      tablesData = JSON.parse(savedTables);
    } catch (e) {
      tablesData = {};
    }
  }

  // Garantizar estructura para las 16 mesas
  for (let i = 1; i <= 16; i++) {
    if (!tablesData[i]) {
      const sec = SECTORS_DEF.find(s => s.tables.includes(i));
      tablesData[i] = {
        id: i,
        name: `Mesa ${i}`,
        sector: sec ? sec.name : 'General',
        openedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        waterService: {
          lastServedAt: Date.now() - (i % 3) * 12 * 60 * 1000 // tiempos variados iniciales realistas
        },
        comensales: [
          createDefaultComensal(1),
          createDefaultComensal(2)
        ],
        bebidas: []
      };
    } else {
      // Migración o normalización de comensales si venían de versión anterior
      const sec = SECTORS_DEF.find(s => s.tables.includes(i));
      if (sec) tablesData[i].sector = sec.name;

      if (!tablesData[i].waterService) {
        tablesData[i].waterService = { lastServedAt: Date.now() };
      }
      if (tablesData[i].comensales) {
        tablesData[i].comensales.forEach((c, idx) => {
          c.num = idx + 1;
          if (!c.tipoMenu) c.tipoMenu = '3pasos';
          if (c.tipoMenu === 'otono') c.tipoMenu = '7pasos';
          if (c.tipoMenu === 'primavera') c.tipoMenu = '3pasos';
          if (c.collapsed === undefined) c.collapsed = false;

          // Normalizar arreglos de platos
          if (!c.entradas || c.entradas.length === 0) {
            c.entradas = [{ id: 'sp_e2', entregado: false }];
          }
          if (!c.principales || c.principales.length === 0) {
            c.principales = [{ id: 'sp_p1', doneness: 'A Punto', entregado: false }];
          }
          if (!c.postres || c.postres.length === 0) {
            c.postres = [{ id: 'sp_d1', entregado: false }];
          }
          if (!c.intermedios || c.intermedios.length === 0) {
            c.intermedios = [{ id: 'sp_e1', entregado: false }];
          }
          if (!c.pasos7 || c.pasos7.length === 0 || !c.pasos7[0].name.includes('Martino') && !c.pasos7[0].name.includes('Snack')) {
            c.pasos7 = JSON.parse(JSON.stringify(MENU_CATALOG.pasos7Defaults));
          }
        });
      }
    }
  }

  function saveTablesState() {
    localStorage.setItem('martino_mesas_v1', JSON.stringify(tablesData));
  }

  // Active state
  let activeTableId = 1;
  let targetWhatsAppNumber = localStorage.getItem('martino_wa_number') || localStorage.getItem('bocheros_wa_number') || '';
  let activeMozoName = localStorage.getItem('martino_mozo_name') || localStorage.getItem('bocheros_mozo_name') || 'Máximo';

  // --- 4. Elementos del DOM ---
  const panelMapaMesas = document.getElementById('panel-mapa-mesas');
  const panelComandaMesa = document.getElementById('panel-comanda-mesa');
  const sectorsContainer = document.getElementById('sectors-container');
  const waterSalonSummary = document.getElementById('water-salon-summary');

  const btnGoMap = document.getElementById('btn-go-map');
  const btnBackToMap = document.getElementById('btn-back-to-map');
  const titleActiveTable = document.getElementById('title-active-table');
  const labelTableTime = document.getElementById('label-table-time');
  const btnAddComensalTop = document.getElementById('btn-add-comensal-top');
  const btnAddComensal = document.getElementById('btn-add-comensal');

  // Water tracker in Mesa view
  const btnWaterService = document.getElementById('btn-water-service');
  const waterStatusChip = document.getElementById('water-status-chip');
  const waterMetaTime = document.getElementById('water-meta-time');

  // Quick diners & view toggle
  const quickDinersNav = document.getElementById('quick-diners-nav');
  const btnExpandAll = document.getElementById('btn-expand-all');
  const btnCollapseAll = document.getElementById('btn-collapse-all');
  const comensalesList = document.getElementById('comensales-list');

  // Shared drinks
  const selectAddBebida = document.getElementById('select-add-bebida');
  const btnAddDrinkItem = document.getElementById('btn-add-drink-item');
  const drinksActiveList = document.getElementById('drinks-active-list');

  // Summary & Send
  const summaryDinersLabel = document.getElementById('summary-diners-label');
  const summaryTotalAmount = document.getElementById('summary-total-amount');
  const btnSendComandaWa = document.getElementById('btn-send-comanda-wa');
  const waSendTargetLabel = document.getElementById('wa-send-target-label');
  const btnVaciarMesa = document.getElementById('btn-vaciar-mesa');

  // WhatsApp Config Modal
  const btnOpenWaConfig = document.getElementById('btn-open-wa-config');
  const waNumDisplay = document.getElementById('wa-num-display');
  const modalWaConfig = document.getElementById('modal-wa-config');
  const btnCloseWaModal = document.getElementById('btn-close-wa-modal');
  const btnCancelWaModal = document.getElementById('btn-cancel-wa-modal');
  const btnSaveWaNumber = document.getElementById('btn-save-wa-number');
  const inputWaNumber = document.getElementById('input-wa-number');
  const inputMozoName = document.getElementById('input-mozo-name');
  const btnPresetExamples = document.querySelectorAll('.btn-preset-example');

  // Toast Container
  let toastEl = document.querySelector('.toast-notice');
  if (!toastEl) {
    toastEl = document.createElement('div');
    toastEl.className = 'toast-notice';
    document.body.appendChild(toastEl);
  }

  function showToast(msg, icon = '💧') {
    toastEl.innerHTML = `<span>${icon}</span> <span>${msg}</span>`;
    toastEl.classList.add('show');
    clearTimeout(toastEl._timer);
    toastEl._timer = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 2800);
  }

  // --- 5. Lógica del Servicio de Agua (Degradado Verde -> Amarillo -> Rojo) ---
  /**
   * Calcula el estado y color del agua en base a los minutos transcurridos:
   * 0 - 15m : Verde (#10b981) -> Agua servida / 100%
   * 15 - 25m: Verde Lima (#84cc16) -> 75%
   * 25 - 35m: Amarillo / Ámbar (#f59e0b) -> 50% Revisar
   * 35 - 45m: Naranja (#f97316) -> 25% Poca agua
   * 45m+    : Rojo (#ef4444) -> 0% Sin agua / Urgente
   */
  function getWaterServiceStatus(table) {
    if (!table.waterService || !table.waterService.lastServedAt) {
      table.waterService = { lastServedAt: Date.now() };
    }
    const elapsedMs = Date.now() - table.waterService.lastServedAt;
    const mins = Math.max(0, Math.floor(elapsedMs / (60 * 1000)));

    if (mins < 15) {
      return {
        levelPercent: 100,
        chipText: '100% LLENO',
        chipBg: 'rgba(0,0,0,0.25)',
        mins: mins,
        statusText: `Agua recién servida · Hace ${mins} min`,
        gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        miniBg: '#10b981',
        isAlert: false
      };
    } else if (mins < 25) {
      return {
        levelPercent: 75,
        chipText: '75% BIEN',
        chipBg: 'rgba(0,0,0,0.25)',
        mins: mins,
        statusText: `Servicio en orden · Hace ${mins} min`,
        gradient: 'linear-gradient(135deg, #84cc16 0%, #10b981 100%)',
        miniBg: '#84cc16',
        isAlert: false
      };
    } else if (mins < 35) {
      return {
        levelPercent: 50,
        chipText: '50% REVISAR',
        chipBg: 'rgba(0,0,0,0.3)',
        mins: mins,
        statusText: `Media jarra aprox · Hace ${mins} min`,
        gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        miniBg: '#f59e0b',
        isAlert: false
      };
    } else if (mins < 45) {
      return {
        levelPercent: 25,
        chipText: '25% POCA AGUA',
        chipBg: 'rgba(0,0,0,0.35)',
        mins: mins,
        statusText: `Ofrecer recarga de agua · Hace ${mins} min`,
        gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
        miniBg: '#f97316',
        isAlert: false
      };
    } else {
      return {
        levelPercent: 0,
        chipText: '⚠️ 0% SIN AGUA',
        chipBg: 'rgba(0,0,0,0.45)',
        mins: mins,
        statusText: `¡Mesa sin agua! Servir urgente (${mins} min)`,
        gradient: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
        miniBg: '#ef4444',
        isAlert: true
      };
    }
  }

  function updateWaterUI(tableId = activeTableId) {
    const table = tablesData[tableId];
    if (!table) return;

    const w = getWaterServiceStatus(table);

    // Botón de servicio en la vista de mesa
    if (btnWaterService && panelComandaMesa.style.display !== 'none') {
      btnWaterService.style.background = w.gradient;
      if (w.isAlert) {
        btnWaterService.classList.add('water-alert');
      } else {
        btnWaterService.classList.remove('water-alert');
      }

      waterStatusChip.textContent = w.chipText;
      waterStatusChip.style.background = w.chipBg;
      waterMetaTime.textContent = w.statusText;
    }

    // Actualizar resumen general del salón
    updateSalonWaterSummary();
  }

  function updateSalonWaterSummary() {
    let alertCount = 0;
    let reviewCount = 0;

    for (let i = 1; i <= 16; i++) {
      const t = tablesData[i];
      if (t) {
        const w = getWaterServiceStatus(t);
        if (w.isAlert) alertCount++;
        else if (w.levelPercent <= 50) reviewCount++;
      }
    }

    if (alertCount > 0) {
      waterSalonSummary.textContent = `${alertCount} mesa(s) sin agua ⚠️`;
      waterSalonSummary.style.color = '#ef4444';
    } else if (reviewCount > 0) {
      waterSalonSummary.textContent = `${reviewCount} mesa(s) por recargar`;
      waterSalonSummary.style.color = '#f59e0b';
    } else {
      waterSalonSummary.textContent = 'Salón al 100% de agua';
      waterSalonSummary.style.color = '#10b981';
    }
  }

  // Tocar botón de agua: recargar y resetear a Verde
  btnWaterService.addEventListener('click', () => {
    const table = tablesData[activeTableId];
    table.waterService.lastServedAt = Date.now();
    saveTablesState();
    updateWaterUI(activeTableId);
    showToast(`¡Agua servida en ${table.name}! Contador reiniciado a Verde (100%)`, '💧');
  });

  // Ticker periódico cada 15 segundos para actualizar degradados en tiempo real
  setInterval(() => {
    if (panelComandaMesa.style.display !== 'none') {
      updateWaterUI(activeTableId);
    } else {
      renderMapaMesas();
    }
  }, 15000);

  // --- 6. WhatsApp Target Helper ---
  function updateWaTargetDisplay() {
    if (targetWhatsAppNumber) {
      waNumDisplay.textContent = `WA: ${targetWhatsAppNumber}`;
      waSendTargetLabel.textContent = `Enviar a WhatsApp: ${targetWhatsAppNumber}`;
    } else {
      waNumDisplay.textContent = 'Configurar WA';
      waSendTargetLabel.textContent = 'Pulsa para configurar número de WhatsApp';
    }
  }
  updateWaTargetDisplay();

  // --- 7. Cambiar de Vistas ---
  function showMapa() {
    panelMapaMesas.style.display = 'flex';
    panelComandaMesa.style.display = 'none';
    renderMapaMesas();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function showComanda(tableId) {
    activeTableId = tableId;
    panelMapaMesas.style.display = 'none';
    panelComandaMesa.style.display = 'flex';
    renderComandaMesa();
    updateWaterUI(tableId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  btnGoMap.addEventListener('click', showMapa);
  btnBackToMap.addEventListener('click', showMapa);

  // --- 8. Render Mapa de Mesas ---
  function renderMapaMesas() {
    sectorsContainer.innerHTML = '';
    updateSalonWaterSummary();

    SECTORS_DEF.forEach(sector => {
      const card = document.createElement('div');
      card.className = 'sector-card';

      let tablesHTML = '';
      sector.tables.forEach(num => {
        const t = tablesData[num];
        const hasOrder = (t.comensales && t.comensales.length > 0) || (t.bebidas && t.bebidas.length > 0);
        const count = t.comensales ? t.comensales.length : 0;
        const total = calculateTableTotal(t);
        const water = getWaterServiceStatus(t);

        tablesHTML += `
          <button class="table-btn ${hasOrder ? 'busy' : ''}" data-table-id="${num}">
            <span class="tbl-name">${t.name}</span>
            <span class="tbl-status-badge ${hasOrder ? 'busy' : 'free'}">
              ${hasOrder ? 'En Mesa' : 'Libre'}
            </span>
            <span class="tbl-info">${count} comensales</span>
            ${total > 0 ? `<span class="tbl-total">$${total.toLocaleString('es-AR')}</span>` : ''}
            
            <!-- Botellita de agua con su degradado para control visual de salón -->
            <span class="tbl-water-pill" style="background: ${water.miniBg}" title="${water.statusText}">
              💧 ${water.mins}m
            </span>
          </button>
        `;
      });

      card.innerHTML = `
        <div class="sector-header">${sector.name}</div>
        <div class="tables-row">${tablesHTML}</div>
      `;

      card.querySelectorAll('.table-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const tid = parseInt(btn.getAttribute('data-table-id'), 10);
          showComanda(tid);
        });
      });

      sectorsContainer.appendChild(card);
    });
  }

  // --- 9. Cálculo de Total de la Mesa ---
  function calculateTableTotal(table) {
    let total = 0;

    if (table.comensales) {
      table.comensales.forEach(c => {
        const pConf = MENU_CATALOG.pasosConfig[c.tipoMenu] || MENU_CATALOG.pasosConfig['3pasos'];
        
        if (c.tipoMenu === '7pasos') {
          total += MENU_CATALOG.pasosConfig['7pasos'].price;
        } else if (c.tipoMenu === 'carta') {
          // Suma individual de cada plato seleccionado
          if (c.entradas) {
            c.entradas.forEach(e => {
              const item = MENU_CATALOG.entradas.find(i => i.id === e.id);
              if (item) total += item.price;
            });
          }
          if (c.principales) {
            c.principales.forEach(p => {
              const item = MENU_CATALOG.principales.find(i => i.id === p.id);
              if (item) total += item.price;
            });
          }
          if (c.postres) {
            c.postres.forEach(d => {
              const item = MENU_CATALOG.postres.find(i => i.id === d.id);
              if (item) total += item.price;
            });
          }
        } else {
          // Menús de 2, 3 o 4 pasos: precio base del menú
          total += pConf.price;

          // Si agregaron platos extras más allá de los incluidos en el menú:
          const maxEntradas = (c.tipoMenu === '2pasos' || c.tipoMenu === '3pasos' || c.tipoMenu === '4pasos') ? 1 : 0;
          const maxPrincipales = 1;
          const maxPostres = (c.tipoMenu === '3pasos' || c.tipoMenu === '4pasos') ? 1 : 0;

          if (c.entradas && c.entradas.length > maxEntradas) {
            for (let i = maxEntradas; i < c.entradas.length; i++) {
              const item = MENU_CATALOG.entradas.find(x => x.id === c.entradas[i].id);
              if (item) total += item.price;
            }
          }
          if (c.principales && c.principales.length > maxPrincipales) {
            for (let i = maxPrincipales; i < c.principales.length; i++) {
              const item = MENU_CATALOG.principales.find(x => x.id === c.principales[i].id);
              if (item) total += item.price;
            }
          }
          if (c.postres && c.postres.length > maxPostres) {
            for (let i = maxPostres; i < c.postres.length; i++) {
              const item = MENU_CATALOG.postres.find(x => x.id === c.postres[i].id);
              if (item) total += item.price;
            }
          }
        }

        // Maridaje Upgrade
        if (c.maridaje === 'upgrade') {
          total += 18000;
        }
      });
    }

    // Bebidas y Vinos compartidos
    if (table.bebidas) {
      table.bebidas.forEach(b => {
        total += b.price * b.qty;
      });
    }

    return total;
  }

  // --- 10. Cálculo de Seguimiento de Platos Servidos por Comensal ---
  function getComensalProgress(c) {
    let totalDishes = 0;
    let deliveredDishes = 0;

    if (c.tipoMenu === '7pasos') {
      totalDishes = 7;
      deliveredDishes = c.pasos7 ? c.pasos7.filter(p => p.entregado).length : 0;
    } else {
      if (c.entradas) {
        totalDishes += c.entradas.length;
        deliveredDishes += c.entradas.filter(e => e.entregado).length;
      }
      if (c.tipoMenu === '4pasos' && c.intermedios) {
        totalDishes += c.intermedios.length;
        deliveredDishes += c.intermedios.filter(i => i.entregado).length;
      }
      if (c.principales) {
        totalDishes += c.principales.length;
        deliveredDishes += c.principales.filter(p => p.entregado).length;
      }
      if (c.postres) {
        totalDishes += c.postres.length;
        deliveredDishes += c.postres.filter(d => d.entregado).length;
      }
    }

    return { total: totalDishes, delivered: deliveredDishes };
  }

  // Generar resumen textual para la vista compacta
  function getComensalSummaryText(c) {
    if (c.tipoMenu === '7pasos') {
      const p = getComensalProgress(c);
      return `🍂 <strong>Menú Degustación 7 Pasos</strong> (${p.delivered}/${p.total} servidos)`;
    }

    const parts = [];
    if (c.entradas && c.entradas.length > 0) {
      const eNames = c.entradas.map(x => {
        const it = MENU_CATALOG.entradas.find(i => i.id === x.id);
        const check = x.entregado ? '✅' : '⏳';
        return `${it ? it.name.split(',')[0] : 'Entrada'} (${check})`;
      }).join(', ');
      parts.push(`🥗 ${eNames}`);
    }

    if (c.principales && c.principales.length > 0) {
      const pNames = c.principales.map(x => {
        const it = MENU_CATALOG.principales.find(i => i.id === x.id);
        const check = x.entregado ? '✅' : '⏳';
        const donenessStr = (it && it.isMeat && x.doneness) ? ` [${x.doneness}]` : '';
        return `${it ? it.name.split(',')[0] : 'Principal'}${donenessStr} (${check})`;
      }).join(', ');
      parts.push(`🥩 ${pNames}`);
    }

    if (c.postres && c.postres.length > 0) {
      const dNames = c.postres.map(x => {
        const it = MENU_CATALOG.postres.find(i => i.id === x.id);
        const check = x.entregado ? '✅' : '⏳';
        return `${it ? it.name.split(',')[0] : 'Postre'} (${check})`;
      }).join(', ');
      parts.push(`🍰 ${dNames}`);
    }

    return parts.join(' · ') || 'Sin platos asignados aún.';
  }

  // --- 11. Render Comanda por Comensal ---
  function renderComandaMesa() {
    const table = tablesData[activeTableId];
    if (!table) return;

    titleActiveTable.textContent = `${table.name} · ${table.sector}`;
    labelTableTime.textContent = `Abierta: ${table.openedAt}`;

    // Render quick navigation pills
    renderQuickDinersNav(table);

    comensalesList.innerHTML = '';

    table.comensales.forEach((comensal, idx) => {
      const cNum = idx + 1;
      comensal.num = cNum;

      const progress = getComensalProgress(comensal);
      const isComplete = progress.total > 0 && progress.delivered === progress.total;
      const progressBadgeText = `✅ ${progress.delivered}/${progress.total} servidos`;
      const menuTag = (MENU_CATALOG.pasosConfig[comensal.tipoMenu] || MENU_CATALOG.pasosConfig['3pasos']).tag;

      const card = document.createElement('div');
      card.className = `comensal-card ${comensal.collapsed ? 'collapsed' : ''}`;
      card.id = `comensal-card-${idx}`;

      // Cabecera del comensal
      const headerHTML = `
        <div class="comensal-header" data-cidx="${idx}">
          <div class="comensal-header-left">
            <span class="comensal-tag">👤 COMENSAL ${cNum}</span>
            <span class="comensal-menu-badge">${menuTag}</span>
            <span class="comensal-progress-badge" style="${isComplete ? 'background: #d1fae5; color: #047857;' : ''}">
              ${progressBadgeText}
            </span>
          </div>
          <div class="comensal-header-right">
            ${table.comensales.length > 1 ? `<button class="btn-del-comensal" data-cidx="${idx}">🗑️ Quitar</button>` : ''}
            <button class="btn-toggle-expand" title="Ampliar / Colapsar Comensal">
              ${comensal.collapsed ? '▼' : '▲'}
            </button>
          </div>
        </div>

        <!-- Resumen rápido cuando está colapsado -->
        <div class="comensal-quick-summary" data-cidx="${idx}">
          <span>${getComensalSummaryText(comensal)}</span>
          <span style="color: var(--navy-primary); font-weight: 700; font-size: 0.72rem;">Ampliar 🔍</span>
        </div>
      `;

      // Selector de 5 modalidades de menú
      const stepsSelectorHTML = `
        <div class="menu-steps-selector-wrap">
          <label class="menu-selector-label">Modalidad de Menú:</label>
          <div class="menu-type-selector-5">
            <button class="btn-step-option ${comensal.tipoMenu === 'carta' ? 'active' : ''}" data-type="carta" data-cidx="${idx}">
              <span>🍷 Carta</span>
              <span class="step-price-sub">Por plato</span>
            </button>
            <button class="btn-step-option ${comensal.tipoMenu === '2pasos' ? 'active' : ''}" data-type="2pasos" data-cidx="${idx}">
              <span>🍽️ 2 Pasos</span>
              <span class="step-price-sub">$44.000</span>
            </button>
            <button class="btn-step-option ${comensal.tipoMenu === '3pasos' ? 'active' : ''}" data-type="3pasos" data-cidx="${idx}">
              <span>🍽️ 3 Pasos</span>
              <span class="step-price-sub">$52.000</span>
            </button>
            <button class="btn-step-option ${comensal.tipoMenu === '4pasos' ? 'active' : ''}" data-type="4pasos" data-cidx="${idx}">
              <span>🌿 4 Pasos</span>
              <span class="step-price-sub">$58.000</span>
            </button>
            <button class="btn-step-option ${comensal.tipoMenu === '7pasos' ? 'active' : ''}" data-type="7pasos" data-cidx="${idx}">
              <span>✨ 7 Pasos</span>
              <span class="step-price-sub">$69.000</span>
            </button>
          </div>
        </div>
      `;

      // Contenido de comida según modalidad
      let foodContentHTML = '';

      if (comensal.tipoMenu === '7pasos') {
        // MENÚ 7 PASOS CON CHECK INDIVIDUAL POR PASO
        const pasosItemsHTML = comensal.pasos7.map((p, pIdx) => {
          let extraMeatHTML = '';
          if (p.isMeat) {
            extraMeatHTML = `
              <div class="meat-doneness-row" style="margin-top: 0.4rem;">
                <button class="doneness-btn ${p.doneness === 'Jugoso' ? 'active' : ''}" data-val="Jugoso" data-cidx="${idx}" data-pidx="${pIdx}">🥩 Jugoso</button>
                <button class="doneness-btn ${p.doneness === 'A Punto' ? 'active' : ''}" data-val="A Punto" data-cidx="${idx}" data-pidx="${pIdx}">🥩 A Punto</button>
                <button class="doneness-btn ${p.doneness === 'Cocido' ? 'active' : ''}" data-val="Cocido" data-cidx="${idx}" data-pidx="${pIdx}">🥩 Cocido</button>
              </div>
            `;
          }

          return `
            <div class="paso-7-item ${p.entregado ? 'is-delivered' : ''}">
              <div style="flex: 1;">
                <div class="paso-7-left">
                  <span class="paso-num-circle">${p.paso}</span>
                  <span class="paso-name">${p.name}</span>
                </div>
                ${extraMeatHTML}
              </div>
              <button class="btn-dish-check ${p.entregado ? 'delivered' : ''}" data-action="toggle-step-7" data-cidx="${idx}" data-pidx="${pIdx}">
                ${p.entregado ? '✅ Servido' : '⬜ Servir'}
              </button>
            </div>
          `;
        }).join('');

        foodContentHTML = `
          <div class="otono-7pasos-card">
            <div class="otono-7pasos-header">
              <span class="otono-7pasos-title">✨ Menú Degustación Bodega 1901 (7 Pasos)</span>
              <span class="otono-7pasos-price">$69.000</span>
            </div>
            <div class="pasos-7-list">
              ${pasosItemsHTML}
            </div>
          </div>
        `;
      } else {
        // SECCIONES DE ENTRADA, PRINCIPAL Y POSTRE (CON AGREGADO DINÁMICO & CHECKS)

        // Helper para armar opciones de selects
        function buildOptions(catalog, currentId) {
          return catalog.map(item => `
            <option value="${item.id}" ${item.id === currentId ? 'selected' : ''}>
              ${item.name} ($${item.price.toLocaleString('es-AR')})
            </option>
          `).join('');
        }

        // 1. Entradas
        const entradasListHTML = (comensal.entradas || []).map((eItem, eIdx) => `
          <div class="dish-item-row ${eItem.entregado ? 'is-delivered' : ''}">
            <div class="dish-main-controls">
              <button class="btn-dish-check ${eItem.entregado ? 'delivered' : ''}" data-action="toggle-dish" data-sec="entradas" data-cidx="${idx}" data-didx="${eIdx}">
                ${eItem.entregado ? '✅ Servido' : '⬜ Servir'}
              </button>
              <select class="dish-select select-course-dish" data-sec="entradas" data-cidx="${idx}" data-didx="${eIdx}">
                ${buildOptions(MENU_CATALOG.entradas, eItem.id)}
              </select>
              ${comensal.entradas.length > 1 ? `<button class="btn-del-dish-item" data-action="del-dish" data-sec="entradas" data-cidx="${idx}" data-didx="${eIdx}">✕</button>` : ''}
            </div>
          </div>
        `).join('');

        // 2. Plato Intermedio (para 4 pasos)
        let intermedioSectionHTML = '';
        if (comensal.tipoMenu === '4pasos') {
          const intermediosListHTML = (comensal.intermedios || []).map((iItem, iIdx) => `
            <div class="dish-item-row ${iItem.entregado ? 'is-delivered' : ''}">
              <div class="dish-main-controls">
                <button class="btn-dish-check ${iItem.entregado ? 'delivered' : ''}" data-action="toggle-dish" data-sec="intermedios" data-cidx="${idx}" data-didx="${iIdx}">
                  ${iItem.entregado ? '✅ Servido' : '⬜ Servir'}
                </button>
                <select class="dish-select select-course-dish" data-sec="intermedios" data-cidx="${idx}" data-didx="${iIdx}">
                  ${buildOptions(MENU_CATALOG.entradas, iItem.id)}
                </select>
              </div>
            </div>
          `).join('');

          intermedioSectionHTML = `
            <div class="course-section">
              <div class="course-section-header">
                <span class="course-title">🍲 2° Paso: Plato Intermedio</span>
              </div>
              <div class="dishes-list-in-section">
                ${intermediosListHTML}
              </div>
            </div>
          `;
        }

        // 3. Principales
        const principalesListHTML = (comensal.principales || []).map((pItem, pIdx) => {
          const selObj = MENU_CATALOG.principales.find(p => p.id === pItem.id);
          const isMeat = selObj && selObj.isMeat;

          return `
            <div class="dish-item-row ${pItem.entregado ? 'is-delivered' : ''}">
              <div class="dish-main-controls">
                <button class="btn-dish-check ${pItem.entregado ? 'delivered' : ''}" data-action="toggle-dish" data-sec="principales" data-cidx="${idx}" data-didx="${pIdx}">
                  ${pItem.entregado ? '✅ Servido' : '⬜ Servir'}
                </button>
                <select class="dish-select select-course-dish" data-sec="principales" data-cidx="${idx}" data-didx="${pIdx}">
                  ${buildOptions(MENU_CATALOG.principales, pItem.id)}
                </select>
                ${comensal.principales.length > 1 ? `<button class="btn-del-dish-item" data-action="del-dish" data-sec="principales" data-cidx="${idx}" data-didx="${pIdx}">✕</button>` : ''}
              </div>
              <!-- Selector de Punto de Carne si aplica -->
              <div class="meat-doneness-row" style="display: ${isMeat ? 'flex' : 'none'};">
                <button class="doneness-btn ${pItem.doneness === 'Jugoso' ? 'active' : ''}" data-val="Jugoso" data-cidx="${idx}" data-didx="${pIdx}">🥩 Jugoso</button>
                <button class="doneness-btn ${pItem.doneness === 'A Punto' ? 'active' : ''}" data-val="A Punto" data-cidx="${idx}" data-didx="${pIdx}">🥩 A Punto</button>
                <button class="doneness-btn ${pItem.doneness === 'Cocido' ? 'active' : ''}" data-val="Cocido" data-cidx="${idx}" data-didx="${pIdx}">🥩 Cocido</button>
              </div>
            </div>
          `;
        }).join('');

        // 4. Postres
        const postresListHTML = (comensal.postres || []).map((dItem, dIdx) => `
          <div class="dish-item-row ${dItem.entregado ? 'is-delivered' : ''}">
            <div class="dish-main-controls">
              <button class="btn-dish-check ${dItem.entregado ? 'delivered' : ''}" data-action="toggle-dish" data-sec="postres" data-cidx="${idx}" data-didx="${dIdx}">
                ${dItem.entregado ? '✅ Servido' : '⬜ Servir'}
              </button>
              <select class="dish-select select-course-dish" data-sec="postres" data-cidx="${idx}" data-didx="${dIdx}">
                ${buildOptions(MENU_CATALOG.postres, dItem.id)}
              </select>
              ${comensal.postres.length > 1 ? `<button class="btn-del-dish-item" data-action="del-dish" data-sec="postres" data-cidx="${idx}" data-didx="${dIdx}">✕</button>` : ''}
            </div>
          </div>
        `).join('');

        foodContentHTML = `
          <div class="courses-container">
            <!-- Sección Entrada -->
            <div class="course-section">
              <div class="course-section-header">
                <span class="course-title">🥗 Sección Entrada(s)</span>
                <button class="btn-add-extra-dish" data-action="add-dish" data-sec="entradas" data-cidx="${idx}">
                  + Agregar otra Entrada
                </button>
              </div>
              <div class="dishes-list-in-section">
                ${entradasListHTML}
              </div>
            </div>

            <!-- Sección Intermedio (si es 4 pasos) -->
            ${intermedioSectionHTML}

            <!-- Sección Principal -->
            <div class="course-section">
              <div class="course-section-header">
                <span class="course-title">🥩 Sección Principal(es)</span>
                <button class="btn-add-extra-dish" data-action="add-dish" data-sec="principales" data-cidx="${idx}">
                  + Agregar otro Principal
                </button>
              </div>
              <div class="dishes-list-in-section">
                ${principalesListHTML}
              </div>
            </div>

            <!-- Sección Postre -->
            <div class="course-section">
              <div class="course-section-header">
                <span class="course-title">🍰 Sección Postre(s)</span>
                <button class="btn-add-extra-dish" data-action="add-dish" data-sec="postres" data-cidx="${idx}">
                  + Agregar otro Postre
                </button>
              </div>
              <div class="dishes-list-in-section">
                ${postresListHTML}
              </div>
            </div>
          </div>
        `;
      }

      // Maridaje
      const maridajeHTML = `
        <div class="choice-group">
          <label class="choice-label">🍷 Maridaje del Comensal:</label>
          <div class="pairing-pills-row">
            <button class="pairing-pill-btn ${comensal.maridaje === 'none' ? 'active' : ''}" data-pair="none" data-cidx="${idx}">
              Sin Maridaje
            </button>
            <button class="pairing-pill-btn ${comensal.maridaje === 'standard' ? 'active' : ''}" data-pair="standard" data-cidx="${idx}">
              🍷 Clásico Incluido
            </button>
            <button class="pairing-pill-btn ${comensal.maridaje === 'upgrade' ? 'active' : ''}" data-pair="upgrade" data-cidx="${idx}">
              ✨ Upgrade Autor (+$18k)
            </button>
          </div>
        </div>
      `;

      // Tags y Anotaciones
      const TAGS_LIST = ['Sin TACC', 'Sin Sal', 'Vegetariano', 'Vegano', 'Sin Cebolla', 'Sin Frutos Secos', 'Para Compartir'];
      const tagsHTML = TAGS_LIST.map(tag => {
        const isAct = comensal.tags && comensal.tags.includes(tag);
        return `<button class="tag-btn ${isAct ? 'active' : ''}" data-tag="${tag}">${tag}</button>`;
      }).join('');

      const notesHTML = `
        <div class="choice-group">
          <label class="choice-label">📝 Anotaciones / Restricciones:</label>
          <div class="quick-tags-wrap" data-cidx="${idx}">
            ${tagsHTML}
          </div>
          <input type="text" class="comensal-note-input input-nota-comensal" data-cidx="${idx}" 
                 placeholder="Ej: Sin sal, alérgico a nueces, marchar después..." value="${comensal.notas || ''}">
        </div>
      `;

      // Ensamblado del cuerpo
      const bodyHTML = `
        <div class="comensal-body">
          ${stepsSelectorHTML}
          ${foodContentHTML}
          ${maridajeHTML}
          ${notesHTML}
        </div>
      `;

      card.innerHTML = headerHTML + bodyHTML;

      // --- Listeners dentro de la tarjeta de este comensal ---

      // 1. Expandir / Colapsar al hacer clic en header o resumen
      const headerEl = card.querySelector('.comensal-header');
      const summaryEl = card.querySelector('.comensal-quick-summary');

      function toggleCollapse() {
        comensal.collapsed = !comensal.collapsed;
        saveTablesState();
        renderComandaMesa();
      }

      headerEl.addEventListener('click', (e) => {
        // Evitar que el clic en el botón de eliminar comensal dispare el colapso
        if (e.target.closest('.btn-del-comensal')) return;
        toggleCollapse();
      });

      if (summaryEl) {
        summaryEl.addEventListener('click', toggleCollapse);
      }

      // 2. Eliminar comensal
      const delComensalBtn = card.querySelector('.btn-del-comensal');
      if (delComensalBtn) {
        delComensalBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          table.comensales.splice(idx, 1);
          saveTablesState();
          renderComandaMesa();
        });
      }

      // 3. Cambiar Modalidad de Menú (Carta, 2, 3, 4, 7 pasos)
      card.querySelectorAll('.btn-step-option').forEach(sBtn => {
        sBtn.addEventListener('click', () => {
          const sType = sBtn.getAttribute('data-type');
          comensal.tipoMenu = sType;
          saveTablesState();
          renderComandaMesa();
        });
      });

      // 4. Cambiar plato en select dropdown
      card.querySelectorAll('.select-course-dish').forEach(sel => {
        sel.addEventListener('change', (e) => {
          const sec = sel.getAttribute('data-sec');
          const dIdx = parseInt(sel.getAttribute('data-didx'), 10);
          if (comensal[sec] && comensal[sec][dIdx]) {
            comensal[sec][dIdx].id = e.target.value;
            saveTablesState();
            renderComandaMesa();
          }
        });
      });

      // 5. Check de Plato Entregado (Toggle)
      card.querySelectorAll('.btn-dish-check').forEach(cBtn => {
        cBtn.addEventListener('click', () => {
          const action = cBtn.getAttribute('data-action');
          if (action === 'toggle-step-7') {
            const pIdx = parseInt(cBtn.getAttribute('data-pidx'), 10);
            if (comensal.pasos7 && comensal.pasos7[pIdx]) {
              comensal.pasos7[pIdx].entregado = !comensal.pasos7[pIdx].entregado;
              saveTablesState();
              renderComandaMesa();
            }
          } else {
            const sec = cBtn.getAttribute('data-sec');
            const dIdx = parseInt(cBtn.getAttribute('data-didx'), 10);
            if (comensal[sec] && comensal[sec][dIdx]) {
              comensal[sec][dIdx].entregado = !comensal[sec][dIdx].entregado;
              saveTablesState();
              renderComandaMesa();
            }
          }
        });
      });

      // 6. Agregar Plato Extra en Sección
      card.querySelectorAll('.btn-add-extra-dish').forEach(addBtn => {
        addBtn.addEventListener('click', () => {
          const sec = addBtn.getAttribute('data-sec');
          if (!comensal[sec]) comensal[sec] = [];
          
          let defaultId = 'sp_e1';
          if (sec === 'principales') defaultId = 'sp_p1';
          if (sec === 'postres') defaultId = 'sp_d1';

          comensal[sec].push({ id: defaultId, entregado: false, doneness: 'A Punto' });
          saveTablesState();
          renderComandaMesa();
        });
      });

      // 7. Eliminar Plato Extra
      card.querySelectorAll('.btn-del-dish-item').forEach(delDishBtn => {
        delDishBtn.addEventListener('click', () => {
          const sec = delDishBtn.getAttribute('data-sec');
          const dIdx = parseInt(delDishBtn.getAttribute('data-didx'), 10);
          if (comensal[sec] && comensal[sec].length > 1) {
            comensal[sec].splice(dIdx, 1);
            saveTablesState();
            renderComandaMesa();
          }
        });
      });

      // 8. Selector de Punto de Carne
      card.querySelectorAll('.doneness-btn').forEach(dBtn => {
        dBtn.addEventListener('click', () => {
          const val = dBtn.getAttribute('data-val');
          const pIdx = dBtn.getAttribute('data-pidx');
          const dIdx = dBtn.getAttribute('data-didx');

          if (pIdx !== null) {
            // Paso 7
            comensal.pasos7[parseInt(pIdx, 10)].doneness = val;
          } else if (dIdx !== null) {
            // Principal normal
            comensal.principales[parseInt(dIdx, 10)].doneness = val;
          }
          saveTablesState();
          renderComandaMesa();
        });
      });

      // 9. Maridaje Buttons
      card.querySelectorAll('.pairing-pill-btn').forEach(pBtn => {
        pBtn.addEventListener('click', () => {
          comensal.maridaje = pBtn.getAttribute('data-pair');
          saveTablesState();
          renderComandaMesa();
        });
      });

      // 10. Tags de Alérgenos
      card.querySelectorAll('.tag-btn').forEach(tBtn => {
        tBtn.addEventListener('click', () => {
          const tVal = tBtn.getAttribute('data-tag');
          if (!comensal.tags) comensal.tags = [];
          if (comensal.tags.includes(tVal)) {
            comensal.tags = comensal.tags.filter(t => t !== tVal);
          } else {
            comensal.tags.push(tVal);
          }
          saveTablesState();
          renderComandaMesa();
        });
      });

      // 11. Input de Notas
      const noteInput = card.querySelector('.input-nota-comensal');
      if (noteInput) {
        noteInput.addEventListener('input', (e) => {
          comensal.notas = e.target.value;
          saveTablesState();
        });
      }

      comensalesList.appendChild(card);
    });

    renderSharedDrinks();
    updateSummaryFooter();
  }

  // --- 12. Render Barra de Acceso Rápido a Comensales ---
  function renderQuickDinersNav(table) {
    quickDinersNav.innerHTML = '';

    // Botón "Todos"
    const allBtn = document.createElement('button');
    allBtn.className = 'btn-quick-diner active';
    allBtn.innerHTML = `<span>👥 Todos (${table.comensales.length})</span>`;
    allBtn.addEventListener('click', () => {
      window.scrollTo({ top: comensalesList.offsetTop - 120, behavior: 'smooth' });
    });
    quickDinersNav.appendChild(allBtn);

    // Pill por cada comensal
    table.comensales.forEach((c, idx) => {
      const p = getComensalProgress(c);
      const isDone = p.total > 0 && p.delivered === p.total;
      const pill = document.createElement('button');
      pill.className = 'btn-quick-diner';
      pill.innerHTML = `
        <span>👤 C${idx + 1}</span>
        <span class="badge-served" style="${isDone ? 'background: #10b981; color: #fff;' : ''}">${p.delivered}/${p.total}</span>
      `;

      pill.addEventListener('click', () => {
        c.collapsed = false; // asegurarse de abrirlo al hacer click
        saveTablesState();
        renderComandaMesa();

        setTimeout(() => {
          const targetCard = document.getElementById(`comensal-card-${idx}`);
          if (targetCard) {
            targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            targetCard.style.outline = '3px solid var(--gold-accent)';
            setTimeout(() => { targetCard.style.outline = 'none'; }, 1500);
          }
        }, 80);
      });

      quickDinersNav.appendChild(pill);
    });
  }

  // Expandir y Colapsar Todos
  btnExpandAll.addEventListener('click', () => {
    const table = tablesData[activeTableId];
    table.comensales.forEach(c => { c.collapsed = false; });
    saveTablesState();
    renderComandaMesa();
  });

  btnCollapseAll.addEventListener('click', () => {
    const table = tablesData[activeTableId];
    table.comensales.forEach(c => { c.collapsed = true; });
    saveTablesState();
    renderComandaMesa();
  });

  // --- 13. Vinos y Bebidas Compartidas de la Mesa ---
  function renderSharedDrinks() {
    const table = tablesData[activeTableId];
    drinksActiveList.innerHTML = '';

    if (!table.bebidas || table.bebidas.length === 0) {
      drinksActiveList.innerHTML = `
        <span style="font-size: 0.76rem; color: #888; font-style: italic;">
          No hay botellas de vino ni bebidas agregadas a la mesa aún.
        </span>
      `;
      return;
    }

    table.bebidas.forEach((beb, idx) => {
      const itemRow = document.createElement('div');
      itemRow.className = 'drink-item-pill';
      itemRow.innerHTML = `
        <span>🍷 ${beb.qty}x ${beb.name}</span>
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <span style="color: #7a2233; font-weight: 700;">$${(beb.price * beb.qty).toLocaleString('es-AR')}</span>
          <button class="btn-del-drink" data-bidx="${idx}" title="Quitar">✕</button>
        </div>
      `;

      itemRow.querySelector('.btn-del-drink').addEventListener('click', () => {
        table.bebidas.splice(idx, 1);
        saveTablesState();
        renderSharedDrinks();
        updateSummaryFooter();
      });

      drinksActiveList.appendChild(itemRow);
    });
  }

  btnAddDrinkItem.addEventListener('click', () => {
    const val = selectAddBebida.value;
    if (!val) return;

    const [name, priceStr] = val.split('|');
    const price = parseInt(priceStr, 10);
    const table = tablesData[activeTableId];

    if (!table.bebidas) table.bebidas = [];

    const existing = table.bebidas.find(b => b.name === name);
    if (existing) {
      existing.qty += 1;
    } else {
      table.bebidas.push({ name, price, qty: 1 });
    }

    selectAddBebida.value = '';
    saveTablesState();
    renderSharedDrinks();
    updateSummaryFooter();
  });

  // --- 14. Agregar Comensal ---
  function addComensalToTable() {
    const table = tablesData[activeTableId];
    const nextNum = (table.comensales.length || 0) + 1;
    table.comensales.push(createDefaultComensal(nextNum));
    saveTablesState();
    renderComandaMesa();
    showToast(`Comensal ${nextNum} agregado a la mesa`, '👤');
  }

  btnAddComensal.addEventListener('click', addComensalToTable);
  btnAddComensalTop.addEventListener('click', addComensalToTable);

  // --- 15. Resumen Footer ---
  function updateSummaryFooter() {
    const table = tablesData[activeTableId];
    if (!table) return;

    const count = table.comensales ? table.comensales.length : 0;
    summaryDinersLabel.textContent = `${count} Comensales`;

    const total = calculateTableTotal(table);
    summaryTotalAmount.textContent = `$${total.toLocaleString('es-AR')}`;
  }

  // --- 16. Vaciar y Reiniciar Mesa ---
  btnVaciarMesa.addEventListener('click', () => {
    const table = tablesData[activeTableId];
    if (confirm(`¿Reiniciar y vaciar ${table.name}? Se reiniciará la comanda y el servicio de agua.`)) {
      table.comensales = [createDefaultComensal(1), createDefaultComensal(2)];
      table.bebidas = [];
      table.openedAt = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      table.waterService = { lastServedAt: Date.now() };
      saveTablesState();
      renderComandaMesa();
      updateWaterUI(activeTableId);
      showToast(`${table.name} reiniciada con éxito`, '🗑️');
    }
  });

  // --- 17. Generar y Enviar Comanda a WhatsApp ---
  btnSendComandaWa.addEventListener('click', () => {
    if (!targetWhatsAppNumber) {
      openWaModal();
      return;
    }

    const table = tablesData[activeTableId];
    const total = calculateTableTotal(table);
    const water = getWaterServiceStatus(table);

    // Armar mensaje formateado
    let msg = `🍷 *COMANDA · MARTINO WINES RESTAURANTE*\n`;
    msg += `⭐ _Guía MICHELIN Selection · Mayor Drummond, Mendoza_\n`;
    msg += `📍 *${table.name.toUpperCase()}* (${table.sector})\n`;
    msg += `🤵 *Mozo:* ${activeMozoName}\n`;
    msg += `🕒 *Hora:* ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} | 👥 *${table.comensales.length} Comensales*\n`;
    msg += `💧 *Servicio de Agua:* ${water.chipText} (${water.statusText})\n`;
    msg += `--------------------------------\n`;

    table.comensales.forEach((c, idx) => {
      const p = getComensalProgress(c);
      const conf = MENU_CATALOG.pasosConfig[c.tipoMenu] || MENU_CATALOG.pasosConfig['3pasos'];

      msg += `\n👤 *COMENSAL ${idx + 1}* _(${conf.tag})_ [${p.delivered}/${p.total} servidos]\n`;

      if (c.tipoMenu === '7pasos') {
        c.pasos7.forEach(paso => {
          const chk = paso.entregado ? '✅' : '⏳';
          let meatStr = '';
          if (paso.isMeat && paso.doneness) meatStr = ` [Punto: ${paso.doneness}]`;
          msg += `  ${chk} ${paso.name}${meatStr}\n`;
        });
      } else {
        // Entradas
        if (c.entradas && c.entradas.length > 0) {
          c.entradas.forEach((eItem, eIdx) => {
            const it = MENU_CATALOG.entradas.find(i => i.id === eItem.id);
            const chk = eItem.entregado ? '✅' : '⏳';
            const label = eIdx === 0 ? 'Entrada' : `Entrada Extra #${eIdx + 1}`;
            msg += `  ${chk} *${label}:* ${it ? it.name : 'Plato'}\n`;
          });
        }

        // Intermedio (si aplica 4 pasos)
        if (c.tipoMenu === '4pasos' && c.intermedios && c.intermedios.length > 0) {
          c.intermedios.forEach((iItem) => {
            const it = MENU_CATALOG.entradas.find(i => i.id === iItem.id);
            const chk = iItem.entregado ? '✅' : '⏳';
            msg += `  ${chk} *Intermedio:* ${it ? it.name : 'Plato'}\n`;
          });
        }

        // Principales
        if (c.principales && c.principales.length > 0) {
          c.principales.forEach((pItem, pIdx) => {
            const it = MENU_CATALOG.principales.find(i => i.id === pItem.id);
            const chk = pItem.entregado ? '✅' : '⏳';
            const label = pIdx === 0 ? 'Principal' : `Principal Extra #${pIdx + 1}`;
            let donenessStr = '';
            if (it && it.isMeat && pItem.doneness) donenessStr = ` [Punto: ${pItem.doneness}]`;
            msg += `  ${chk} *${label}:* ${it ? it.name : 'Plato'}${donenessStr}\n`;
          });
        }

        // Postres
        if (c.postres && c.postres.length > 0) {
          c.postres.forEach((dItem, dIdx) => {
            const it = MENU_CATALOG.postres.find(i => i.id === dItem.id);
            const chk = dItem.entregado ? '✅' : '⏳';
            const label = dIdx === 0 ? 'Postre' : `Postre Extra #${dIdx + 1}`;
            msg += `  ${chk} *${label}:* ${it ? it.name : 'Postre'}\n`;
          });
        }
      }

      // Maridaje
      if (c.maridaje === 'standard') {
        msg += `  ↳ *Maridaje:* Clásico Incluido\n`;
      } else if (c.maridaje === 'upgrade') {
        msg += `  ↳ *Maridaje:* ✨ Upgrade de Autor\n`;
      }

      // Anotaciones y tags
      let notesParts = [];
      if (c.tags && c.tags.length > 0) {
        notesParts.push(`[${c.tags.join(', ')}]`);
      }
      if (c.notas && c.notas.trim()) {
        notesParts.push(`"${c.notas.trim()}"`);
      }

      if (notesParts.length > 0) {
        msg += `  ⚠️ *Anotación:* ${notesParts.join(' ')}\n`;
      }
    });

    // Bebidas
    if (table.bebidas && table.bebidas.length > 0) {
      msg += `\n--------------------------------\n`;
      msg += `🍷 *BEBIDAS / VINOS MESA:*\n`;
      table.bebidas.forEach(b => {
        msg += `• ${b.qty}x ${b.name}\n`;
      });
    }

    msg += `--------------------------------\n`;
    msg += `💰 *TOTAL ESTIMADO:* $${total.toLocaleString('es-AR')}\n`;

    // Redirección directa al número de WhatsApp guardado
    const cleanNumber = targetWhatsAppNumber.replace(/\D/g, '');
    const encodedMsg = encodeURIComponent(msg);
    const waUrl = `https://wa.me/${cleanNumber}?text=${encodedMsg}`;

    window.open(waUrl, '_blank');
  });

  // --- 18. Configuración de WhatsApp Modal ---
  function openWaModal() {
    inputWaNumber.value = targetWhatsAppNumber;
    inputMozoName.value = activeMozoName;
    modalWaConfig.style.display = 'flex';
  }

  btnOpenWaConfig.addEventListener('click', openWaModal);
  btnCloseWaModal.addEventListener('click', () => modalWaConfig.style.display = 'none');
  btnCancelWaModal.addEventListener('click', () => modalWaConfig.style.display = 'none');

  btnPresetExamples.forEach(btn => {
    btn.addEventListener('click', () => {
      inputWaNumber.value = btn.getAttribute('data-val');
    });
  });

  btnSaveWaNumber.addEventListener('click', () => {
    const val = inputWaNumber.value.trim().replace(/\D/g, '');
    if (!val) {
      alert('Por favor ingresa un número de teléfono válido.');
      return;
    }

    targetWhatsAppNumber = val;
    localStorage.setItem('martino_wa_number', targetWhatsAppNumber);

    activeMozoName = inputMozoName.value.trim() || 'Máximo';
    localStorage.setItem('martino_mozo_name', activeMozoName);

    updateWaTargetDisplay();
    modalWaConfig.style.display = 'none';

    showToast(`WhatsApp ${targetWhatsAppNumber} guardado`, '📱');
  });

  // Inicializar mapa de mesas al cargar
  renderMapaMesas();
});
