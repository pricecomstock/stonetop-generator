# FROM node:18-alpine as build-stage

# # Create app directory
# WORKDIR /app

# # Copy current directory in
# COPY package*.json ./

# # install everything
# RUN npm install

# COPY . .

# RUN npm run build

# # production stage
# FROM nginx:1.13.12-alpine as production-stage
# COPY --from=build-stage /app/build /usr/share/nginx/html
# EXPOSE 8080
# CMD ["nginx", "-g", "daemon off;"]

# Direct copy to prod stage
FROM nginx:1.13.12-alpine as production-stage
COPY build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
