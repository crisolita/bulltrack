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

# Build Nest.js
RUN npm run build

# Nest corre en 3000
EXPOSE 3000

CMD ["npm", "run", "start:prod"]