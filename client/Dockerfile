FROM node:14.17-slim

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install --production

COPY . .

RUN npm run build

FROM nginx:alpine

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf *

# Copy static assets from builder stage
COPY --from=0 /app/build .

# Entry point when Docker container has started
ENTRYPOINT ["nginx", "-g", "daemon off;"]