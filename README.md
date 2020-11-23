# Fabelio Interview Assignment

API Documentation:
https://stronkapp.com/swagger/

Application Demo:
https://fabelio.stevenhansel.com

# Overview

The Project uses TypeScript as the general programming language for the static-typing ability to make the project scalable. API uses NestJS & TypeORM also for handling deployment AWS EC2 was used bootstraped with docker-compose and docker in general to handle zero-configuration deployment. Frontend uses React (CRA) & TypeScript with Tailwind CSS as it's main styling paradigm.

# API Guide

Make sure to copy the `sample.env` and fill `development.env` and `production.env` with your development & production configuration.

## Development Guideline

0. Change directory to `/api`

```
cd api
```

1. Install dependencies

```
yarn
```

2. Start the development server

```
yarn start:dev
```

## Production Guideline

Make sure that `docker` and `docker-compose` is installed

0. Change directory to `/api`

```
cd api
```

1. Run & Build docker-compose configuration

```
yarn deploy
```

2. Find docker-container ip address and reverse-proxy it to `nginx` or use it in your local network

```
docker ps
docker inspect <container_id> | grep "IPAddress"
```

Refer to the package.json in `/api` for more commands

# Frontend Guide

## Development Guideline

0. Change directory to `/client`

```
cd client
```

1. Install dependencies

```
yarn
```

2. Start the development server

```
yarn start
```
