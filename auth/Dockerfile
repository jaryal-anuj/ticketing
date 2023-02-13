FROM node:16-alpine as builder

WORKDIR /app
COPY package.json .
COPY tsconfig.json .
COPY src ./src
RUN npm install --omit=dev
RUN npm run build

FROM builder as runner
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build .
RUN npm install pm2 -g
CMD ["pm2-runtime","index.js"]
