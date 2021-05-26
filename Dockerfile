FROM node:16-alpine as builder

WORKDIR /opt/app

# IMPORTANT! if you did not install run yarn install ever before than uncomment next line
# RUN yarn install

# copy everything including node_modules from install stage
COPY . .

RUN yarn build:docker

FROM node:16-alpine
LABEL maintainer="acodexm"

# When the NODE_ENV environment variable is set to 'production' all devDependencies in your package.json file will be completely ignored when running install
ENV NODE_ENV=production

WORKDIR /opt/app

COPY package.json yarn.lock ./
COPY ./server/package.json ./server/yarn.lock ./server/
COPY ./client/package.json ./client/yarn.lock ./client/

# install only production packages
RUN SKIP_HUSKY=1 yarn install --frozen-lockfile
# copy necessary files/directories
COPY --from=builder /opt/app/server/dist ./server/dist
COPY --from=builder /opt/app/client/build ./server/dist/build

EXPOSE 8080
CMD ["yarn", "start:docker"]