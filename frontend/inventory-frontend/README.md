# Inventory Frontend

Aplicacion Angular para la gestion de inventario de productos.

## Configuracion

El frontend usa un proxy para comunicarse con el API Gateway.

**proxy.conf.json:**
```json
{
  "/api": {
    "target": "http://localhost:3000",
    "secure": false,
    "changeOrigin": true
  }
}
```

## Comandos

```bash
# Instalar dependencias
npm install

# Desarrollo (puerto 4200)
npm start

# Build produccion
npm run build

# Tests unitarios
npm test
```

## Tests

| Archivo | Cobertura |
|---------|-----------|
| products.service.spec.ts | getAll, create, remove |

**Casos de prueba:**
- GET /api/products retorna lista de productos
- POST /api/products crea un producto
- DELETE /api/products/:id elimina un producto

## Estructura del proyecto

```
src/app/
├── products/
│   ├── components/
│   │   ├── products-form/      # Formulario para crear productos
│   │   └── products-list/      # Lista de productos con eliminacion
│   ├── models/
│   │   └── products.interfaces.ts
│   ├── products.page.ts        # Pagina principal de productos
│   ├── products.page.html
│   ├── products.page.scss
│   ├── products.routes.ts
│   └── products.service.ts     # Servicio HTTP
├── shared/
│   └── ui/
│       └── button/             # Componente de boton reutilizable
├── app.ts
├── app.config.ts
└── app.routes.ts
```

## Funcionalidades

- Listar productos con nombre, precio formateado y stock
- Crear nuevos productos con validacion de formulario
- Eliminar productos con confirmacion
- Manejo de errores con mensajes del backend
- Formato de precios en pesos colombianos ($ 1.000.000)
