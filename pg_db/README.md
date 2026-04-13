# PostgreSQL con Docker Compose

Guia paso a paso para levantar la base de datos PostgreSQL definida en `docker-compose.yml`.

## Stack y prerequisitos
- Docker Engine 20.10+ y Docker Compose v2 (o `docker compose` integrado). Verifica con `docker --version` y `docker compose version`.
- Puertos disponibles: host `5435` mapeado al `5432` del contenedor.
- Permisos para crear volúmenes locales (se usa el volumen nombrado `postgres_data`).

## Variables importantes (compose)
- Imagen: `postgres:13`
- Contenedor: `in6am_postgres`
- DB: `kinal_sports`
- Usuario: `IN6AM`
- Password: `In6amKnl!`
- Puerto host: `5435`

## Pasos para levantar el contenedor
1) Clonar o ubicarse en la carpeta del proyecto (la que contiene `docker-compose.yml`).
2) Crear y levantar en segundo plano:
```bash
docker compose up -d
```
3) Verifica que el contenedor está arriba:
```bash
docker ps --filter "name=in6am_postgres"
```
4) Probar conexión local (ejemplos):
- Con `psql` instalado en el host:
```bash
psql -h localhost -p 5435 -U IN6AM -d kinal_sports
```
- Desde otro contenedor (si usas Docker Desktop o WSL, el host suele ser `host.docker.internal`):
```bash
psql -h host.docker.internal -p 5435 -U IN6AM -d kinal_sports
```
Cuando pida contraseña usa `In6amKnl!`.

## Operaciones comunes
- Detener contenedor:
```bash
docker compose stop
```
- Detener y eliminar contenedor (manteniendo el volumen de datos):
```bash
docker compose down
```
- Detener, eliminar y borrar volúmenes (destruye datos):
```bash
docker compose down -v
```
- Ver logs en vivo:
```bash
docker compose logs -f postgres
```

## Errores frecuentes y soluciones
- "port is already allocated": Otro proceso usa el puerto 5435. Cambia el mapeo en `docker-compose.yml` (ej. `5440:5432`) y vuelve a levantar.
- "permission denied" al crear volumen o datos: Ejecuta con usuario que tenga permisos de Docker (usualmente pertenecer al grupo `docker`) o con `sudo` si es necesario.
- Credenciales incorrectas en la conexión: Revisa las variables `POSTGRES_USER`, `POSTGRES_PASSWORD` y `POSTGRES_DB` en el compose y vuelve a recrear el contenedor (`docker compose down -v && docker compose up -d`) para regenerar la instancia con las credenciales correctas.
- Conexiones rechazas desde cliente local: Asegura que el contenedor está corriendo (`docker ps`) y que el firewall permite el puerto 5435.

## Limpieza y respaldo
- Respaldar base desde el host:
```bash
pg_dump -h localhost -p 5435 -U IN6AM -d kinal_sports > backup.sql
```
- Restaurar a la misma base:
```bash
psql -h localhost -p 5435 -U IN6AM -d kinal_sports < backup.sql
```
- Borrar datos por completo: `docker compose down -v` y eliminar manualmente `backup.sql` si no lo necesitas.

## Notas
- El volumen `postgres_data` preserva los datos entre reinicios; elimínalo solo si quieres partir desde cero.
- Si cambias usuario, password o base, recrea el contenedor con `docker compose down -v` antes de `up -d` para evitar inconsistencias.
