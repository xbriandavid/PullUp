FROM nginx:1.15.8-alpine
#configuration
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./Auth/*.html /usr/share/nginx/html/
COPY ./Construction/*.html /usr/share/nginx/const/
COPY ./Construction/*.css /usr/share/nginx/html/
COPY ./Auth/*.js /usr/share/nginx/html/
