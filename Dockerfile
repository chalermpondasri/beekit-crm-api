FROM node:22-alpine3.21 AS base

USER root
RUN apk add tzdata && \
    ln -s /usr/share/zoneinfo/Asia/Bangkok /etc/localtime


FROM base AS build

USER node
WORKDIR /build

COPY source/nest-cli.json .

COPY source/package.json .
COPY source/package-lock.json .

COPY source/tsconfig.json .
COPY source/tsconfig.build.json .
COPY source/src ./src

RUN npm ci

RUN npm run build

FROM base AS production

USER root
WORKDIR /app


COPY source/package.json source/package-lock.json ./

COPY --from=build /build/dist ./dist
COPY --from=build /build/node_modules ./node_modules

RUN npm ci --omit dev && \
    npm cache clean --force

ENV NODE_ENV=production

EXPOSE 3000

USER node

CMD ["node", "dist/main.js"]
