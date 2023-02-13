FROM node:16-alpine AS base

FROM base as deps
WORKDIR /app
COPY package.json .
RUN npm install --omit=dev

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY package.json .
COPY tsconfig.json .
COPY src ./src
RUN npm run build

FROM base AS runner
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/build .
RUN npm install pm2 -g
CMD ["pm2-runtime","index.js"]
