FROM node:12.18.1 AS base

ENV OS_USER=node
ENV LANG C.UTF-8

WORKDIR /usr/app

###############################################################################

FROM base AS dependencies

COPY package*.json ./

RUN npm set progress=false \
	&& npm config set depth 0 \
	&& npm ci

###############################################################################

FROM base AS release

COPY --from=dependencies /usr/app/node_modules ./node_modules
COPY . .

RUN npm run compile \
	&& npm prune --production

ENV NODE_ENV=production
USER ${OS_USER}

CMD [ "npm", "start" ]
