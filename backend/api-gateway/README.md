# API Gateway

Servicio que expone los endpoints HTTP y se comunica con el microservicio de productos via TCP.

## Variables de entorno

| Variable | Descripcion | Default |
|----------|-------------|---------|
| GATEWAY_PORT | Puerto del API Gateway | 3000 |
| PRODUCTS_MS_HOST | Host del microservicio de productos | 127.0.0.1 |
| PRODUCTS_MS_PORT | Puerto del microservicio de productos | 4000 |

## Endpoints

| Metodo | Ruta | Descripcion |
|--------|------|-------------|
| GET | /api/products | Listar todos los productos |
| POST | /api/products | Crear un producto |
| DELETE | /api/products/:id | Eliminar un producto |

## Comandos

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run start:dev

# Produccion
npm run start:prod

# Tests unitarios
npm test
```

## Tests

| Archivo | Cobertura |
|---------|-----------|
| map-rcp-to-http.spec.ts | Mapeo de errores RPC a HTTP |

**Casos de prueba:**
- Mapear error 404 (NotFound)
- Mapear error 400 (BadRequest)
- Default a 500 cuando falta statusCode
- Usar mensaje default cuando falta message

## Estructura del proyecto

```
src/
├── common/
│   └── errors/
│       └── map-rcp-to-http.ts   # Mapeo de errores RPC a HTTP
├── config/
│   └── env.ts                    # Variables de entorno
├── products/
│   ├── dto/
│   │   └── create-product.dto.ts
│   ├── types/
│   │   └── product.type.ts
│   ├── products.controller.ts
│   ├── products.module.ts
│   └── products.service.ts
├── app.module.ts
└── main.ts
```
