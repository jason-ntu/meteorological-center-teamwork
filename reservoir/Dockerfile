FROM python:latest

# Set the timezone
ENV TZ=Asia/Taipei

# Install common Linux packages
RUN apt-get update && apt-get install -y wget && apt-get -y install cron && apt-get install -y procps && apt-get -y install vim && rm -rf /var/lib/apt/lists/*

# Install Google Chrome
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt-get update && apt-get install -y glib2.0
RUN apt-get install -y ./google-chrome-stable_current_amd64.deb

# Set the working directory for the container
WORKDIR /reservoir

# Copy the files from the local directory to the container's directory
ADD . .

# Upgrade pip and install the required packages
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Run the reservior.py file when the container starts
CMD [ "python3", "./reservoir.py" ]
