FROM node:24-alpine AS build

ENV buildTag="1.0.0"

USER root
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci --ignore-scripts

# ? Only the application sources take part in the build: tests and scripts are left out
COPY tsconfig.base.json tsconfig.build.json tsconfig.json ./
COPY react-router.config.ts vite.config.ts ./
COPY app ./app
COPY public ./public

# ? `npm ci --ignore-scripts` skipped the postinstall, so the route types are generated here
RUN npx react-router typegen

# ? Type checking runs against the application project, which excludes tests and scripts
RUN npx tsc --project tsconfig.build.json --noEmit

RUN npm run build

FROM node:24-alpine AS prod

LABEL name="my_game_hub"
LABEL description="A game hub for managing and playing your favorite games"
LABEL maintainer="Álvaro Davi Santos Alves <alvaro-davi1@hotmail.com>"
LABEL version="1.0.0"
LABEL tag="boilerplate-image"

ENV CI="true"
ENV NODE_ENV="production"
ENV PORT=3001

RUN addgroup -S appgroup && adduser -S -G appgroup -h /app -s /sbin/nologin appuser

WORKDIR /app

COPY --from=build --chown=appuser:appgroup /app/build ./build
COPY --from=build --chown=appuser:appgroup /app/package.json ./package.json
COPY --from=build --chown=appuser:appgroup /app/package-lock.json ./package-lock.json

RUN npm ci --ignore-scripts --omit=dev && chown -R appuser:appgroup /app

USER appuser

EXPOSE 3001

CMD ["npm", "run", "start"]
