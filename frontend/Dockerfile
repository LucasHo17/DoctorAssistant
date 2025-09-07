# build stage
FROM node:18-alpine AS build
WORKDIR /app

# install deps
COPY package.json package-lock.json* /app/
RUN npm ci --silent

# copy source
COPY . /app

# allow setting API base URL at build time
ARG VITE_API_BASE_URL=/api
# create env file for Vite build
RUN echo "VITE_API_BASE_URL=${VITE_API_BASE_URL}" > .env.production

# build the app
RUN npm run build

# ---------- production stage ----------
FROM nginx:stable-alpine

# copy build output to nginx web root
COPY --from=build /app/dist /usr/share/nginx/html

# copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]