FROM node:lts AS ionic-env
RUN npm i -g ionic

FROM scratch AS builder
COPY --from=ionic-env / /
WORKDIR /home/node/app
COPY . .
RUN npm i
EXPOSE 8100
CMD ["ionic", "serve", "--no-open"]
