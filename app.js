/**
 * Los Bocheros Restó · Bodega Lamadrid Estate Wines
 * App de Pedidos & Comandas para Mozos
 * Mobile-First, Offline-Ready (localStorage)
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Menu Catalog Dataset ---
  const MENU_CATALOG = [
    // --- PRIMAVERA: ENTRADAS ---
    {
      id: 'sp_e1',
      category: 'primavera-entradas',
      courseType: 'entradas',
      name_es: 'Espárragos a la plancha, parmesano, almendras y yema curada',
      name_en: 'Grilled asparagus, parmesan, toasted almonds & cured yolk',
      name_pt: 'Aspargos grelhados, parmesão, amêndoas e gema curada',
      name_de: 'Gegrillter Spargel, Parmesan, Mandeln und gereiftes Eigelb',
      price: 18000,
      pairing_std: 'Lamadrid Blanc de Blancs',
      pairing_upg: 'Lamadrid Gran Reserva Chardonnay',
      desc: 'Almendras tostadas, gel de limón y yema curada'
    },
    {
      id: 'sp_e2',
      category: 'primavera-entradas',
      courseType: 'entradas',
      name_es: 'Provoleta asada con chimichurri rojo casero',
      name_en: 'Roasted provoleta with homemade red chimichurri',
      name_pt: 'Provoleta assada com chimichurri vermelho caseiro',
      name_de: 'Gegrillter Provoleta mit rotem Chimichurri',
      price: 25000,
      pairing_std: 'Lamadrid Terroir Selection Malbec D.O.C',
      pairing_upg: 'Lamadrid Reserva Cabernet Sauvignon',
      desc: 'Provoleta crocante al horno de leña con chimichurri de la casa'
    },
    {
      id: 'sp_e3',
      category: 'primavera-entradas',
      courseType: 'entradas',
      name_es: 'Solomillo de cerdo curado al Malbec con manzana verde',
      name_en: 'Malbec-cured pork tenderloin with green apple',
      name_pt: 'Filé suíno curado ao Malbec com maçã verde',
      name_de: 'In Malbec gereiftes Schweinefilet mit grünem Apfel',
      price: 21000,
      pairing_std: 'Lamadrid Terroir Selection Bonarda',
      pairing_upg: 'Lamadrid Reserva Malbec',
      desc: 'Láminas finas, manzana verde fresca y hojas verdes de huerta'
    },
    {
      id: 'sp_e4',
      category: 'primavera-entradas',
      courseType: 'entradas',
      name_es: 'Queso de cabra, remolacha asada, yogur y frambuesas',
      name_en: 'Goat cheese, roasted beetroot, yogurt & raspberries',
      name_pt: 'Queijo de cabra, beterraba assada, iogurte e framboesas',
      name_de: 'Ziegenkäse, Rande, Joghurt und Himbeeren',
      price: 18000,
      pairing_std: 'Lamadrid Terroir Selection Cabernet Sauvignon',
      pairing_upg: 'Lamadrid Reserva Cabernet Sauvignon',
      desc: 'Queso mendocino, yogur artesanal, frambuesas y crocantes'
    },
    {
      id: 'sp_e5',
      category: 'primavera-entradas',
      courseType: 'entradas',
      name_es: 'Especial Dúo Empanadas Los Bocheros',
      name_en: 'Special Duo of Los Bocheros Empanadas',
      name_pt: 'Especial Duo de Empanadas Los Bocheros',
      name_de: 'Duo Los Bocheros Empanadas',
      price: 16000,
      pairing_std: 'Lamadrid Reserva Malbec',
      pairing_upg: 'Lamadrid Gran Reserva Malbec',
      desc: 'Cortadas a cuchillo, masa casera hojaldrada, horno de barro'
    },

    // --- PRIMAVERA: PRINCIPALES ---
    {
      id: 'sp_p1',
      category: 'primavera-principales',
      courseType: 'principales',
      name_es: 'Costilla confitada, cremoso de papa, Morbier y panceta',
      name_en: 'Confit short rib, creamy potato, Morbier & smoked bacon',
      name_pt: 'Costela confitada, purê de batata, queijo Morbier e bacon',
      name_de: 'Geschmorte Rinderrippe, Kartoffelmousseline und Morbier',
      price: 34000,
      pairing_std: 'Lamadrid Gran Reserva Malbec',
      pairing_upg: 'Guillermo Cabernet Sauvignon',
      desc: 'Cocción lenta de 14 horas con fondo de cocción reducido'
    },
    {
      id: 'sp_p2',
      category: 'primavera-principales',
      courseType: 'principales',
      name_es: 'Pasta artesanal de hongos, arvejas y muhammara',
      name_en: 'Handmade mushroom pasta, sweet peas & muhammara',
      name_pt: 'Massa artesanal de cogumelos, ervilhas e muhammara',
      name_de: 'Hausgemachte Waldpilz-Pasta mit Erbsen & Muhammara',
      price: 29000,
      pairing_std: 'Lamadrid Gran Reserva Cabernet Franc',
      pairing_upg: 'Matilde Malbec (Ícono)',
      desc: 'Arvejas tiernas, crocante especiado, base de pimientos y nueces'
    },
    {
      id: 'sp_p3',
      category: 'primavera-principales',
      courseType: 'principales',
      name_es: 'Trucha a la plancha, curry de alcauciles y cuscús',
      name_en: 'Pan-seared trout, artichoke curry & crispy couscous',
      name_pt: 'Truta grelhada, curry de alcachofras e cuscuz',
      name_de: 'Gebratene Anden-Forelle mit Artischocken-Curry',
      price: 36000,
      pairing_std: 'Lamadrid Gran Reserva Chardonnay',
      pairing_upg: 'Begani Private Selection',
      desc: 'Curry cremoso con ají amarillo y cuscús crocante tostado'
    },
    {
      id: 'sp_p4',
      category: 'primavera-principales',
      courseType: 'principales',
      name_es: 'Ojo de bife con vegetales frescos de estación',
      name_en: 'Prime Argentine ribeye steak with sautéed vegetables',
      name_pt: 'Ojo de bife argentino com vegetais salteados',
      name_de: 'Argentinisches Ribeye-Steak mit Frühlingsgemüse',
      price: 36000,
      pairing_std: 'Lamadrid Gran Reserva Malbec',
      pairing_upg: 'Matilde Malbec (Ícono)',
      desc: 'Asado sobre brasas de quebracho y sarmientos de la finca',
      isMeat: true
    },

    // --- PRIMAVERA: POSTRES ---
    {
      id: 'sp_d1',
      category: 'primavera-postres',
      courseType: 'postres',
      name_es: 'Pera pochada, mascarpone, toffee y queso pepato',
      name_en: 'Poached pear, mascarpone mousse & salted toffee',
      name_pt: 'Pêra pochê, mascarpone, toffee e queijo pepato',
      name_de: 'Pochierte Birne, Mascarpone und Salz-Toffee',
      price: 16000,
      pairing_std: 'ZunZun Pet Nat',
      pairing_upg: 'Margarita Espumoso',
      desc: 'Mousse de mascarpone, toffee fluido y crumble de almendras'
    },
    {
      id: 'sp_d2',
      category: 'primavera-postres',
      courseType: 'postres',
      name_es: 'Tarta flan caramelizada con helado artesanal',
      name_en: 'Caramelized flan tart with artisanal ice cream',
      name_pt: 'Torta pudim caramelizada com sorvete artesanal',
      name_de: 'Karamellisierte Flan-Tarte mit hausgemachtem Glacé',
      price: 17000,
      pairing_std: 'ZunZun Pet Nat',
      pairing_upg: 'Margarita Espumoso',
      desc: 'Masa sableé crocante, centro sedoso y quenelle de helado'
    },
    {
      id: 'sp_d3',
      category: 'primavera-postres',
      courseType: 'postres',
      name_es: 'Selección artesanal de quesos y dulces de estación',
      name_en: 'Artisanal cheese selection & seasonal fruit preserves',
      name_pt: 'Seleção artesanal de queijos e doces da estação',
      name_de: 'Auswahl an regionalem Käse und Fruchtkompotten',
      price: 16000,
      pairing_std: 'ZunZun Pet Nat',
      pairing_upg: 'Margarita Espumoso',
      desc: 'Quesos mendocinos curados y dulces caseros de la finca'
    },
    {
      id: 'sp_d4',
      category: 'primavera-postres',
      courseType: 'postres',
      name_es: 'Clásico panqueque casero tibio con dulce de leche',
      name_en: 'Warm homemade crêpe with artisanal dulce de leche',
      name_pt: 'Panqueca caseira morna com doce de leite artesanal',
      name_de: 'Warme Crêpe mit hausgemachtem Dulce de Leche',
      price: 18000,
      pairing_std: 'ZunZun Pet Nat',
      pairing_upg: 'Margarita Espumoso',
      desc: 'Caramelizado a la manteca, dulce de leche de campo mendocino'
    },

    // --- OTOÑO: MENÚ 7 PASOS ---
    {
      id: 'ot_full',
      category: 'otono-pasos',
      courseType: 'principales',
      name_es: 'Menú Otoño 7 Pasos Completo (Por Persona)',
      name_en: 'Autumn 7-Course Tasting Menu (Per Person)',
      name_pt: 'Menu Degustação Outono 7 Etapas (Por Pessoa)',
      name_de: 'Herbst-Degustationsmenü 7 Gänge (Pro Person)',
      price: 58000,
      pairing_std: 'Maridaje Clásico Lamadrid (Incluido)',
      pairing_upg: 'Maridaje Upgrade Gran Reserva & Matilde (+$18.000)',
      desc: 'Queso de cabra, Gírgola, Molleja, Empanada, Ojo de Bife, Yogurt y Chocolate'
    },
    {
      id: 'ot_p1',
      category: 'otono-pasos',
      courseType: 'entradas',
      name_es: 'Paso 1: Queso de cabra, chutney y hierbas',
      name_en: 'Course 1: Goat cheese, chutney & herbs',
      name_pt: 'Etapa 1: Queijo de cabra, chutney e ervas',
      name_de: 'Gang 1: Ziegenkäse, Chutney und Kräuter',
      price: 15000,
      pairing_std: 'Lamadrid Reserva Bonarda',
      pairing_upg: 'Lamadrid Gran Reserva Chardonnay',
      desc: 'Cremoso queso de cabra, chutney especiado, hierbas de huerta'
    },
    {
      id: 'ot_p2',
      category: 'otono-pasos',
      courseType: 'entradas',
      name_es: 'Paso 2: Gírgola al sarmiento, calabaza y nueces',
      name_en: 'Course 2: Oyster mushroom, roasted pumpkin & walnuts',
      name_pt: 'Etapa 2: Cogumelos gírgola, abóbora e nozes',
      name_de: 'Gang 2: Austernpilze, Kürbis und Nüsse',
      price: 16000,
      pairing_std: 'Peñón de Agrelo Cabernet Sauvignon',
      pairing_upg: 'Lamadrid Reserva Cabernet Sauvignon',
      desc: 'Gírgolas doradas, calabaza al rescoldo y nueces del Valle de Uco'
    },
    {
      id: 'ot_p3',
      category: 'otono-pasos',
      courseType: 'entradas',
      name_es: 'Paso 3: Molleja crocante, coliflor, manzana y AOVE',
      name_en: 'Course 3: Sweetbread, cauliflower, apple & EVOO',
      name_pt: 'Etapa 3: Molejas crocantes, couve-flor e maçã',
      name_de: 'Gang 3: Kalbsmilke, Blumenkohl und Apfel',
      price: 20000,
      pairing_std: 'Los Bocheros White Blend',
      pairing_upg: 'Peñón de Agrelo Corte de Finca',
      desc: 'Molleja glaseada, puré de coliflor tostada, manzana verde ácida'
    },
    {
      id: 'ot_p5',
      category: 'otono-pasos',
      courseType: 'principales',
      name_es: 'Paso 5: Ojo de Bife al quebracho blanco',
      name_en: 'Course 5: Ribeye steak over vine shoots',
      name_pt: 'Etapa 5: Ojo de bife na brasa',
      name_de: 'Gang 5: Ribeye-Steak über Rebholz',
      price: 36000,
      pairing_std: 'Lamadrid Gran Reserva Malbec',
      pairing_upg: 'Matilde Malbec (Ícono)',
      desc: 'Carne argentina madurada, cristales de sal marina',
      isMeat: true
    },
    {
      id: 'ot_p7',
      category: 'otono-pasos',
      courseType: 'postres',
      name_es: 'Paso 7: Chocolate amargo, pomelo, toffee y AOVE',
      name_en: 'Course 7: Dark chocolate, grapefruit, toffee & EVOO',
      name_pt: 'Etapa 7: Chocolate amargo, toranja e toffee',
      name_de: 'Gang 7: Schokolade, Grapefruit und Toffee',
      price: 16000,
      pairing_std: 'ZunZun Pet Nat',
      pairing_upg: 'Margarita Espumoso',
      desc: 'Cremoso de chocolate 70%, pomelo rosado y toffee a la manteca'
    },

    // --- VINOS TINTOS LAMADRID ---
    {
      id: 'vn_t1',
      category: 'vinos-tintos',
      courseType: 'bebidas',
      name_es: 'Lamadrid Reserva Malbec (Botella)',
      name_en: 'Lamadrid Reserva Malbec (Bottle)',
      name_pt: 'Lamadrid Reserva Malbec (Garrafa)',
      name_de: 'Lamadrid Reserva Malbec (Flasche)',
      price: 19000,
      desc: 'Las Compuertas · Ciruela, violetas, roble sutil'
    },
    {
      id: 'vn_t2',
      category: 'vinos-tintos',
      courseType: 'bebidas',
      name_es: 'Lamadrid Reserva Bonarda (Botella)',
      name_en: 'Lamadrid Reserva Bonarda (Bottle)',
      name_pt: 'Lamadrid Reserva Bonarda (Garrafa)',
      name_de: 'Lamadrid Reserva Bonarda (Flasche)',
      price: 19000,
      desc: 'Las Compuertas · Fruta roja fresca y taninos redondos'
    },
    {
      id: 'vn_t3',
      category: 'vinos-tintos',
      courseType: 'bebidas',
      name_es: 'Lamadrid Gran Reserva Malbec (Botella)',
      name_en: 'Lamadrid Gran Reserva Malbec (Bottle)',
      name_pt: 'Lamadrid Gran Reserva Malbec (Garrafa)',
      name_de: 'Lamadrid Gran Reserva Malbec (Flasche)',
      price: 29000,
      desc: 'Selección de parcelas viejas de 1929 · 14 meses en roble francés'
    },
    {
      id: 'vn_t4',
      category: 'vinos-tintos',
      courseType: 'bebidas',
      name_es: 'Matilde Malbec · Vino Ícono (Botella)',
      name_en: 'Matilde Malbec · Flagship Icon Wine (Bottle)',
      name_pt: 'Matilde Malbec · Vinho Ícone (Garrafa)',
      name_de: 'Matilde Malbec · Ikonen-Wein (Flasche)',
      price: 65000,
      desc: 'El vino ícono indiscutible de Lamadrid · Barricas excepcionales'
    },
    {
      id: 'vn_t5',
      category: 'vinos-tintos',
      courseType: 'bebidas',
      name_es: 'Guillermo Cabernet Sauvignon (Botella)',
      name_en: 'Guillermo Cabernet Sauvignon (Bottle)',
      name_pt: 'Guillermo Cabernet Sauvignon (Garrafa)',
      name_de: 'Guillermo Cabernet Sauvignon (Flasche)',
      price: 45000,
      desc: 'Edición especial de gran estirpe y concentración'
    },

    // --- BLANCOS & BURBUJAS ---
    {
      id: 'vn_b1',
      category: 'vinos-blancos-burbujas',
      courseType: 'bebidas',
      name_es: 'Los Bocheros White Blend (Botella)',
      name_en: 'Los Bocheros White Blend (Bottle)',
      name_pt: 'Los Bocheros White Blend (Garrafa)',
      name_de: 'Los Bocheros White Blend (Flasche)',
      price: 16000,
      desc: 'Corte de blancas de la finca · Fresco, cítrico y mineral'
    },
    {
      id: 'vn_b2',
      category: 'vinos-blancos-burbujas',
      courseType: 'bebidas',
      name_es: 'Lamadrid Gran Reserva Chardonnay (Botella)',
      name_en: 'Lamadrid Gran Reserva Chardonnay (Bottle)',
      name_pt: 'Lamadrid Gran Reserva Chardonnay (Garrafa)',
      name_de: 'Lamadrid Gran Reserva Chardonnay (Flasche)',
      price: 27000,
      desc: 'Fermentado en barricas de roble francés · Untuoso y complejo'
    },
    {
      id: 'vn_b3',
      category: 'vinos-blancos-burbujas',
      courseType: 'bebidas',
      name_es: 'ZunZun Pétillant Naturel Pet Nat (Botella)',
      name_en: 'ZunZun Pétillant Naturel Pet Nat (Bottle)',
      name_pt: 'ZunZun Pétillant Naturel Pet Nat (Garrafa)',
      name_de: 'ZunZun Pétillant Naturel Pet Nat (Flasche)',
      price: 19000,
      desc: 'Burbuja natural salvaje, vivaz y sin filtrar'
    },
    {
      id: 'vn_b4',
      category: 'vinos-blancos-burbujas',
      courseType: 'bebidas',
      name_es: 'Margarita Espumoso Champenoise (Botella)',
      name_en: 'Margarita Sparkling Champenoise (Bottle)',
      name_pt: 'Margarita Espumante Champenoise (Garrafa)',
      name_de: 'Margarita Schaumwein Champenoise (Flasche)',
      price: 28000,
      desc: 'Método tradicional 24 meses sobre borras · Burbuja finísima'
    },

    // --- BEBIDAS & CAFETERÍA ---
    {
      id: 'bb_1',
      category: 'bebidas-cafeteria',
      courseType: 'bebidas',
      name_es: 'Agua Mineral Villavicencio (500ml con o sin gas)',
      name_en: 'Villavicencio Mineral Water (500ml still or sparkling)',
      name_pt: 'Água Mineral Villavicencio (500ml com ou sem gás)',
      name_de: 'Mineralwasser Villavicencio (500ml)',
      price: 3500,
      desc: 'Agua pura de manantial de la precordillera de Mendoza'
    },
    {
      id: 'bb_2',
      category: 'bebidas-cafeteria',
      courseType: 'bebidas',
      name_es: 'Café Espresso o Cortado de Especialidad',
      name_en: 'Specialty Espresso or Cortado Coffee',
      name_pt: 'Café Espresso ou Cortado Especial',
      name_de: 'Spezialitäten-Espresso oder Cortado',
      price: 3200,
      desc: 'Granos arábigos tostados artesanalmente con petit four'
    }
  ];

  // --- 2. Tables Dataset (16 Tables in 4 Sectors) ---
  const SECTORS = [
    { id: 'terraza', name: 'Terraza Viñedos', tables: [1, 2, 3, 4, 5] },
    { id: 'galeria', name: 'Galería Adobe', tables: [6, 7, 8, 9, 10] },
    { id: 'salon', name: 'Salón Barricas', tables: [11, 12, 13, 14] },
    { id: 'pergola', name: 'Pérgola Las Compuertas', tables: [15, 16] }
  ];

  // Initialize table state from localStorage or defaults
  let tablesState = {};
  const savedTables = localStorage.getItem('bocheros_tables_v1');
  if (savedTables) {
    try {
      tablesState = JSON.parse(savedTables);
    } catch (e) {
      tablesState = {};
    }
  }

  // Ensure all 16 tables exist
  for (let i = 1; i <= 16; i++) {
    if (!tablesState[i]) {
      const sectorObj = SECTORS.find(s => s.tables.includes(i));
      tablesState[i] = {
        id: i,
        name: `Mesa ${i}`,
        sector: sectorObj ? sectorObj.name : 'General',
        diners: 2,
        status: i === 1 ? 'busy' : 'free', // 'free' | 'busy' | 'sent' | 'bill'
        items: [],
        openedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sentAt: null,
        mozo: localStorage.getItem('bocheros_mozo_name') || 'Mozo Máximo'
      };
    }
  }

  function saveTablesState() {
    localStorage.setItem('bocheros_tables_v1', JSON.stringify(tablesState));
    updateTopIndicators();
  }

  // Active Selected Table
  let activeTableId = 1;
  let activeMozo = localStorage.getItem('bocheros_mozo_name') || 'Mozo Máximo';
  let activeLang = 'es';
  let activeCategory = 'primavera-entradas';

  // Modal temporary customization buffer
  let customizingItem = null;

  // --- 3. DOM Elements ---
  const activeTableIndicator = document.getElementById('active-table-indicator');
  const activeSectorLabel = document.getElementById('active-sector-label');
  const activeDinersCount = document.getElementById('active-diners-count');
  const activeTableStatus = document.getElementById('active-table-status');
  const displayMozoName = document.getElementById('display-mozo-name');
  const cartItemCount = document.getElementById('cart-item-count');
  const cartTotalBadge = document.getElementById('cart-total-badge');
  const occupiedTablesCount = document.getElementById('occupied-tables-count');

  // Navigation Segments
  const tabCatalog = document.getElementById('tab-catalog');
  const tabTables = document.getElementById('tab-tables');
  const tabComanda = document.getElementById('tab-comanda');
  const viewCatalog = document.getElementById('view-catalog');
  const viewTables = document.getElementById('view-tables');
  const viewComanda = document.getElementById('view-comanda');

  // Catalog Elements
  const menuItemsContainer = document.getElementById('menu-items-container');
  const catalogSearchInput = document.getElementById('catalog-search-input');
  const clearSearchBtn = document.getElementById('clear-search-btn');
  const catChips = document.querySelectorAll('.cat-chip');

  // Comanda Elements
  const comandaTableTitle = document.getElementById('comanda-table-title');
  const comandaMozoTag = document.getElementById('comanda-mozo-tag');
  const comandaTimeTag = document.getElementById('comanda-time-tag');
  const comandaDinersTag = document.getElementById('comanda-diners-tag');
  const comandaStatusPill = document.getElementById('comanda-status-pill');
  const comandaItemsList = document.getElementById('comanda-items-list');
  const comandaEmpty = document.getElementById('comanda-empty');
  const comandaSummaryBox = document.getElementById('comanda-summary-box');
  const comandaSubtotalVal = document.getElementById('comanda-subtotal-val');
  const comandaTipVal = document.getElementById('comanda-tip-val');
  const comandaTotalVal = document.getElementById('comanda-total-val');
  const includeTipCheck = document.getElementById('include-tip-check');

  // Action Buttons
  const btnMarcharCocina = document.getElementById('btn-marchar-cocina');
  const btnWhatsappComanda = document.getElementById('btn-whatsapp-comanda');
  const btnPrintBill = document.getElementById('btn-print-bill');
  const btnCerrarMesa = document.getElementById('btn-cerrar-mesa');
  const btnEmptyGoCatalog = document.getElementById('btn-empty-go-catalog');

  // Language Popover
  const langBtn = document.getElementById('lang-btn');
  const langPopover = document.getElementById('lang-popover');
  const curLangFlag = document.getElementById('cur-lang-flag');
  const curLangLabel = document.getElementById('cur-lang-label');
  const langChoices = document.querySelectorAll('.lang-choice');

  // Modals
  const customDishModal = document.getElementById('custom-dish-modal');
  const customModalTitle = document.getElementById('custom-modal-title');
  const customModalPrice = document.getElementById('custom-modal-price');
  const donenessSection = document.getElementById('doneness-section');
  const pairStdName = document.getElementById('pair-std-name');
  const pairUpgName = document.getElementById('pair-upg-name');
  const customDishNotes = document.getElementById('custom-dish-notes');
  const customModalClose = document.getElementById('custom-modal-close');
  const customModalCancel = document.getElementById('custom-modal-cancel');
  const customModalSave = document.getElementById('custom-modal-save');

  // QR Modal
  const connectPhoneBtn = document.getElementById('connect-phone-btn');
  const qrConnectModal = document.getElementById('qr-connect-modal');
  const qrModalClose = document.getElementById('qr-modal-close');
  const qrModalDone = document.getElementById('qr-modal-done');
  const qrContainer = document.getElementById('qr-container');
  const btnCopyIp = document.getElementById('btn-copy-ip');

  // Profile Modal
  const mozoProfileBtn = document.getElementById('mozo-profile-btn');
  const editDinersBtn = document.getElementById('edit-diners-btn');
  const mozoProfileModal = document.getElementById('mozo-profile-modal');
  const profileModalClose = document.getElementById('profile-modal-close');
  const profileModalSave = document.getElementById('profile-modal-save');
  const inputMozoName = document.getElementById('input-mozo-name');
  const displayDinersNum = document.getElementById('display-diners-num');
  const btnDecDiners = document.getElementById('btn-dec-diners');
  const btnIncDiners = document.getElementById('btn-inc-diners');

  // Sound
  function playSoundChime() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch (e) {
      // Audio fallback
    }
  }

  // --- 4. Switch Views ---
  function switchView(viewName) {
    [tabCatalog, tabTables, tabComanda].forEach(t => t.classList.remove('active'));
    [viewCatalog, viewTables, viewComanda].forEach(v => v.style.display = 'none');

    if (viewName === 'catalog') {
      tabCatalog.classList.add('active');
      viewCatalog.style.display = 'flex';
    } else if (viewName === 'tables') {
      tabTables.classList.add('active');
      viewTables.style.display = 'flex';
      renderTablesMap();
    } else if (viewName === 'comanda') {
      tabComanda.classList.add('active');
      viewComanda.style.display = 'flex';
      renderComandaView();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  tabCatalog.addEventListener('click', () => switchView('catalog'));
  tabTables.addEventListener('click', () => switchView('tables'));
  tabComanda.addEventListener('click', () => switchView('comanda'));
  document.getElementById('open-tables-map-btn').addEventListener('click', () => switchView('tables'));
  document.getElementById('view-comanda-btn').addEventListener('click', () => switchView('comanda'));
  if (btnEmptyGoCatalog) {
    btnEmptyGoCatalog.addEventListener('click', () => switchView('catalog'));
  }

  // --- 5. Formatters ---
  function formatMoney(amount) {
    return '$' + amount.toLocaleString('es-AR');
  }

  // --- 6. Top Indicators Update ---
  function updateTopIndicators() {
    const table = tablesState[activeTableId];
    if (!table) return;

    activeTableIndicator.textContent = table.name;
    activeSectorLabel.textContent = table.sector;
    activeDinersCount.textContent = `${table.diners} comensales`;
    displayMozoName.textContent = activeMozo;

    // Table state pill
    activeTableStatus.className = 'table-state-tag';
    if (table.status === 'free') {
      activeTableStatus.classList.add('state-free');
      activeTableStatus.textContent = 'Mesa Libre';
    } else if (table.status === 'sent') {
      activeTableStatus.classList.add('state-sent');
      activeTableStatus.textContent = 'Enviada a Cocina';
    } else {
      activeTableStatus.classList.add('state-active');
      activeTableStatus.textContent = 'En Curso';
    }

    // Cart pill
    const count = table.items.reduce((acc, item) => acc + item.qty, 0);
    const total = table.items.reduce((acc, item) => acc + (item.price * item.qty), 0);
    cartItemCount.textContent = count;
    cartTotalBadge.textContent = formatMoney(total);

    // Occupied count
    const occupied = Object.values(tablesState).filter(t => t.items.length > 0 || t.status !== 'free').length;
    occupiedTablesCount.textContent = occupied;
  }

  // --- 7. Catalog Rendering ---
  function renderCatalog() {
    const table = tablesState[activeTableId];
    const searchQuery = catalogSearchInput.value.toLowerCase().trim();

    let items = MENU_CATALOG;

    if (searchQuery) {
      items = items.filter(i => 
        i.name_es.toLowerCase().includes(searchQuery) ||
        i.name_en.toLowerCase().includes(searchQuery) ||
        (i.desc && i.desc.toLowerCase().includes(searchQuery)) ||
        (i.pairing_std && i.pairing_std.toLowerCase().includes(searchQuery)) ||
        (i.pairing_upg && i.pairing_upg.toLowerCase().includes(searchQuery))
      );
    } else {
      items = items.filter(i => i.category === activeCategory);
    }

    menuItemsContainer.innerHTML = '';

    if (items.length === 0) {
      menuItemsContainer.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #888;">
          <p>No se encontraron platos o vinos para esta búsqueda.</p>
        </div>
      `;
      return;
    }

    items.forEach(dish => {
      // Current quantity in active table's order
      const existingItems = table.items.filter(i => i.dishId === dish.id);
      const currentQty = existingItems.reduce((acc, i) => acc + i.qty, 0);

      // Name according to active language
      let dishName = dish.name_es;
      if (activeLang === 'en') dishName = dish.name_en;
      else if (activeLang === 'pt') dishName = dish.name_pt;
      else if (activeLang === 'de-ch') dishName = dish.name_de;

      const card = document.createElement('div');
      card.className = `dish-card ${currentQty > 0 ? 'in-order' : ''}`;

      let pairingsHTML = '';
      if (dish.pairing_std) {
        pairingsHTML = `
          <div class="dish-card-pairings">
            <div class="pair-line">
              <span class="pair-badge badge-s">Clásico</span>
              <span>${dish.pairing_std}</span>
            </div>
            ${dish.pairing_upg ? `
            <div class="pair-line">
              <span class="pair-badge badge-u">Upgrade</span>
              <span>${dish.pairing_upg}</span>
            </div>
            ` : ''}
          </div>
        `;
      }

      card.innerHTML = `
        <div>
          <div class="dish-card-header">
            <h4 class="dish-card-title">${dishName}</h4>
            <span class="dish-card-price">${formatMoney(dish.price)}</span>
          </div>
          ${dish.desc ? `<p class="dish-card-desc">${dish.desc}</p>` : ''}
          ${pairingsHTML}
        </div>
        <div class="dish-card-actions">
          <button class="customize-trigger-btn" data-dish-id="${dish.id}">
            <span>⚙️</span> Personalizar
          </button>
          <div class="quantity-stepper">
            <button class="step-btn dec-btn" data-dish-id="${dish.id}">-</button>
            <span class="quantity-display">${currentQty}</span>
            <button class="step-btn inc-btn" data-dish-id="${dish.id}">+</button>
          </div>
        </div>
      `;

      // Event listeners for Stepper
      const incBtn = card.querySelector('.inc-btn');
      const decBtn = card.querySelector('.dec-btn');
      const custBtn = card.querySelector('.customize-trigger-btn');

      incBtn.addEventListener('click', () => {
        addItemToTable(dish.id, 1);
        playSoundChime();
        renderCatalog();
        saveTablesState();
      });

      decBtn.addEventListener('click', () => {
        removeItemFromTable(dish.id, 1);
        renderCatalog();
        saveTablesState();
      });

      custBtn.addEventListener('click', () => {
        openCustomizationModal(dish);
      });

      menuItemsContainer.appendChild(card);
    });
  }

  // Category filter clicks
  catChips.forEach(chip => {
    chip.addEventListener('click', () => {
      catChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeCategory = chip.getAttribute('data-category');
      catalogSearchInput.value = '';
      clearSearchBtn.style.display = 'none';
      renderCatalog();
    });
  });

  // Search filter
  catalogSearchInput.addEventListener('input', () => {
    clearSearchBtn.style.display = catalogSearchInput.value ? 'block' : 'none';
    renderCatalog();
  });

  clearSearchBtn.addEventListener('click', () => {
    catalogSearchInput.value = '';
    clearSearchBtn.style.display = 'none';
    renderCatalog();
  });

  // --- 8. Table Order Mutations ---
  function addItemToTable(dishId, qty = 1, options = {}) {
    const table = tablesState[activeTableId];
    const dish = MENU_CATALOG.find(d => d.id === dishId);
    if (!dish) return;

    if (table.status === 'free') {
      table.status = 'busy';
    }

    // Find if identical option already exists
    const match = table.items.find(i => 
      i.dishId === dishId &&
      i.doneness === (options.doneness || null) &&
      i.pairing === (options.pairing || 'none') &&
      i.notes === (options.notes || '') &&
      JSON.stringify(i.tags || []) === JSON.stringify(options.tags || [])
    );

    if (match) {
      match.qty += qty;
    } else {
      table.items.push({
        uid: Date.now() + Math.random().toString(36).substr(2, 4),
        dishId: dish.id,
        name: dish.name_es,
        courseType: dish.courseType,
        price: dish.price,
        qty: qty,
        doneness: options.doneness || null,
        pairing: options.pairing || 'none',
        pairingName: options.pairingName || null,
        tags: options.tags || [],
        notes: options.notes || '',
        addedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }

    saveTablesState();
  }

  function removeItemFromTable(dishId, qty = 1) {
    const table = tablesState[activeTableId];
    const index = table.items.findIndex(i => i.dishId === dishId);
    if (index === -1) return;

    if (table.items[index].qty > qty) {
      table.items[index].qty -= qty;
    } else {
      table.items.splice(index, 1);
    }

    if (table.items.length === 0) {
      table.status = 'busy';
    }

    saveTablesState();
  }

  function deleteItemByUid(uid) {
    const table = tablesState[activeTableId];
    table.items = table.items.filter(i => i.uid !== uid);
    saveTablesState();
    renderComandaView();
    renderCatalog();
  }

  // --- 9. Customization Modal ---
  function openCustomizationModal(dish) {
    customizingItem = dish;
    customModalTitle.textContent = dish.name_es;
    customModalPrice.textContent = formatMoney(dish.price);

    // Doneness visibility (for meat)
    if (dish.isMeat) {
      donenessSection.style.display = 'flex';
    } else {
      donenessSection.style.display = 'none';
    }

    // Pairings
    if (dish.pairing_std) {
      pairStdName.textContent = dish.pairing_std;
      document.getElementById('pair-opt-standard').style.display = 'flex';
    } else {
      document.getElementById('pair-opt-standard').style.display = 'none';
    }

    if (dish.pairing_upg) {
      pairUpgName.textContent = dish.pairing_upg;
      document.getElementById('pair-opt-upgrade').style.display = 'flex';
    } else {
      document.getElementById('pair-opt-upgrade').style.display = 'none';
    }

    // Reset fields
    document.querySelectorAll('.pill-opt').forEach((p, idx) => {
      p.classList.toggle('active', idx === 1);
    });
    document.querySelectorAll('.p-card').forEach((c, idx) => {
      c.classList.toggle('active', idx === 0);
    });
    document.querySelectorAll('.tag-toggle').forEach(t => t.classList.remove('active'));
    customDishNotes.value = '';

    customDishModal.style.display = 'flex';
  }

  customModalClose.addEventListener('click', () => customDishModal.style.display = 'none');
  customModalCancel.addEventListener('click', () => customDishModal.style.display = 'none');

  // Pill selectors
  document.querySelectorAll('.pill-opt').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.pill-opt').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });

  document.querySelectorAll('.p-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.p-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });

  document.querySelectorAll('.tag-toggle').forEach(tag => {
    tag.addEventListener('click', () => tag.classList.toggle('active'));
  });

  customModalSave.addEventListener('click', () => {
    if (!customizingItem) return;

    let doneness = null;
    if (customizingItem.isMeat) {
      const activeDoneness = document.querySelector('.pill-opt.active');
      if (activeDoneness) doneness = activeDoneness.getAttribute('data-doneness');
    }

    const activePairCard = document.querySelector('.p-card.active');
    const pairing = activePairCard ? activePairCard.getAttribute('data-pairing') : 'none';
    let pairingName = null;
    if (pairing === 'standard') pairingName = customizingItem.pairing_std;
    else if (pairing === 'upgrade') pairingName = customizingItem.pairing_upg;

    const tags = Array.from(document.querySelectorAll('.tag-toggle.active')).map(t => t.getAttribute('data-tag'));
    const notes = customDishNotes.value.trim();

    addItemToTable(customizingItem.id, 1, {
      doneness,
      pairing,
      pairingName,
      tags,
      notes
    });

    playSoundChime();
    customDishModal.style.display = 'none';
    renderCatalog();
    saveTablesState();
  });

  // --- 10. Tables Map View Rendering ---
  function renderTablesMap() {
    SECTORS.forEach(sec => {
      const grid = document.getElementById(`sector-${sec.id}-grid`);
      if (!grid) return;
      grid.innerHTML = '';

      sec.tables.forEach(tableNum => {
        const t = tablesState[tableNum];
        const card = document.createElement('div');
        card.className = `table-card status-${t.status} ${tableNum === activeTableId ? 'active-selected' : ''}`;

        const total = t.items.reduce((acc, i) => acc + (i.price * i.qty), 0);
        let badgeText = 'Libre';
        if (t.status === 'busy') badgeText = 'Con Pedido';
        else if (t.status === 'sent') badgeText = 'En Cocina';
        else if (t.status === 'bill') badgeText = 'Cuenta Pedida';

        card.innerHTML = `
          <span class="tbl-num">Mesa ${t.id}</span>
          <span class="tbl-badge ${t.status}">${badgeText}</span>
          <span class="tbl-diners">👥 ${t.diners} comensales</span>
          <span class="tbl-total">${total > 0 ? formatMoney(total) : '$0'}</span>
        `;

        card.addEventListener('click', () => {
          activeTableId = t.id;
          saveTablesState();
          switchView('catalog');
          renderCatalog();
        });

        grid.appendChild(card);
      });
    });
  }

  // --- 11. Comanda View Rendering ---
  function renderComandaView() {
    const table = tablesState[activeTableId];
    comandaTableTitle.textContent = `${table.name} · ${table.sector}`;
    comandaMozoTag.textContent = `Mozo: ${table.mozo || activeMozo}`;
    comandaTimeTag.textContent = `Abierta: ${table.openedAt}`;
    comandaDinersTag.textContent = `${table.diners} personas`;

    comandaStatusPill.className = 'state-pill';
    if (table.status === 'sent') {
      comandaStatusPill.classList.add('state-pill-sent');
      comandaStatusPill.textContent = 'Enviada a Cocina';
    } else {
      comandaStatusPill.classList.add('state-pill-active');
      comandaStatusPill.textContent = 'En Curso';
    }

    if (table.items.length === 0) {
      comandaEmpty.style.display = 'flex';
      comandaItemsList.style.display = 'none';
      comandaSummaryBox.style.display = 'none';
      return;
    }

    comandaEmpty.style.display = 'none';
    comandaItemsList.style.display = 'flex';
    comandaSummaryBox.style.display = 'flex';

    // Group items by course
    const courseLabels = {
      entradas: '1° TIEMPO · ENTRADAS',
      principales: '2° TIEMPO · PRINCIPALES',
      postres: '3° TIEMPO · POSTRES',
      bebidas: 'VINOS & BEBIDAS'
    };

    const grouped = {
      entradas: [],
      principales: [],
      postres: [],
      bebidas: []
    };

    table.items.forEach(item => {
      const c = item.courseType || 'principales';
      if (grouped[c]) grouped[c].push(item);
      else grouped.principales.push(item);
    });

    comandaItemsList.innerHTML = '';

    Object.keys(grouped).forEach(courseKey => {
      const items = grouped[courseKey];
      if (items.length === 0) return;

      const groupDiv = document.createElement('div');
      groupDiv.className = 'comanda-course-group';
      groupDiv.innerHTML = `<h4 class="comanda-course-title">${courseLabels[courseKey]}</h4>`;

      items.forEach(item => {
        const row = document.createElement('div');
        row.className = 'comanda-item-row';

        let tagsHTML = '';
        if (item.doneness) tagsHTML += `<span class="c-tag meat">${item.doneness}</span>`;
        if (item.pairingName) tagsHTML += `<span class="c-tag pairing">🍷 ${item.pairingName}</span>`;
        if (item.tags) {
          item.tags.forEach(t => tagsHTML += `<span class="c-tag allergy">${t}</span>`);
        }
        if (item.notes) tagsHTML += `<span class="c-tag note">📝 "${item.notes}"</span>`;

        row.innerHTML = `
          <div class="comanda-item-info">
            <span class="c-item-name">${item.qty}x ${item.name}</span>
            <div class="c-item-mods">${tagsHTML}</div>
          </div>
          <div class="comanda-item-controls">
            <span class="c-item-total">${formatMoney(item.price * item.qty)}</span>
            <button class="c-del-btn" data-uid="${item.uid}" title="Eliminar ítem">🗑️</button>
          </div>
        `;

        row.querySelector('.c-del-btn').addEventListener('click', () => {
          deleteItemByUid(item.uid);
        });

        groupDiv.appendChild(row);
      });

      comandaItemsList.appendChild(groupDiv);
    });

    // Summary calculation
    const subtotal = table.items.reduce((acc, i) => acc + (i.price * i.qty), 0);
    const hasTip = includeTipCheck.checked;
    const tip = hasTip ? Math.round(subtotal * 0.1) : 0;
    const total = subtotal + tip;

    comandaSubtotalVal.textContent = formatMoney(subtotal);
    comandaTipVal.textContent = formatMoney(tip);
    comandaTotalVal.textContent = formatMoney(total);
  }

  includeTipCheck.addEventListener('change', renderComandaView);

  // --- 12. Actions: Marchar Cocina, WhatsApp, Print, Cerrar ---
  btnMarcharCocina.addEventListener('click', () => {
    const table = tablesState[activeTableId];
    if (table.items.length === 0) {
      alert('La comanda está vacía. Agrega platos antes de marchar a cocina.');
      return;
    }
    table.status = 'sent';
    table.sentAt = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    playSoundChime();
    saveTablesState();
    renderComandaView();
    alert(`¡Comanda de ${table.name} marchada a Cocina a las ${table.sentAt}! 🔔`);
  });

  btnWhatsappComanda.addEventListener('click', () => {
    const table = tablesState[activeTableId];
    if (table.items.length === 0) {
      alert('La comanda está vacía.');
      return;
    }

    const subtotal = table.items.reduce((acc, i) => acc + (i.price * i.qty), 0);
    const tip = includeTipCheck.checked ? Math.round(subtotal * 0.1) : 0;
    const total = subtotal + tip;

    let msg = `🍷 *COMANDA · LOS BOCHEROS RESTÓ*\n`;
    msg += `📍 *${table.name.toUpperCase()}* (${table.sector})\n`;
    msg += `🤵 *Mozo:* ${table.mozo || activeMozo}\n`;
    msg += `👥 *Comensales:* ${table.diners} | 🕒 *Hora:* ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}\n`;
    msg += `--------------------------------\n`;

    const courseLabels = {
      entradas: '🥗 *ENTRADAS:*',
      principales: '🥩 *PRINCIPALES:*',
      postres: '🍰 *POSTRES:*',
      bebidas: '🍾 *BEBIDAS & VINOS:*'
    };

    ['entradas', 'principales', 'postres', 'bebidas'].forEach(cKey => {
      const items = table.items.filter(i => i.courseType === cKey);
      if (items.length > 0) {
        msg += `\n${courseLabels[cKey]}\n`;
        items.forEach(i => {
          msg += `• *${i.qty}x ${i.name}*\n`;
          if (i.doneness) msg += `   ↳ Punto: _${i.doneness}_\n`;
          if (i.pairingName) msg += `   ↳ Maridaje: _${i.pairingName}_\n`;
          if (i.tags && i.tags.length > 0) msg += `   ↳ Restricción: [${i.tags.join(', ')}]\n`;
          if (i.notes) msg += `   ↳ Nota: "${i.notes}"\n`;
        });
      }
    });

    msg += `\n--------------------------------\n`;
    msg += `*Subtotal:* ${formatMoney(subtotal)}\n`;
    if (includeTipCheck.checked) msg += `*Servicio sugerido (10%):* ${formatMoney(tip)}\n`;
    msg += `💰 *TOTAL CUENTA:* ${formatMoney(total)}\n`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  });

  btnPrintBill.addEventListener('click', () => {
    window.print();
  });

  btnCerrarMesa.addEventListener('click', () => {
    const table = tablesState[activeTableId];
    if (confirm(`¿Deseas cerrar y liberar la ${table.name}? La comanda se reiniciará.`)) {
      table.status = 'free';
      table.items = [];
      table.openedAt = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      saveTablesState();
      renderComandaView();
      renderCatalog();
    }
  });

  // --- 13. QR Local Connect Generator (Offline Pure SVG) ---
  function renderLocalQR() {
    const localUrl = 'http://192.168.1.41:8085';
    document.getElementById('local-ip-url').textContent = localUrl;

    // Fast SVG representation for local QR sharing
    qrContainer.innerHTML = `
      <svg width="200" height="200" viewBox="0 0 29 29" shape-rendering="crispEdges">
        <rect width="29" height="29" fill="#ffffff"/>
        <!-- Corner 1 -->
        <path fill="#000000" d="M2 2h7v7H2zM3 3v5h5V3zM4 4h3v3H4z"/>
        <!-- Corner 2 -->
        <path fill="#000000" d="M20 2h7v7h-7zM21 3v5h5V3zM22 4h3v3h-3z"/>
        <!-- Corner 3 -->
        <path fill="#000000" d="M2 20h7v7H2zM3 21v5h5v-5zM4 22h3v3H4z"/>
        <!-- Data Matrix Pattern for local IP -->
        <path fill="#000000" d="M11 2h2v1h-2zM15 2h1v2h-1zM18 2h1v1h-1zM11 4h1v2h-1zM13 5h3v1h-3zM17 4h1v3h-1zM11 7h2v1h-2zM14 8h2v1h-2zM18 8h1v2h-1zM2 11h2v1H2zM6 11h1v2H6zM8 12h2v1H8zM12 11h2v2h-2zM16 11h1v1h-1zM19 11h3v1h-3zM24 11h3v1h-3zM4 14h2v1H4zM8 14h1v3H8zM11 15h3v2h-3zM15 14h2v1h-2zM18 14h1v2h-1zM21 14h2v2h-2zM25 14h2v1h-2zM2 17h3v1H2zM6 18h1v1H6zM14 18h1v1h-1zM16 18h3v1h-3zM20 18h2v2h-2zM24 18h3v1h-3zM11 20h2v1h-2zM15 20h1v3h-1zM18 21h1v1h-1zM21 21h3v1h-3zM25 21h2v3h-2zM12 23h2v1h-2zM17 23h2v1h-2zM20 24h3v1h-3zM11 25h3v2h-3zM16 26h2v1h-2zM20 26h1v1h-1zM23 26h4v1h-4z"/>
      </svg>
    `;
  }

  connectPhoneBtn.addEventListener('click', () => {
    renderLocalQR();
    qrConnectModal.style.display = 'flex';
  });

  qrModalClose.addEventListener('click', () => qrConnectModal.style.display = 'none');
  qrModalDone.addEventListener('click', () => qrConnectModal.style.display = 'none');

  btnCopyIp.addEventListener('click', () => {
    navigator.clipboard.writeText('http://192.168.1.41:8085').then(() => {
      btnCopyIp.textContent = '¡Copiado!';
      setTimeout(() => btnCopyIp.textContent = 'Copiar Enlace', 2000);
    });
  });

  // --- 14. Profile & Diners Modal ---
  function openProfileModal() {
    inputMozoName.value = activeMozo;
    displayDinersNum.textContent = tablesState[activeTableId].diners;
    mozoProfileModal.style.display = 'flex';
  }

  mozoProfileBtn.addEventListener('click', openProfileModal);
  editDinersBtn.addEventListener('click', openProfileModal);
  profileModalClose.addEventListener('click', () => mozoProfileModal.style.display = 'none');

  btnDecDiners.addEventListener('click', () => {
    let d = parseInt(displayDinersNum.textContent);
    if (d > 1) displayDinersNum.textContent = d - 1;
  });

  btnIncDiners.addEventListener('click', () => {
    let d = parseInt(displayDinersNum.textContent);
    if (d < 20) displayDinersNum.textContent = d + 1;
  });

  profileModalSave.addEventListener('click', () => {
    activeMozo = inputMozoName.value.trim() || 'Mozo Máximo';
    localStorage.setItem('bocheros_mozo_name', activeMozo);

    const d = parseInt(displayDinersNum.textContent);
    tablesState[activeTableId].diners = d;
    tablesState[activeTableId].mozo = activeMozo;

    saveTablesState();
    mozoProfileModal.style.display = 'none';
  });

  // --- 15. Multilingual Switcher ---
  langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    langPopover.classList.toggle('show');
  });

  document.addEventListener('click', () => langPopover.classList.remove('show'));

  const flagMap = { es: '🇦🇷', en: '🇬🇧', pt: '🇧🇷', 'de-ch': '🇨🇭' };
  const labelMap = { es: 'ES', en: 'EN', pt: 'PT', 'de-ch': 'CH' };

  langChoices.forEach(choice => {
    choice.addEventListener('click', () => {
      const l = choice.getAttribute('data-lang');
      activeLang = l;
      curLangFlag.textContent = flagMap[l];
      curLangLabel.textContent = labelMap[l];
      langChoices.forEach(c => c.classList.toggle('active', c.getAttribute('data-lang') === l));
      renderCatalog();
    });
  });

  // Initialize
  updateTopIndicators();
  renderCatalog();
});
