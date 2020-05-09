ARG NGINX_VER

FROM nginx:${NGINX_VER}

ARG BASIC_USER
ARG BASIC_PASS

RUN apk add --update apache2-utils \
   && htpasswd -b -c /etc/nginx/.htpasswd ${BASIC_USER} ${BASIC_PASS}

COPY default.conf /etc/nginx/conf.d/

WORKDIR /usr/share/nginx/html
COPY src/dist .
