ARG NODE_VERSION
ARG ANGULAR_VERSION

FROM node:${NODE_VERSION}

# install angular-cli
RUN chown -R node:node /usr/local/lib/node_modules \
    && chown -R node:node /usr/local/bin
USER node
RUN npm install -g @angular/cli@${ANGULAR_VERSION} \
  && npm rebuild node-sass --force

# npm
USER root

# zip
RUN apt-get update && apt-get install -y zip

# chrome
# See https://crbug.com/795759
RUN apt-get update && apt-get install -yq libgconf-2-4

RUN apt-get update && apt-get install -y wget --no-install-recommends \
  && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst ttf-freefont \
  --no-install-recommends \
  && rm -rf /var/lib/apt/lists/* \
  && apt-get purge --auto-remove -y curl \
  && rm -rf /src/*.deb

ENV CHROME_BIN /usr/bin/google-chrome-stable

WORKDIR /app
