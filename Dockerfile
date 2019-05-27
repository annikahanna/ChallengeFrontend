FROM node:lts AS runtime
RUN npm i -g ionic

FROM scratch AS builder
COPY --from=runtime / /
WORKDIR /home/node/app
COPY . .
RUN npm i
EXPOSE 8100
CMD ["ionic", "serve", "--no-open"]
