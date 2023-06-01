#Deriving the latest base image
FROM python:latest

# Any working directory can be chosen as per choice like '/' or '/home' etc
# i have chosen /usr/app/src
WORKDIR /earthquake

RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt-get update && apt-get install -y glib2.0 
RUN apt-get install -y ./google-chrome-stable_current_amd64.deb

#to COPY the remote file at working directory in container
ADD . .
RUN pip install -r requirements.txt

# Now the structure looks like this '/usr/app/src/test.py'

#CMD instruction should be used to run the software
#contained by your image, along with any arguments.

CMD [ "python", "./run_earthquake.py"]
