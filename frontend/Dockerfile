# Dockerfile for the React app

# Stage 1: Build the React app with Vite
# Use a Node.js image as the base
FROM node:21-alpine as build

# Set the working directory
WORKDIR /app

# Copy the app files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app files
COPY . ./

# Build the React app
RUN npm run build

# Stage 2: Serve the React app using Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]