FROM python:3.12-slim

WORKDIR /app

# system deps
RUN apt-get update && apt-get install -y build-essential libffi-dev gcc && rm -rf /var/lib/apt/lists/*

# copy requirements and install
COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

# copy backend code
COPY . /app

# expose port used by uvicorn
EXPOSE 8000

# use env var to configure uvicorn in docker-compose (no reload in production)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]