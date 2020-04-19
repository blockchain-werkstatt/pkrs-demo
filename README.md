# Docker Infrastructure

Simple development set up which allows to run all projects from the single entry point.

Folder structure must be the following:
```
|_identity-app
|_identity-backend
|_testrpc-network
```

**Clone the repository in their respective folders**

To run project in dev mode:
```bash
$ cd docker_infrastructure
$ sudo docker-compose up --build
```

identity app listen on : 
```
localhost:8000 or {docker_public_ip}:8000
```

identity backend listen on : 
```
localhost:4000 or {docker_public_ip}:4000
```

testrpc listen on : 
```
localhost:8545 or {docker_public_ip}:8545
```

to get the docker network bridge IP
```
docker inspect {container_name} | grep 'IPAddress'
```
