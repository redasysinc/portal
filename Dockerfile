FROM node:16-alpine
WORKDIR /usr/portal
COPY package.json .
RUN npm install nodemon typescript -g

RUN npm install
COPY . .
CMD ["npx", "tsx", "server/index.ts"]
