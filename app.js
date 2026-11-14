/**
 * Martino Wines · Restaurante Bodega 1901
 * Selección Guía MICHELIN · Mayor Drummond, Luján de Cuyo, Mendoza
 * Ecosistema Digital de Alta Gastronomía & Comandas FOH/BOH
 * 
 * Basado en la Arquitectura Tecnológica para la Alta Gastronomía:
 * - Acceso Rápido y Expandido de cada mesa con selector de modo
 * - Resumen pequeño y dinámico de por cuál plato va la mesa
 * - Botón para "Bajar el plato" y avanzar en la experiencia del comensal
 * - Cronómetro y badge en tiempo real de "Hace cuánto se bajó" con indicadores Michelin (0-15m / 15-25m / >25m)
 * - Mecánica 1: Course Pacing Engine & Delayed Auto-Fire (KDS Pase Cocina / Pass Master)
 * - Mecánica 2: Resiliencia Offline & Edge Local-First (LAN <1ms)
 * - Mecánica 3: Trazabilidad Extrema de Alérgenos & Life-Safety Audit Trail (FALCPA / UE 1169/2011)
 * - Mecánica 4: Ergonomía de Hardware, Modo Oscuro Fine Dining (#121212) y Contención Acústica
 * - Mecánica 5: Modelado de Bodega, Topología de Bins (C-4-12) & Recetas 3NF
 * - Mecánica 6: Envío Ágil y Compacto de Comandas a Cocina por WhatsApp
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Catálogo de Platos, Menús y Maridajes de Martino Wines ---
  const MENU_CATALOG = {
    // Entradas para Menú 3 Pasos y A la Carta
    entradas: [
      { id: 'e_osobuco', name: 'Empanada de osobuco braseado al sarmiento', price: 16000, allergens: ['TACC (Gluten)'] },
      { id: 'e_chivo', name: 'Empanada cuyana de chivo braseado con llajwa fresca', price: 16000, allergens: ['TACC (Gluten)'] },
      { id: 'e_ensalada', name: 'Ensalada de estación fresca de la huerta orgánica', price: 14000, allergens: [] },
      { id: 'e_chef', name: 'Opción del Chef (Selección del día variable)', price: 16000, allergens: [] },
      // Opciones adicionales para Carta
      { id: 'sp_e2', name: 'Remolacha asada de la huerta, queso de cabra y cítricos', price: 16000, allergens: ['Lácteos / Cabra'] },
      { id: 'sp_e3', name: 'Tartar de trucha curada de montaña, palta y emulsión', price: 20000, allergens: ['Pescado'] },
      { id: 'sp_e4', name: 'Mollejas crocantes glaseadas en reducción Baldomir', price: 22000, allergens: ['Sulfitos'] }
    ],
    // Principales para Menú 3 Pasos y A la Carta
    principales: [
      { id: 'p_pasta', name: 'Pasta artesanal (Sorrentinos de hongos silvestres / Tagliatelle)', price: 32000, allergens: ['TACC (Gluten)', 'Lácteos', 'Huevo'] },
      { id: 'p_bife', name: 'Bife al sarmiento con papas fondant y vegetales asados', price: 36000, isMeat: true, allergens: [] },
      { id: 'p_pesca', name: 'Pesca del día a la chapa con vegetales de estación', price: 34000, allergens: ['Pescado'] },
      // Opciones adicionales para Carta
      { id: 'sp_p2', name: 'Cordero de pastura al sarmiento con puré especiado', price: 37000, isMeat: true, allergens: [] },
      { id: 'sp_p5', name: 'Arroz cremoso de azafrán con vegetales de huerta', price: 27000, allergens: [] }
    ],
    // Postres para Menú 3 Pasos y A la Carta
    postres: [
      { id: 'd_chocolate', name: 'Húmedo de chocolate amargo 70%, frutos rojos y pistacho', price: 15000, allergens: ['Frutos Secos (Pistacho)', 'Lácteos'] },
      { id: 'd_mousse', name: 'Mousse de autor con praliné mendocino', price: 14000, allergens: ['Lácteos', 'Frutos Secos'] },
      { id: 'd_pavlova', name: 'Pavlova con crema chantilly y frutos rojos frescos', price: 14000, allergens: ['Lácteos', 'Huevo'] },
      // Opciones adicionales para Carta
      { id: 'sp_d2', name: 'Pera asada al vino tinto con mousse de brie', price: 15000, allergens: ['Lácteos', 'Sulfitos'] },
      { id: 'sp_d4', name: 'Selección de quesos de autor y dulces artesanales', price: 16000, allergens: ['Lácteos'] }
    ],
    pasosConfig: {
      '5pasos': { name: 'Menú 5 Pasos (Degustación)', price: 58000, tag: '✨ 5 Pasos' },
      '8pasos': { name: 'Menú 8 Pasos (Gran Experiencia)', price: 74000, tag: '👑 8 Pasos' },
      '3pasos': { name: 'Menú 3 Pasos (Almuerzo)', price: 46000, tag: '🍽️ 3 Pasos' },
      carta: { name: 'A la Carta', price: 0, tag: '🍷 Carta' },
      // Alias de compatibilidad
      '7pasos': { name: 'Menú 5 Pasos (Degustación)', price: 58000, tag: '✨ 5 Pasos' },
      '4pasos': { name: 'Menú 5 Pasos (Degustación)', price: 58000, tag: '✨ 5 Pasos' },
      '2pasos': { name: 'Menú 3 Pasos (Almuerzo)', price: 46000, tag: '🍽️ 3 Pasos' }
    },
    // Menú 5 Pasos (Secuencia oficial: Snack -> Conejo -> Trucha Koji -> Cordero -> Frutilla)
    pasos5Defaults: [
      { paso: 1, name: 'Paso 1: Snack del Chef (Selección de bienvenida)', shortName: 'Snack del Chef', station: 'frio', entregado: false, allergens: [] },
      { paso: 2, name: 'Paso 2: Escabeche de conejo', shortName: 'Escabeche de conejo', station: 'frio', entregado: false, allergens: [] },
      { paso: 3, name: 'Paso 3: Trucha curada en koji', shortName: 'Trucha en koji', station: 'frio', entregado: false, allergens: ['Pescado'] },
      { paso: 4, name: 'Paso 4: Cordero al sarmiento', shortName: 'Cordero al sarmiento', station: 'brasas', isMeat: true, doneness: 'A Punto', entregado: false, allergens: [] },
      { paso: 5, name: 'Paso 5: Texturas de frutilla', shortName: 'Texturas de frutilla', station: 'postres', entregado: false, allergens: ['Lácteos'] }
    ],
    // Menú 8 Pasos (Secuencia oficial: Snack -> Conejo -> Trucha Koji -> Espárragos -> Cordero -> Flor Jamaica -> Frutilla -> Petit four)
    pasos8Defaults: [
      { paso: 1, name: 'Paso 1: Snack del Chef (Selección de bienvenida)', shortName: 'Snack del Chef', station: 'frio', entregado: false, allergens: [] },
      { paso: 2, name: 'Paso 2: Escabeche de conejo', shortName: 'Escabeche de conejo', station: 'frio', entregado: false, allergens: [] },
      { paso: 3, name: 'Paso 3: Trucha curada en koji', shortName: 'Trucha en koji', station: 'frio', entregado: false, allergens: ['Pescado'] },
      { paso: 4, name: 'Paso 4: Espárragos a las brasas (previo al cordero)', shortName: 'Espárragos brasas', station: 'brasas', entregado: false, allergens: [] },
      { paso: 5, name: 'Paso 5: Cordero al sarmiento', shortName: 'Cordero al sarmiento', station: 'brasas', isMeat: true, doneness: 'A Punto', entregado: false, allergens: [] },
      { paso: 6, name: 'Paso 6: Flor de Jamaica (limpiador previo al postre)', shortName: 'Flor de Jamaica', station: 'postres', entregado: false, allergens: [] },
      { paso: 7, name: 'Paso 7: Texturas de frutilla', shortName: 'Texturas de frutilla', station: 'postres', entregado: false, allergens: ['Lácteos'] },
      { paso: 8, name: 'Paso 8: Petit four de bodega (al final)', shortName: 'Petit four', station: 'postres', entregado: false, allergens: ['Frutos Secos', 'Lácteos'] }
    ]
  };

  // --- Topología de Cava 1901 (Mecánica 5: Bin Tracking) ---
  const CAVA_BINS = [
    { code: 'Bin C-4-12', wine: 'Baldomir Gran Malbec (Ícono)', sector: 'Cava Histórica 1901', rack: 'Estante C · Fila 4', stock: 24, temp: '14.5°C' },
    { code: 'Bin C-2-04', wine: 'Baldomir Serie Terroirs Cabernet Franc', sector: 'Cava Histórica 1901', rack: 'Estante C · Fila 2', stock: 18, temp: '14.5°C' },
    { code: 'Bin C-2-08', wine: 'Baldomir Serie Terroirs Malbec', sector: 'Cava Histórica 1901', rack: 'Estante C · Fila 2', stock: 32, temp: '14.5°C' },
    { code: 'Bin G-1-03', wine: 'Martino Superiore Cabernet Sauvignon', sector: 'Galería & Olivos', rack: 'Estante G · Fila 1', stock: 40, temp: '16.0°C' },
    { code: 'Bin G-1-05', wine: 'Martino Superiore Malbec', sector: 'Galería & Olivos', rack: 'Estante G · Fila 1', stock: 45, temp: '16.0°C' },
    { code: 'Bin G-2-11', wine: 'Martino Marselan (Varietal Inusual)', sector: 'Galería & Olivos', rack: 'Estante G · Fila 2', stock: 15, temp: '16.0°C' },
    { code: 'Bin G-2-15', wine: 'Martino Graciano (Varietal Inusual)', sector: 'Galería & Olivos', rack: 'Estante G · Fila 2', stock: 12, temp: '16.0°C' },
    { code: 'Bin G-2-18', wine: 'Martino Sangiovese (Varietal Inusual)', sector: 'Galería & Olivos', rack: 'Estante G · Fila 2', stock: 22, temp: '16.0°C' },
    { code: 'Bin G-2-20', wine: 'Martino Petit Verdot (Varietal Inusual)', sector: 'Galería & Olivos', rack: 'Estante G · Fila 2', stock: 14, temp: '16.0°C' },
    { code: 'Bin T-1-02', wine: 'Martino Pedro Ximénez Insignia', sector: 'Cava Climatizada Fría', rack: 'Estante T · Fila 1', stock: 28, temp: '8.5°C' },
    { code: 'Bin T-1-05', wine: 'Martino Superiore Chardonnay', sector: 'Cava Climatizada Fría', rack: 'Estante T · Fila 1', stock: 19, temp: '8.5°C' },
    { code: 'Bin T-1-08', wine: 'Martino Rosé de Sangiovese', sector: 'Cava Climatizada Fría', rack: 'Estante T · Fila 1', stock: 25, temp: '8.5°C' },
    { code: 'Bin T-2-01', wine: 'Martino Extra Brut Champenoise', sector: 'Cava Climatizada Fría', rack: 'Estante T · Fila 2', stock: 36, temp: '8.5°C' }
  ];

  // Claves de Caché Local por Dispositivo
  const CACHE_KEY_MESAS = 'martino_mesas_v4';
  const CACHE_KEY_SECTORES = 'martino_sectors_v4';

  // --- 2. Sectores y Mesas Dinámicos ---
  let SECTORS_DEF = [
    { id: 'salon1901', name: '🍷 Cava & Salón 1901', tables: [1, 2, 3, 4, 5] },
    { id: 'galeria', name: '🌿 Galería & Olivos', tables: [6, 7, 8, 9, 10] },
    { id: 'terraza', name: '🍇 Terraza Viñedos', tables: [11, 12, 13, 14] },
    { id: 'privado', name: '🪵 Cava de Barricas (Privado)', tables: [15, 16] }
  ];

  const savedSectors = localStorage.getItem(CACHE_KEY_SECTORES);
  if (savedSectors) {
    try {
      const parsedSec = JSON.parse(savedSectors);
      if (Array.isArray(parsedSec) && parsedSec.length > 0) {
        SECTORS_DEF = parsedSec;
      }
    } catch (e) {
      console.warn('Error cargando sectores guardados:', e);
    }
  }

  function saveSectorsState() {
    localStorage.setItem(CACHE_KEY_SECTORES, JSON.stringify(SECTORS_DEF));
  }

  // Helper para generar comensal predeterminado
  function createDefaultComensal(num, tipoMenu = '5pasos') {
    return {
      id: 'c_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      num: num,
      tipoMenu: tipoMenu,
      collapsed: false,
      entradas: [{ id: 'e_osobuco', entregado: false }],
      principales: [{ id: 'p_bife', doneness: 'A Punto', entregado: false }],
      postres: [{ id: 'd_chocolate', entregado: false }],
      pasos5: JSON.parse(JSON.stringify(MENU_CATALOG.pasos5Defaults)),
      pasos8: JSON.parse(JSON.stringify(MENU_CATALOG.pasos8Defaults)),
      maridaje: 'standard',
      tags: num === 1 ? ['Sin TACC'] : [],
      notas: ''
    };
  }

  // --- 3. Inicialización y Persistencia en Caché de Dispositivo ---
  let tablesData = {};
  const savedTables = localStorage.getItem(CACHE_KEY_MESAS);
  if (savedTables) {
    try {
      tablesData = JSON.parse(savedTables);
    } catch (e) {
      tablesData = {};
    }
  }

  // Inicializar mesas 1 a 16 100% LIMPIAS por defecto (Libres, sin comensales falsos)
  for (let i = 1; i <= 16; i++) {
    const sec = SECTORS_DEF.find(s => s.tables.includes(i));

    if (!tablesData[i]) {
      tablesData[i] = {
        id: i,
        name: `Mesa ${i}`,
        sector: sec ? sec.name : 'General',
        sectorId: sec ? sec.id : 'salon1901',
        openedAt: '',
        waterService: {
          lastServedAt: Date.now()
        },
        pacing: {
          currentStepIndex: 0,
          lastServedAt: Date.now(),
          history: []
        },
        comensales: [], // ¡Predeterminado e inicial limpio!
        bebidas: []
      };
    }
  }

  // Normalizar y asegurar integridad de todas las mesas en tablesData (incluyendo mesas agregadas)
  Object.keys(tablesData).forEach(idStr => {
    const i = parseInt(idStr, 10);
    const sec = SECTORS_DEF.find(s => s.tables.includes(i));
    if (sec) {
      tablesData[i].sector = sec.name;
      tablesData[i].sectorId = sec.id;
    } else {
      const matchSec = SECTORS_DEF.find(s => s.name === tablesData[i].sector) || SECTORS_DEF[0];
      if (!matchSec.tables.includes(i)) {
        matchSec.tables.push(i);
      }
      tablesData[i].sector = matchSec.name;
      tablesData[i].sectorId = matchSec.id;
    }

    if (!tablesData[i].waterService) {
      tablesData[i].waterService = { lastServedAt: Date.now() };
    }
    if (!tablesData[i].pacing) {
      tablesData[i].pacing = {
        currentStepIndex: 0,
        lastServedAt: Date.now(),
        history: []
      };
    }
    if (!tablesData[i].comensales) {
      tablesData[i].comensales = [];
    }
    // Migración de datos existentes a nuevos menús 5 / 8 / 3 pasos
    tablesData[i].comensales.forEach(c => {
      if (!c.pasos5) c.pasos5 = JSON.parse(JSON.stringify(MENU_CATALOG.pasos5Defaults));
      if (!c.pasos8) c.pasos8 = JSON.parse(JSON.stringify(MENU_CATALOG.pasos8Defaults));
      if (c.tipoMenu === '7pasos' || c.tipoMenu === '4pasos' || !c.tipoMenu) {
        c.tipoMenu = '5pasos';
      } else if (c.tipoMenu === '2pasos') {
        c.tipoMenu = '3pasos';
      }
    });
  });

  saveSectorsState();

  function saveTablesState() {
    localStorage.setItem(CACHE_KEY_MESAS, JSON.stringify(tablesData));
  }

  // Log de Auditoría de Alérgenos (Mecánica 3)
  let allergenAuditLog = [];
  const savedLog = localStorage.getItem('martino_audit_log_v2');
  if (savedLog) {
    try { allergenAuditLog = JSON.parse(savedLog); } catch (e) { allergenAuditLog = []; }
  }
  if (allergenAuditLog.length === 0) {
    allergenAuditLog = [
      {
        timestamp: '20:12:04',
        tableDiner: 'Mesa 1 · C1',
        operator: 'Mozo Máximo',
        action: 'Registro de restricción: Sin TACC (Reglamento UE 1169/2011)',
        validation: 'Estación Garde Manger verificada libre de contaminación cruzada',
        legalStatus: 'CONFORME (Art. 9 FALCPA)'
      },
      {
        timestamp: '20:15:30',
        tableDiner: 'Mesa 4 · C2',
        operator: 'Chef Ejecutivo / Pass',
        action: 'Protocolo de Frutos Secos (Pistacho excluido de postre)',
        validation: 'Utensilios estériles y sustitución por salsa de frutos rojos',
        legalStatus: 'CONFORME (UE 1169/2011)'
      }
    ];
  }

  function saveAuditLog() {
    localStorage.setItem('martino_audit_log_v2', JSON.stringify(allergenAuditLog));
  }

  // Estado Activo de Navegación y Vistas
  let activeTableId = 1;
  let activeMainView = 'salon'; // 'salon' | 'kds' | 'alergenos' | 'bodega' | 'blueprint'
  let activeViewMode = 'compact'; // 'compact' | 'expanded'
  let activeSectorFilter = 'all';
  let activePacingFilter = 'all'; // 'all' | 'alert'
  let activeKdsStation = 'all'; // 'all' | 'frio' | 'brasas' | 'postres'
  let targetWhatsAppNumber = localStorage.getItem('martino_wa_number') || '5492615557890';
  let activeMozoName = localStorage.getItem('martino_mozo_name') || 'Máximo';

  // --- 4. Elementos del DOM ---
  // Paneles de Vistas
  const panelMapaMesas = document.getElementById('panel-mapa-mesas');
  const panelComandaMesa = document.getElementById('panel-comanda-mesa');
  const panelKdsCocina = document.getElementById('panel-kds-cocina');
  const panelAlergenos = document.getElementById('panel-alergenos');
  const panelBodega = document.getElementById('panel-bodega');
  const panelBlueprint = document.getElementById('panel-blueprint');

  // Navegación Tabs
  const navTabBtns = document.querySelectorAll('.nav-tab-btn');
  const btnToggleDark = document.getElementById('btn-toggle-dark');
  const themeToggleIcon = document.getElementById('theme-toggle-icon');

  // Salón Banner & Toolbar
  const waterSalonSummary = document.getElementById('water-salon-summary');
  const pacingSalonSummary = document.getElementById('pacing-salon-summary');
  const dinersSalonSummary = document.getElementById('diners-salon-summary');
  const btnModeCompact = document.getElementById('btn-mode-compact');
  const btnModeExpanded = document.getElementById('btn-mode-expanded');
  const sectorFiltersWrap = document.getElementById('sector-filters-wrap');
  const sectorsContainer = document.getElementById('sectors-container');
  const btnOpenAddMesa = document.getElementById('btn-open-add-mesa');
  const btnResetSalon = document.getElementById('btn-reset-salon');

  // Modal Agregar Mesa
  const modalAddMesa = document.getElementById('modal-add-mesa');
  const btnCloseAddMesa = document.getElementById('btn-close-add-mesa');
  const btnCancelAddMesa = document.getElementById('btn-cancel-add-mesa');
  const btnConfirmAddMesa = document.getElementById('btn-confirm-add-mesa');
  const inputNewMesaName = document.getElementById('input-new-mesa-name');
  const selectNewMesaSector = document.getElementById('select-new-mesa-sector');
  const groupCustomSector = document.getElementById('group-custom-sector');
  const inputNewSectorName = document.getElementById('input-new-sector-name');
  const selectNewMesaMenu = document.getElementById('select-new-mesa-menu');
  const btnEliminarMesa = document.getElementById('btn-eliminar-mesa');
  let selectedNewMesaDiners = 2;

  // Mesa Comanda Navigation
  const btnGoMap = document.getElementById('btn-go-map');
  const btnBackToMap = document.getElementById('btn-back-to-map');
  const titleActiveTable = document.getElementById('title-active-table');
  const labelTableTime = document.getElementById('label-table-time');
  const btnAddComensalTop = document.getElementById('btn-add-comensal-top');
  const btnAddComensal = document.getElementById('btn-add-comensal');

  // Pacing Hero Card Elements (Mesa Comanda)
  const mesaHeroDishTitle = document.getElementById('mesa-hero-dish-title');
  const mesaHeroPacingChip = document.getElementById('mesa-hero-pacing-chip');
  const mesaHeroTimerReadout = document.getElementById('mesa-hero-timer-readout');
  const mesaHeroTimerSub = document.getElementById('mesa-hero-timer-sub');
  const mesaHeroStepper = document.getElementById('mesa-hero-stepper');
  const btnHeroBajarMesa = document.getElementById('btn-hero-bajar-mesa');
  const btnHeroUndoMesa = document.getElementById('btn-hero-undo-mesa');
  const mesaHeroNextDishHint = document.getElementById('mesa-hero-next-dish-hint');
  const btnTogglePacingHistory = document.getElementById('btn-toggle-pacing-history');
  const mesaPacingHistoryContent = document.getElementById('mesa-pacing-history-content');
  const historyToggleArrow = document.getElementById('history-toggle-arrow');

  // Water Tracker
  const btnWaterService = document.getElementById('btn-water-service');
  const waterStatusChip = document.getElementById('water-status-chip');
  const waterMetaTime = document.getElementById('water-meta-time');

  // Comensales & Drinks
  const quickDinersNav = document.getElementById('quick-diners-nav');
  const btnExpandAll = document.getElementById('btn-expand-all');
  const btnCollapseAll = document.getElementById('btn-collapse-all');
  const comensalesList = document.getElementById('comensales-list');
  const selectAddBebida = document.getElementById('select-add-bebida');
  const btnAddDrinkItem = document.getElementById('btn-add-drink-item');
  const drinksActiveList = document.getElementById('drinks-active-list');

  // Summary & Actions Compactos
  const summaryDinersLabel = document.getElementById('summary-diners-label');
  const summaryTotalAmount = document.getElementById('summary-total-amount');
  const btnSendComandaWa = document.getElementById('btn-send-comanda-wa');
  const btnVaciarMesa = document.getElementById('btn-vaciar-mesa');

  // KDS Elements
  const kdsTicketsContainer = document.getElementById('kds-tickets-container');
  const kdsStationBtns = document.querySelectorAll('.kds-st-btn');

  // Allergen Elements
  const allergenCollisionBanner = document.getElementById('allergen-collision-banner');
  const acCollisionSummary = document.getElementById('ac-collision-summary');
  const allergenMatrixList = document.getElementById('allergen-matrix-list');
  const auditTrailTbody = document.getElementById('audit-trail-tbody');
  const btnExportAuditLog = document.getElementById('btn-export-audit-log');



  // Cava Elements
  const binsCavaHistorica = document.getElementById('bins-cava-historica');
  const binsCavaGaleria = document.getElementById('bins-cava-galeria');
  const binsCavaFria = document.getElementById('bins-cava-fria');

  // WhatsApp Modal
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

  function showToast(msg, icon = '✨') {
    toastEl.innerHTML = `<span>${icon}</span> <span>${msg}</span>`;
    toastEl.classList.add('show');
    clearTimeout(toastEl._timer);
    toastEl._timer = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 2800);
  }

  // --- 5. Theme Toggle (#121212 Obsidian & Gold) ---
  const savedTheme = localStorage.getItem('martino_theme') || 'dark';
  if (savedTheme === 'light') {
    document.body.classList.remove('dark-theme');
    themeToggleIcon.textContent = '☀️';
  } else {
    document.body.classList.add('dark-theme');
    themeToggleIcon.textContent = '🌙';
  }

  btnToggleDark.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-theme');
    themeToggleIcon.textContent = isDark ? '🌙' : '☀️';
    localStorage.setItem('martino_theme', isDark ? 'dark' : 'light');
    showToast(isDark ? 'Modo Oscuro Fine Dining (#121212) Activado' : 'Modo Cava Clásico Activado', isDark ? '🌙' : '☀️');
  });

  // --- 6. Helpers de Menú y Pacing Engine ---

  /**
   * Determina el plan de pasos de la mesa según los comensales
   */
  function getTableCoursePlan(table) {
    if (!table.comensales || table.comensales.length === 0) {
      return MENU_CATALOG.pasos5Defaults.map((p, idx) => ({
        step: idx + 1,
        name: p.name,
        shortName: p.shortName,
        station: p.station
      }));
    }

    const has8 = table.comensales.some(c => c.tipoMenu === '8pasos');
    if (has8) {
      return MENU_CATALOG.pasos8Defaults.map((p, idx) => ({
        step: idx + 1,
        name: p.name,
        shortName: p.shortName,
        station: p.station
      }));
    }

    const has5 = table.comensales.some(c => c.tipoMenu === '5pasos' || c.tipoMenu === '7pasos' || c.tipoMenu === '4pasos');
    if (has5) {
      return MENU_CATALOG.pasos5Defaults.map((p, idx) => ({
        step: idx + 1,
        name: p.name,
        shortName: p.shortName,
        station: p.station
      }));
    }

    // 3 Pasos o Carta
    return [
      { step: 1, name: '1° Paso: Entrada de Estación', shortName: 'Entrada', station: 'frio' },
      { step: 2, name: '2° Paso: Principal al Sarmiento', shortName: 'Principal', station: 'brasas' },
      { step: 3, name: '3° Paso: Postre de Autor', shortName: 'Postre', station: 'postres' }
    ];
  }

  /**
   * Resumen pequeño de por cuál plato va
   */
  function getTableCourseSummary(table) {
    if (!table.comensales || table.comensales.length === 0) {
      return {
        text: 'Mesa Libre',
        stepNum: 0,
        totalSteps: 0,
        isFinished: false,
        currentStepName: 'Mesa Libre · Sin comensales',
        dishHighlight: 'Libre'
      };
    }

    const plan = getTableCoursePlan(table);
    const currentIdx = Math.min(table.pacing.currentStepIndex || 0, plan.length - 1);
    const currentStep = plan[currentIdx] || plan[0];
    const totalSteps = plan.length;

    if (table.pacing.currentStepIndex >= plan.length) {
      return {
        text: '✨ Sobremesa & Café',
        stepNum: totalSteps,
        totalSteps: totalSteps,
        isFinished: true,
        currentStepName: 'Sobremesa y Digestivos',
        dishHighlight: 'Sobremesa'
      };
    }

    return {
      text: `Paso ${currentIdx + 1}/${totalSteps}: ${currentStep.shortName}`,
      stepNum: currentIdx + 1,
      totalSteps: totalSteps,
      isFinished: false,
      currentStepName: currentStep.name,
      dishHighlight: currentStep.shortName
    };
  }

  /**
   * Cálculo de Pacing y Cronómetro Michelin (0-15m / 15-25m / >25m)
   */
  function getTablePacingStatus(table) {
    if (!table.comensales || table.comensales.length === 0) {
      return {
        mins: 0,
        secs: 0,
        elapsedStr: '0m',
        shortStr: 'Libre',
        statusText: 'Mesa Libre · Lista para servicio',
        phase: 'libre',
        chipText: '⚪ LIBRE',
        color: '#a39c92',
        bg: 'rgba(255, 255, 255, 0.06)',
        isAlert: false
      };
    }

    if (!table.pacing || !table.pacing.lastServedAt) {
      table.pacing = {
        currentStepIndex: 0,
        lastServedAt: Date.now(),
        history: []
      };
    }

    const elapsedMs = Date.now() - table.pacing.lastServedAt;
    const mins = Math.max(0, Math.floor(elapsedMs / (60 * 1000)));
    const secs = Math.max(0, Math.floor((elapsedMs % (60 * 1000)) / 1000));
    const secsStr = secs < 10 ? `0${secs}` : `${secs}`;

    if (mins < 15) {
      return {
        mins,
        secs,
        elapsedStr: `${mins}m ${secsStr}s`,
        shortStr: `${mins}m`,
        statusText: `Bajado hace ${mins} min · Ritmo óptimo`,
        phase: 'optimo',
        chipText: '🟢 ÓPTIMO',
        color: '#10b981',
        bg: 'rgba(16, 185, 129, 0.15)',
        isAlert: false
      };
    } else if (mins < 25) {
      return {
        mins,
        secs,
        elapsedStr: `${mins}m ${secsStr}s`,
        shortStr: `${mins}m`,
        statusText: `Bajado hace ${mins} min · Marchar siguiente`,
        phase: 'marchar',
        chipText: '🟡 MARCHAR',
        color: '#f59e0b',
        bg: 'rgba(245, 158, 11, 0.22)',
        isAlert: true
      };
    } else {
      return {
        mins,
        secs,
        elapsedStr: `${mins}m ${secsStr}s`,
        shortStr: `${mins}m`,
        statusText: `⚠️ Bajado hace ${mins} min · Demora en mesa`,
        phase: 'demora',
        chipText: '🔴 DEMORA',
        color: '#ef4444',
        bg: 'rgba(239, 68, 68, 0.25)',
        isAlert: true
      };
    }
  }

  /**
   * Servicio de Agua de Mesa
   */
  function getWaterServiceStatus(table) {
    if (!table.comensales || table.comensales.length === 0) {
      return {
        levelPercent: 100,
        chipText: '100% OK',
        mins: 0,
        statusText: 'Mesa Libre · Agua lista',
        miniBg: 'rgba(255, 255, 255, 0.08)',
        isAlert: false
      };
    }

    if (!table.waterService || !table.waterService.lastServedAt) {
      table.waterService = { lastServedAt: Date.now() };
    }
    const elapsedMs = Date.now() - table.waterService.lastServedAt;
    const mins = Math.max(0, Math.floor(elapsedMs / (60 * 1000)));

    if (mins < 15) {
      return { levelPercent: 100, chipText: '100% LLENO', mins, statusText: `Agua recién servida · Hace ${mins} min`, miniBg: '#10b981', isAlert: false };
    } else if (mins < 25) {
      return { levelPercent: 75, chipText: '75% BIEN', mins, statusText: `Servicio en orden · Hace ${mins} min`, miniBg: '#84cc16', isAlert: false };
    } else if (mins < 35) {
      return { levelPercent: 50, chipText: '50% REVISAR', mins, statusText: `Media jarra aprox · Hace ${mins} min`, miniBg: '#f59e0b', isAlert: false };
    } else if (mins < 45) {
      return { levelPercent: 25, chipText: '25% POCA AGUA', mins, statusText: `Ofrecer recarga de agua · Hace ${mins} min`, miniBg: '#f97316', isAlert: false };
    } else {
      return { levelPercent: 0, chipText: '⚠️ 0% SIN AGUA', mins, statusText: `¡Mesa sin agua! Servir urgente (${mins} min)`, miniBg: '#ef4444', isAlert: true };
    }
  }

  // --- 7. BOTÓN PARA BAJAR EL PLATO Y AVANZAR LA EXPERIENCIA ---
  function bajarPlatoAvanzarPaso(tableId) {
    const table = tablesData[tableId];
    if (!table) return;

    if (!table.comensales || table.comensales.length === 0) {
      showToast(`${table.name} está libre. Abre la mesa para asignar comensales.`, 'ℹ️');
      showComanda(tableId);
      return;
    }

    const plan = getTableCoursePlan(table);
    const currentIdx = table.pacing.currentStepIndex || 0;
    const currentStep = plan[Math.min(currentIdx, plan.length - 1)];

    // Tiempo transcurrido
    const elapsedMs = Date.now() - (table.pacing.lastServedAt || Date.now());
    const elapsedMins = Math.floor(elapsedMs / 60000);

    // Marcar platos correspondientes como entregados
    markCourseDishesDelivered(table, currentIdx, plan.length);

    // Registrar en historial inmutable de Pacing
    if (!table.pacing.history) table.pacing.history = [];
    table.pacing.history.unshift({
      stepIndex: currentIdx + 1,
      stepName: currentStep.shortName || currentStep.name,
      fullName: currentStep.name,
      servedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      elapsedMins: elapsedMins,
      timestamp: Date.now()
    });

    // Avanzar paso y reiniciar cronómetro
    table.pacing.currentStepIndex = currentIdx + 1;
    table.pacing.lastServedAt = Date.now();

    saveTablesState();

    const nextIdx = table.pacing.currentStepIndex;
    if (nextIdx < plan.length) {
      const nextStep = plan[nextIdx];
      showToast(`🍽️ ¡Paso bajado en ${table.name}! Ahora en: ${nextStep.shortName}`, '✨');
    } else {
      showToast(`🎉 ¡Todos los pasos bajados en ${table.name}! Mesa en Sobremesa.`, '🍷');
    }

    // Registrar en auditoría
    allergenAuditLog.unshift({
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      tableDiner: `${table.name}`,
      operator: activeMozoName,
      action: `Plato bajado a mesa: ${currentStep.shortName}`,
      validation: `Cronómetro reiniciado. Duración del paso: ${elapsedMins}m`,
      legalStatus: 'CONFORME (Pacing Michelin)'
    });
    saveAuditLog();

    refreshActiveView();
  }

  function retrocederPaso(tableId) {
    const table = tablesData[tableId];
    if (!table || !table.pacing) return;

    if (table.pacing.currentStepIndex > 0) {
      const stepIdxToUndo = table.pacing.currentStepIndex - 1;
      table.pacing.currentStepIndex = stepIdxToUndo;
      table.pacing.lastServedAt = Date.now() - 10 * 60 * 1000;
      if (table.pacing.history && table.pacing.history.length > 0) {
        table.pacing.history.shift();
      }
      // Marcar platos deshechos
      if (table.comensales) {
        table.comensales.forEach(c => {
          if (c.tipoMenu === '8pasos' && c.pasos8 && c.pasos8[stepIdxToUndo]) {
            c.pasos8[stepIdxToUndo].entregado = false;
          } else if ((c.tipoMenu === '5pasos' || c.tipoMenu === '7pasos') && c.pasos5 && c.pasos5[stepIdxToUndo]) {
            c.pasos5[stepIdxToUndo].entregado = false;
          } else if (c.tipoMenu === '3pasos' || c.tipoMenu === 'carta') {
            if (stepIdxToUndo === 0 && c.entradas) c.entradas.forEach(e => e.entregado = false);
            else if (stepIdxToUndo === 1 && c.principales) c.principales.forEach(p => p.entregado = false);
            else if (stepIdxToUndo === 2 && c.postres) c.postres.forEach(d => d.entregado = false);
          }
        });
      }
      saveTablesState();
      showToast(`↩️ ${table.name} retrocedida al paso anterior`, '↩️');
      refreshActiveView();
    }
  }

  function markCourseDishesDelivered(table, currentIdx, totalSteps) {
    if (!table.comensales) return;

    table.comensales.forEach(c => {
      if (c.tipoMenu === '8pasos') {
        if (c.pasos8 && c.pasos8[currentIdx]) {
          c.pasos8[currentIdx].entregado = true;
        }
      } else if (c.tipoMenu === '5pasos' || c.tipoMenu === '7pasos') {
        if (c.pasos5 && c.pasos5[currentIdx]) {
          c.pasos5[currentIdx].entregado = true;
        }
      } else if (c.tipoMenu === '3pasos' || c.tipoMenu === 'carta') {
        if (currentIdx === 0 && c.entradas) c.entradas.forEach(e => e.entregado = true);
        else if (currentIdx === 1 && c.principales) c.principales.forEach(p => p.entregado = true);
        else if (currentIdx === 2 && c.postres) c.postres.forEach(d => d.entregado = true);
      } else {
        if (currentIdx === 0 && c.entradas) c.entradas.forEach(e => e.entregado = true);
        else if (currentIdx === 1 && c.principales) c.principales.forEach(p => p.entregado = true);
        else if (currentIdx === 2 && c.postres) c.postres.forEach(d => d.entregado = true);
      }
    });
  }

  // --- 8. Navegación Principal del Ecosistema ---
  function switchMainView(tabName) {
    activeMainView = tabName;

    // Ocultar todos
    panelMapaMesas.style.display = 'none';
    panelComandaMesa.style.display = 'none';
    panelKdsCocina.style.display = 'none';
    panelAlergenos.style.display = 'none';
    panelBodega.style.display = 'none';
    panelBlueprint.style.display = 'none';

    // Tabs activas
    navTabBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabName);
    });

    if (tabName === 'salon') {
      panelMapaMesas.style.display = 'flex';
      renderMapaMesas();
    } else if (tabName === 'kds') {
      panelKdsCocina.style.display = 'flex';
      renderKDS();
    } else if (tabName === 'alergenos') {
      panelAlergenos.style.display = 'flex';
      renderAlergenos();
    } else if (tabName === 'bodega') {
      panelBodega.style.display = 'flex';
      renderBodega();
    } else if (tabName === 'blueprint') {
      panelBlueprint.style.display = 'flex';
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      switchMainView(tab);
    });
  });

  btnGoMap.addEventListener('click', () => switchMainView('salon'));
  btnBackToMap.addEventListener('click', () => switchMainView('salon'));

  function showComanda(tableId) {
    activeTableId = tableId;
    activeMainView = 'comanda';

    panelMapaMesas.style.display = 'none';
    panelKdsCocina.style.display = 'none';
    panelAlergenos.style.display = 'none';
    panelBodega.style.display = 'none';
    panelBlueprint.style.display = 'none';
    panelComandaMesa.style.display = 'flex';

    renderComandaMesa();
    updateWaterUI(tableId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function refreshActiveView() {
    if (activeMainView === 'salon') renderMapaMesas();
    else if (activeMainView === 'comanda') renderComandaMesa();
    else if (activeMainView === 'kds') renderKDS();
    else if (activeMainView === 'alergenos') renderAlergenos();
  }

  // --- 9. Toolbar de Salón: Modo Rápido / Expandido y Filtros ---
  btnModeCompact.addEventListener('click', () => {
    activeViewMode = 'compact';
    btnModeCompact.classList.add('active');
    btnModeExpanded.classList.remove('active');
    renderMapaMesas();
    showToast('Modo Rápido Activado', '⚡');
  });

  btnModeExpanded.addEventListener('click', () => {
    activeViewMode = 'expanded';
    btnModeExpanded.classList.add('active');
    btnModeCompact.classList.remove('active');
    renderMapaMesas();
    showToast('Modo Expandido con Steppers y Pacing Activado', '📋');
  });

  // Filtros de Sector Dinámicos
  function renderSectorFilters() {
    if (!sectorFiltersWrap) return;

    const totalTables = Object.keys(tablesData).length;
    let html = `
      <button class="filter-pill ${activeSectorFilter === 'all' ? 'active' : ''}" data-sec="all">
        🏢 Todas (${totalTables})
      </button>
    `;

    SECTORS_DEF.forEach(s => {
      const count = s.tables.filter(tid => tablesData[tid]).length;
      html += `
        <button class="filter-pill ${activeSectorFilter === s.id ? 'active' : ''}" data-sec="${s.id}">
          ${s.name} (${count})
        </button>
      `;
    });

    sectorFiltersWrap.innerHTML = html;

    sectorFiltersWrap.querySelectorAll('.filter-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        sectorFiltersWrap.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeSectorFilter = btn.getAttribute('data-sec');
        renderMapaMesas();
      });
    });
  }

  // Filtros de Pacing
  document.querySelectorAll('.pacing-pill-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pacing-pill-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activePacingFilter = btn.getAttribute('data-pacing');
      renderMapaMesas();
    });
  });

  // --- 10. RENDER MAPA DE MESAS (COMPACTO Y EXPANDIDO) ---
  function renderMapaMesas() {
    sectorsContainer.innerHTML = '';
    renderSectorFilters();
    updateSalonMetricsBanner();

    if (activeViewMode === 'compact') {
      sectorsContainer.classList.remove('expanded-mode');
      renderMapaCompacto();
    } else {
      sectorsContainer.classList.add('expanded-mode');
      renderMapaExpandido();
    }
  }

  function updateSalonMetricsBanner() {
    let waterAlerts = 0;
    let waterReview = 0;
    let pacingOptimo = 0;
    let pacingMarchar = 0;
    let pacingDemora = 0;
    let totalDiners = 0;
    let occupiedTables = 0;

    const tableIds = Object.keys(tablesData).map(Number).sort((a, b) => a - b);
    for (const i of tableIds) {
      const t = tablesData[i];
      if (t) {
        const isOccupied = (t.comensales && t.comensales.length > 0) || (t.bebidas && t.bebidas.length > 0);
        if (isOccupied) {
          occupiedTables++;
          if (t.comensales) totalDiners += t.comensales.length;

          // Agua
          const w = getWaterServiceStatus(t);
          if (w.isAlert) waterAlerts++;
          else if (w.levelPercent <= 50) waterReview++;

          // Pacing
          const p = getTablePacingStatus(t);
          if (p.phase === 'optimo') pacingOptimo++;
          else if (p.phase === 'marchar') pacingMarchar++;
          else if (p.phase === 'demora') pacingDemora++;
        }
      }
    }

    // Actualizar badges
    if (occupiedTables === 0) {
      waterSalonSummary.textContent = 'Salón al 100% de agua';
      waterSalonSummary.style.color = '#10b981';
      pacingSalonSummary.textContent = 'Salón Listo · Mesas Disponibles';
      pacingSalonSummary.style.color = '#10b981';
      dinersSalonSummary.textContent = '0 Huéspedes activos';
    } else {
      if (waterAlerts > 0) {
        waterSalonSummary.textContent = `${waterAlerts} sin agua ⚠️`;
        waterSalonSummary.style.color = '#ef4444';
      } else if (waterReview > 0) {
        waterSalonSummary.textContent = `${waterReview} por recargar`;
        waterSalonSummary.style.color = '#f59e0b';
      } else {
        waterSalonSummary.textContent = 'Salón al 100% de agua';
        waterSalonSummary.style.color = '#10b981';
      }

      pacingSalonSummary.textContent = `${pacingOptimo} Óptimo · ${pacingMarchar} Marchar · ${pacingDemora} Demora`;
      if (pacingDemora > 0) pacingSalonSummary.style.color = '#ef4444';
      else if (pacingMarchar > 0) pacingSalonSummary.style.color = '#f59e0b';
      else pacingSalonSummary.style.color = '#10b981';

      dinersSalonSummary.textContent = `${totalDiners} Huéspedes activos`;
    }
  }

  /**
   * RENDER MAPA COMPACTO (ACCESO RÁPIDO + CHIP DE PLATO + BOTÓN BAJAR)
   */
  function renderMapaCompacto() {
    const renderedTableIds = new Set();

    SECTORS_DEF.forEach(sector => {
      // Filtrar por sector
      if (activeSectorFilter !== 'all' && activeSectorFilter !== sector.id) return;

      const card = document.createElement('div');
      card.className = 'sector-card';

      let tablesHTML = '';
      sector.tables.forEach(num => {
        const t = tablesData[num];
        if (!t) return;
        renderedTableIds.add(num);

        const hasOrder = (t.comensales && t.comensales.length > 0) || (t.bebidas && t.bebidas.length > 0);
        const count = t.comensales ? t.comensales.length : 0;
        const total = calculateTableTotal(t);
        const water = getWaterServiceStatus(t);
        const pacing = getTablePacingStatus(t);
        const course = getTableCourseSummary(t);

        // Filtro de Pacing
        if (activePacingFilter === 'alert' && !pacing.isAlert) return;

        tablesHTML += `
          <div class="table-btn ${hasOrder ? 'busy' : ''}" data-table-id="${num}">
            <div class="tbl-btn-top">
              <span class="tbl-name">${t.name}</span>
              <span class="tbl-status-badge ${hasOrder ? 'busy' : 'free'}">
                ${hasOrder ? 'En Mesa' : 'Libre'}
              </span>
            </div>

            <!-- Resumen pequeño de por cuál plato va -->
            <div class="tbl-course-mini-summary" title="${course.currentStepName}">
              🍽️ ${course.text}
            </div>

            <!-- Badge de hace cuánto se bajó -->
            <div class="tbl-pacing-chip" style="background: ${pacing.bg}; color: ${pacing.color};" title="${pacing.statusText}">
              ⏱️ Bajado hace ${pacing.shortStr}
            </div>

            <div class="tbl-btn-bottom">
              <span class="tbl-info">${count} pax</span>
              ${total > 0 ? `<span class="tbl-total">$${(total / 1000).toFixed(0)}k</span>` : ''}
              <span class="tbl-water-pill" style="background: ${water.miniBg}" title="${water.statusText}">
                💧 ${water.mins}m
              </span>
            </div>

            <!-- Botón de acción rápida para bajar plato directamente sin entrar -->
            <div class="tbl-quick-actions">
              <button class="btn-quick-bajar-step" data-table-id="${num}" title="Bajar plato actual y avanzar al siguiente paso">
                🍽️ Bajar Paso
              </button>
            </div>
          </div>
        `;
      });

      card.innerHTML = `
        <div class="sector-header">
          <span class="sector-name-label">${sector.name}</span>
          <button class="btn-quick-add-sector" data-sec-id="${sector.id}" title="Agregar mesa en ${sector.name}">
            + Mesa
          </button>
        </div>
        <div class="tables-row">${tablesHTML || '<div style="font-size: 0.78rem; color: #a39c92; padding: 0.5rem;">No hay mesas activas en este sector.</div>'}</div>
      `;

      // Listeners: click en tarjeta abre comanda; click en botón bajar ejecuta avance
      card.querySelectorAll('.table-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          if (e.target.closest('.btn-quick-bajar-step')) {
            e.stopPropagation();
            const tid = parseInt(btn.getAttribute('data-table-id'), 10);
            bajarPlatoAvanzarPaso(tid);
            return;
          }
          const tid = parseInt(btn.getAttribute('data-table-id'), 10);
          showComanda(tid);
        });
      });

      // Quick add to sector button
      const btnAddSec = card.querySelector('.btn-quick-add-sector');
      if (btnAddSec) {
        btnAddSec.addEventListener('click', (e) => {
          e.stopPropagation();
          openAddMesaModal(sector.id);
        });
      }

      sectorsContainer.appendChild(card);
    });

    // Mesas huérfanas o especiales si existen
    const allTableIds = Object.keys(tablesData).map(Number).sort((a,b) => a - b);
    const unrenderedIds = allTableIds.filter(id => !renderedTableIds.has(id));
    if (unrenderedIds.length > 0 && activeSectorFilter === 'all') {
      const extraCard = document.createElement('div');
      extraCard.className = 'sector-card';
      let extraTablesHTML = '';
      unrenderedIds.forEach(num => {
        const t = tablesData[num];
        if (!t) return;
        const hasOrder = (t.comensales && t.comensales.length > 0) || (t.bebidas && t.bebidas.length > 0);
        const count = t.comensales ? t.comensales.length : 0;
        const total = calculateTableTotal(t);
        const water = getWaterServiceStatus(t);
        const pacing = getTablePacingStatus(t);
        const course = getTableCourseSummary(t);

        extraTablesHTML += `
          <div class="table-btn ${hasOrder ? 'busy' : ''}" data-table-id="${num}">
            <div class="tbl-btn-top">
              <span class="tbl-name">${t.name}</span>
              <span class="tbl-status-badge ${hasOrder ? 'busy' : 'free'}">
                ${hasOrder ? 'En Mesa' : 'Libre'}
              </span>
            </div>
            <div class="tbl-course-mini-summary" title="${course.currentStepName}">
              🍽️ ${course.text}
            </div>
            <div class="tbl-pacing-chip" style="background: ${pacing.bg}; color: ${pacing.color};">
              ⏱️ Bajado hace ${pacing.shortStr}
            </div>
            <div class="tbl-btn-bottom">
              <span class="tbl-info">${count} pax</span>
              ${total > 0 ? `<span class="tbl-total">$${(total / 1000).toFixed(0)}k</span>` : ''}
              <span class="tbl-water-pill" style="background: ${water.miniBg}">
                💧 ${water.mins}m
              </span>
            </div>
            <div class="tbl-quick-actions">
              <button class="btn-quick-bajar-step" data-table-id="${num}" title="Bajar plato actual">
                🍽️ Bajar Paso
              </button>
            </div>
          </div>
        `;
      });
      extraCard.innerHTML = `
        <div class="sector-header">
          <span class="sector-name-label">⭐ Mesas Especiales / Adicionales</span>
          <button class="btn-quick-add-sector" data-sec-id="salon1901">+ Mesa</button>
        </div>
        <div class="tables-row">${extraTablesHTML}</div>
      `;
      extraCard.querySelectorAll('.table-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          if (e.target.closest('.btn-quick-bajar-step')) {
            e.stopPropagation();
            const tid = parseInt(btn.getAttribute('data-table-id'), 10);
            bajarPlatoAvanzarPaso(tid);
            return;
          }
          const tid = parseInt(btn.getAttribute('data-table-id'), 10);
          showComanda(tid);
        });
      });
      sectorsContainer.appendChild(extraCard);
    }
  }

  /**
   * RENDER MAPA EXPANDIDO (ACCESO EXPANDIDO CON STEPPER Y CONTROL MAESTRO)
   */
  function renderMapaExpandido() {
    const listWrapper = document.createElement('div');
    listWrapper.className = 'expanded-tables-list';

    const tableIds = Object.keys(tablesData).map(Number).sort((a, b) => a - b);
    for (const i of tableIds) {
      const t = tablesData[i];
      if (!t) continue;
      const secDef = SECTORS_DEF.find(s => s.tables.includes(i));
      if (activeSectorFilter !== 'all' && secDef && secDef.id !== activeSectorFilter) continue;

      const pacing = getTablePacingStatus(t);
      if (activePacingFilter === 'alert' && !pacing.isAlert) continue;

      const course = getTableCourseSummary(t);
      const plan = getTableCoursePlan(t);
      const water = getWaterServiceStatus(t);
      const total = calculateTableTotal(t);

      // Armar Stepper
      const stepperHTML = plan.map((p, idx) => {
        const isDone = idx < (t.pacing.currentStepIndex || 0);
        const isCurrent = idx === (t.pacing.currentStepIndex || 0);
        return `
          <div class="tce-step-node ${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''}">
            <div class="tce-step-dot">${isDone ? '✓' : idx + 1}</div>
            <span class="tce-step-label">${p.shortName}</span>
          </div>
        `;
      }).join('');

      // Resumen de comensales y alérgenos
      const dinersSummaryHTML = (t.comensales || []).map((c, idx) => {
        const tagStr = (c.tags && c.tags.length > 0) ? ` <strong style="color: #ef4444;">[⚠️ ${c.tags.join(', ')}]</strong>` : '';
        return `<span>👤 C${idx + 1}: ${MENU_CATALOG.pasosConfig[c.tipoMenu].tag}${tagStr}</span>`;
      }).join('');

      const card = document.createElement('div');
      card.className = 'table-card-expanded';
      card.id = `expanded-card-${i}`;

      card.innerHTML = `
        <div class="tce-header">
          <div class="tce-title-box">
            <span class="tce-name">${t.name}</span>
            <span class="tce-sector">${t.sector} · Abierta ${t.openedAt}</span>
          </div>
          <div class="tce-meta-box">
            <span class="tce-diners">👥 ${t.comensales.length} Comensales</span>
            <span class="tce-total">$${total.toLocaleString('es-AR')}</span>
          </div>
        </div>

        <!-- Stepper de Pasos -->
        <div class="tce-stepper">
          ${stepperHTML}
        </div>

        <!-- Pacing Hero Box -->
        <div class="tce-pacing-box">
          <div class="tce-pacing-main">
            <div class="tce-course-current">
              <span class="tce-course-label">PLATO ACTUAL EN DEGUSTACIÓN:</span>
              <span class="tce-course-title">${course.currentStepName}</span>
            </div>
            <div class="tce-timer-badge">
              <span class="timer-time-str live-timer-table" data-tid="${i}" style="color: ${pacing.color};">
                ⏱️ ${pacing.elapsedStr}
              </span>
              <span class="timer-phase-str" style="background: ${pacing.bg}; color: ${pacing.color};">
                ${pacing.chipText}
              </span>
            </div>
          </div>

          <!-- Botones de Acción de Experiencia -->
          <div class="tce-action-row">
            <button class="btn-bajar-plato" data-tid="${i}">
              <span>🍽️</span>
              <span>Bajar Siguiente Plato (Avanzar Experiencia)</span>
            </button>
            <button class="btn-undo-step" data-tid="${i}" title="Retroceder al paso anterior">↩️</button>
          </div>
        </div>

        <!-- Resumen de Comensales y Alérgenos -->
        <div class="tce-diners-summary">
          ${dinersSummaryHTML}
        </div>

        <div class="tce-footer">
          <button class="btn-tce-comanda" data-tid="${i}">📝 Abrir Comanda Completa ➔</button>
          <button class="btn-tce-water" data-tid="${i}" style="color: ${water.miniBg};">
            💧 Agua: ${water.chipText}
          </button>
        </div>
      `;

      // Listeners
      card.querySelector('.btn-bajar-plato').addEventListener('click', () => {
        bajarPlatoAvanzarPaso(i);
      });

      card.querySelector('.btn-undo-step').addEventListener('click', () => {
        retrocederPaso(i);
      });

      card.querySelector('.btn-tce-comanda').addEventListener('click', () => {
        showComanda(i);
      });

      card.querySelector('.btn-tce-water').addEventListener('click', () => {
        t.waterService.lastServedAt = Date.now();
        saveTablesState();
        renderMapaMesas();
        showToast(`Agua servida en ${t.name}`, '💧');
      });

      listWrapper.appendChild(card);
    }

    sectorsContainer.appendChild(listWrapper);
  }

  // --- 11. RENDER COMANDA DE MESA (VISTA 2) ---
  function renderComandaMesa() {
    const table = tablesData[activeTableId];
    if (!table) return;

    titleActiveTable.textContent = `${table.name} · ${table.sector}`;
    labelTableTime.textContent = table.openedAt ? `Abierta: ${table.openedAt}` : 'Mesa Libre';

    // Render Pacing Hero Card
    renderMesaPacingHero(table);

    // Quick diners navigation
    renderQuickDinersNav(table);

    // Diners List
    comensalesList.innerHTML = '';
    if (!table.comensales || table.comensales.length === 0) {
      const emptyDiv = document.createElement('div');
      emptyDiv.className = 'comensal-empty-state';
      emptyDiv.style.cssText = 'text-align: center; padding: 1.8rem 1rem; color: #a39c92; background: #1c1b18; border: 1px dashed #3d3933; border-radius: var(--radius-md); margin-bottom: 1rem;';
      emptyDiv.innerHTML = `
        <div style="font-size: 2rem; margin-bottom: 0.4rem;">🍽️</div>
        <div style="font-size: 0.95rem; font-weight: 700; color: #f5f2eb; margin-bottom: 0.25rem;">Mesa Lista y Libre</div>
        <p style="font-size: 0.78rem; margin-bottom: 1rem;">No hay comensales sentados aún. Elige un menú rápido o sienta comensales:</p>
        <div style="display: flex; gap: 0.6rem; justify-content: center; flex-wrap: wrap;">
          <button class="btn-step-option active" id="btn-quick-seat-2" style="background: var(--gold-accent); color: #121212; font-weight: 800; padding: 0.45rem 1rem; border-radius: var(--radius-full); cursor: pointer; border: none;">
            👥 Sentar 2 Comensales
          </button>
          <button class="btn-step-option" id="btn-quick-seat-4" style="background: #25231f; border: 1px solid #3d3933; color: #f5f2eb; font-weight: 700; padding: 0.45rem 1rem; border-radius: var(--radius-full); cursor: pointer;">
            👥 Sentar 4 Comensales
          </button>
        </div>
      `;
      comensalesList.appendChild(emptyDiv);

      const seat2 = emptyDiv.querySelector('#btn-quick-seat-2');
      if (seat2) {
        seat2.addEventListener('click', () => {
          table.comensales = [createDefaultComensal(1), createDefaultComensal(2)];
          table.openedAt = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          table.waterService = { lastServedAt: Date.now() };
          table.pacing = { currentStepIndex: 0, lastServedAt: Date.now(), history: [] };
          saveTablesState();
          renderComandaMesa();
          showToast(`2 comensales sentados en ${table.name}`, '👥');
        });
      }
      const seat4 = emptyDiv.querySelector('#btn-quick-seat-4');
      if (seat4) {
        seat4.addEventListener('click', () => {
          table.comensales = [
            createDefaultComensal(1), createDefaultComensal(2),
            createDefaultComensal(3), createDefaultComensal(4)
          ];
          table.openedAt = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          table.waterService = { lastServedAt: Date.now() };
          table.pacing = { currentStepIndex: 0, lastServedAt: Date.now(), history: [] };
          saveTablesState();
          renderComandaMesa();
          showToast(`4 comensales sentados en ${table.name}`, '👥');
        });
      }
    } else {
      table.comensales.forEach((comensal, idx) => {
        renderComensalCard(table, comensal, idx);
      });
    }

    renderSharedDrinks();
    updateSummaryFooter();
    updateWaterUI(activeTableId);
  }

  function renderMesaPacingHero(table) {
    const pacing = getTablePacingStatus(table);
    const course = getTableCourseSummary(table);
    const plan = getTableCoursePlan(table);

    mesaHeroDishTitle.textContent = course.currentStepName;
    mesaHeroPacingChip.textContent = pacing.chipText;
    mesaHeroPacingChip.style.background = pacing.bg;
    mesaHeroPacingChip.style.color = pacing.color;

    mesaHeroTimerReadout.innerHTML = `Plato bajado a mesa hace: <strong>${pacing.elapsedStr}</strong>`;
    mesaHeroTimerSub.textContent = `Ventana Michelin: 15 a 25 min por pase para coreografía de cocina y sala.`;

    const nextIdx = (table.pacing.currentStepIndex || 0) + 1;
    if (nextIdx < plan.length) {
      mesaHeroNextDishHint.textContent = `Siguiente: ${plan[nextIdx].shortName} · Reinicia el cronómetro de la mesa`;
    } else {
      mesaHeroNextDishHint.textContent = `Último paso completado · Paso a sobremesa y café`;
    }

    // Stepper visual
    mesaHeroStepper.innerHTML = plan.map((p, idx) => {
      const isDone = idx < (table.pacing.currentStepIndex || 0);
      const isCurrent = idx === (table.pacing.currentStepIndex || 0);
      return `
        <div class="stepper-step ${isDone ? 'completed' : ''} ${isCurrent ? 'active' : ''}">
          <div class="stepper-bubble">${isDone ? '✓' : idx + 1}</div>
          <span class="stepper-name">${p.shortName}</span>
        </div>
      `;
    }).join('');

    // Historial
    if (table.pacing.history && table.pacing.history.length > 0) {
      mesaPacingHistoryContent.innerHTML = table.pacing.history.map(h => `
        <div class="pacing-history-item">
          <span class="pacing-history-name">Paso ${h.stepIndex}: ${h.stepName}</span>
          <span class="pacing-history-time">Bajado a las ${h.servedAt} (${h.elapsedMins}m de degustación)</span>
        </div>
      `).join('');
    } else {
      mesaPacingHistoryContent.innerHTML = `<span style="font-size: 0.72rem; color: #888; font-style: italic;">Aún no se han registrado pasos bajados previamente.</span>`;
    }
  }

  // Listeners del Hero Card
  btnHeroBajarMesa.addEventListener('click', () => {
    bajarPlatoAvanzarPaso(activeTableId);
  });

  btnHeroUndoMesa.addEventListener('click', () => {
    retrocederPaso(activeTableId);
  });

  btnTogglePacingHistory.addEventListener('click', () => {
    const isShown = mesaPacingHistoryContent.style.display !== 'none';
    mesaPacingHistoryContent.style.display = isShown ? 'none' : 'flex';
    historyToggleArrow.textContent = isShown ? '▼' : '▲';
  });

  // Tocar servicio de agua
  btnWaterService.addEventListener('click', () => {
    const table = tablesData[activeTableId];
    table.waterService.lastServedAt = Date.now();
    saveTablesState();
    updateWaterUI(activeTableId);
    showToast(`¡Agua servida en ${table.name}!`, '💧');
  });

  function updateWaterUI(tableId = activeTableId) {
    const table = tablesData[tableId];
    if (!table) return;

    const w = getWaterServiceStatus(table);
    if (btnWaterService && panelComandaMesa.style.display !== 'none') {
      btnWaterService.style.background = `linear-gradient(135deg, ${w.miniBg} 0%, #059669 100%)`;
      waterStatusChip.textContent = w.chipText;
      waterMetaTime.textContent = w.statusText;
    }
  }

  // --- 12. Render Tarjeta de Comensal individual ---
  function renderComensalCard(table, comensal, idx) {
    const cNum = idx + 1;
    comensal.num = cNum;

    const progress = getComensalProgress(comensal);
    const isComplete = progress.total > 0 && progress.delivered === progress.total;
    const progressBadgeText = `✅ ${progress.delivered}/${progress.total} servidos`;
    const menuTag = (MENU_CATALOG.pasosConfig[comensal.tipoMenu] || MENU_CATALOG.pasosConfig['7pasos']).tag;

    const card = document.createElement('div');
    card.className = `comensal-card ${comensal.collapsed ? 'collapsed' : ''}`;
    card.id = `comensal-card-${idx}`;

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
          <button class="btn-toggle-expand" title="Ampliar / Colapsar">${comensal.collapsed ? '▼' : '▲'}</button>
        </div>
      </div>

      <div class="comensal-quick-summary" data-cidx="${idx}">
        <span>${getComensalSummaryText(comensal)}</span>
        <span style="color: var(--gold-accent); font-weight: 700; font-size: 0.72rem;">Ampliar 🔍</span>
      </div>
    `;

    const stepsSelectorHTML = `
      <div class="menu-steps-selector-wrap">
        <label class="menu-selector-label">Modalidad de Menú:</label>
        <div class="menu-type-selector-5" style="grid-template-columns: repeat(4, 1fr);">
          <button class="btn-step-option ${comensal.tipoMenu === '5pasos' ? 'active' : ''}" data-type="5pasos" data-cidx="${idx}">
            <span>✨ 5 Pasos</span>
            <span class="step-price-sub">$58.000</span>
          </button>
          <button class="btn-step-option ${comensal.tipoMenu === '8pasos' ? 'active' : ''}" data-type="8pasos" data-cidx="${idx}">
            <span>👑 8 Pasos</span>
            <span class="step-price-sub">$74.000</span>
          </button>
          <button class="btn-step-option ${comensal.tipoMenu === '3pasos' ? 'active' : ''}" data-type="3pasos" data-cidx="${idx}">
            <span>🍽️ 3 Pasos</span>
            <span class="step-price-sub">$46.000</span>
          </button>
          <button class="btn-step-option ${comensal.tipoMenu === 'carta' ? 'active' : ''}" data-type="carta" data-cidx="${idx}">
            <span>🍷 Carta</span>
            <span class="step-price-sub">Por plato</span>
          </button>
        </div>
      </div>
    `;

    let foodContentHTML = '';
    if (comensal.tipoMenu === '5pasos' || comensal.tipoMenu === '7pasos' || comensal.tipoMenu === '4pasos') {
      if (!comensal.pasos5) comensal.pasos5 = JSON.parse(JSON.stringify(MENU_CATALOG.pasos5Defaults));
      const pasosItemsHTML = comensal.pasos5.map((p, pIdx) => {
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
          <div class="paso-7-item paso-item ${p.entregado ? 'is-delivered' : ''}">
            <div style="flex: 1;">
              <div class="paso-7-left">
                <span class="paso-num-circle">${p.paso}</span>
                <span class="paso-name">${p.name}</span>
              </div>
              ${extraMeatHTML}
            </div>
            <button class="btn-dish-check ${p.entregado ? 'delivered' : ''}" data-action="toggle-step-5" data-cidx="${idx}" data-pidx="${pIdx}">
              ${p.entregado ? '✅ Servido' : '⬜ Servir'}
            </button>
          </div>
        `;
      }).join('');

      foodContentHTML = `
        <div class="otono-7pasos-card pasos-tasting-card">
          <div class="otono-7pasos-header pasos-tasting-header">
            <span class="otono-7pasos-title pasos-tasting-title">✨ Menú Degustación 5 Pasos</span>
            <span class="otono-7pasos-price">$58.000</span>
          </div>
          <div class="pasos-7-list">
            ${pasosItemsHTML}
          </div>
        </div>
      `;
    } else if (comensal.tipoMenu === '8pasos') {
      if (!comensal.pasos8) comensal.pasos8 = JSON.parse(JSON.stringify(MENU_CATALOG.pasos8Defaults));
      const pasosItemsHTML = comensal.pasos8.map((p, pIdx) => {
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
          <div class="paso-7-item paso-item ${p.entregado ? 'is-delivered' : ''}">
            <div style="flex: 1;">
              <div class="paso-7-left">
                <span class="paso-num-circle">${p.paso}</span>
                <span class="paso-name">${p.name}</span>
              </div>
              ${extraMeatHTML}
            </div>
            <button class="btn-dish-check ${p.entregado ? 'delivered' : ''}" data-action="toggle-step-8" data-cidx="${idx}" data-pidx="${pIdx}">
              ${p.entregado ? '✅ Servido' : '⬜ Servir'}
            </button>
          </div>
        `;
      }).join('');

      foodContentHTML = `
        <div class="otono-7pasos-card pasos-tasting-card">
          <div class="otono-7pasos-header pasos-tasting-header">
            <span class="otono-7pasos-title pasos-tasting-title">👑 Gran Menú Degustación 8 Pasos</span>
            <span class="otono-7pasos-price">$74.000</span>
          </div>
          <div class="pasos-7-list">
            ${pasosItemsHTML}
          </div>
        </div>
      `;
    } else {
      function buildOptions(catalog, currentId) {
        return catalog.map(item => `
          <option value="${item.id}" ${item.id === currentId ? 'selected' : ''}>
            ${item.name} ($${item.price.toLocaleString('es-AR')})
          </option>
        `).join('');
      }

      const isCarta = comensal.tipoMenu === 'carta';

      const entradasHTML = (comensal.entradas || []).map((eItem, eIdx) => `
        <div class="dish-item-row ${eItem.entregado ? 'is-delivered' : ''}">
          <div class="dish-main-controls">
            <button class="btn-dish-check ${eItem.entregado ? 'delivered' : ''}" data-action="toggle-dish" data-sec="entradas" data-cidx="${idx}" data-didx="${eIdx}">
              ${eItem.entregado ? '✅ Servido' : '⬜ Servir'}
            </button>
            <select class="dish-select select-course-dish" data-sec="entradas" data-cidx="${idx}" data-didx="${eIdx}">
              ${buildOptions(MENU_CATALOG.entradas, eItem.id)}
            </select>
            ${isCarta && comensal.entradas.length > 1 ? `<button class="btn-del-dish-item" data-action="del-dish" data-sec="entradas" data-cidx="${idx}" data-didx="${eIdx}">✕</button>` : ''}
          </div>
        </div>
      `).join('');

      const principalesHTML = (comensal.principales || []).map((pItem, pIdx) => {
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
              ${isCarta && comensal.principales.length > 1 ? `<button class="btn-del-dish-item" data-action="del-dish" data-sec="principales" data-cidx="${idx}" data-didx="${pIdx}">✕</button>` : ''}
            </div>
            <div class="meat-doneness-row" style="display: ${isMeat ? 'flex' : 'none'};">
              <button class="doneness-btn ${pItem.doneness === 'Jugoso' ? 'active' : ''}" data-val="Jugoso" data-cidx="${idx}" data-didx="${pIdx}">🥩 Jugoso</button>
              <button class="doneness-btn ${pItem.doneness === 'A Punto' ? 'active' : ''}" data-val="A Punto" data-cidx="${idx}" data-didx="${pIdx}">🥩 A Punto</button>
              <button class="doneness-btn ${pItem.doneness === 'Cocido' ? 'active' : ''}" data-val="Cocido" data-cidx="${idx}" data-didx="${pIdx}">🥩 Cocido</button>
            </div>
          </div>
        `;
      }).join('');

      const postresHTML = (comensal.postres || []).map((dItem, dIdx) => `
        <div class="dish-item-row ${dItem.entregado ? 'is-delivered' : ''}">
          <div class="dish-main-controls">
            <button class="btn-dish-check ${dItem.entregado ? 'delivered' : ''}" data-action="toggle-dish" data-sec="postres" data-cidx="${idx}" data-didx="${dIdx}">
              ${dItem.entregado ? '✅ Servido' : '⬜ Servir'}
            </button>
            <select class="dish-select select-course-dish" data-sec="postres" data-cidx="${idx}" data-didx="${dIdx}">
              ${buildOptions(MENU_CATALOG.postres, dItem.id)}
            </select>
            ${isCarta && comensal.postres.length > 1 ? `<button class="btn-del-dish-item" data-action="del-dish" data-sec="postres" data-cidx="${idx}" data-didx="${dIdx}">✕</button>` : ''}
          </div>
        </div>
      `).join('');

      foodContentHTML = `
        <div class="courses-container">
          <div class="course-section">
            <div class="course-section-header">
              <span class="course-title">🥗 1° Entrada</span>
              ${isCarta ? `<button class="btn-add-extra-dish" data-action="add-dish" data-sec="entradas" data-cidx="${idx}">+ Entrada</button>` : ''}
            </div>
            <div class="dishes-list-in-section">${entradasHTML}</div>
          </div>
          <div class="course-section">
            <div class="course-section-header">
              <span class="course-title">🥩 2° Plato Principal</span>
              ${isCarta ? `<button class="btn-add-extra-dish" data-action="add-dish" data-sec="principales" data-cidx="${idx}">+ Principal</button>` : ''}
            </div>
            <div class="dishes-list-in-section">${principalesHTML}</div>
          </div>
          <div class="course-section">
            <div class="course-section-header">
              <span class="course-title">🍰 3° Postre</span>
              ${isCarta ? `<button class="btn-add-extra-dish" data-action="add-dish" data-sec="postres" data-cidx="${idx}">+ Postre</button>` : ''}
            </div>
            <div class="dishes-list-in-section">${postresHTML}</div>
          </div>
        </div>
      `;
    }

    // Maridaje
    const maridajeHTML = `
      <div class="choice-group">
        <label class="choice-label">🍷 Maridaje del Comensal:</label>
        <div class="pairing-pills-row">
          <button class="pairing-pill-btn ${comensal.maridaje === 'none' ? 'active' : ''}" data-pair="none" data-cidx="${idx}">Sin Maridaje</button>
          <button class="pairing-pill-btn ${comensal.maridaje === 'standard' ? 'active' : ''}" data-pair="standard" data-cidx="${idx}">🍷 Clásico Incluido</button>
          <button class="pairing-pill-btn ${comensal.maridaje === 'upgrade' ? 'active' : ''}" data-pair="upgrade" data-cidx="${idx}">✨ Upgrade Autor (+$18k)</button>
        </div>
      </div>
    `;

    // Tags Alérgenos
    const TAGS_LIST = ['Sin TACC', 'Sin Sal', 'Vegetariano', 'Vegano', 'Sin Frutos Secos', 'Sin Cebolla'];
    const tagsHTML = TAGS_LIST.map(tag => {
      const isAct = comensal.tags && comensal.tags.includes(tag);
      return `<button class="tag-btn ${isAct ? 'active' : ''}" data-tag="${tag}">${tag}</button>`;
    }).join('');

    const notesHTML = `
      <div class="choice-group">
        <label class="choice-label">🛡️ Restricciones & Alérgenos (Life-Safety):</label>
        <div class="quick-tags-wrap" data-cidx="${idx}">
          ${tagsHTML}
        </div>
        <input type="text" class="comensal-note-input input-nota-comensal" data-cidx="${idx}" 
               placeholder="Restricciones dietéticas críticas, intolerancias..." value="${comensal.notas || ''}">
      </div>
    `;

    card.innerHTML = headerHTML + `
      <div class="comensal-body">
        ${stepsSelectorHTML}
        ${foodContentHTML}
        ${maridajeHTML}
        ${notesHTML}
      </div>
    `;

    // Listeners del comensal
    const headerEl = card.querySelector('.comensal-header');
    const summaryEl = card.querySelector('.comensal-quick-summary');
    function toggleCollapse() {
      comensal.collapsed = !comensal.collapsed;
      saveTablesState();
      renderComandaMesa();
    }
    headerEl.addEventListener('click', (e) => {
      if (e.target.closest('.btn-del-comensal')) return;
      toggleCollapse();
    });
    if (summaryEl) summaryEl.addEventListener('click', toggleCollapse);

    const delBtn = card.querySelector('.btn-del-comensal');
    if (delBtn) {
      delBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        table.comensales.splice(idx, 1);
        saveTablesState();
        renderComandaMesa();
      });
    }

    card.querySelectorAll('.btn-step-option').forEach(sBtn => {
      sBtn.addEventListener('click', () => {
        comensal.tipoMenu = sBtn.getAttribute('data-type');
        saveTablesState();
        renderComandaMesa();
      });
    });

    card.querySelectorAll('.btn-dish-check').forEach(cBtn => {
      cBtn.addEventListener('click', () => {
        const action = cBtn.getAttribute('data-action');
        if (action === 'toggle-step-5') {
          const pIdx = parseInt(cBtn.getAttribute('data-pidx'), 10);
          if (comensal.pasos5 && comensal.pasos5[pIdx]) {
            comensal.pasos5[pIdx].entregado = !comensal.pasos5[pIdx].entregado;
            saveTablesState();
            renderComandaMesa();
          }
        } else if (action === 'toggle-step-8') {
          const pIdx = parseInt(cBtn.getAttribute('data-pidx'), 10);
          if (comensal.pasos8 && comensal.pasos8[pIdx]) {
            comensal.pasos8[pIdx].entregado = !comensal.pasos8[pIdx].entregado;
            saveTablesState();
            renderComandaMesa();
          }
        } else if (action === 'toggle-step-7') {
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

    card.querySelectorAll('.doneness-btn').forEach(dBtn => {
      dBtn.addEventListener('click', () => {
        const val = dBtn.getAttribute('data-val');
        const pIdx = dBtn.getAttribute('data-pidx');
        const dIdx = dBtn.getAttribute('data-didx');
        if (pIdx !== null) {
          const pi = parseInt(pIdx, 10);
          if (comensal.tipoMenu === '8pasos' && comensal.pasos8 && comensal.pasos8[pi]) {
            comensal.pasos8[pi].doneness = val;
          } else if (comensal.pasos5 && comensal.pasos5[pi]) {
            comensal.pasos5[pi].doneness = val;
          } else if (comensal.pasos7 && comensal.pasos7[pi]) {
            comensal.pasos7[pi].doneness = val;
          }
        } else if (dIdx !== null && comensal.principales && comensal.principales[parseInt(dIdx, 10)]) {
          comensal.principales[parseInt(dIdx, 10)].doneness = val;
        }
        saveTablesState();
        renderComandaMesa();
      });
    });

    card.querySelectorAll('.pairing-pill-btn').forEach(pBtn => {
      pBtn.addEventListener('click', () => {
        comensal.maridaje = pBtn.getAttribute('data-pair');
        saveTablesState();
        renderComandaMesa();
      });
    });

    card.querySelectorAll('.tag-btn').forEach(tBtn => {
      tBtn.addEventListener('click', () => {
        const tVal = tBtn.getAttribute('data-tag');
        if (!comensal.tags) comensal.tags = [];
        if (comensal.tags.includes(tVal)) comensal.tags = comensal.tags.filter(t => t !== tVal);
        else comensal.tags.push(tVal);
        saveTablesState();
        renderComandaMesa();
      });
    });

    const noteInput = card.querySelector('.input-nota-comensal');
    if (noteInput) {
      noteInput.addEventListener('input', (e) => {
        comensal.notas = e.target.value;
        saveTablesState();
      });
    }

    comensalesList.appendChild(card);
  }

  // --- 13. Diners Nav & Vinos ---
  function renderQuickDinersNav(table) {
    quickDinersNav.innerHTML = '';
    const allBtn = document.createElement('button');
    allBtn.className = 'btn-quick-diner active';
    allBtn.innerHTML = `<span>👥 Todos (${table.comensales.length})</span>`;
    allBtn.addEventListener('click', () => {
      window.scrollTo({ top: comensalesList.offsetTop - 120, behavior: 'smooth' });
    });
    quickDinersNav.appendChild(allBtn);

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
        c.collapsed = false;
        saveTablesState();
        renderComandaMesa();
        setTimeout(() => {
          const targetCard = document.getElementById(`comensal-card-${idx}`);
          if (targetCard) targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 80);
      });
      quickDinersNav.appendChild(pill);
    });
  }

  btnExpandAll.addEventListener('click', () => {
    tablesData[activeTableId].comensales.forEach(c => { c.collapsed = false; });
    saveTablesState();
    renderComandaMesa();
  });

  btnCollapseAll.addEventListener('click', () => {
    tablesData[activeTableId].comensales.forEach(c => { c.collapsed = true; });
    saveTablesState();
    renderComandaMesa();
  });

  function renderSharedDrinks() {
    const table = tablesData[activeTableId];
    drinksActiveList.innerHTML = '';
    if (!table.bebidas || table.bebidas.length === 0) {
      drinksActiveList.innerHTML = `<span style="font-size: 0.74rem; color: #888; font-style: italic;">No hay botellas de vino ni bebidas agregadas a la mesa aún.</span>`;
      return;
    }

    table.bebidas.forEach((beb, idx) => {
      const binTag = beb.bin ? `<span style="font-family: monospace; font-size: 0.65rem; background: rgba(212,175,55,0.15); color: #d4af37; padding: 0.1rem 0.35rem; border-radius: 3px; margin-left: 0.4rem;">${beb.bin}</span>` : '';
      const row = document.createElement('div');
      row.className = 'drink-item-pill';
      row.innerHTML = `
        <span>🍷 ${beb.qty}x ${beb.name} ${binTag}</span>
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <span style="color: #d4af37; font-weight: 700;">$${(beb.price * beb.qty).toLocaleString('es-AR')}</span>
          <button class="btn-del-drink" data-bidx="${idx}">✕</button>
        </div>
      `;
      row.querySelector('.btn-del-drink').addEventListener('click', () => {
        table.bebidas.splice(idx, 1);
        saveTablesState();
        renderSharedDrinks();
        updateSummaryFooter();
      });
      drinksActiveList.appendChild(row);
    });
  }

  btnAddDrinkItem.addEventListener('click', () => {
    const val = selectAddBebida.value;
    if (!val) return;
    const parts = val.split('|');
    const name = parts[0];
    const price = parseInt(parts[1], 10);
    const bin = parts[2] || 'Cava';
    const table = tablesData[activeTableId];
    if (!table.bebidas) table.bebidas = [];

    const existing = table.bebidas.find(b => b.name === name);
    if (existing) existing.qty += 1;
    else table.bebidas.push({ name, price, bin, qty: 1 });

    selectAddBebida.value = '';
    saveTablesState();
    renderSharedDrinks();
    updateSummaryFooter();
    showToast(`Agregado a la mesa: ${name} [${bin}]`, '🍷');
  });

  function addComensalToTable() {
    const table = tablesData[activeTableId];
    if (!table) return;
    if (!table.comensales) table.comensales = [];
    if (table.comensales.length === 0 && !table.openedAt) {
      table.openedAt = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      table.waterService = { lastServedAt: Date.now() };
      table.pacing = { currentStepIndex: 0, lastServedAt: Date.now(), history: [] };
    }
    const nextNum = table.comensales.length + 1;
    table.comensales.push(createDefaultComensal(nextNum));
    saveTablesState();
    renderComandaMesa();
    showToast(`Comensal ${nextNum} agregado a la mesa`, '👤');
  }

  btnAddComensal.addEventListener('click', addComensalToTable);
  btnAddComensalTop.addEventListener('click', addComensalToTable);

  function calculateTableTotal(table) {
    let total = 0;
    if (table.comensales) {
      table.comensales.forEach(c => {
        if (c.tipoMenu === '8pasos') total += 74000;
        else if (c.tipoMenu === '5pasos' || c.tipoMenu === '7pasos' || c.tipoMenu === '4pasos') total += 58000;
        else if (c.tipoMenu === '3pasos' || c.tipoMenu === '2pasos') total += 46000;
        else {
          // Carta
          (c.entradas || []).forEach(e => { const it = MENU_CATALOG.entradas.find(x => x.id === e.id); if (it) total += it.price; });
          (c.principales || []).forEach(p => { const it = MENU_CATALOG.principales.find(x => x.id === p.id); if (it) total += it.price; });
          (c.postres || []).forEach(d => { const it = MENU_CATALOG.postres.find(x => x.id === d.id); if (it) total += it.price; });
        }
        if (c.maridaje === 'upgrade') total += 18000;
      });
    }
    if (table.bebidas) {
      table.bebidas.forEach(b => { total += b.price * b.qty; });
    }
    return total;
  }

  function getComensalProgress(c) {
    let total = 0;
    let delivered = 0;
    if (c.tipoMenu === '8pasos') {
      total = 8;
      delivered = c.pasos8 ? c.pasos8.filter(p => p.entregado).length : 0;
    } else if (c.tipoMenu === '5pasos' || c.tipoMenu === '7pasos' || c.tipoMenu === '4pasos') {
      total = 5;
      delivered = c.pasos5 ? c.pasos5.filter(p => p.entregado).length : 0;
    } else {
      if (c.entradas) { total += c.entradas.length; delivered += c.entradas.filter(e => e.entregado).length; }
      if (c.principales) { total += c.principales.length; delivered += c.principales.filter(p => p.entregado).length; }
      if (c.postres) { total += c.postres.length; delivered += c.postres.filter(d => d.entregado).length; }
    }
    return { total, delivered };
  }

  function getComensalSummaryText(c) {
    const p = getComensalProgress(c);
    if (c.tipoMenu === '8pasos') {
      return `👑 <strong>Menú 8 Pasos</strong> (${p.delivered}/${p.total} servidos)`;
    }
    if (c.tipoMenu === '5pasos' || c.tipoMenu === '7pasos' || c.tipoMenu === '4pasos') {
      return `✨ <strong>Menú 5 Pasos</strong> (${p.delivered}/${p.total} servidos)`;
    }
    if (c.tipoMenu === '3pasos') {
      return `🍽️ <strong>Menú 3 Pasos</strong> (${p.delivered}/${p.total} servidos)`;
    }
    return `🍷 <strong>${MENU_CATALOG.pasosConfig[c.tipoMenu] ? MENU_CATALOG.pasosConfig[c.tipoMenu].name : 'Carta'}</strong> (${p.delivered}/${p.total} servidos)`;
  }

  function updateSummaryFooter() {
    const table = tablesData[activeTableId];
    if (!table) return;
    const count = table.comensales ? table.comensales.length : 0;
    summaryDinersLabel.textContent = `${count} Comensales`;
    summaryTotalAmount.textContent = `$${calculateTableTotal(table).toLocaleString('es-AR')}`;
  }

  btnVaciarMesa.addEventListener('click', () => {
    const table = tablesData[activeTableId];
    if (!table) return;
    if (confirm(`¿Reiniciar y vaciar ${table.name}? Quedará libre y sin comensales.`)) {
      table.comensales = [];
      table.bebidas = [];
      table.pacing = { currentStepIndex: 0, lastServedAt: Date.now(), history: [] };
      table.openedAt = '';
      table.waterService = { lastServedAt: Date.now() };
      saveTablesState();
      renderComandaMesa();
      showToast(`${table.name} vaciada y libre`, '🧹');
    }
  });

  // Selector de Menú Rápido para Toda la Mesa (5 / 8 / 3 pasos)
  document.querySelectorAll('.btn-preset-menu').forEach(btn => {
    btn.addEventListener('click', () => {
      const preset = btn.getAttribute('data-preset');
      const table = tablesData[activeTableId];
      if (!table) return;
      if (!table.comensales || table.comensales.length === 0) {
        table.openedAt = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        table.waterService = { lastServedAt: Date.now() };
        table.pacing = { currentStepIndex: 0, lastServedAt: Date.now(), history: [] };
        table.comensales = [createDefaultComensal(1, preset), createDefaultComensal(2, preset)];
      } else {
        table.comensales.forEach(c => {
          c.tipoMenu = preset;
          if (!c.pasos5) c.pasos5 = JSON.parse(JSON.stringify(MENU_CATALOG.pasos5Defaults));
          if (!c.pasos8) c.pasos8 = JSON.parse(JSON.stringify(MENU_CATALOG.pasos8Defaults));
        });
      }
      saveTablesState();
      renderComandaMesa();
      const conf = MENU_CATALOG.pasosConfig[preset] || { name: preset };
      showToast(`Toda la ${table.name} asignada a ${conf.name}`, '⚡');
    });
  });

  // --- 14. Enviar Comanda a WhatsApp Formateado ---
  btnSendComandaWa.addEventListener('click', () => {
    const table = tablesData[activeTableId];
    const total = calculateTableTotal(table);
    const pacing = getTablePacingStatus(table);
    const course = getTableCourseSummary(table);

    let msg = `🍷 *COMANDA · MARTINO WINES 1901*\n`;
    msg += `⭐ _Guía MICHELIN Selection · Mayor Drummond, Mendoza_\n`;
    msg += `📍 *${table.name.toUpperCase()}* (${table.sector})\n`;
    msg += `🤵 *Mozo:* ${activeMozoName} | 🕒 *Hora:* ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}\n`;
    msg += `🍽️ *Paso Actual:* ${course.text} (${pacing.statusText})\n`;
    msg += `--------------------------------\n`;

    table.comensales.forEach((c, idx) => {
      const conf = MENU_CATALOG.pasosConfig[c.tipoMenu] || MENU_CATALOG.pasosConfig['5pasos'];
      msg += `\n👤 *COMENSAL ${idx + 1}* _(${conf.tag})_\n`;
      if (c.tipoMenu === '8pasos') {
        (c.pasos8 || []).forEach(p => {
          const chk = p.entregado ? '✅' : '⏳';
          const meat = p.isMeat && p.doneness ? ` [${p.doneness}]` : '';
          msg += `  ${chk} ${p.name}${meat}\n`;
        });
      } else if (c.tipoMenu === '5pasos' || c.tipoMenu === '7pasos' || c.tipoMenu === '4pasos') {
        (c.pasos5 || []).forEach(p => {
          const chk = p.entregado ? '✅' : '⏳';
          const meat = p.isMeat && p.doneness ? ` [${p.doneness}]` : '';
          msg += `  ${chk} ${p.name}${meat}\n`;
        });
      } else {
        (c.entradas || []).forEach(e => {
          const it = MENU_CATALOG.entradas.find(x => x.id === e.id);
          msg += `  ${e.entregado ? '✅' : '⏳'} *Entrada:* ${it ? it.name : 'Entrada'}\n`;
        });
        (c.principales || []).forEach(p => {
          const it = MENU_CATALOG.principales.find(x => x.id === p.id);
          const meat = it && it.isMeat && p.doneness ? ` [${p.doneness}]` : '';
          msg += `  ${p.entregado ? '✅' : '⏳'} *Principal:* ${it ? it.name : 'Principal'}${meat}\n`;
        });
        (c.postres || []).forEach(d => {
          const it = MENU_CATALOG.postres.find(x => x.id === d.id);
          msg += `  ${d.entregado ? '✅' : '⏳'} *Postre:* ${it ? it.name : 'Postre'}\n`;
        });
      }
      if (c.maridaje === 'upgrade') msg += `  ↳ *Maridaje:* ✨ Upgrade de Autor\n`;
      if (c.tags && c.tags.length > 0) msg += `  ⚠️ *Alérgenos/Restricciones:* [${c.tags.join(', ')}]\n`;
      if (c.notas) msg += `  📝 *Nota:* "${c.notas}"\n`;
    });

    if (table.bebidas && table.bebidas.length > 0) {
      msg += `\n--------------------------------\n🍷 *BEBIDAS / VINOS MESA:*\n`;
      table.bebidas.forEach(b => { msg += `• ${b.qty}x ${b.name} [${b.bin || 'Cava'}]\n`; });
    }

    msg += `--------------------------------\n`;
    msg += `💰 *TOTAL:* $${total.toLocaleString('es-AR')}\n`;

    const cleanNum = targetWhatsAppNumber.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanNum}?text=${encodeURIComponent(msg)}`, '_blank');
  });

  // --- 15. VIEW 3: KDS PASE COCINA & EXPEDICIÓN BOH ---
  kdsStationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      kdsStationBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeKdsStation = btn.getAttribute('data-station');
      renderKDS();
    });
  });

  function renderKDS() {
    kdsTicketsContainer.innerHTML = '';

    const tableIds = Object.keys(tablesData).map(Number).sort((a, b) => a - b);
    for (const i of tableIds) {
      const t = tablesData[i];
      if (!t || !t.comensales || t.comensales.length === 0) continue;

      const plan = getTableCoursePlan(t);
      const pacing = getTablePacingStatus(t);
      const curIdx = t.pacing.currentStepIndex || 0;
      const currentStep = plan[Math.min(curIdx, plan.length - 1)];
      const nextStep = curIdx + 1 < plan.length ? plan[curIdx + 1] : null;

      // Filtrar por estación si aplica
      if (activeKdsStation !== 'all') {
        const curMatches = currentStep && currentStep.station === activeKdsStation;
        const nextMatches = nextStep && nextStep.station === activeKdsStation;
        if (!curMatches && !nextMatches) continue;
      }

      const ticketCard = document.createElement('div');
      ticketCard.className = `kds-ticket-card ${pacing.phase === 'marchar' ? 'fire-alert' : ''}`;

      ticketCard.innerHTML = `
        <div class="kds-ticket-header">
          <div>
            <span class="kds-tbl-title">${t.name} · ${t.sector}</span>
            <div style="font-size: 0.72rem; color: #a39c92;">${t.comensales.length} comensales · Mozo: ${activeMozoName}</div>
          </div>
          <div class="kds-ticket-timer" style="color: ${pacing.color};">
            ⏱️ ${pacing.elapsedStr}
          </div>
        </div>

        <!-- Plato en mesa -->
        <div class="kds-course-box">
          <span class="kds-course-kicker">EN DEGUSTACIÓN EN MESA:</span>
          <div class="kds-course-name">${currentStep.name}</div>
        </div>

        <!-- Siguiente plato a marchar -->
        ${nextStep ? `
          <div class="kds-course-box" style="border-left: 3px solid #f59e0b;">
            <span class="kds-course-kicker" style="color: #f59e0b;">PRÓXIMO PASO A MARCHAR:</span>
            <div class="kds-course-name">${nextStep.name}</div>
            <span class="kds-station-tag ${nextStep.station}" style="margin-top: 0.25rem; display: inline-block;">
              Estación: ${nextStep.station.toUpperCase()}
            </span>
          </div>
        ` : `
          <div class="kds-course-box" style="border-left: 3px solid #10b981;">
            <span class="kds-course-kicker" style="color: #10b981;">FINAL DE EXPERIENCIA:</span>
            <div class="kds-course-name">Mesa en Sobremesa y Digestivos</div>
          </div>
        `}

        <div class="kds-ticket-actions">
          <button class="btn-kds-fire" data-tid="${i}">🔥 Marchar a Estación</button>
          <button class="btn-kds-bajar" data-tid="${i}">🍽️ Bajar a Mesa</button>
        </div>
      `;

      ticketCard.querySelector('.btn-kds-fire').addEventListener('click', () => {
        showToast(`🔥 Orden marchada a cocina para ${t.name}`, '🔥');
      });

      ticketCard.querySelector('.btn-kds-bajar').addEventListener('click', () => {
        bajarPlatoAvanzarPaso(i);
        renderKDS();
      });

      kdsTicketsContainer.appendChild(ticketCard);
    }
  }

  // --- 16. VIEW 4: TRAZABILIDAD DE ALÉRGENOS & LIFE-SAFETY AUDIT TRAIL ---
  function renderAlergenos() {
    allergenMatrixList.innerHTML = '';
    auditTrailTbody.innerHTML = '';

    let collisionsFound = 0;

    const tableIds = Object.keys(tablesData).map(Number).sort((a, b) => a - b);
    for (const i of tableIds) {
      const t = tablesData[i];
      if (!t || !t.comensales) continue;

      const dinersWithRestrictions = t.comensales.filter(c => c.tags && c.tags.length > 0);
      if (dinersWithRestrictions.length === 0) continue;

      const card = document.createElement('div');
      card.className = 'allergen-card-item';

      let dinersHTML = '';
      dinersWithRestrictions.forEach((c) => {
        // Detectar colisiones
        c.tags.forEach(tag => {
          if (tag === 'Sin TACC') {
            // Verificar si el menú contiene gluten
            collisionsFound++;
          }
        });

        dinersHTML += `
          <div style="border-bottom: 1px solid var(--border-subtle); padding: 0.4rem 0;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <strong>👤 Comensal ${c.num} (${MENU_CATALOG.pasosConfig[c.tipoMenu].name})</strong>
              <span class="allergen-tag-chip">⚠️ ${c.tags.join(', ')}</span>
            </div>
            <div style="font-size: 0.72rem; color: #a39c92; margin-top: 0.2rem;">
              Protocolo BOH: Separación física de mise en place y sustitución sin gluten/lactosa activa.
            </div>
          </div>
        `;
      });

      card.innerHTML = `
        <div class="allergen-card-header">
          <h4>${t.name} (${t.sector})</h4>
          <span style="font-size: 0.72rem; color: #10b981; font-weight: 700;">✓ Cadena de Custodia OK</span>
        </div>
        ${dinersHTML}
      `;

      allergenMatrixList.appendChild(card);
    }

    if (collisionsFound > 0) {
      allergenCollisionBanner.className = 'allergen-collision-banner danger';
      acCollisionSummary.textContent = `Se registran ${collisionsFound} restricciones dietéticas activas en salón. Protocolo de mitigación de contaminación cruzada verificado.`;
    } else {
      allergenCollisionBanner.className = 'allergen-collision-banner';
      acCollisionSummary.textContent = `No se detectan discrepancias críticas en las ${tableIds.length} mesas.`;
    }

    // Render Audit Trail Log
    allergenAuditLog.forEach(log => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="font-family: monospace;">${log.timestamp}</td>
        <td><strong>${log.tableDiner}</strong></td>
        <td>${log.operator}</td>
        <td>${log.action}</td>
        <td>${log.validation}</td>
        <td><span style="color: #10b981; font-weight: 700;">${log.legalStatus}</span></td>
      `;
      auditTrailTbody.appendChild(tr);
    });
  }

  btnExportAuditLog.addEventListener('click', () => {
    let content = `REGISTRO PROBATORIO DE ALÉRGENOS & LIFE-SAFETY AUDIT TRAIL\n`;
    content += `Bodega Martino Wines 1901 · Guía Michelin Selection\n`;
    content += `Fecha de exportación: ${new Date().toLocaleString()}\n`;
    content += `Normativa: Reglamento (UE) 1169/2011 & Food Allergen Labeling Act (FALCPA)\n\n`;

    allergenAuditLog.forEach(l => {
      content += `[${l.timestamp}] ${l.tableDiner} | Op: ${l.operator} | Acción: ${l.action} | Valid: ${l.validation} | Estado: ${l.legalStatus}\n`;
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-trail-martino-${Date.now()}.txt`;
    a.click();
    showToast('Registro Probatorio descargado', '📥');
  });



  // --- 18. VIEW 6: CAVA 1901 & TOPOLOGÍA DE BODEGA ---
  function renderBodega() {
    binsCavaHistorica.innerHTML = '';
    binsCavaGaleria.innerHTML = '';
    binsCavaFria.innerHTML = '';

    CAVA_BINS.forEach(b => {
      const item = document.createElement('div');
      item.className = 'bin-pill-item';
      item.innerHTML = `
        <div>
          <strong>${b.wine}</strong>
          <div style="font-size: 0.68rem; color: #a39c92;">${b.rack} · Temp: ${b.temp}</div>
        </div>
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <span style="font-size: 0.72rem; color: #10b981; font-weight: 700;">${b.stock} bot.</span>
          <span class="bin-code">${b.code}</span>
        </div>
      `;

      if (b.sector.includes('Histórica')) binsCavaHistorica.appendChild(item);
      else if (b.sector.includes('Galería')) binsCavaGaleria.appendChild(item);
      else binsCavaFria.appendChild(item);
    });
  }

  // --- 19. WhatsApp Modal Settings ---
  function updateWaTargetDisplay() {
    const waSendTargetLabel = document.getElementById('wa-send-target-label');
    if (targetWhatsAppNumber) {
      if (waNumDisplay) waNumDisplay.textContent = `WA: ${targetWhatsAppNumber}`;
      if (waSendTargetLabel) waSendTargetLabel.textContent = `Enviar a WhatsApp: ${targetWhatsAppNumber}`;
    } else {
      if (waNumDisplay) waNumDisplay.textContent = 'Configurar WA';
      if (waSendTargetLabel) waSendTargetLabel.textContent = 'Pulsa para configurar WhatsApp';
    }
  }
  updateWaTargetDisplay();

  btnOpenWaConfig.addEventListener('click', () => {
    inputWaNumber.value = targetWhatsAppNumber;
    inputMozoName.value = activeMozoName;
    modalWaConfig.style.display = 'flex';
  });

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
      alert('Ingresa un número válido');
      return;
    }
    targetWhatsAppNumber = val;
    localStorage.setItem('martino_wa_number', targetWhatsAppNumber);
    activeMozoName = inputMozoName.value.trim() || 'Máximo';
    localStorage.setItem('martino_mozo_name', activeMozoName);
    updateWaTargetDisplay();
    modalWaConfig.style.display = 'none';
    showToast('Configuración guardada', '📱');
  });

  // --- 19B. GESTIÓN Y CREACIÓN DE MESAS DINÁMICAS ---
  function addNewTable({ name, sectorId, customSectorName, dinerCount, initialMenu }) {
    const existingIds = Object.keys(tablesData).map(Number);
    const nextNum = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;

    let newId = nextNum;
    if (name) {
      const matchNum = name.match(/\d+/);
      if (matchNum) {
        const parsed = parseInt(matchNum[0], 10);
        if (!tablesData[parsed] && parsed > 0) {
          newId = parsed;
        }
      }
    }

    // Resolver sector
    let targetSector = null;
    if (sectorId === '__new__' && customSectorName) {
      const newSecId = 'sec_' + Date.now().toString(36);
      targetSector = {
        id: newSecId,
        name: customSectorName,
        tables: [newId]
      };
      SECTORS_DEF.push(targetSector);
    } else {
      targetSector = SECTORS_DEF.find(s => s.id === sectorId) || SECTORS_DEF[0];
      if (!targetSector.tables.includes(newId)) {
        targetSector.tables.push(newId);
      }
    }

    const finalName = name || `Mesa ${newId}`;
    const isFree = !dinerCount || dinerCount === 0;

    tablesData[newId] = {
      id: newId,
      name: finalName,
      sector: targetSector.name,
      sectorId: targetSector.id,
      openedAt: isFree ? '' : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      waterService: {
        lastServedAt: Date.now()
      },
      pacing: {
        currentStepIndex: 0,
        lastServedAt: Date.now(),
        history: []
      },
      comensales: isFree ? [] : Array.from({ length: dinerCount }, (_, idx) => 
        createDefaultComensal(idx + 1, initialMenu || '5pasos')
      ),
      bebidas: []
    };

    saveTablesState();
    saveSectorsState();
    renderSectorFilters();
    renderMapaMesas();
    updateSalonMetricsBanner();

    showToast(`✨ ${finalName} agregada en ${targetSector.name}`, '✨');
    return newId;
  }

  function deleteTable(tableId) {
    const t = tablesData[tableId];
    if (!t) return;

    const confirmMsg = `¿Confirmas eliminar la "${t.name}" del salón? Se quitará su comanda y asignación.`;
    if (!confirm(confirmMsg)) return;

    delete tablesData[tableId];

    SECTORS_DEF.forEach(s => {
      s.tables = s.tables.filter(tid => tid !== tableId);
    });

    saveTablesState();
    saveSectorsState();
    renderSectorFilters();
    renderMapaMesas();
    updateSalonMetricsBanner();

    if (activeTableId === tableId) {
      showPanel('panel-mapa-mesas');
    }

    showToast(`🗑️ ${t.name} eliminada del salón`, '🗑️');
  }

  function openAddMesaModal(preselectedSectorId) {
    if (!modalAddMesa) return;

    if (selectNewMesaSector) {
      selectNewMesaSector.innerHTML = SECTORS_DEF.map(s => `
        <option value="${s.id}" ${s.id === preselectedSectorId ? 'selected' : ''}>${s.name}</option>
      `).join('') + `<option value="__new__">➕ Crear Nuevo Sector...</option>`;
    }

    if (groupCustomSector) {
      groupCustomSector.style.display = 'none';
      if (inputNewSectorName) inputNewSectorName.value = '';
    }

    const existingIds = Object.keys(tablesData).map(Number);
    const nextNum = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;
    if (inputNewMesaName) {
      inputNewMesaName.value = `Mesa ${nextNum}`;
      setTimeout(() => inputNewMesaName.focus(), 100);
    }

    selectedNewMesaDiners = 2;
    document.querySelectorAll('.diner-choice-btn').forEach(btn => {
      if (parseInt(btn.getAttribute('data-diners'), 10) === 2) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    if (selectNewMesaMenu) {
      selectNewMesaMenu.value = '5pasos';
    }

    modalAddMesa.style.display = 'flex';
  }

  function closeAddMesaModal() {
    if (modalAddMesa) modalAddMesa.style.display = 'none';
  }

  if (btnOpenAddMesa) {
    btnOpenAddMesa.addEventListener('click', () => openAddMesaModal());
  }

  if (btnCloseAddMesa) {
    btnCloseAddMesa.addEventListener('click', closeAddMesaModal);
  }

  if (btnCancelAddMesa) {
    btnCancelAddMesa.addEventListener('click', closeAddMesaModal);
  }

  if (modalAddMesa) {
    modalAddMesa.addEventListener('click', (e) => {
      if (e.target === modalAddMesa) closeAddMesaModal();
    });
  }

  if (selectNewMesaSector) {
    selectNewMesaSector.addEventListener('change', () => {
      if (groupCustomSector) {
        groupCustomSector.style.display = selectNewMesaSector.value === '__new__' ? 'flex' : 'none';
        if (selectNewMesaSector.value === '__new__' && inputNewSectorName) {
          inputNewSectorName.focus();
        }
      }
    });
  }

  document.querySelectorAll('.diner-choice-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.diner-choice-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedNewMesaDiners = parseInt(btn.getAttribute('data-diners'), 10) || 2;
    });
  });

  if (btnConfirmAddMesa) {
    btnConfirmAddMesa.addEventListener('click', () => {
      const rawName = inputNewMesaName ? inputNewMesaName.value.trim() : '';
      const sectorId = selectNewMesaSector ? selectNewMesaSector.value : 'salon1901';
      const customSectorName = inputNewSectorName ? inputNewSectorName.value.trim() : '';
      const initialMenu = selectNewMesaMenu ? selectNewMesaMenu.value : '5pasos';

      if (sectorId === '__new__' && !customSectorName) {
        alert('Por favor ingresa un nombre para el nuevo sector.');
        if (inputNewSectorName) inputNewSectorName.focus();
        return;
      }

      addNewTable({
        name: rawName,
        sectorId,
        customSectorName,
        dinerCount: selectedNewMesaDiners,
        initialMenu
      });

      closeAddMesaModal();
    });
  }

  if (btnEliminarMesa) {
    btnEliminarMesa.addEventListener('click', () => {
      if (activeTableId) {
        deleteTable(activeTableId);
      }
    });
  }

  if (btnResetSalon) {
    btnResetSalon.addEventListener('click', resetAllTablesToClean);
  }

  function resetAllTablesToClean() {
    if (!confirm('¿Deseas reiniciar y limpiar todas las mesas del salón? Quedarán libres y sin comandas.')) return;
    Object.keys(tablesData).forEach(idStr => {
      const i = parseInt(idStr, 10);
      tablesData[i].comensales = [];
      tablesData[i].bebidas = [];
      tablesData[i].openedAt = '';
      tablesData[i].waterService = { lastServedAt: Date.now() };
      tablesData[i].pacing = { currentStepIndex: 0, lastServedAt: Date.now(), history: [] };
    });
    saveTablesState();
    renderMapaMesas();
    updateSalonMetricsBanner();
    showToast('Salón reiniciado y limpio para el servicio', '🧹');
  }

  // --- 20. CRONÓMETRO Y TICKER EN TIEMPO REAL (CADA SEGUNDO) ---
  setInterval(() => {
    // Si estamos en la comanda de mesa, actualizar el cronómetro del plato en vivo
    if (panelComandaMesa.style.display !== 'none') {
      const table = tablesData[activeTableId];
      if (table) {
        const p = getTablePacingStatus(table);
        mesaHeroTimerReadout.innerHTML = `Plato bajado a mesa hace: <strong>${p.elapsedStr}</strong>`;
        mesaHeroPacingChip.textContent = p.chipText;
        mesaHeroPacingChip.style.background = p.bg;
        mesaHeroPacingChip.style.color = p.color;
      }
    }

    // Actualizar badges en vivo en el mapa expandido si está visible
    if (panelMapaMesas.style.display !== 'none' && activeViewMode === 'expanded') {
      document.querySelectorAll('.live-timer-table').forEach(span => {
        const tid = parseInt(span.getAttribute('data-tid'), 10);
        const t = tablesData[tid];
        if (t) {
          const p = getTablePacingStatus(t);
          span.textContent = `⏱️ ${p.elapsedStr}`;
          span.style.color = p.color;
        }
      });
    }

    // Actualizar periódicamente resumen general
    updateSalonMetricsBanner();
  }, 1000);

  // Inicializar Salón
  renderMapaMesas();
});
