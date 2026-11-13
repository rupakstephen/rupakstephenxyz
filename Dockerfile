FROM node:24-alpine AS client
WORKDIR /client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

FROM node:24-alpine
ENV NODE_ENV=production DB_PATH=/data/site.db STATIC_DIR=/app/public
WORKDIR /app
COPY server/package*.json ./
RUN npm ci --omit=dev
COPY server/server.js ./
COPY --from=client /client/build ./public
RUN mkdir /data && chown node /data
USER node
VOLUME /data
EXPOSE 5000
CMD ["node", "server.js"]
