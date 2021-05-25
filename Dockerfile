FROM node:latest as builder

WORKDIR /opt/app

# copy everything including node_modules from install stage
COPY . .
RUN yarn build:docker

FROM node:latest
LABEL maintainer="acodexm"

# When the NODE_ENV environment variable is set to 'production' all devDependencies in your package.json file will be completely ignored when running install
ENV NODE_ENV=production

WORKDIR /opt/app

COPY package.json yarn.lock ./
COPY ./server ./server
COPY ./client ./client
# install only production packages
RUN SKIP_HUSKY=1 yarn install --frozen-lockfile
# copy necessary files/directories
COPY --from=builder /opt/app/server/dist ./server/dist
COPY --from=builder /opt/app/client/build ./server/dist/build

EXPOSE 8080
CMD ["yarn", "start:docker"]