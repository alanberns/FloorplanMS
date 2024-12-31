## Requisitos

- Docker
- Docker Compose

## Instalación

git clone https://github.com/alanberns/FloorplanMS.git

cd FloorplanMS

docker-compose up --build

## Archivo de inicializacion de la Base de datos:

docker-compose exec floorplan_nest npx ts-node /app/src/db-init.ts


## Acceso al contenedor de la base de datos:
docker exec -it floorplan_db /bin/bash
mongo
use nest


### Test web
cd frontend/
npx cypress run #Ejecuta los tests
npx cypress open #Abre la interfaz gráfica