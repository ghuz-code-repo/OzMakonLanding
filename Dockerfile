FROM node:22

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Expose port 3000 (React's default port)
EXPOSE 80

# Use this command to run in development mode
CMD ["npm", "run", "dev"]