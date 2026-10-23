# Los Bocheros Restó · Herramienta de Pedidos & Comandas para Mozos
### Bodega Lamadrid Estate Wines · Las Compuertas, Luján de Cuyo, Mendoza

Aplicación web móvil (`PWA`) diseñada para **mozos y personal de sala** de **Los Bocheros Restó**. Permite tomar comandas mesa por mesa de manera rápida, gestionar maridajes, especificar puntos de cocción de carnes y restricciones dietéticas, calcular subtotales con propina sugerida, marchar platos a cocina y enviar tickets formateados por WhatsApp.

---

## 📱 Uso en Celulares (Conexión Local WiFi)

La aplicación funciona de forma local en la red WiFi del restaurante para que todos los mozos y camareros puedan usarla simultáneamente desde sus teléfonos:

1. Conecta tu celular a la misma red WiFi que la computadora o servidor del restaurante.
2. Abre la cámara del móvil y escanea el código QR desde el botón **"Conectar Celular"** en la barra superior.
3. O ingresa directamente en el navegador de tu celular:
   ```text
   http://192.168.1.41:8085
   ```
4. **Instalación como App Nativa**: En Safari (iOS) o Chrome (Android), pulsa en *"Compartir" ➔ "Agregar a pantalla de inicio"* para tenerla como app sin barra de navegador.

---

## 🍽️ Funcionalidades Principales

### 1. Toma de Pedidos Rápida (Catálogo de Opciones)
- **Menú Primavera (A la Carta)**:
  - *Entradas*: Espárragos a la plancha ($18.000), Provoleta asada ($25.000), Solomillo curado ($21.000), Queso de cabra ($18.000), Dúo de Empanadas ($16.000).
  - *Principales*: Costilla confitada ($34.000), Pasta artesanal de hongos ($29.000), Trucha a la plancha ($36.000), Ojo de bife ($36.000).
  - *Postres*: Pera pochada ($16.000), Tarta flan ($17.000), Selección de quesos ($16.000), Panqueque con dulce de leche ($18.000).
- **Menú Otoño (Degustación 7 Pasos)**:
  - Opción de menú degustación completo por persona ($58.000) o pasos individuales.
- **Carta de Vinos Lamadrid & Bebidas**:
  - Líneas Reserva (Malbec, Bonarda, Cabernet Sauvignon).
  - Líneas Gran Reserva (Malbec, Chardonnay, Cabernet Franc).
  - Vinos Íconos (*Matilde Malbec*, *Guillermo Cabernet Sauvignon*, *Begani Private Selection*).
  - Burbujas (*ZunZun Pet Nat*, *Margarita Espumoso Champenoise*).
  - Aguas minerales Villavicencio y cafetería de especialidad.

### 2. Personalización de Platos & Alertas de Cocina
- **Punto de Cocción de Carne**: *Jugoso (Rojo)*, *A Punto (Rosado)*, *Cocido*.
- **Maridajes**: *Sin Maridaje*, *Maridaje Clásico*, *Upgrade de Autor*.
- **Etiquetas de Alergia / Dietas**: *Sin Sal*, *Sin TACC / Celíaco*, *Vegetariano*, *Vegano*, *Sin Frutos Secos*, *Sin Lácteos*, *Para Compartir*.
- **Notas especiales**: Campo de texto para observaciones directas al chef.

### 3. Mapa de Mesas en Tiempo Real (16 Mesas en 4 Sectores)
- **🌿 Sector Terraza Viñedos**: Mesas 1 a 5
- **🧱 Sector Galería Adobe**: Mesas 6 a 10
- **🍷 Sector Salón Barricas**: Mesas 11 a 14
- **🍇 Sector Pérgola Las Compuertas**: Mesas 15 a 16
- Estados visuales: *Libre* (Verde), *Con Pedido* (Naranja), *En Cocina* (Azul), *Cuenta Solicitada* (Rosa).

### 4. Comanda en Vivo, WhatsApp & Facturación
- Agrupación automática por tiempos de servicio:
  - `1° TIEMPO · ENTRADAS`
  - `2° TIEMPO · PRINCIPALES`
  - `3° TIEMPO · POSTRES`
  - `VINOS & BEBIDAS`
- **Marchar a Cocina 🔔**: Notificación con sonido y timestamp.
- **Enviar por WhatsApp 💬**: Genera automáticamente el mensaje formateado con todos los detalles de la mesa para el grupo de cocina o caja.
- **Ticket de Cobro 🧾**: Vista limpia para imprimir el recibo a los comensales.
- **Cálculo de Propina / Servicio (10%)**: Casilla opcional con cálculo automático en pesos argentinos.

### 5. Multilingüe (4 Idiomas)
- 🇦🇷 **Español**
- 🇬🇧 **English**
- 🇧🇷 **Português**
- 🇨🇭 **Suizo (Deutsch Schweizer)**
*Permite al mozo cambiar el idioma al instante para mostrar ingredientes o maridajes a comensales internacionales.*

---

## 🛠️ Estructura del Proyecto

```text
├── index.html        # Estructura de la Web App para mozos
├── styles.css        # Diseño mobile-first táctil, colores de estado y print receipt
├── app.js            # Lógica completa, catálogo, persistencia localStorage y QR
├── manifest.json     # Manifiesto PWA para instalación en celulares
└── assets/
    ├── lamadrid-logo.png       # Identidad visual Bodega Lamadrid
    ├── los-bocheros-hero.jpg   # Ambiente otoñal
    └── los-bocheros-spring.jpg # Ambiente primaveral
```

---

## 💻 Ejecución Local

Para levantar el servidor en tu computadora:

```bash
# Con Node.js (sirve en puerto 8085)
node server.js
# O con cualquier servidor estático
npx serve -p 8085
```
