/**
 * Los Bocheros Restó · Lamadrid Estate Wines
 * App Simplificada de Comandas para Mozos
 * Desglose por Comensal + Mapa de Mesas + Envío a WhatsApp
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Catálogo de Platos, Maridajes y Precios ---
  const MENU_OPTIONS = {
    entradas: [
      { id: 'ninguna', name: 'Ninguna', price: 0 },
      { id: 'sp_e1', name: 'Espárragos a la plancha, parmesano, almendras y yema curada', price: 18000, std: 'Lamadrid Blanc de Blancs', upg: 'Lamadrid Gran Reserva Chardonnay' },
      { id: 'sp_e2', name: 'Provoleta asada con chimichurri rojo casero', price: 25000, std: 'Lamadrid Terroir Selection Malbec', upg: 'Lamadrid Reserva Cabernet Sauvignon' },
      { id: 'sp_e3', name: 'Solomillo de cerdo curado al Malbec con manzana verde', price: 21000, std: 'Lamadrid Terroir Selection Bonarda', upg: 'Lamadrid Reserva Malbec' },
      { id: 'sp_e4', name: 'Queso de cabra, remolacha asada, yogur y frambuesas', price: 18000, std: 'Lamadrid Terroir Selection Cabernet', upg: 'Lamadrid Reserva Cabernet Sauvignon' },
      { id: 'sp_e5', name: 'Especial Dúo Empanadas Los Bocheros', price: 16000, std: 'Lamadrid Reserva Malbec', upg: 'Lamadrid Gran Reserva Malbec' }
    ],
    principales: [
      { id: 'ninguno', name: 'Ninguno', price: 0 },
      { id: 'sp_p1', name: 'Costilla confitada, cremoso de papa, Morbier y panceta', price: 34000, std: 'Lamadrid Gran Reserva Malbec', upg: 'Guillermo Cabernet Sauvignon', isMeat: true },
      { id: 'sp_p2', name: 'Pasta artesanal de hongos, arvejas y muhammara', price: 29000, std: 'Lamadrid Gran Reserva Cabernet Franc', upg: 'Matilde Malbec (Ícono)' },
      { id: 'sp_p3', name: 'Trucha a la plancha, curry de alcauciles y cuscús', price: 36000, std: 'Lamadrid Gran Reserva Chardonnay', upg: 'Begani Private Selection' },
      { id: 'sp_p4', name: 'Ojo de bife y vegetales frescos de temporada salteados', price: 36000, std: 'Lamadrid Gran Reserva Malbec', upg: 'Matilde Malbec (Ícono)', isMeat: true }
    ],
    postres: [
      { id: 'ninguno', name: 'Ninguno', price: 0 },
      { id: 'sp_d1', name: 'Pera pochada, mascarpone, toffee y queso pepato', price: 16000, std: 'ZunZun Pet Nat', upg: 'Margarita Espumoso' },
      { id: 'sp_d2', name: 'Tarta flan caramelizada con helado', price: 17000, std: 'ZunZun Pet Nat', upg: 'Margarita Espumoso' },
      { id: 'sp_d3', name: 'Selección artesanal de quesos y dulces de estación', price: 16000, std: 'ZunZun Pet Nat', upg: 'Margarita Espumoso' },
      { id: 'sp_d4', name: 'Clásico panqueque casero tibio con dulce de leche', price: 18000, std: 'ZunZun Pet Nat', upg: 'Margarita Espumoso' }
    ],
    otono7Pasos: {
      name: 'Menú Otoño 7 Pasos Completo',
      price: 58000,
      std: 'Maridaje Clásico Lamadrid (Incluido)',
      upg: 'Maridaje Upgrade Gran Reserva & Matilde (+$18.000)'
    }
  };

  // --- 2. Sectores y Mesas ---
  const SECTORS_DEF = [
    { id: 'terraza', name: '🌿 Terraza Viñedos', tables: [1, 2, 3, 4, 5] },
    { id: 'galeria', name: '🧱 Galería Adobe', tables: [6, 7, 8, 9, 10] },
    { id: 'salon', name: '🍷 Salón Barricas', tables: [11, 12, 13, 14] },
    { id: 'pergola', name: '🍇 Pérgola Las Compuertas', tables: [15, 16] }
  ];

  // --- 3. Estado en LocalStorage ---
  let tablesData = {};
  const savedTables = localStorage.getItem('bocheros_mesas_v2');
  if (savedTables) {
    try {
      tablesData = JSON.parse(savedTables);
    } catch (e) {
      tablesData = {};
    }
  }

  // Ensure default structures for all 16 tables
  for (let i = 1; i <= 16; i++) {
    if (!tablesData[i]) {
      const sec = SECTORS_DEF.find(s => s.tables.includes(i));
      tablesData[i] = {
        id: i,
        name: `Mesa ${i}`,
        sector: sec ? sec.name : 'General',
        openedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        comensales: [
          createDefaultComensal(1),
          createDefaultComensal(2)
        ],
        bebidas: []
      };
    }
  }

  function createDefaultComensal(num) {
    return {
      num: num,
      tipoMenu: 'primavera', // 'primavera' | 'otono'
      entradaId: 'sp_e2', // Provoleta por defecto
      principalId: 'sp_p4', // Ojo de bife por defecto
      doneness: 'A Punto',
      postreId: 'sp_d2', // Tarta flan por defecto
      maridaje: 'standard', // 'none' | 'standard' | 'upgrade'
      tags: [],
      notas: ''
    };
  }

  function saveTablesState() {
    localStorage.setItem('bocheros_mesas_v2', JSON.stringify(tablesData));
  }

  // Active state
  let activeTableId = 1;
  let targetWhatsAppNumber = localStorage.getItem('bocheros_wa_number') || '';
  let activeMozoName = localStorage.getItem('bocheros_mozo_name') || 'Máximo';

  // --- 4. DOM Elements ---
  const panelMapaMesas = document.getElementById('panel-mapa-mesas');
  const panelComandaMesa = document.getElementById('panel-comanda-mesa');
  const sectorsContainer = document.getElementById('sectors-container');

  const btnGoMap = document.getElementById('btn-go-map');
  const btnBackToMap = document.getElementById('btn-back-to-map');
  const titleActiveTable = document.getElementById('title-active-table');
  const labelTableTime = document.getElementById('label-table-time');
  const btnAddComensalTop = document.getElementById('btn-add-comensal-top');
  const btnAddComensal = document.getElementById('btn-add-comensal');
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

  // --- 5. WhatsApp Target Helper ---
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

  // --- 6. View Switcher ---
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  btnGoMap.addEventListener('click', showMapa);
  btnBackToMap.addEventListener('click', showMapa);

  // --- 7. Render Mapa de Mesas ---
  function renderMapaMesas() {
    sectorsContainer.innerHTML = '';

    SECTORS_DEF.forEach(sector => {
      const card = document.createElement('div');
      card.className = 'sector-card';

      let tablesHTML = '';
      sector.tables.forEach(num => {
        const t = tablesData[num];
        const hasOrder = (t.comensales && t.comensales.length > 0) || (t.bebidas && t.bebidas.length > 0);
        const count = t.comensales ? t.comensales.length : 0;
        const total = calculateTableTotal(t);

        tablesHTML += `
          <button class="table-btn ${hasOrder ? 'busy' : ''}" data-table-id="${num}">
            <span class="tbl-name">${t.name}</span>
            <span class="tbl-status-badge ${hasOrder ? 'busy' : 'free'}">
              ${hasOrder ? 'Con Comanda' : 'Libre'}
            </span>
            <span class="tbl-info">${count} comensales</span>
            ${total > 0 ? `<span class="tbl-total">$${total.toLocaleString('es-AR')}</span>` : ''}
          </button>
        `;
      });

      card.innerHTML = `
        <div class="sector-header">${sector.name}</div>
        <div class="tables-row">${tablesHTML}</div>
      `;

      card.querySelectorAll('.table-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const tid = parseInt(btn.getAttribute('data-table-id'));
          showComanda(tid);
        });
      });

      sectorsContainer.appendChild(card);
    });
  }

  // --- 8. Calculate Table Total ---
  function calculateTableTotal(table) {
    let total = 0;

    // Comensales
    if (table.comensales) {
      table.comensales.forEach(c => {
        if (c.tipoMenu === 'otono') {
          total += MENU_OPTIONS.otono7Pasos.price;
          if (c.maridaje === 'upgrade') total += 18000;
        } else {
          const e = MENU_OPTIONS.entradas.find(i => i.id === c.entradaId);
          const p = MENU_OPTIONS.principales.find(i => i.id === c.principalId);
          const d = MENU_OPTIONS.postres.find(i => i.id === c.postreId);
          if (e) total += e.price;
          if (p) total += p.price;
          if (d) total += d.price;
        }
      });
    }

    // Bebidas
    if (table.bebidas) {
      table.bebidas.forEach(b => {
        total += b.price * b.qty;
      });
    }

    return total;
  }

  // --- 9. Render Comanda por Comensal ---
  function renderComandaMesa() {
    const table = tablesData[activeTableId];
    if (!table) return;

    titleActiveTable.textContent = `${table.name} · ${table.sector}`;
    labelTableTime.textContent = `Abierta: ${table.openedAt}`;

    comensalesList.innerHTML = '';

    table.comensales.forEach((comensal, idx) => {
      const cNum = idx + 1;
      comensal.num = cNum; // normalize

      const card = document.createElement('div');
      card.className = 'comensal-card';

      // Check if principal is meat for doneness
      const selectedPrincipal = MENU_OPTIONS.principales.find(p => p.id === comensal.principalId);
      const isMeat = selectedPrincipal && selectedPrincipal.isMeat;

      // Build options for select
      const entradasOpts = MENU_OPTIONS.entradas.map(e => `
        <option value="${e.id}" ${e.id === comensal.entradaId ? 'selected' : ''}>
          ${e.name} ${e.price > 0 ? `($${e.price.toLocaleString('es-AR')})` : ''}
        </option>
      `).join('');

      const principalesOpts = MENU_OPTIONS.principales.map(p => `
        <option value="${p.id}" ${p.id === comensal.principalId ? 'selected' : ''}>
          ${p.name} ${p.price > 0 ? `($${p.price.toLocaleString('es-AR')})` : ''}
        </option>
      `).join('');

      const postresOpts = MENU_OPTIONS.postres.map(d => `
        <option value="${d.id}" ${d.id === comensal.postreId ? 'selected' : ''}>
          ${d.name} ${d.price > 0 ? `($${d.price.toLocaleString('es-AR')})` : ''}
        </option>
      `).join('');

      // Quick dietary tags
      const TAGS_LIST = ['Sin TACC', 'Sin Sal', 'Vegetariano', 'Vegano', 'Sin Cebolla', 'Sin Frutos Secos', 'Para Compartir'];
      const tagsHTML = TAGS_LIST.map(tag => {
        const isAct = comensal.tags && comensal.tags.includes(tag);
        return `<button class="tag-btn ${isAct ? 'active' : ''}" data-tag="${tag}">${tag}</button>`;
      }).join('');

      // Body depending on menu type
      let bodyContentHTML = '';
      if (comensal.tipoMenu === 'otono') {
        bodyContentHTML = `
          <div style="background: #fbf7f0; border: 1px solid #c09d63; border-radius: 8px; padding: 0.9rem; text-align: center;">
            <strong style="color: #123258; display: block; font-size: 0.95rem;">🍂 Menú Degustación Otoño 7 Pasos</strong>
            <span style="font-size: 0.8rem; color: #6b635c;">
              Queso de cabra, Gírgola, Molleja, Empanada Los Bocheros, Ojo de bife, Yogurt y Chocolate amargo
            </span>
            <div style="font-weight: 800; color: #7a2233; margin-top: 0.4rem;">$58.000 por persona</div>
          </div>
        `;
      } else {
        bodyContentHTML = `
          <div class="comensal-options-grid">
            <!-- Entrada -->
            <div class="choice-group">
              <label class="choice-label">🥗 Entrada:</label>
              <select class="choice-select select-entrada" data-cidx="${idx}">
                ${entradasOpts}
              </select>
            </div>

            <!-- Principal -->
            <div class="choice-group">
              <label class="choice-label">🥩 Plato Principal:</label>
              <select class="choice-select select-principal" data-cidx="${idx}">
                ${principalesOpts}
              </select>
              
              <!-- Punto de Carne (si es Ojo de bife o Costilla) -->
              <div class="meat-doneness-row" style="display: ${isMeat ? 'flex' : 'none'};">
                <button class="doneness-btn ${comensal.doneness === 'Jugoso' ? 'active' : ''}" data-val="Jugoso" data-cidx="${idx}">🥩 Jugoso</button>
                <button class="doneness-btn ${comensal.doneness === 'A Punto' ? 'active' : ''}" data-val="A Punto" data-cidx="${idx}">🥩 A Punto</button>
                <button class="doneness-btn ${comensal.doneness === 'Cocido' ? 'active' : ''}" data-val="Cocido" data-cidx="${idx}">🥩 Cocido</button>
              </div>
            </div>

            <!-- Postre -->
            <div class="choice-group">
              <label class="choice-label">🍰 Postre:</label>
              <select class="choice-select select-postre" data-cidx="${idx}">
                ${postresOpts}
              </select>
            </div>
          </div>
        `;
      }

      card.innerHTML = `
        <div class="comensal-header">
          <span class="comensal-tag">👤 COMENSAL ${cNum}</span>
          ${table.comensales.length > 1 ? `<button class="btn-del-comensal" data-cidx="${idx}">🗑️ Quitar Comensal</button>` : ''}
        </div>

        <!-- Selector de Tipo de Menú -->
        <div class="menu-type-selector">
          <button class="btn-menu-type ${comensal.tipoMenu === 'primavera' ? 'active' : ''}" data-type="primavera" data-cidx="${idx}">
            🌸 Carta Primavera
          </button>
          <button class="btn-menu-type ${comensal.tipoMenu === 'otono' ? 'active' : ''}" data-type="otono" data-cidx="${idx}">
            🍂 Menú Otoño (7 Pasos)
          </button>
        </div>

        <!-- Opciones de Comida -->
        ${bodyContentHTML}

        <!-- Maridaje -->
        <div class="choice-group">
          <label class="choice-label">🍷 Maridaje del Comensal:</label>
          <div class="pairing-pills-row">
            <button class="pairing-pill-btn ${comensal.maridaje === 'none' ? 'active' : ''}" data-pair="none" data-cidx="${idx}">
              Sin Maridaje
            </button>
            <button class="pairing-pill-btn ${comensal.maridaje === 'standard' ? 'active' : ''}" data-pair="standard" data-cidx="${idx}">
              🍷 Maridaje Clásico
            </button>
            <button class="pairing-pill-btn ${comensal.maridaje === 'upgrade' ? 'active' : ''}" data-pair="upgrade" data-cidx="${idx}">
              ✨ Maridaje Upgrade
            </button>
          </div>
        </div>

        <!-- Anotaciones y Restricciones del Comensal -->
        <div class="choice-group">
          <label class="choice-label">📝 Anotaciones / Restricciones:</label>
          <div class="quick-tags-wrap" data-cidx="${idx}">
            ${tagsHTML}
          </div>
          <input type="text" class="comensal-note-input input-nota-comensal" data-cidx="${idx}" 
                 placeholder="Ej: Sin sal, alérgico a nueces, marchar después..." value="${comensal.notas || ''}">
        </div>
      `;

      // Listeners for comensal inputs
      // Menu Type
      card.querySelectorAll('.btn-menu-type').forEach(btn => {
        btn.addEventListener('click', () => {
          const tType = btn.getAttribute('data-type');
          comensal.tipoMenu = tType;
          saveTablesState();
          renderComandaMesa();
        });
      });

      // Selects
      const selEntrada = card.querySelector('.select-entrada');
      if (selEntrada) {
        selEntrada.addEventListener('change', (e) => {
          comensal.entradaId = e.target.value;
          saveTablesState();
          updateSummaryFooter();
        });
      }

      const selPrincipal = card.querySelector('.select-principal');
      if (selPrincipal) {
        selPrincipal.addEventListener('change', (e) => {
          comensal.principalId = e.target.value;
          saveTablesState();
          renderComandaMesa(); // re-render for meat doneness visibility
        });
      }

      const selPostre = card.querySelector('.select-postre');
      if (selPostre) {
        selPostre.addEventListener('change', (e) => {
          comensal.postreId = e.target.value;
          saveTablesState();
          updateSummaryFooter();
        });
      }

      // Doneness buttons
      card.querySelectorAll('.doneness-btn').forEach(dBtn => {
        dBtn.addEventListener('click', () => {
          comensal.doneness = dBtn.getAttribute('data-val');
          card.querySelectorAll('.doneness-btn').forEach(b => b.classList.remove('active'));
          dBtn.classList.add('active');
          saveTablesState();
        });
      });

      // Maridaje buttons
      card.querySelectorAll('.pairing-pill-btn').forEach(pBtn => {
        pBtn.addEventListener('click', () => {
          comensal.maridaje = pBtn.getAttribute('data-pair');
          card.querySelectorAll('.pairing-pill-btn').forEach(b => b.classList.remove('active'));
          pBtn.classList.add('active');
          saveTablesState();
          updateSummaryFooter();
        });
      });

      // Tags
      card.querySelectorAll('.tag-btn').forEach(tBtn => {
        tBtn.addEventListener('click', () => {
          const tVal = tBtn.getAttribute('data-tag');
          if (!comensal.tags) comensal.tags = [];
          if (comensal.tags.includes(tVal)) {
            comensal.tags = comensal.tags.filter(t => t !== tVal);
            tBtn.classList.remove('active');
          } else {
            comensal.tags.push(tVal);
            tBtn.classList.add('active');
          }
          saveTablesState();
        });
      });

      // Note input
      const noteInput = card.querySelector('.input-nota-comensal');
      if (noteInput) {
        noteInput.addEventListener('input', (e) => {
          comensal.notas = e.target.value;
          saveTablesState();
        });
      }

      // Delete comensal
      const delBtn = card.querySelector('.btn-del-comensal');
      if (delBtn) {
        delBtn.addEventListener('click', () => {
          table.comensales.splice(idx, 1);
          saveTablesState();
          renderComandaMesa();
        });
      }

      comensalesList.appendChild(card);
    });

    renderSharedDrinks();
    updateSummaryFooter();
  }

  // --- 10. Shared Drinks Operations ---
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

  // --- 11. Add Comensal ---
  function addComensalToTable() {
    const table = tablesData[activeTableId];
    const nextNum = (table.comensales.length || 0) + 1;
    table.comensales.push(createDefaultComensal(nextNum));
    saveTablesState();
    renderComandaMesa();
  }

  btnAddComensal.addEventListener('click', addComensalToTable);
  btnAddComensalTop.addEventListener('click', addComensalToTable);

  // --- 12. Summary Footer Calculation ---
  function updateSummaryFooter() {
    const table = tablesData[activeTableId];
    if (!table) return;

    const count = table.comensales ? table.comensales.length : 0;
    summaryDinersLabel.textContent = `${count} Comensales`;

    const total = calculateTableTotal(table);
    summaryTotalAmount.textContent = `$${total.toLocaleString('es-AR')}`;
  }

  // --- 13. Vaciar Mesa ---
  btnVaciarMesa.addEventListener('click', () => {
    const table = tablesData[activeTableId];
    if (confirm(`¿Reiniciar y vaciar la ${table.name}?`)) {
      table.comensales = [createDefaultComensal(1), createDefaultComensal(2)];
      table.bebidas = [];
      table.openedAt = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      saveTablesState();
      renderComandaMesa();
    }
  });

  // --- 14. Generar y Enviar Comanda a WhatsApp ---
  btnSendComandaWa.addEventListener('click', () => {
    // Si no hay número configurado, abrir modal
    if (!targetWhatsAppNumber) {
      openWaModal();
      return;
    }

    const table = tablesData[activeTableId];
    const total = calculateTableTotal(table);

    // Build Formatted Message
    let msg = `🍷 *COMANDA · LOS BOCHEROS RESTÓ*\n`;
    msg += `📍 *${table.name.toUpperCase()}* (${table.sector})\n`;
    msg += `🤵 *Mozo:* ${activeMozoName}\n`;
    msg += `🕒 *Hora:* ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} | 👥 *${table.comensales.length} Comensales*\n`;
    msg += `--------------------------------\n`;

    table.comensales.forEach((c, idx) => {
      msg += `\n👤 *COMENSAL ${idx + 1}*`;

      if (c.tipoMenu === 'otono') {
        msg += ` _(🍂 Menú Otoño 7 Pasos)_\n`;
        msg += `• Menú Degustación 7 Pasos Completo\n`;
      } else {
        msg += ` _(🌸 Carta Primavera)_\n`;
        const e = MENU_OPTIONS.entradas.find(i => i.id === c.entradaId);
        const p = MENU_OPTIONS.principales.find(i => i.id === c.principalId);
        const d = MENU_OPTIONS.postres.find(i => i.id === c.postreId);

        if (e && e.id !== 'ninguna') msg += `• *Entrada:* ${e.name}\n`;
        if (p && p.id !== 'ninguno') {
          msg += `• *Principal:* ${p.name}`;
          if (p.isMeat && c.doneness) msg += ` [Punto: ${c.doneness}]`;
          msg += `\n`;
        }
        if (d && d.id !== 'ninguno') msg += `• *Postre:* ${d.name}\n`;
      }

      // Maridaje
      if (c.maridaje === 'standard') {
        msg += `  ↳ *Maridaje:* Clásico Lamadrid\n`;
      } else if (c.maridaje === 'upgrade') {
        msg += `  ↳ *Maridaje:* Upgrade de Autor\n`;
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

  // --- 15. Configuración de WhatsApp Modal ---
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
    localStorage.setItem('bocheros_wa_number', targetWhatsAppNumber);

    activeMozoName = inputMozoName.value.trim() || 'Máximo';
    localStorage.setItem('bocheros_mozo_name', activeMozoName);

    updateWaTargetDisplay();
    modalWaConfig.style.display = 'none';

    alert(`¡Número ${targetWhatsAppNumber} guardado con éxito! Las comandas se enviarán a este WhatsApp.`);
  });

  // Initialize
  renderMapaMesas();
});
