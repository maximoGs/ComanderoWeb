# Martino Wines 1901 · Ecosistema Digital para Alta Gastronomía & Comandas FOH/BOH
### Bodega Martino Wines (1901) · Mayor Drummond, Luján de Cuyo, Mendoza
**Recomendado por Guía MICHELIN 2024, 2025 & 2026**

Aplicación web móvil (`PWA`) de última generación diseñada para la orquestación integral de servicio de sala (**FOH**) y cocina (**BOH**). Basada en el estudio de ingeniería y arquitectura: *"Arquitectura Tecnológica para la Alta Gastronomía: Análisis de Soluciones Globales y Diseño del Ecosistema Perfecto"*.

---

## ⚡ Novedades Operativas de Vanguardia

### 1. 🍽️ Nuevos Menús de Acceso Rápido & Secuencias Fine Dining
- **✨ Menú 5 Pasos (Degustación)**:
  1. *Snack del Chef* (Selección de bienvenida no específica de autor).
  2. *Escabeche de conejo*.
  3. *Trucha curada en koji*.
  4. *Cordero al sarmiento* (con selector de punto de brasa: Jugoso / A Punto / Cocido).
  5. *Texturas de frutilla*.
- **👑 Gran Menú 8 Pasos (Experiencia Completa)**:
  1. *Snack del Chef* (Selección de bienvenida).
  2. *Escabeche de conejo*.
  3. *Trucha curada en koji*.
  4. *Espárragos a las brasas* (previo al cordero).
  5. *Cordero al sarmiento*.
  6. *Flor de Jamaica* (granita/limpiador cítrico previo al postre).
  7. *Texturas de frutilla*.
  8. *Petit four de bodega* (al final con el café).
- **🍽️ Menú 3 Pasos (Almuerzo / Salón)**:
  - **Entradas**: Empanada de osobuco braseado, Empanada de chivo, Ensalada de estación o Selección variable del Chef.
  - **Principales**: Pasta artesanal (Sorrentinos de hongos y trufa), Bife al sarmiento (con punto de cocción) o Pesca del día.
  - **Postres**: Húmedo de chocolate amargo 70%, Mousse de autor o Pavlova con frutos rojos.
- **⚡ Asignación Rápida a Toda la Mesa**: Botonera superior con un solo clic para asignar a todos los comensales a 5 Pasos, 8 Pasos o 3 Pasos simultáneamente.

### 2. 📱 Footer Compacto de Envío de Comanda
- Barra inferior sticky optimizada y esbelta:
  - Contador de comensales.
  - Total calculado en tiempo real con tipografía monospace (`JetBrains Mono`).
  - Botón verde compacto de envío directo a WhatsApp (`[ 💬 Enviar a Cocina ]`).
  - Botón de reinicio rápido de mesa (`[ 🗑️ Vaciar ]`).

### 3. 🌙 Modo Oscuro (#121212) con Contraste de Alta Legibilidad
- Eliminación total de textos oscuros sobre fondo negro:
  - Etiquetas de alérgenos (`.choice-label`) en oro brillante (`#e5c06e`).
  - Botón `+ Agregar Otro Comensal a la Mesa` estilizado en tonos oscuros con borde dorado discontinuo.
  - Botón de agregar bebida `[ Agregar ]` en oro sólido con texto negro de alto contraste.
  - Selectores de platos y checks de servicio con contraste nítido y retroalimentación verde.

### 4. 🗺️ Acceso Rápido & Expandido de Mesas
- **⚡ Vista Rápida (Compacta)**: Cuadrícula ultra-ágil para mozos en salón. Muestra comensales, total, estado del agua, **resumen de por cuál plato va** y **botón directo `[ 🍽️ Bajar Paso ]`** para avanzar la experiencia con un solo toque desde la sala.
- **📋 Vista Expandida (Detalle Salón)**: Tarjetas ejecutivas con:
  - Stepper visual del viaje gastronómico (5 u 8 pasos con estados completado, actual y próximo).
  - Cronómetro de degustación en vivo: **"Bajado hace XXm XXs"**.
  - Clasificación cromática Michelin (🟢 Óptimo / 🟡 Marchar / 🔴 Demora).
  - Botón maestro `[ 🍽️ Bajar Siguiente Plato (Avanzar Experiencia) ]` y `[ ↩️ Retroceder ]`.
  - Resumen de comensales y alertas críticas de alérgenos.

