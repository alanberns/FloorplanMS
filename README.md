## Requisitos

- Docker
- Docker Compose

## Instalación

git clone https://github.com/alanberns/FloorplanMS.git

cd FloorplanMS

docker-compose up --build

## Archivo de inicializacion de la Base de datos:

docker-compose exec floorplan_nest npx ts-node /app/src/db-init.ts