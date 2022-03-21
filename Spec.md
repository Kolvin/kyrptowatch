# Kyrptowatch
![Alt text](.docs/project-spec.jpg?raw=true "blueprint")
## Purpose
 - I want to build a service that can consume and display information on crytpocurrencies

## Crypto Data source
- [CoinGecko](https://www.coingecko.com/en/api) is popular and offers 50 calls per minute
  - future requirement; at scale we would want to gracefully handle this

## Tech Stack
- [React App](https://reactjs.org/docs/create-a-new-react-app.html) for application code
  - offers fast feature development
  - runs webpack and eslint under the hood so avoids additional project configuration
- [TailwindCSS](https://tailwindcss.com/) styling framework
- [Docker](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/) for containerization
  - Multistage build supporting local development and optimized cloud images serving static build output via webserver
- [Helm](https://helm.sh/) for k8s support (WIP)
- [Github Actions](https://github.com/features/actions) CI/CD (WIP)
  - automated lint
  - automated tests
  - Tagged Releases with images stored on [Github Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)

## Whats this gonna look like?
 - I'm aiming to keep the UI pretty simple for an MVP so here is a rough UI diagram to get me started which I created using [Miro](https://miro.com);
![UI](.docs/inital-ui.jpg?raw=true "Im not a designer okay...")


## Nice to haves
 - automatic refresh of data every X period
 - display price info in graph ethier within card or popout modal