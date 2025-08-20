# Multi-stage build для оптимизации production
FROM node:22-alpine AS builder

WORKDIR /app

# Копируем файлы package для установки зависимостей
COPY package*.json ./

# Устанавливаем все зависимости для сборки
RUN npm ci

# Копируем исходный код
COPY . .

# Собираем приложение для production
RUN npm run build

# Production stage
FROM node:22-alpine AS production

WORKDIR /app

# Создаем пользователя без root прав для безопасности
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Копируем package.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости (включая vite для preview)
RUN npm ci && \
    npm cache clean --force

# Копируем собранное приложение из builder stage
COPY --from=builder /app/dist ./dist

# Меняем владельца файлов и устанавливаем права
RUN chown -R nextjs:nodejs /app && \
    chmod -R 755 /app && \
    chmod +x /app/node_modules/.bin/*

USER nextjs

# Expose port 80
EXPOSE 80

# Запускаем приложение в production режиме
CMD ["npm", "run", "start"]