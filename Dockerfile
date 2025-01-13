# Use a newer Node.js version that supports structuredClone
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for frontend, admin, and backend
COPY frontend/package.json frontend/package-lock.json /app/frontend/
COPY admin/package.json admin/package-lock.json /app/admin/
COPY backend/package.json backend/package-lock.json /app/backend/

# Install dependencies for frontend, admin, and backend
RUN cd frontend && npm install
RUN cd admin && npm install
RUN cd backend && npm install

# Copy the rest of the project files
COPY . /app/

# Build frontend and admin
RUN cd frontend && npm run build
RUN cd admin && npm run build

# Expose the necessary ports (5173 for frontend, 5174 for admin, 5000 for backend)
EXPOSE 5173 5174 5000

# Start all services (admin, frontend, and backend)
CMD ["sh", "-c", "cd frontend && npm run dev & cd admin && npm run dev -- --port 5174 & cd backend && npm run start"]
