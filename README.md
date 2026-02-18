# Frontend · Desafío Técnico Haulmer

Frontend del desafío técnico de Haulmer. Permite procesar pagos simulados y consultar el historial de transacciones conectándose a la API REST del backend.

---

## Stack

- **Angular 21** · Standalone Components · Signals
- **Tailwind CSS 4**
- **TypeScript 5.9**
- **Angular SSR** (Express)

---

## Lo que se implementó

**Formulario de pago**
- Inputs para monto, moneda, número de tarjeta y titular.
- Formateo automático de tarjeta y detección de marca (Visa, Mastercard).
- Validación reactiva por campo.
- Modal animado con resultado: ✅ **Aprobado** (dígito par) o ❌ **Rechazado** (dígito impar).

**Historial de transacciones**
- Tabla con ID, fecha, titular, tarjeta enmascarada, monto y estado.
- Paginación con ellipsis inteligente.
- Se actualiza automáticamente al procesar un pago.

---

## Requisitos

- Node.js >= 20
- npm >= 10
- Backend corriendo y accesible

---

## Levantar el proyecto

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar URL del backend en src/environments/environment.ts
# apiBaseUrl: 'http://localhost:8000'

# 3. Iniciar
npm start
```

Disponible en **http://localhost:4200**