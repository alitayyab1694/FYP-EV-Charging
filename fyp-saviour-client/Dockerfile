FROM node:14.6.0

WORKDIR /app/Frontend
COPY package.json /app/Frontend
COPY . .
RUN yarn install
RUN yarn run build
RUN yarn global add serve
EXPOSE 3000
# CMD ["npx", "serve", "-s", "build" ]