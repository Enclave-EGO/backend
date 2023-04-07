FROM node:16-alpine

WORKDIR /app-folder

COPY package*.json ./

RUN npm install

# RUN npm run build

COPY . .

EXPOSE 4001

# CMD ["npm", "start"]

CMD ["npm", "start", "dev"]