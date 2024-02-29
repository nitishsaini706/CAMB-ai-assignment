FROM python:3.8

# Set working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt /app/
RUN pip install -r requirements.txt

# Copy the application code
COPY . /app

# Command to run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]
