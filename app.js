/**
 * Los Bocheros Restó · Lamadrid Estate Wines
 * Interactive Menu Application
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Data Translations & Content ---
  const translations = {
    es: {
      filter_all: 'Todos los Maridajes',
      filter_standard: 'Clásico',
      filter_upgrade: 'Upgrade',
      print_btn: 'Imprimir',
      rest_pretitle: 'RESTAURANTE DE BODEGA',
      season_tag: 'TEMPORADA 2026',
      menu_autumn_title: 'MENÚ OTOÑO',
      steps_count: 'SIETE PASOS',
      terroir_pill: 'Finca Las Compuertas · 1.050 m.s.n.m. · Viñas Centenarias',
      allergy_notice: 'Consulte a nuestro personal sobre restricciones alimentarias y alergias.',
      veg_notice: '(Disponemos de adaptaciones vegetarianas, veganas y celíacas con previo aviso)',
      view_full_card: 'Carta Completa',
      view_step_by_step: 'Paso a Paso Interactivo',
      card_menu_label: 'MENÚ OTOÑO · SIETE PASOS',
      btn_prev_step: 'Paso Anterior',
      btn_next_step: 'Siguiente Paso',
      badge_pairing: 'Maridaje:',
      badge_upgrade: 'Upgrade:',
      badge_iconic: 'Ícono Upgrade:',
      specialty_tag: 'Especialidad',
      main_tag: 'Principal',
      cleanser_tag: 'Pre-Postre',
      cleanser_info: 'Intermedio refrescante y limpiador de paladar antes del paso final.',
      dessert_tag: 'Postre Final',
      quote_text: '"En cada copa y en cada plato celebramos la tierra, el agua pura de deshielo y la pasión de nuestra gente en Las Compuertas."',
      col_reservations: 'RESERVAS & VISITAS',
      col_location: 'UBICACIÓN',
      story_1_title: 'El Terruño de Las Compuertas',
      story_1_desc: 'Situado en la primera zona de Luján de Cuyo a 1.050 metros sobre el nivel del mar, con suelos aluviales pedregosos y la brisa constante de la Cordillera de los Andes que otorgan una frescura inigualable a nuestros vinos.',
      story_2_title: 'AOVE Lamadrid',
      story_2_desc: 'Nuestro propio Aceite de Oliva Virgen Extra, extraído en frío a partir de olivos centenarios que conviven en armonía con nuestras hileras de viñas históricas.',
      story_3_title: 'La Tradición de Los Bocheros',
      story_3_desc: 'Homenaje a las reuniones vespertinas de amigos y cosechadores jugando a las bochas bajo la sombra de los álamos mendocinos tras una jornada de vendimia.',
      cta_title: '¿Desea coordinar una reserva en Los Bocheros?',
      cta_desc: 'Almuerzos maridados de Miércoles a Domingos con reserva previa.',
      btn_whatsapp: 'Consultar por WhatsApp',
      btn_view_menu: 'Ver Menú Completo',

      // Steps Titles & Dishes
      step_1_title: 'PRIMER PASO',
      dish_1_name: 'QUESO DE CABRA · CHUTNEY · HIERBAS',
      dish_1_desc: 'Cremoso queso de cabra artesanal mendocino, chutney especiado de frutos de estación y bouquet de hierbas frescas de nuestra huerta orgánica.',
      wine_1_std_notes: '(Las Compuertas · Notas frutadas y taninos aterciopelados)',
      wine_1_upg_notes: '(Crianza en roble francés · Textura envolvente y frescura mineral)',

      step_2_title: 'SEGUNDO PASO',
      dish_2_name: 'GÍRGOLA · CALABAZA · NUECES',
      dish_2_desc: 'Gírgolas doradas al fuego de sarmiento, textura suave de calabaza asada al rescoldo y crocante de nueces criollas del Valle de Uco.',
      wine_2_std_notes: '(Agrelo · Pimienta negra, pimiento dulce y elegante estructura)',
      wine_2_upg_notes: '(Las Compuertas · 12 meses en barrica · Complejidad y final sedoso)',

      step_3_title: 'TERCER PASO',
      dish_3_name: 'MOLLEJA · COLIFLOR · MANZANA · AOVE LAMADRID',
      dish_3_desc: 'Molleja crocante glaseada, aterciopelado puré de coliflor tostada, láminas crocantes de manzana verde ácida y emulsión de Aceite de Oliva Virgen Extra Lamadrid.',
      wine_3_std_notes: '(Corte de blancas de la casa · Acidez vibrante que limpia el paladar)',
      wine_3_upg_notes: '(Blend de autor · Balance aromático y redondez en boca)',

      step_4_title: 'CUARTO PASO',
      dish_4_name: 'EMPANADA LOS BOCHEROS',
      dish_4_badge: '(Especialidad del chef)',
      dish_4_desc: 'Nuestra emblemática empanada mendocina cortada a cuchillo, masa casera con grasa de pella hojaldrada, cebolla caramelizada y horneada en horno de barro a leña.',
      wine_4_std_notes: '(Fruta roja madura, ciruela, violetas y un toque de vainilla)',
      wine_4_upg_notes: '(Selección de parcelas viejas · Gran concentración y elegancia pura)',

      step_5_title: 'QUINTO PASO',
      dish_5_name: 'OJO DE BIFE',
      dish_5_desc: 'Corte noble de carne argentina madurada, asado lentamente sobre brasas de quebracho blanco y sarmientos de la finca, servido en su punto perfecto con cristales de sal marina.',
      wine_5_std_notes: '(Cuerpo robusto, taninos dulces y redondez sublime)',
      wine_5_upg_notes: '(El vino ícono de la bodega · Edición limitada de barricas de excepción)',

      step_6_title: 'SEXTO PASO',
      dish_6_name: 'YOGURT · LIMÓN',
      dish_6_desc: 'Suave crema de yogurt natural de campo, curd de limón sutilmente cítrico y granizado herbal para renovar y refrescar los sentidos hacia el cierre dulce.',

      step_7_title: 'SÉPTIMO PASO',
      dish_7_name: 'CHOCOLATE · POMELO · TOFFEE · AOVE LAMADRID',
      dish_7_desc: 'Cremoso de chocolate amargo 70%, gajos y notas vivaces de pomelo rosado, toffee salado a la manteca y fino hilo de Aceite de Oliva Virgen Extra Lamadrid.',
      wine_7_std_notes: '(Pétillant Naturel · Burbuja natural salvaje, fruta fresca y vivacidad)',
      wine_7_upg_notes: '(Método tradicional champenoise · Elegancia fina y burbuja persistente)'
    },
    en: {
      filter_all: 'All Pairings',
      filter_standard: 'Classic',
      filter_upgrade: 'Upgrade',
      print_btn: 'Print Menu',
      rest_pretitle: 'WINERY RESTAURANT',
      season_tag: 'SEASON 2026',
      menu_autumn_title: 'AUTUMN MENU',
      steps_count: 'SEVEN COURSES',
      terroir_pill: 'Las Compuertas Estate · 3,450 ft ASL · Centenary Vines',
      allergy_notice: 'Please inform our staff about any dietary restrictions or food allergies.',
      veg_notice: '(Vegetarian, vegan, and celiac options available upon advance request)',
      view_full_card: 'Full Menu Card',
      view_step_by_step: 'Interactive Course Walkthrough',
      card_menu_label: 'AUTUMN MENU · SEVEN COURSES',
      btn_prev_step: 'Previous Course',
      btn_next_step: 'Next Course',
      badge_pairing: 'Wine Pairing:',
      badge_upgrade: 'Upgrade:',
      badge_iconic: 'Icon Upgrade:',
      specialty_tag: 'Specialty',
      main_tag: 'Main',
      cleanser_tag: 'Palate Cleanser',
      cleanser_info: 'Refreshing citrus intermezzo to awaken the senses before the dessert.',
      dessert_tag: 'Grand Finale',
      quote_text: '"In every glass and every dish we honor our land, pure Andean meltwater, and the dedication of our people in Las Compuertas."',
      col_reservations: 'RESERVATIONS & VISITS',
      col_location: 'LOCATION',
      story_1_title: 'Las Compuertas Terroir',
      story_1_desc: 'Nestled in the prime zone of Luján de Cuyo at 3,450 feet elevation, stony alluvial soils and cool Andean mountain breezes bring unrivaled freshness and distinction to our wines.',
      story_2_title: 'Lamadrid Olive Oil',
      story_2_desc: 'Our cold-pressed Extra Virgin Olive Oil, harvested from century-old olive groves thriving alongside our historic vineyard rows.',
      story_3_title: 'The "Los Bocheros" Tradition',
      story_3_desc: 'A tribute to the sunset gatherings of friends and grape harvesters playing bocce ("bochas") under the shade of Mendoza poplars after a day in the vineyard.',
      cta_title: 'Would you like to reserve a table at Los Bocheros?',
      cta_desc: 'Wine-paired lunches from Wednesday through Sunday by reservation only.',
      btn_whatsapp: 'Inquire via WhatsApp',
      btn_view_menu: 'View Full Menu',

      // Steps Titles & Dishes
      step_1_title: 'FIRST COURSE',
      dish_1_name: 'GOAT CHEESE · CHUTNEY · HERBS',
      dish_1_desc: 'Creamy artisanal Mendoza goat cheese, spiced seasonal fruit chutney, and fresh aromatic herbs from our organic estate garden.',
      wine_1_std_notes: '(Las Compuertas · Ripe berry notes and velvety tannins)',
      wine_1_upg_notes: '(Aged in French oak · Enveloping texture and mineral freshness)',

      step_2_title: 'SECOND COURSE',
      dish_2_name: 'OYSTER MUSHROOM · PUMPKIN · WALNUTS',
      dish_2_desc: 'Golden oyster mushrooms seared over vine cuttings, ember-roasted autumn pumpkin purée, and toasted criollo walnuts from the Uco Valley.',
      wine_2_std_notes: '(Agrelo · Cracked black pepper, sweet bell pepper, and elegant structure)',
      wine_2_upg_notes: '(Las Compuertas · 12 months in oak barrels · Complexity and silky finish)',

      step_3_title: 'THIRD COURSE',
      dish_3_name: 'SWEETBREAD · CAULIFLOWER · APPLE · LAMADRID EVOO',
      dish_3_desc: 'Crispy glazed sweetbread, velvety roasted cauliflower mousseline, tart green apple batons, and Lamadrid Extra Virgin Olive Oil emulsion.',
      wine_3_std_notes: '(Signature estate white blend · Vibrant acidity that cleanses the palate)',
      wine_3_upg_notes: '(Single-estate blend · Aromatic balance and harmonious palate)',

      step_4_title: 'FOURTH COURSE',
      dish_4_name: 'LOS BOCHEROS EMPANADA',
      dish_4_badge: '(Chef\'s Specialty)',
      dish_4_desc: 'Our iconic knife-cut Mendoza beef empanada with flaky layered handmade pastry, caramelized onions, and slow-baked in an artisanal wood-fired clay oven.',
      wine_4_std_notes: '(Ripe red berries, dark plum, violet floral lift, and subtle French vanilla)',
      wine_4_upg_notes: '(Old vine parcel selection · Intense concentration and pure poise)',

      step_5_title: 'FIFTH COURSE',
      dish_5_name: 'ARGENTINE RIBEYE STEAK',
      dish_5_desc: 'Prime aged Argentine ribeye steak slowly grilled over native quebracho hardwood and estate vine prunings, finished with delicate sea salt crystals.',
      wine_5_std_notes: '(Robust body, sweet polished tannins, and sublime lingering finish)',
      wine_5_upg_notes: '(The winery\'s flagship icon wine · Limited edition aged in exceptional barrels)',

      step_6_title: 'SIXTH COURSE',
      dish_6_name: 'YOGURT · LEMON',
      dish_6_desc: 'Smooth artisanal farm yogurt cream, zesty lemon curd, and wild garden herbal granita to cleanse and reset the palate.',

      step_7_title: 'SEVENTH COURSE',
      dish_7_name: 'CHOCOLATE · GRAPEFRUIT · TOFFEE · LAMADRID EVOO',
      dish_7_desc: 'Dark chocolate 70% crémeux, fresh pink grapefruit suprêmes, rich salted butter toffee, and a delicate drizzle of Lamadrid Extra Virgin Olive Oil.',
      wine_7_std_notes: '(Pétillant Naturel · Wild natural bubbles, vibrant fresh fruit, and lively zest)',
      wine_7_upg_notes: '(Traditional champenoise method · Fine persistent bubbles and elegance)'
    }
  };

  let currentLang = 'es';

  // --- Course Data for Interactive Mode ---
  const coursesData = [
    {
      step: 1,
      roman: 'I',
      dishKey: 'dish_1_name',
      descKey: 'dish_1_desc',
      standardWine: 'Lamadrid Reserva Bonarda',
      standardNotesKey: 'wine_1_std_notes',
      upgradeWine: 'Lamadrid Gran Reserva Chardonnay',
      upgradeNotesKey: 'wine_1_upg_notes'
    },
    {
      step: 2,
      roman: 'II',
      dishKey: 'dish_2_name',
      descKey: 'dish_2_desc',
      standardWine: 'Peñón de Agrelo Cabernet Sauvignon',
      standardNotesKey: 'wine_2_std_notes',
      upgradeWine: 'Lamadrid Reserva Cabernet Sauvignon',
      upgradeNotesKey: 'wine_2_upg_notes'
    },
    {
      step: 3,
      roman: 'III',
      dishKey: 'dish_3_name',
      descKey: 'dish_3_desc',
      standardWine: 'Los Bocheros White Blend',
      standardNotesKey: 'wine_3_std_notes',
      upgradeWine: 'Peñón de Agrelo Corte de Finca',
      upgradeNotesKey: 'wine_3_upg_notes'
    },
    {
      step: 4,
      roman: 'IV',
      dishKey: 'dish_4_name',
      badgeKey: 'dish_4_badge',
      tagKey: 'specialty_tag',
      descKey: 'dish_4_desc',
      standardWine: 'Lamadrid Reserva Malbec',
      standardNotesKey: 'wine_4_std_notes',
      upgradeWine: 'Lamadrid Gran Reserva Malbec',
      upgradeNotesKey: 'wine_4_upg_notes'
    },
    {
      step: 5,
      roman: 'V',
      dishKey: 'dish_5_name',
      tagKey: 'main_tag',
      descKey: 'dish_5_desc',
      standardWine: 'Lamadrid Gran Reserva Malbec',
      standardNotesKey: 'wine_5_std_notes',
      upgradeWine: 'Matilde Malbec',
      upgradeNotesKey: 'wine_5_upg_notes',
      isIconic: true
    },
    {
      step: 6,
      roman: 'VI',
      dishKey: 'dish_6_name',
      tagKey: 'cleanser_tag',
      descKey: 'dish_6_desc',
      isCleanser: true
    },
    {
      step: 7,
      roman: 'VII',
      dishKey: 'dish_7_name',
      tagKey: 'dessert_tag',
      descKey: 'dish_7_desc',
      standardWine: 'ZunZun Pet Nat',
      standardNotesKey: 'wine_7_std_notes',
      upgradeWine: 'Margarita Espumoso',
      upgradeNotesKey: 'wine_7_upg_notes'
    }
  ];

  let currentStepIndex = 0;

  // --- Elements ---
  const langToggleBtn = document.getElementById('lang-toggle-btn');
  const printMenuBtn = document.getElementById('print-menu-btn');
  const filterChips = document.querySelectorAll('.filter-chip');
  const viewCardModeBtn = document.getElementById('view-card-mode');
  const viewStepModeBtn = document.getElementById('view-step-mode');
  const menuFullCard = document.getElementById('menu-full-card');
  const stepNavigator = document.getElementById('step-navigator');
  const activeStepIndicator = document.getElementById('active-step-indicator');
  const stepDotsContainer = document.getElementById('step-dots-container');
  const stepSlideDisplay = document.getElementById('step-slide-display');
  const prevStepBtn = document.getElementById('prev-step-btn');
  const nextStepBtn = document.getElementById('next-step-btn');
  const scrollToMenuBtn = document.getElementById('scroll-to-menu-btn');

  // --- Translation Updater ---
  function updateLanguage(lang) {
    currentLang = lang;
    const t = translations[lang];

    // Update text elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) {
        el.textContent = t[key];
      }
    });

    // Toggle button UI
    document.querySelectorAll('.lang-code').forEach(span => {
      span.classList.toggle('active', span.classList.contains(lang));
    });

    // Update active step view if rendered
    renderStepSlide(currentStepIndex);
  }

  langToggleBtn.addEventListener('click', () => {
    const newLang = currentLang === 'es' ? 'en' : 'es';
    updateLanguage(newLang);
  });

  // --- Pairing Filters ---
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filterType = chip.getAttribute('data-filter');
      if (filterType === 'all') {
        document.body.removeAttribute('data-active-filter');
      } else {
        document.body.setAttribute('data-active-filter', filterType);
      }
    });
  });

  // --- View Mode Toggling (Card vs. Step-by-Step) ---
  viewCardModeBtn.addEventListener('click', () => {
    viewCardModeBtn.classList.add('active');
    viewStepModeBtn.classList.remove('active');
    menuFullCard.style.display = 'block';
    stepNavigator.style.display = 'none';
  });

  viewStepModeBtn.addEventListener('click', () => {
    viewStepModeBtn.classList.add('active');
    viewCardModeBtn.classList.remove('active');
    menuFullCard.style.display = 'none';
    stepNavigator.style.display = 'block';
    renderStepSlide(currentStepIndex);
  });

  // --- Step-by-Step Interactive Navigator ---
  function initStepDots() {
    stepDotsContainer.innerHTML = '';
    coursesData.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.className = `step-dot ${idx === currentStepIndex ? 'active' : ''}`;
      dot.setAttribute('title', `Paso ${idx + 1}`);
      dot.addEventListener('click', () => {
        currentStepIndex = idx;
        renderStepSlide(currentStepIndex);
      });
      stepDotsContainer.appendChild(dot);
    });
  }

  function renderStepSlide(idx) {
    const t = translations[currentLang];
    const item = coursesData[idx];

    // Update Header Indicator
    activeStepIndicator.textContent = currentLang === 'es' 
      ? `Paso ${idx + 1} de ${coursesData.length}`
      : `Course ${idx + 1} of ${coursesData.length}`;

    // Update dots
    document.querySelectorAll('.step-dot').forEach((dot, dotIdx) => {
      dot.classList.toggle('active', dotIdx === idx);
    });

    // Prev / Next button state
    prevStepBtn.disabled = idx === 0;
    nextStepBtn.disabled = idx === coursesData.length - 1;

    // Build Slide Content
    let pairingsHTML = '';
    if (item.isCleanser) {
      pairingsHTML = `
        <div class="dish-pairings-note">
          <span class="cleanser-text">${t.cleanser_info}</span>
        </div>
      `;
    } else {
      pairingsHTML = `
        <div class="dish-pairings">
          <div class="pairing-row standard-pairing">
            <span class="pairing-badge standard-badge">${t.badge_pairing}</span>
            <span class="wine-name">${item.standardWine}</span>
            <span class="wine-notes">${t[item.standardNotesKey] || ''}</span>
          </div>
          <div class="pairing-row upgrade-pairing ${item.isIconic ? 'iconic-wine' : ''}">
            <span class="pairing-badge upgrade-badge ${item.isIconic ? 'icon-flag' : ''}">
              ${item.isIconic ? t.badge_iconic : t.badge_upgrade}
            </span>
            <span class="wine-name">${item.upgradeWine}</span>
            <span class="wine-notes">${t[item.upgradeNotesKey] || ''}</span>
          </div>
        </div>
      `;
    }

    const tagHTML = item.tagKey 
      ? `<span class="specialty-ribbon">${t[item.tagKey]}</span>` 
      : '';

    const badgeHTML = item.badgeKey 
      ? `<span class="chef-badge">${t[item.badgeKey]}</span>` 
      : '';

    stepSlideDisplay.innerHTML = `
      <div class="course-item active-slide" style="padding: 1rem 0;">
        <div class="course-step-tag">
          <span class="step-roman">${item.roman}</span>
          <span class="step-name">${t[`step_${item.step}_title`]}</span>
          ${tagHTML}
        </div>
        <div class="course-body">
          <div class="title-with-badge">
            <h3 class="dish-title">${t[item.dishKey]}</h3>
            ${badgeHTML}
          </div>
          <p class="dish-description" style="font-size: 1.15rem; margin: 0.8rem 0 1.2rem;">
            ${t[item.descKey]}
          </p>
          ${pairingsHTML}
        </div>
      </div>
    `;
  }

  prevStepBtn.addEventListener('click', () => {
    if (currentStepIndex > 0) {
      currentStepIndex--;
      renderStepSlide(currentStepIndex);
    }
  });

  nextStepBtn.addEventListener('click', () => {
    if (currentStepIndex < coursesData.length - 1) {
      currentStepIndex++;
      renderStepSlide(currentStepIndex);
    }
  });

  // --- Print Menu Functionality ---
  printMenuBtn.addEventListener('click', () => {
    // If in step mode, switch to full card before printing
    if (menuFullCard.style.display === 'none') {
      menuFullCard.style.display = 'block';
      stepNavigator.style.display = 'none';
      viewCardModeBtn.classList.add('active');
      viewStepModeBtn.classList.remove('active');
    }
    window.print();
  });

  // --- Smooth Scroll to Menu ---
  if (scrollToMenuBtn) {
    scrollToMenuBtn.addEventListener('click', () => {
      document.getElementById('menu-section').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Initialize
  initStepDots();
});
