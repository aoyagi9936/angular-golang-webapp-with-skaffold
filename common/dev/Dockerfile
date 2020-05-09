ARG NODE_VERSION

FROM node:${NODE_VERSION}

WORKDIR /usr/local

RUN npm install -g @apidevtools/swagger-cli

CMD ["swagger-cli"]
