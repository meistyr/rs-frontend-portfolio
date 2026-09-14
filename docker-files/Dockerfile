FROM node:lts-alpine

WORKDIR /src/app

# Copy package files first and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire app AFTER installing
COPY . .

# Then run build (now that all files including nuxt.config.ts are present)
RUN npm run build

# Set environment
ENV NODE_ENV=development
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

EXPOSE 3000

CMD ["npm", "start"]