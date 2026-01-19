# Inventory Microservices

## Docker Compose

### Servicios

| Servicio | Imagen | Puerto |
|----------|--------|--------|
| db | postgres:16-alpine | 5433:5432 |

### Variables de entorno - Base de datos

| Variable | Valor |
|----------|-------|
| POSTGRES_USER | postgres |
| POSTGRES_PASSWORD | postgres |
| POSTGRES_DB | inventory_db |

### Comandos

```bash
# Iniciar los servicios
docker-compose up -d

# Detener los servicios
docker-compose down

# Ver logs
docker-compose logs -f

# Reiniciar servicios
docker-compose restart
```

### Conexion a la base de datos

- **Host:** localhost
- **Puerto:** 5433
- **Usuario:** postgres
- **Password:** postgres
- **Base de datos:** inventory_db
