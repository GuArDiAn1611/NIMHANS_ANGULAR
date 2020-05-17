# stage 1

FROM node:latest as node
WORKDIR /app
COPY . .


# stage 2

FROM nginx:alpine
COPY --from=node /app/dist/NIMHANS /usr/share/nginx/html

