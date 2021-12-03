FROM node:lts-alpine as build-stage

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install @vue/cli@4.5.14 -g

COPY ./ .
RUN npm run build
EXPOSE 80
# production stage

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]