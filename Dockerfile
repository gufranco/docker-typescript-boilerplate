# LATEST LTS release
FROM node:lts-alpine

# Copy project, define workdir
RUN mkdir -p /opt/app
COPY . /opt/app
WORKDIR /opt/app

# Updates, uprades
RUN apk update && \
    apk upgrade --no-cache

# Dependencies
RUN yarn install --ignore-optional && \
    yarn run build

# Expose port
EXPOSE 80

# Start your engine! <3
CMD ["pm2-docker", "ecosystem.config.json"]
