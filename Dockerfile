FROM nginx:alpine

COPY . /usr/share/nginx/html/

# Replace default nginx config
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
