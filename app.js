/**
 * Los Bocheros Restó · Lamadrid Estate Wines
 * Interactive Menu Application
 * Multi-season: Primavera (A la Carta) & Otoño (7 Pasos)
 * Multilingual: ES, EN, PT, DE-CH (Suizo / Deutsch)
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Complete Multilingual Dictionary ---
  const translations = {
    es: {
      tab_spring: 'Menú Primavera (Carta)',
      tab_autumn: 'Menú Otoño (7 Pasos)',
      filter_all: 'Todos los Maridajes',
      filter_standard: 'Clásico',
      filter_upgrade: 'Upgrade',
      print_btn: 'Imprimir',
      rest_pretitle: 'RESTAURANTE DE BODEGA',
      spring_hero_tag: 'TEMPORADA PRIMAVERA 2026',
      spring_hero_title: 'MENÚ PRIMAVERA',
      spring_hero_type: 'A LA CARTA',
      autumn_hero_tag: 'TEMPORADA OTOÑO 2026',
      autumn_hero_title: 'MENÚ OTOÑO',
      autumn_hero_type: 'SIETE PASOS',
      leave_review: '¡Deje su reseña aquí! / Leave your review here!',
      terroir_pill: 'Finca Las Compuertas · 1.050 m.s.n.m. · Viñas Centenarias',
      allergy_notice: 'Consulte a nuestro personal sobre restricciones alimentarias y alergias.',
      veg_notice: '(Disponemos de adaptaciones vegetarianas, veganas y celíacas con previo aviso)',
      award_header: 'BEST OF WINE TOURISM · GREAT WINE CAPITALS · THE AWARD OF EXCELLENCE',
      spring_card_title: 'MENÚ PRIMAVERA · CARTA',
      card_menu_label: 'MENÚ OTOÑO · SIETE PASOS',
      view_full_card: 'Carta Completa',
      view_step_by_step: 'Paso a Paso Interactivo',
      btn_prev_step: 'Paso Anterior',
      btn_next_step: 'Siguiente Paso',
      cat_entradas: 'ENTRADAS',
      cat_principales: 'PRINCIPALES',
      cat_postres: 'POSTRES',
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

      // PRIMAVERA: Entradas
      sp_e1_name: 'ESPÁRRAGOS A LA PLANCHA, QUESO PARMESANO, ALMENDRAS TOSTADAS, GEL DE LIMÓN Y YEMA CURADA',
      sp_e2_name: 'PROVOLETA ASADA CON CHIMICHURRI ROJO CASERO',
      sp_e3_name: 'SOLOMILLO DE CERDO CURADO AL MALBEC CON MANZANA VERDE FRESCA Y HOJAS VERDES',
      sp_e4_name: 'QUESO DE CABRA, REMOLACHA ASADA, YOGUR ARTESANAL, FRAMBUESAS Y CROCANTES',
      sp_e5_name: 'ESPECIAL DÚO EMPANADAS LOS BOCHEROS',

      // PRIMAVERA: Principales
      sp_p1_name: 'COSTILLA CONFITADA, CREMOSO DE PAPA, QUESO MORBIER, PANCETA AHUMADA Y FONDO DE COCCIÓN REDUCIDO',
      sp_p2_name: 'PASTA ARTESANAL DE HONGOS, ARVEJAS TIERNAS, CROCANTE ESPECIADO Y BASE DE MUHAMMARA DE PIMIENTOS Y NUECES',
      sp_p3_name: 'TRUCHA A LA PLANCHA, CURRY CREMOSO DE ALCAUCILES CON AJÍ AMARILLO Y CUSCÚS CROCANTE',
      sp_p4_name: 'OJO DE BIFE Y VEGETALES FRESCOS DE TEMPORADA SALTEADOS',

      // PRIMAVERA: Postres
      sp_d1_name: 'PERA POCHADA, MOUSSE DE MASCARPONE, TOFFEE FLUIDO Y CRUMBLE DE QUESO PEPATO Y ALMENDRAS',
      sp_d2_name: 'TARTA FLAN CARAMELIZADA CON HELADO',
      sp_d3_name: 'SELECCIÓN ARTESANAL DE QUESOS Y DULCES DE ESTACIÓN',
      sp_d4_name: 'CLÁSICO PANQUEQUE CASERO TIBIO CON DULCE DE LECHE ARTESANAL',

      // OTOÑO: Pasos
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
      tab_spring: 'Spring Menu (A la Carte)',
      tab_autumn: 'Autumn Menu (7 Courses)',
      filter_all: 'All Pairings',
      filter_standard: 'Classic',
      filter_upgrade: 'Upgrade',
      print_btn: 'Print Menu',
      rest_pretitle: 'WINERY RESTAURANT',
      spring_hero_tag: 'SPRING SEASON 2026',
      spring_hero_title: 'SPRING MENU',
      spring_hero_type: 'A LA CARTE',
      autumn_hero_tag: 'AUTUMN SEASON 2026',
      autumn_hero_title: 'AUTUMN MENU',
      autumn_hero_type: 'SEVEN COURSES',
      leave_review: 'Leave your review here!',
      terroir_pill: 'Las Compuertas Estate · 3,450 ft ASL · Centenary Vines',
      allergy_notice: 'Please inform our staff about any dietary restrictions or food allergies.',
      veg_notice: '(Vegetarian, vegan, and celiac options available upon advance request)',
      award_header: 'BEST OF WINE TOURISM · GREAT WINE CAPITALS · THE AWARD OF EXCELLENCE',
      spring_card_title: 'SPRING MENU · A LA CARTE',
      card_menu_label: 'AUTUMN MENU · SEVEN COURSES',
      view_full_card: 'Full Menu Card',
      view_step_by_step: 'Interactive Course Walkthrough',
      btn_prev_step: 'Previous Course',
      btn_next_step: 'Next Course',
      cat_entradas: 'STARTERS',
      cat_principales: 'MAIN COURSES',
      cat_postres: 'DESSERTS',
      badge_pairing: 'Wine Pairing:',
      badge_upgrade: 'Upgrade:',
      badge_iconic: 'Icon Upgrade:',
      specialty_tag: 'Specialty',
      main_tag: 'Main',
      cleanser_tag: 'Palate Cleanser',
      cleanser_info: 'Refreshing citrus intermezzo to awaken the senses before dessert.',
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

      // PRIMAVERA: Entradas
      sp_e1_name: 'GRILLED ASPARAGUS, PARMESAN CHEESE, TOASTED ALMONDS, LEMON GEL AND CURED EGG YOLK',
      sp_e2_name: 'ROASTED PROVOLETA CHEESE WITH HOMEMADE RED CHIMICHURRI',
      sp_e3_name: 'MALBEC-CURED PORK TENDERLOIN WITH CRISP GREEN APPLE AND GARDEN GREENS',
      sp_e4_name: 'GOAT CHEESE, ROASTED BEETROOT, ARTISANAL YOGURT, RASPBERRIES AND CRISP WAFERS',
      sp_e5_name: 'SPECIAL DUO OF LOS BOCHEROS ARTISANAL EMPANADAS',

      // PRIMAVERA: Principales
      sp_p1_name: 'CONFIT SHORT RIB, CREAMY POTATO MOUSSELINE, MORBIER CHEESE, SMOKED BACON AND REDUCED JUS',
      sp_p2_name: 'HANDMADE MUSHROOM PASTA, TENDER PEAS, SPICED CRUNCH AND ROASTED PEPPER-WALNUT MUHAMMARA BASE',
      sp_p3_name: 'PAN-SEARED TROUT, CREAMY ARTICHOKE YELLOW CHILI CURRY AND CRISPY TOASTED COUSCOUS',
      sp_p4_name: 'PRIME ARGENTINE RIBEYE STEAK AND SAUTÉED FRESH SEASONAL VEGETABLES',

      // PRIMAVERA: Postres
      sp_d1_name: 'POACHED PEAR, MASCARPONE MOUSSE, FLOWING SALTED TOFFEE AND PEPATO CHEESE & ALMOND CRUMBLE',
      sp_d2_name: 'CARAMELIZED CUSTARD FLAN TART WITH ARTISANAL ICE CREAM',
      sp_d3_name: 'ARTISANAL SELECTION OF REGIONAL CHEESES AND SEASONAL PRESERVES',
      sp_d4_name: 'WARM HOMEMADE ARGENTINE CRÊPE WITH ARTISANAL DULCE DE LECHE',

      // OTOÑO: Pasos
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
    },

    pt: {
      tab_spring: 'Menu Primavera (À la Carte)',
      tab_autumn: 'Menu Outono (7 Etapas)',
      filter_all: 'Todas as Harmonizações',
      filter_standard: 'Clássico',
      filter_upgrade: 'Upgrade',
      print_btn: 'Imprimir',
      rest_pretitle: 'RESTAURANTE DE VINÍCOLA',
      spring_hero_tag: 'TEMPORADA PRIMAVERA 2026',
      spring_hero_title: 'MENU PRIMAVERA',
      spring_hero_type: 'À LA CARTE',
      autumn_hero_tag: 'TEMPORADA OUTONO 2026',
      autumn_hero_title: 'MENU OUTONO',
      autumn_hero_type: 'SETE ETAPAS',
      leave_review: 'Deixe sua avaliação aqui!',
      terroir_pill: 'Finca Las Compuertas · 1.050 m.s.n.m. · Vinhas Centenárias',
      allergy_notice: 'Consulte nossa equipe sobre restrições alimentares e alergias.',
      veg_notice: '(Dispomos de opções vegetarianas, veganas e celíacas com aviso prévio)',
      award_header: 'BEST OF WINE TOURISM · GREAT WINE CAPITALS · THE AWARD OF EXCELLENCE',
      spring_card_title: 'MENU PRIMAVERA · À LA CARTE',
      card_menu_label: 'MENU OUTONO · SETE ETAPAS',
      view_full_card: 'Cardápio Completo',
      view_step_by_step: 'Passo a Passo Interativo',
      btn_prev_step: 'Etapa Anterior',
      btn_next_step: 'Próxima Etapa',
      cat_entradas: 'ENTRADAS',
      cat_principales: 'PRATOS PRINCIPAIS',
      cat_postres: 'SOBREMESAS',
      badge_pairing: 'Harmonização:',
      badge_upgrade: 'Upgrade:',
      badge_iconic: 'Ícone Upgrade:',
      specialty_tag: 'Especialidade',
      main_tag: 'Principal',
      cleanser_tag: 'Pré-Sobremesa',
      cleanser_info: 'Intermezzo refrescante de frutas cítricas para renovar o paladar.',
      dessert_tag: 'Sobremesa Final',
      quote_text: '"Em cada taça e em cada prato celebramos a terra, as águas puras do degelo e a paixão do nosso povo em Las Compuertas."',
      col_reservations: 'RESERVAS & VISITAS',
      col_location: 'LOCALIZAÇÃO',
      story_1_title: 'O Terroir de Las Compuertas',
      story_1_desc: 'Localizado na primeira zona de Luján de Cuyo a 1.050 metros de altitude, com solos aluviais pedregosos e brisas da Cordilheira dos Andes que conferem frescor inigualável aos nossos vinhos.',
      story_2_title: 'Azeite Lamadrid',
      story_2_desc: 'Nosso próprio Azeite de Oliva Extra Virgem, prensado a frio a partir de oliveiras centenárias que convivem em perfeita harmonia com nossas vinhas históricas.',
      story_3_title: 'A Tradição de Los Bocheros',
      story_3_desc: 'Homenagem aos encontros de fim de tarde de amigos e vindimadores jogando bocha sob a sombra dos álamos mendocinos.',
      cta_title: 'Deseja coordenar uma reserva em Los Bocheros?',
      cta_desc: 'Almoços harmonizados de Quarta a Domingo com reserva antecipada.',
      btn_whatsapp: 'Consultar pelo WhatsApp',
      btn_view_menu: 'Ver Cardápio Completo',

      // PRIMAVERA: Entradas
      sp_e1_name: 'ASPARGOS GRELHADOS, QUEIJO PARMESÃO, AMÊNDOAS TOSTADAS, GEL DE LIMÃO E GEMA CURADA',
      sp_e2_name: 'PROVOLETA ASSADA COM CHIMICHURRI VERMELHO CASEIRO',
      sp_e3_name: 'FILÉ MIGNON SUÍNO CURADO AO MALBEC COM MAÇÃ VERDE FRESCA E FOLHAS VERDES',
      sp_e4_name: 'QUEIJO DE CABRA, BETERRABA ASSADA, IOGURTE ARTESANAL, FRAMBOESAS E CROCANTES',
      sp_e5_name: 'ESPECIAL DUO DE EMPANADAS LOS BOCHEROS',

      // PRIMAVERA: Principales
      sp_p1_name: 'COSTELA CONFITADA, PURÊ CREMOSO DE BATATA, QUEIJO MORBIER, BACON DEFUMADO E REDUÇÃO DO PRÓPRIO MOLHO',
      sp_p2_name: 'MASSA ARTESANAL DE COGUMELOS, ERVILHAS FRESCAS, CROCANTE DE ESPECIARIAS E BASE DE MUHAMMARA DE PIMENTÕES E NOZES',
      sp_p3_name: 'TRUTA GRELHADA, CURRY CREMOSO DE ALCACHOFRAS COM AJÍ AMARILLO E CUSCUZ CROCANTE',
      sp_p4_name: 'OJO DE BIFE ARGENTINO E VEGETAIS FRESCOS DA ESTAÇÃO SALTEADOS',

      // PRIMAVERA: Postres
      sp_d1_name: 'PÊRA POCHÊ, MOUSSE DE MASCARPONE, TOFFEE FLUIDO E CRUMBLE DE QUEIJO PEPATO E AMÊNDOAS',
      sp_d2_name: 'TORTA PUDIM CARAMELIZADA COM SORVETE ARTESANAL',
      sp_d3_name: 'SELEÇÃO ARTESANAL DE QUEIJOS E DOCES DA ESTAÇÃO',
      sp_d4_name: 'CLÁSSICA PANQUECA CASEIRA MORNA RECHEADA COM DOCE DE LEITE ARTESANAL',

      // OTOÑO: Pasos
      step_1_title: 'PRIMEIRA ETAPA',
      dish_1_name: 'QUEIJO DE CABRA · CHUTNEY · ERVAS',
      dish_1_desc: 'Cremoso queijo de cabra artesanal mendocino, chutney de frutas sazonais e bouquet de ervas frescas da nossa horta orgânica.',
      wine_1_std_notes: '(Las Compuertas · Notas frutadas e taninos aveludados)',
      wine_1_upg_notes: '(Envelhecido em carvalho francês · Textura envolvente e frescor mineral)',

      step_2_title: 'SEGUNDA ETAPA',
      dish_2_name: 'COGUMELOS GÍRGOLA · ABÓBORA · NOZES',
      dish_2_desc: 'Cogumelos dourados na brasa, purê aveludado de abóbora assada e crocante de nozes do Valle de Uco.',
      wine_2_std_notes: '(Agrelo · Pimenta preta, pimentão doce e estrutura elegante)',
      wine_2_upg_notes: '(Las Compuertas · 12 meses em barrica · Complexidade e final sedoso)',

      step_3_title: 'TERCEIRA ETAPA',
      dish_3_name: 'MOLEJAS · COUVE-FLOR · MAÇÃ · AZEITE LAMADRID',
      dish_3_desc: 'Molejas crocantes glaceadas, purê de couve-flor tostada, lâminas de maçã verde ácida e emulsão de Azeite Lamadrid.',
      wine_3_std_notes: '(Blend branco da casa · Acidez vibrante que limpa o paladar)',
      wine_3_upg_notes: '(Blend de autor · Equilíbrio aromático e volume de boca)',

      step_4_title: 'QUARTA ETAPA',
      dish_4_name: 'EMPANADA LOS BOCHEROS',
      dish_4_badge: '(Especialidade do chef)',
      dish_4_desc: 'Nossa emblemática empanada mendocina cortada na ponta da faca, massa caseira folhada e assada em forno a lenha de barro.',
      wine_4_std_notes: '(Frutas vermelhas maduras, ameixa, violetas e toque de baunilha)',
      wine_4_upg_notes: '(Seleção de vinhas velhas · Grande concentração e pura elegância)',

      step_5_title: 'QUINTA ETAPA',
      dish_5_name: 'OJO DE BIFE',
      dish_5_desc: 'Corte nobre de carne argentina maturada, assado lentamente sobre brasas de quebracho branco com cristais de sal marinho.',
      wine_5_std_notes: '(Corpo robusto, taninos doces e harmonia sublime)',
      wine_5_upg_notes: '(O vinho ícone da vinícola · Edição limitada de barricas excepcionais)',

      step_6_title: 'SEXTA ETAPA',
      dish_6_name: 'IOGURTE · LIMÃO',
      dish_6_desc: 'Suave creme de iogurte artesanal, curd de limão cítrico e granita herbal para renovar os sentidos.',

      step_7_title: 'SÉTIMA ETAPA',
      dish_7_name: 'CHOCOLATE · TORANJA · TOFFEE · AZEITE LAMADRID',
      dish_7_desc: 'Cremoso de chocolate 70%, gomos de toranja rosa, toffee salgado e fio de Azeite de Oliva Extra Virgem Lamadrid.',
      wine_7_std_notes: '(Pétillant Naturel · Borbulhas naturais selvagens, fruta viva)',
      wine_7_upg_notes: '(Método tradicional champenoise · Borbulha fina e persistente)'
    },

    'de-ch': {
      tab_spring: 'Frühlingskarte (À la Carte)',
      tab_autumn: 'Herbstmenü (7 Gänge)',
      filter_all: 'Alle Weinbegleitungen',
      filter_standard: 'Klassisch',
      filter_upgrade: 'Upgrade',
      print_btn: 'Drucken',
      rest_pretitle: 'WEINGUT-RESTAURANT',
      spring_hero_tag: 'FRÜHLINGS-SAISON 2026',
      spring_hero_title: 'FRÜHLINGSMENÜ',
      spring_hero_type: 'À LA CARTE',
      autumn_hero_tag: 'HERBST-SAISON 2026',
      autumn_hero_title: 'HERBSTMENÜ',
      autumn_hero_type: 'SIEBEN GÄNGE',
      leave_review: 'Hinterlassen Sie hier Ihre Bewertung!',
      terroir_pill: 'Finca Las Compuertas · 1.050 m ü. M. · Hundertjährige Reben',
      allergy_notice: 'Bitte informieren Sie unser Serviceteam über allfällige Allergien oder Diäten.',
      veg_notice: '(Vegetarische, vegane und glutenfreie Varianten auf Voranmeldung erhältlich)',
      award_header: 'BEST OF WINE TOURISM · GREAT WINE CAPITALS · THE AWARD OF EXCELLENCE',
      spring_card_title: 'FRÜHLINGSKARTE · À LA CARTE',
      card_menu_label: 'HERBSTMENÜ · SIEBEN GÄNGE',
      view_full_card: 'Ganze Speisekarte',
      view_step_by_step: 'Interaktiver Menü-Rundgang',
      btn_prev_step: 'Vorheriger Gang',
      btn_next_step: 'Nächster Gang',
      cat_entradas: 'VORSPEISEN',
      cat_principales: 'HAUPTGÄNGE',
      cat_postres: 'DESSERTS',
      badge_pairing: 'Weinbegleitung:',
      badge_upgrade: 'Upgrade:',
      badge_iconic: 'Ikonen-Upgrade:',
      specialty_tag: 'Spezialität',
      main_tag: 'Hauptgang',
      cleanser_tag: 'Zwischengang',
      cleanser_info: 'Erfrischendes Zitrus-Intermezzo zur Belebung des Gaumens vor dem Dessert.',
      dessert_tag: 'Süsses Finale',
      quote_text: '"In jedem Glas und jedem Gericht zelebrieren wir unsere Erde, reinstes Anden-Schmelzwasser und die Hingabe unseres Teams in Las Compuertas."',
      col_reservations: 'RESERVATIONEN & BESUCHE',
      col_location: 'STANDORT',
      story_1_title: 'Das Terroir von Las Compuertas',
      story_1_desc: 'Gelegen in der Spitzenzone von Luján de Cuyo auf 1.050 m ü. M., mit steinigen Schwemmlandböden und kühlenden Anden-Fallwinden für aussergewöhnliche Frische und Eleganz.',
      story_2_title: 'Lamadrid Olivenöl',
      story_2_desc: 'Unser kaltgepresstes Olivenöl Extra Vergine, gewonnen aus uralten Olivenbäumen, die in Harmonie mit unseren historischen Reben gedeihen.',
      story_3_title: 'Die Tradition «Los Bocheros»',
      story_3_desc: 'Eine Hommage an das abendliche Boccia-Spiel («Bochas») der Freunde und Weinleser unter den schattigen Pappeln von Mendoza.',
      cta_title: 'Möchten Sie einen Tisch bei Los Bocheros reservieren?',
      cta_desc: 'Weinbegleitete Mittagessen von Mittwoch bis Sonntag mit Voranmeldung.',
      btn_whatsapp: 'Via WhatsApp anfragen',
      btn_view_menu: 'Ganze Karte ansehen',

      // PRIMAVERA: Entradas
      sp_e1_name: 'GEGRILLTER SPARGEL, PARMESANKÄSE, GERÖSTETE MANDELN, ZITRONENGEL UND GEREIFTES EIGELB',
      sp_e2_name: 'GEGRILLTER PROVOLETA-KÄSE MIT HAUSGEMACHTEM ROTEM CHIMICHURRI',
      sp_e3_name: 'IN MALBEC GEREIFTES SCHWEINEFILET MIT FRISCHEM GRÜNEM APFEL UND BLATTSALATEN',
      sp_e4_name: 'ZIEGENKÄSE, GERÖSTETE RANDE, HANDGEMACHTER JOGHURT, HIMBEEREN UND KNUSPERWAFFELN',
      sp_e5_name: 'SPEZIELLES DUO LOS BOCHEROS EMPANADAS',

      // PRIMAVERA: Principales
      sp_p1_name: 'GESCHMORTE RINDER-QUERFIPPE, SAMTIGES KARTOFFELMOUSSELINE, MORBIER-KÄSE, RÄUCHERSPECK UND SCHMORJUS',
      sp_p2_name: 'HAUSGEMACHTE WALDPILZ-PASTA, ZARTE ERBSEN, GEWÜRZ-CRUMBLE UND MUHAMMARA VON PEPERONI UND BAUMNÜSSEN',
      sp_p3_name: 'GEBRATENE ANDEN-FORELLE, CREMIGES ARTISCHOCKEN-CURRY MIT GELBEM AJÍ UND KNUSPRIGEM COUSCOUS',
      sp_p4_name: 'ARGENTINISCHES RIBEYE-STEAK MIT MARKTFRISCHEM FRÜHLINGSGEMÜSE',

      // PRIMAVERA: Postres
      sp_d1_name: 'POCHIERTE BIRNE, MASCARPONE-MOUSSE, FLÜSSIGES TOFFEE UND PEPATO-MANDEL-CRUMBLE',
      sp_d2_name: 'KARAMELLISIERTE FLAN-TARTE MIT HAUSGEMACHTEM GLACÉ',
      sp_d3_name: 'HANDWERKLICHE AUSWAHL AN REGIONALEM KÄSE UND SAISONALEN FRUCHTKOMPOTTEN',
      sp_d4_name: 'WARME HAUSGEMACHTE CRÊPE MIT TRADITIONELLEM DULCE DE LECHE',

      // OTOÑO: Pasos
      step_1_title: 'ERSTER GANG',
      dish_1_name: 'ZIEGENKÄSE · CHUTNEY · KRÄUTER',
      dish_1_desc: 'Cremiger handwerklicher Ziegenkäse aus Mendoza, würziges Saison-Chutney und frische Gartenkräuter.',
      wine_1_std_notes: '(Las Compuertas · Fruchtige Noten und samtige Tannine)',
      wine_1_upg_notes: '(Ausbau in französischer Eiche · Dichte Textur und mineralische Frische)',

      step_2_title: 'ZWEITER GANG',
      dish_2_name: 'AUSTERNPILZE · KÜRBIS · NÜSSE',
      dish_2_desc: 'Auf Rebholz gegrillte Austernpilze, samtiges Kürbispüree aus der Glut und geröstete Baumnüsse aus dem Uco-Tal.',
      wine_2_std_notes: '(Agrelo · Schwarzer Pfeffer, süsse Paprika und elegante Struktur)',
      wine_2_upg_notes: '(Las Compuertas · 12 Monate Barrique · Komplexität und seidiger Abgang)',

      step_3_title: 'DRITTER GANG',
      dish_3_name: 'KALBSMILKE · BLUMENKOHL · APFEL · LAMADRID OLIVENÖL',
      dish_3_desc: 'Knusprig glasierte Kalbsmilke, samtige Blumenkohlmousseline, säuerlicher grüner Apfel und Emulsion unseres Olivenöls.',
      wine_3_std_notes: '(Hauseigene Weissweincuvée · Lebendige Säure zur Gaumenerfrischung)',
      wine_3_upg_notes: '(Einzellagen-Cuvée · Aromatische Balance und Fülle)',

      step_4_title: 'VIERTER GANG',
      dish_4_name: 'LOS BOCHEROS EMPANADA',
      dish_4_badge: '(Chef-Spezialität)',
      dish_4_desc: 'Traditionelle Empanada mit von Hand geschnittenem Rindfleisch, karamellisierten Zwiebeln, im Holzbackofen gebacken.',
      wine_4_std_notes: '(Reife rote Beeren, Pflaume, Veilchen und ein Hauch Bourbon-Vanille)',
      wine_4_upg_notes: '(Alte Rebanlagen · Konzentration und reine Eleganz)',

      step_5_title: 'FÜNFTER GANG',
      dish_5_name: 'ARGENTINISCHES RIBEYE-STEAK',
      dish_5_desc: 'Edles gereiftes Rindfleisch, langsam über Quebracho-Holz und Rebschnitt gegrillt, verfeinert mit Meersalzkristallen.',
      wine_5_std_notes: '(Kräftiger Körper, samtige Tannine und erhabener Abgang)',
      wine_5_upg_notes: '(Der Ikonen-Wein des Hauses · Limitierte Selektion aus Ausnahme-Barriques)',

      step_6_title: 'SECHSTER GANG',
      dish_6_name: 'JOGHURT · ZITRONE',
      dish_6_desc: 'Samtiger Bauernjoghurt, erfrischender Zitronen-Curd und Kräutergranita als Gaumen-Erfrischer.',

      step_7_title: 'SIEBTER GANG',
      dish_7_name: 'SCHOKOLADE · GRAPEFRUIT · TOFFEE · LAMADRID OLIVENÖL',
      dish_7_desc: 'Cremige dunkle Schokolade 70%, rosa Grapefruit, gesalzenes Buttertoffee und ein feiner Faden Lamadrid Olivenöl.',
      wine_7_std_notes: '(Pétillant Naturel · Wilde natürliche Perlage, Frische und Frucht)',
      wine_7_upg_notes: '(Traditionelle Flaschengärung · Feine anhaltende Perlage)'
    }
  };

  const flags = {
    es: '🇦🇷',
    en: '🇬🇧',
    pt: '🇧🇷',
    'de-ch': '🇨🇭'
  };

  const langNames = {
    es: 'ES',
    en: 'EN',
    pt: 'PT',
    'de-ch': 'CH'
  };

  let currentLang = 'es';
  let currentSeason = 'spring'; // 'spring' | 'autumn'

  // --- Course Data for Autumn Step-by-Step Mode ---
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
  const seasonTabs = document.querySelectorAll('.season-tab-btn');
  const heroImg = document.getElementById('hero-img');
  const heroSeasonTag = document.getElementById('hero-season-tag');
  const heroMenuTitle = document.getElementById('hero-menu-title');
  const heroTypeBadge = document.getElementById('hero-type-badge');
  const menuSpringSection = document.getElementById('menu-spring-section');
  const menuAutumnSection = document.getElementById('menu-autumn-section');

  const langMenuBtn = document.getElementById('lang-menu-btn');
  const langDropdown = document.getElementById('lang-dropdown');
  const langOpts = document.querySelectorAll('.lang-opt');
  const activeFlag = document.getElementById('active-flag');
  const activeLangText = document.getElementById('active-lang-text');

  const filterChips = document.querySelectorAll('.filter-chip');
  const printMenuBtn = document.getElementById('print-menu-btn');

  const viewCardModeBtn = document.getElementById('view-card-mode');
  const viewStepModeBtn = document.getElementById('view-step-mode');
  const autumnParchmentSheet = document.getElementById('autumn-parchment-sheet');
  const stepNavigator = document.getElementById('step-navigator');
  const activeStepIndicator = document.getElementById('active-step-indicator');
  const stepDotsContainer = document.getElementById('step-dots-container');
  const stepSlideDisplay = document.getElementById('step-slide-display');
  const prevStepBtn = document.getElementById('prev-step-btn');
  const nextStepBtn = document.getElementById('next-step-btn');
  const scrollToMenuBtn = document.getElementById('scroll-to-menu-btn');

  // --- Season Switching ---
  function setSeason(season) {
    currentSeason = season;
    document.body.setAttribute('data-active-season', season);

    seasonTabs.forEach(tab => {
      const isMatch = tab.getAttribute('data-season') === season;
      tab.classList.toggle('active', isMatch);
      tab.setAttribute('aria-selected', isMatch ? 'true' : 'false');
    });

    const t = translations[currentLang];

    if (season === 'spring') {
      heroImg.src = 'assets/los-bocheros-spring.jpg';
      heroImg.alt = 'Terrazas primaverales de Los Bocheros Restó y viñedos';
      heroSeasonTag.textContent = t.spring_hero_tag;
      heroMenuTitle.textContent = t.spring_hero_title;
      heroTypeBadge.textContent = t.spring_hero_type;

      menuSpringSection.style.display = 'block';
      menuAutumnSection.style.display = 'none';
    } else {
      heroImg.src = 'assets/los-bocheros-hero.jpg';
      heroImg.alt = 'Terrazas otoñales de Los Bocheros Restó y viñedos dorados';
      heroSeasonTag.textContent = t.autumn_hero_tag;
      heroMenuTitle.textContent = t.autumn_hero_title;
      heroTypeBadge.textContent = t.autumn_hero_type;

      menuSpringSection.style.display = 'none';
      menuAutumnSection.style.display = 'block';
      renderStepSlide(currentStepIndex);
    }
  }

  seasonTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      setSeason(tab.getAttribute('data-season'));
    });
  });

  // --- Language Switching ---
  function updateLanguage(lang) {
    currentLang = lang;
    const t = translations[lang];

    // Update Flag & Code in button
    activeFlag.textContent = flags[lang];
    activeLangText.textContent = langNames[lang];

    // Update active class in dropdown options
    langOpts.forEach(opt => {
      opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
    });

    // Update all data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) {
        el.textContent = t[key];
      }
    });

    // Update dynamic season texts on hero
    if (currentSeason === 'spring') {
      heroSeasonTag.textContent = t.spring_hero_tag;
      heroMenuTitle.textContent = t.spring_hero_title;
      heroTypeBadge.textContent = t.spring_hero_type;
    } else {
      heroSeasonTag.textContent = t.autumn_hero_tag;
      heroMenuTitle.textContent = t.autumn_hero_title;
      heroTypeBadge.textContent = t.autumn_hero_type;
    }

    renderStepSlide(currentStepIndex);
  }

  // Toggle Dropdown
  langMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = langDropdown.classList.contains('show');
    langDropdown.classList.toggle('show', !isOpen);
    langMenuBtn.classList.toggle('open', !isOpen);
    langMenuBtn.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
  });

  document.addEventListener('click', () => {
    langDropdown.classList.remove('show');
    langMenuBtn.classList.remove('open');
    langMenuBtn.setAttribute('aria-expanded', 'false');
  });

  langOpts.forEach(opt => {
    opt.addEventListener('click', () => {
      const chosenLang = opt.getAttribute('data-lang');
      updateLanguage(chosenLang);
      langDropdown.classList.remove('show');
      langMenuBtn.classList.remove('open');
      langMenuBtn.setAttribute('aria-expanded', 'false');
    });
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

  // --- View Mode Toggling (Autumn 7 Pasos Card vs. Step-by-Step) ---
  if (viewCardModeBtn && viewStepModeBtn) {
    viewCardModeBtn.addEventListener('click', () => {
      viewCardModeBtn.classList.add('active');
      viewStepModeBtn.classList.remove('active');
      autumnParchmentSheet.style.display = 'block';
      stepNavigator.style.display = 'none';
    });

    viewStepModeBtn.addEventListener('click', () => {
      viewStepModeBtn.classList.add('active');
      viewCardModeBtn.classList.remove('active');
      autumnParchmentSheet.style.display = 'none';
      stepNavigator.style.display = 'block';
      renderStepSlide(currentStepIndex);
    });
  }

  // --- Step-by-Step Interactive Navigator (Autumn) ---
  function initStepDots() {
    if (!stepDotsContainer) return;
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
    if (!stepSlideDisplay) return;
    const t = translations[currentLang];
    const item = coursesData[idx];

    // Indicator
    if (activeStepIndicator) {
      if (currentLang === 'es') activeStepIndicator.textContent = `Paso ${idx + 1} de ${coursesData.length}`;
      else if (currentLang === 'en') activeStepIndicator.textContent = `Course ${idx + 1} of ${coursesData.length}`;
      else if (currentLang === 'pt') activeStepIndicator.textContent = `Etapa ${idx + 1} de ${coursesData.length}`;
      else activeStepIndicator.textContent = `Gang ${idx + 1} von ${coursesData.length}`;
    }

    // Dots
    document.querySelectorAll('.step-dot').forEach((dot, dotIdx) => {
      dot.classList.toggle('active', dotIdx === idx);
    });

    if (prevStepBtn) prevStepBtn.disabled = idx === 0;
    if (nextStepBtn) nextStepBtn.disabled = idx === coursesData.length - 1;

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

  if (prevStepBtn) {
    prevStepBtn.addEventListener('click', () => {
      if (currentStepIndex > 0) {
        currentStepIndex--;
        renderStepSlide(currentStepIndex);
      }
    });
  }

  if (nextStepBtn) {
    nextStepBtn.addEventListener('click', () => {
      if (currentStepIndex < coursesData.length - 1) {
        currentStepIndex++;
        renderStepSlide(currentStepIndex);
      }
    });
  }

  // --- Print Menu Functionality ---
  printMenuBtn.addEventListener('click', () => {
    // If in autumn and in step mode, switch to full card before printing
    if (currentSeason === 'autumn' && autumnParchmentSheet && autumnParchmentSheet.style.display === 'none') {
      autumnParchmentSheet.style.display = 'block';
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
  setSeason('spring');
});
