FROM python:3.11-slim

# Install system dependencies
RUN apt-get update && apt-get install -y build-essential

# Create app directory
WORKDIR /app

# Copy dependency list
COPY requirements.txt .

# Install dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy remaining source
COPY . .

# Expose port
EXPOSE 8000

# Start FastAPI
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000"]
