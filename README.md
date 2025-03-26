## Requisitos

- Docker
- Docker Compose

## Instalación

git clone https://github.com/alanberns/FloorplanMS.git

cd FloorplanMS

docker-compose up --build

## INICIALIZAR EL SISTEMA:
Debo acceder al contenedor de la base de datos para añadir un admin.
- docker exec -it floorplan_db /bin/bash
- mongo
- use nest

Debo crear un usuario, bajo este modelo:
db.usuarios.insertOne({
"email":"...@gmail.com",
"nombre": "...",
"apellido": "...",
"isActive": true
})

Cuando se inserte ese usuario, debo usar su ID para registrarlo como admin: dejo un id de ejemplo.

db.admins.insertOne({
"_id": ObjectId("...")
})

Una vez hecho esta inicialización, ya se puede usar el sistema normalmente.

## ACCESO AL SISTEMA:
- Ingresar a localhost:5173
- Clickear el botón “Log In”
- Clickear “Continue with Google”
- Seleccionar la cuenta con el email de google que se registró en el sistema.


## Archivo de inicializacion de la Base de datos:

docker-compose exec floorplan_nest npx ts-node /app/src/db-init.ts


## Acceso al contenedor de la base de datos:
docker exec -it floorplan_db /bin/bash
mongo
use nest


### Test web
- git checkout prueba-cypress
- docker-compose down
- docker compose up
- cd frontend/
- npx cypress run #Ejecuta los tests
- npx cypress open #Abre la interfaz gráfica