########################################################
############# BUILD APPLICATION ########################
########################################################
FROM node:14-alpine3.10 AS builder
WORKDIR /app
COPY package.json yarn.lock /app/
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

########################################################
############# RUN APPLICATION ##########################
########################################################
FROM node:14-alpine3.10
RUN apk add --no-cache dumb-init
WORKDIR /app
RUN chown -R node:node /app
USER node
COPY --chown=node:node --from=builder /app/build /app/package.json /app/yarn.lock /app/
RUN yarn install --production --frozen-lockfile && yarn cache clean
COPY --chown=node:node --from=builder /app/build/src /app/build/src
EXPOSE 4000
CMD ["dumb-init", "yarn", "start"]