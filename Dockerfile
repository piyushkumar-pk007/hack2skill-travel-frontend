FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package.json
COPY turbo.json turbo.json
COPY tsconfig.base.json tsconfig.base.json
COPY apps/web/package.json apps/web/package.json
COPY packages/shared/package.json packages/shared/package.json

RUN npm install

COPY apps/web apps/web
COPY packages/shared packages/shared

RUN npm run build --workspace @travel-engine/shared
RUN npm run build --workspace @travel-engine/web

FROM nginx:alpine AS runner

COPY --from=builder /app/apps/web/dist /usr/share/nginx/html
COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
