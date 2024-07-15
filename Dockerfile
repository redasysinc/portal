FROM node:16-alpine
WORKDIR /usr/portal
COPY package.json .
RUN npm install && npm install typescript -g && npm install vite
COPY . .
CMD ["npm", "run", "dev"]
