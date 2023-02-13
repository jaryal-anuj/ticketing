FROM node:16-alpine as builder

WORKDIR /app
COPY package.json .
COPY tsconfig.json .
COPY src ./src
RUN npm install --omit=dev
RUN npm run build

FROM node:16-alpine
WORKDIR /app
COPY package.json .
RUN npm install --omit=dev
COPY --from=builder /app/build .
RUN npm install pm2 -g
CMD ["pm2-runtime","app.js"]
