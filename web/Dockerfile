FROM ubuntu: latest
MAINTAINER Jesus Bellido "jbellido@utec.edu.pe"
RUN apt-get update - y
RUN apt-get install - y python-pip python-dev build-essential
COPY . / app
WORKDIR / app
RUN pip install - r requirements.txt
ENTRYPOINT["python"]
CMD["server.py"]
