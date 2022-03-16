# Global Args
ARG NGINX_TAG=stable-alpine@sha256:74694f2de64c44787a81f0554aa45b281e468c0c58b8665fafceda624d31e556
ARG NODE_TAG=lts-alpine3.15@sha256:2c6c59cf4d34d4f937ddfcf33bab9d8bbad8658d1b9de7b97622566a52167f2b
ARG NODE_ENV=production

# Install dependecies in ephemeral container
FROM node:$NODE_TAG as deps
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
FROM node:$NODE_TAG as build
ARG PROJECT_NAME=kyrptowatch
WORKDIR /usr/src/$PROJECT_NAME

# Copy over app
COPY app/ /usr/src/$PROJECT_NAME/

# Copy over deps
COPY --chown=node:node --from=deps /app/node_modules /usr/src/$PROJECT_NAME/node_modules

# Generate build
RUN npm run build

FROM nginx:$NGINX_TAG as cloud
ARG PROJECT_NAME=kyrptowatch
COPY --from=build /usr/src/$PROJECT_NAME/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

FROM node:$NODE_TAG as dev
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
