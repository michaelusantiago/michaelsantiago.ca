# FROM node:18.12-alpine
FROM node:20-slim

# PNPM
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /usr/local/bin/michaelsantiago.ph

ADD app ./app
COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN pnpm install

# RUN npm ci

EXPOSE 3000

# for local machine
# ENV ORIGIN=http://127.0.0.1:3000
# ENV PUBLIC_PB_URI=http://ms_pb:8090

# for render.com
ENV ORIGIN=https://michaelsantiago.onrender.com
ENV PUBLIC_PB_URI=https://michaelsantiago.pockethost.io
CMD [ "node", "./app/index.js" ]

# ms_pb is temporary because when the website have the domain, it should be domain instead of ms_pb
# example. PUBLIC_PB_URI=https://pb.michaelsantiago.ca
# or else, to eliminate the round trip from the DNS, find a way to read data on the serverside only (always)