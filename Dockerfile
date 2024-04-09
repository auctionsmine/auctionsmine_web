FROM ubuntu:latest AS build

RUN apt-get update
RUN apt-get install nodejs:20.9.0
RUN apt-get install npm:10.1.0

ENV SERVER_PORT=${SERVER_PORT}

COPY . .

RUN npm install
RUN npm run build

FROM httpd:2.4
COPY --from=build ./build/ /usr/local/apache2/htdocs/

EXPOSE ${SERVER_PORT}
