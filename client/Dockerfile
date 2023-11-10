FROM node:18-alpine as client
WORKDIR /app/client
COPY client/package.json /app/client
RUN npm install --no-update-notifier

COPY client /app/client/
RUN npm run build
FROM node:18-alpine 
WORKDIR /app

COPY server/package.json /app
RUN npm install --no-update-notifier
COPY server /app

COPY --from=client /app/client/build /app/client
EXPOSE 5000
CMD [ "npm", "start" ]
