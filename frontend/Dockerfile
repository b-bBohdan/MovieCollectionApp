FROM node:current-alpine AS build

WORKDIR /app

# Same as COPY but with two extra features:
# ADD https://example.com/file.txt /app/
# This downloads the file and adds it. COPY does not support URLs.

COPY package*.json .
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine

# Copy built files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port (default 80)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]