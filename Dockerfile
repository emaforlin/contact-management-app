FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

# Install deps
RUN npm install

COPY . . 

RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app

# Install production dependencies only
RUN apk add --no-cache libc6-compat openssl

# Set NODE_ENV
ENV NODE_ENV=production

# Copy necessary files from builder
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Expose the port your app runs on
EXPOSE 3000

# Set environment variables
ENV PORT=3000

ENV HOSTNAME="0.0.0.0"

# Start the application
CMD ["node", "server.js"]