### 5. ⏱️ Cronómetro y Pacing Michelin ("Hace cuánto se bajó")
- Cronómetro dinámico que calcula segundo a segundo la varianza temporal de degustación:
  - 🟢 **0 a 14 min**: **Ritmo Óptimo (Degustando)** - Fondo esmeralda. El comensal disfruta de su plato recién bajado.
  - 🟡 **15 a 24 min**: **Ventana Michelin (Marchar Siguiente)** - Fondo ámbar/oro. Cocina debe marchar el siguiente paso para entrega sincronizada.
  - 🔴 **25+ min**: **Alerta de Demora en Mesa** - Destello cromático sutil. Alerta a sala y pase para evitar fatiga de espera.

---

## 🏛️ Las Mecánicas Operativas Fundamentales Implementadas

1. **Course Fire Control & Pacing Engine (KDS Pase de Cocina / Pass Master)**:
   - Pantalla BOH para el Chef Ejecutivo y expedidor. Enrutamiento por estaciones (Cuarto Frío, Brasas/Saucier, Pastelería), alerta visual de delayed auto-fire y avance de pasos sincronizado con la sala.
2. **Resiliencia Offline & Edge Local-First**:
   - Operación ininterrumpida ante caídas de internet. Sincronización en segundo plano con persistencia local y latencia de red LAN sub-milisegundo.
3. **Trazabilidad Extrema de Alérgenos (Life-Safety Audit Trail)**:
   - Detección de colisiones cruzadas (Reglamento UE 1169/2011 & FALCPA: TACC/Gluten, Frutos Secos, Lácteos/Cabra, Pescado).
   - Cadena de custodia inmutable con firmas de tiempo y exportación probatoria en `.txt`.
4. **Ergonomía de Hardware, Modo Oscuro (#121212) & Contención Acústica**:
   - Selector de Modo Oscuro Fine Dining real (`#121212 Obsidian & Gold`) para salones con luz tenue de velas.
   - Supresión de zumbadores acústicos estridentes en BOH, reemplazados por destellos visuales cromáticos.
5. **Topología de Cava 1901 & Localización de Bins (Sommelier)**:
   - Mapa espacial de estanterías y barricas históricas de 1901 (`Bin C-4-12`, `Bin C-2-04`, `Bin G-2-11`, etc.), control de stock y temperaturas por sector.
6. **Orquestación Ágil de Salón**:
   - Sincronización instantánea de comensales, bebidas y envíos directos de comanda por WhatsApp sin intermediarios ni fricción.

---

## 🗺️ Mapa de Salón (16 Mesas en 4 Sectores)

1. **🍷 Cava & Salón 1901**: Mesas 1 a 5 (Edificio histórico de adobe restaurado).
2. **🌿 Galería & Olivos**: Mesas 6 a 10 (Espacio semicubierto hacia el jardín).
3. **🍇 Terraza Viñedos**: Mesas 11 a 14 (Vistas abiertas a los viñedos y la cordillera).
4. **🪵 Cava de Barricas (Privado)**: Mesas 15 y 16 (Sector íntimo de catas exclusivas).

---

## 🛠️ Estructura del Proyecto

```text
├── index.html            # Ecosistema completo: Salón FOH, KDS Pase, Alérgenos, Cava y Blueprint
├── styles.css            # Diseño Obsidian & Gold #121212, Dark Mode, Steppers, Pacing y Footer Compacto
├── app.js                # Pacing Engine, nuevos menús (5/8/3 pasos), timers live y auditoría de alérgenos
├── manifest.json         # Manifiesto PWA para instalación móvil
├── README.md             # Documentación técnica y operacional
└── assets/
    └── martino-logo.svg  # Identidad visual Martino Wines 1901
```

---

## 💻 Ejecución Local

```bash
# Abrir directamente index.html en el navegador o iniciar servidor local:
npx serve -p 8085
```
