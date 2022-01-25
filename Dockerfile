# Global Args
ARG NGINX_VERSION=stable-alpine@sha256:c3ffe58e1eb09a16b3952c2bbe92363c50084f55a0da5c2ad38d6ae798c64599
ARG NODE_VERSION=lts-alpine3.15@sha256:f21f35732964a96306a84a8c4b5a829f6d3a0c5163237ff4b6b8b34f8d70064b
ARG NODE_ENV=production

# Install dependecies in ephemeral container
FROM node:$NODE_VERSION as deps
ARG NPM_TOKEN=''
ENV NODE_ENV=$NODE_ENV
WORKDIR /app

# Copy over dependency files
COPY app/package*json /app/

# Install non dev dependencies
RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > .npmrc && \
   npm ci --only=production && \
   rm -f .npmrc

# Build src in another ephemeral container
FROM node:$NODE_VERSION as build
ARG PROJECT_NAME=kyrptowatch
WORKDIR /usr/src/$PROJECT_NAME

# Copy over app
COPY app/ /usr/src/$PROJECT_NAME/

# Copy over deps
COPY --chown=node:node --from=deps /app/node_modules /usr/src/$PROJECT_NAME/node_modules

# Generate build
RUN npm run build

FROM node:$NODE_VERSION as dev
ARG PROJECT_NAME=kyrptowatch
ARG NODE_ENV=development
ENV NODE_ENV=$NODE_ENV
WORKDIR /usr/src/$PROJECT_NAME

# Copy over app
COPY app/ /usr/src/$PROJECT_NAME/

RUN mkdir -p node_modules && \
    chown node:node node_modules

# Copy over non-dev deps
COPY --chown=node:node --from=deps /app/node_modules /usr/src/$PROJECT_NAME/node_modules

# Install dev deps
RUN npm install

# Switch to non root user
USER node:node
EXPOSE 3000
CMD ["npm", "run", "start"]

FROM nginx:$NGINX_VERSION as cloud
ARG PROJECT_NAME=kyrptowatch
COPY --from=build /usr/src/$PROJECT_NAME/build /usr/share/nginx/html
COPY .docker/nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
