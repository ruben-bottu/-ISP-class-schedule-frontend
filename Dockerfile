ARG API_URL=http://localhost:3000
FROM node:slim
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN echo "API_URL=$API_URL" > .env
CMD ["npm", "run"]