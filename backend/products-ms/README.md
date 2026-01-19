# Products Microservice

Microservicio que contiene la logica de negocio para la gestion de productos. Se comunica via TCP con el API Gateway.

## Variables de entorno

| Variable | Descripcion |
|----------|-------------|
| DB_HOST | Host de la base de datos PostgreSQL |
| DB_PORT | Puerto de la base de datos |
| DB_USER | Usuario de la base de datos |
| DB_PASS | Password de la base de datos |
| DB_NAME | Nombre de la base de datos |
| MS_HOST | Host del microservicio |
| MS_PORT | Puerto TCP del microservicio |

## Modelo de datos

### Tabla: Product

| Campo | Tipo | Descripcion |
|-------|------|-------------|
| id | int (PK) | Identificador unico |
| name | string | Nombre del producto (requerido) |
| price | decimal | Precio del producto (requerido, >= 0) |
| stock | int | Stock disponible (requerido, >= 0) |

## Comandos

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run start:dev

# Produccion
npm run start:prod

# Seed (datos de prueba)
npm run seed

# Tests unitarios
npm test
```

## Tests

| Archivo | Cobertura |
|---------|-----------|
| products.service.spec.ts | findAll, create, remove |

**Casos de prueba:**
- Retornar lista de productos
- Crear producto exitosamente
- Eliminar producto exitosamente
- Manejar producto no encontrado (404)
- Manejar errores de base de datos

## Estructura del proyecto

```
src/
├── common/
│   └── errors/
│       └── rcp.ts                # Errores RPC personalizados
├── config/
│   └── env.ts                    # Variables de entorno
├── database/
│   └── seed.ts                   # Script de datos de prueba
├── products/
│   ├── dto/
│   │   └── create-product.dto.ts
│   ├── entities/
│   │   └── product.entity.ts
│   ├── products.controller.ts
│   ├── products.module.ts
│   └── products.service.ts
├── app.module.ts
└── main.ts
```

## Mensajes TCP

| Comando | Payload | Descripcion |
|---------|---------|-------------|
| get_products | {} | Obtener todos los productos |
| create_product | CreateProductDto | Crear un producto |
| delete_product | number (id) | Eliminar un producto |
