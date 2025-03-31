FROM node:22.14.0

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

CMD ["npm", "start"]

EXPOSE 1050