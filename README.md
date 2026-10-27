# Martino Wines · Herramienta de Pedidos & Comandas para Mozos
### Bodega Martino Wines (1901) · Mayor Drummond, Luján de Cuyo, Mendoza
**Recomendado por Guía MICHELIN 2024, 2025 & 2026**

Aplicación web móvil (`PWA`) diseñada para **mozos y personal de sala** del **Restaurante Martino Wines**. Permite tomar comandas mesa por mesa de manera ágil, gestionar maridajes con vinos de autor e inusuales, registrar puntos de cocción de carnes a las brasas, monitorear el servicio de agua del salón mediante alertas cromáticas dinámicas, marchar platos y enviar tickets formateados directamente a WhatsApp.

---

## 🍽️ Experiencia Gastronómica & Menús

La cocina de estación de Martino Wines está diseñada para maridar con sus líneas de terroir, varietales inusuales e íconos:

### 1. Modalidades de Menú
- **🍷 A la Carta**: Selección libre de entradas, principales y postres.
- **🍽️ Menú 2 Pasos**: Opción ejecutiva ágil ($44.000).
- **🍽️ Menú 3 Pasos (Almuerzo)**: Entrada + Principal + Postre maridado ($52.000).
- **🌿 Menú 4 Pasos (Estación)**: Entrada + Intermedio + Principal + Postre ($58.000).
- **✨ Menú Degustación Bodega 1901 (7 Pasos)**: Recorrido completo por la cocina de autor y etiquetas premium ($69.000) con seguimiento paso a paso.

### 2. Carta de Vinos Martino & Bebidas
- **Línea Baldomir & Íconos**:
  - *Baldomir Gran Malbec* (Ícono).
  - *Baldomir Serie Terroirs* (Cabernet Franc, Malbec).
  - *Martino Superiore* (Cabernet Sauvignon, Malbec, Chardonnay).
- **Martino Varietales Inusuales**:
  - *Marselan*, *Graciano*, *Sangiovese*, *Petit Verdot*, *Garnacha*.
- **Blancos, Rosés & Espumosos**:
  - *Martino Pedro Ximénez* (Varietal Insignia).
  - *Martino Rosé de Sangiovese*.
  - *Martino Extra Brut* (Método Tradicional Champenoise).

---

## 🗺️ Mapa de Salón (16 Mesas en 4 Sectores)

1. **🍷 Cava & Salón 1901**: Mesas 1 a 5 (Edificio histórico de adobe restaurado).
2. **🌿 Galería & Olivos**: Mesas 6 a 10 (Espacio semicubierto hacia el jardín).
3. **🍇 Terraza Viñedos**: Mesas 11 a 14 (Vistas abiertas a los viñedos y la cordillera).
4. **🪵 Cava de Barricas (Privado)**: Mesas 15 y 16 (Sector íntimo de catas exclusivas).

---

## 💧 Seguimiento Inteligente de Servicio de Agua

- Botón de servicio en comanda con indicador dinámico de color:
  - 🟢 **Verde**: Recién servida (0 - 15 min).
  - 🟡 **Amarillo**: Atención sugerida (15 - 30 min).
  - 🔴 **Rojo**: Mesa desatendida (+30 min sin recarga).
- Resumen en tiempo real en la cabecera del mapa de mesas.

---

## 📲 Envío de Comandas por WhatsApp

- Al presionar **"Enviar Comanda a Cocina"**, se genera automáticamente un ticket con formato markdown enriquecido (emojis, desglose por comensal, maridajes, puntos de cocción y notas).
- Redirige directamente al chat de WhatsApp de Cocina/Caja con persistencia en `localStorage`.

---

## 🛠️ Estructura del Proyecto

```text
├── index.html            # Estructura de la Web App para mozos
├── styles.css            # Diseño dark slate & gold 1901, mobile-first
├── app.js                # Lógica de comandas, menú Martino Wines y persistencia
├── manifest.json         # Manifiesto PWA para instalación móvil
└── assets/
    ├── martino-logo.svg  # Identidad visual vectorizada Martino Wines 1901
    └── ...
```

---

## 💻 Ejecución Local

```bash
# Abrir directamente en navegador o usar un servidor local
npx serve -p 8085
```
