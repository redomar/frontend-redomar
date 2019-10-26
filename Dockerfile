FROM nginx:1.16
COPY ./src/ /usr/share/nginx/html
EXPOSE 80
