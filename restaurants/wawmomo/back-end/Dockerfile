FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

RUN npm install pm2 -g

COPY . .

EXPOSE 3001

RUN adduser -D nonroot
USER nonroot

CMD ["pm2-runtime", "ecosystem.config.cjs"]