FROM node:19.2-alpine3.16 AS build
WORKDIR /app
COPY . .
RUN npm install
ARG configuration=production
RUN npm run build --prod --configuration=$configuration


FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

