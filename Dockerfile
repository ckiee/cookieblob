FROM jrottenberg/ffmpeg
FROM node:10

# copy ffmpeg bins from first image
COPY --from=0 / /

WORKDIR /usr/src/app

COPY yarn.lock ./
COPY package.json ./

RUN yarn

COPY . .

EXPOSE 3000
CMD [ "yarn", "start" ]