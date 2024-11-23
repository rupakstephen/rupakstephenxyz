# rupakstephenxyz
Repository for my personal website!

We need to use docker-compose in order to run docker containers so:


# Getting Mongo Docker Container Up
wget https://github.com/themattman/mongodb-raspberrypi-docker/releases/download/r7.0.4-mongodb-raspberrypi-docker-unofficial/mongodb.ce.pi4.r7.0.4-mongodb-raspberrypi-docker-unofficial.tar.gz

docker load --input mongodb.ce.pi4.r7.0.4-mongodb-raspberrypi-docker-unofficial.tar.gz

docker run -d --network rupakstephenxyz_app-network -p 27017:27017 --name mongodb mongodb-raspberrypi4-unofficial-r7.0.4

docker compose build

docker compose up
