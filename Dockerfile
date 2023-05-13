# Installs Node.js image
FROM node:14.17.4-alpine3.14

# sets the working directory for any RUN, CMD, COPY command
# all files we put in the Docker container running the server will be in /usr/src/app (e.g. /usr/src/app/package.json)
WORKDIR /usr/src/app

# Copies package.json, package-lock.json, tsconfig.json, .env to the root of WORKDIR
COPY ["package.json", "package-lock.json", "tsconfig.json", ".env", "./"]

# Copies everything in the src directory to WORKDIR/src
COPY ./config ./config
COPY ./src ./src

# Installs all packages
RUN yarn install

EXPOSE 8080

# Runs the dev yarn script to build & start the server
RUN yarn build
RUN yarn migrate:up
CMD yarn start