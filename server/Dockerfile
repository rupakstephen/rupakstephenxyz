# Dockerfile for React client

# Build react client
FROM node:lts-slim

# Working directory be app
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./

###  Installing dependencies

RUN npm install --silent

# copy local files to app folder
COPY . .

EXPOSE 5000

CMD ["npm","start"]