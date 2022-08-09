FROM node:lts-alpine as build-stage

WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
# RUN npm install @vue/cli@4.5.14 -g

RUN npm run build
# build production stage

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]