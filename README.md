# Krytpowatch
![Alt text](.docs/service-ui.png?raw=true "Optional Title")

# Local Environment Visual
![Alt text](.docs/dev-env-visual.png?raw=true "Optional Title")

# Run the image
First youll need to [authenticate with github registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)

```
docker run ghcr.io/kolvin/kyrptowatch:latest
```

# Or run the project locally
## Prerequisites
- [Docker](https://docs.docker.com/get-docker/) + [Docker Compose](https://docs.docker.com/compose/install/) are required to run the project
 - Using [BuildKit](https://www.docker.com/blog/faster-builds-in-compose-thanks-to-buildkit-support/
   ) to optimise builds
```
cp .env.example .env
COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose up -d
```

`Then vist ->` http://0.0.0.0:3000


# Execute Service Commands
```
docker-compose exec <service> <command>

ie: docker-compose exec app npm ...
ie: docker-compose exec app npx ...
```

# Testing

```
docker-compose exec app npm test
```