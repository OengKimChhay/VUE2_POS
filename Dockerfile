FROM node:lts-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install @vue/cli@4.5.14 -g

COPY ./dist /app
RUN npm run build
EXPOSE 80

CMD ["npm", "run", "serve"]
# production stage
# FROM nginx:stable-alpine as production-stage
# COPY --from=build-stage ./dist /usr/share/nginx/html
# CMD ["nginx", "-g", "daemon off;"]