FROM node:20-alpine

WORKDIR /app

# Dependencias
COPY package*.json ./
RUN npm install

# Copiamos el resto
COPY . .

# Prisma
RUN npx prisma generate

# Nest corre en 3000
EXPOSE 3000

CMD ["npm", "run", "start:dev"]
