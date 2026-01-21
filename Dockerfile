FROM node:20-alpine

WORKDIR /app

# Dependencias
COPY package*.json ./
# Copiamos prisma antes del install
COPY prisma ./prisma
RUN npm install

# Copiamos el resto
COPY . .

# Prisma
RUN npx prisma generate

# Nest corre en 3000
EXPOSE 3000

CMD ["node", "dist/main.js"]