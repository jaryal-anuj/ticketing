FROM node:16-alpine

WORKDIR /app
COPY package.json .
RUN npm install --omit=dev
RUN npm install pm2 -g
RUN npm run build
COPY ./build .

CMD ["pm2","index.js"]