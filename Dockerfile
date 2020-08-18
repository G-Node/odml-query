FROM java:8

# Create content folder that will be linked from the outside into
# the container. It will contain the persistent graphs contents
# and the configuration files of the Fuseki server
RUN mkdir -p /fuseki
RUN mkdir -p /content

# Copy all files including the modified fuseki files into the main directory.
ADD ./fuseki /fuseki
ADD ./custom/qonsole-config.js /fuseki/webapp/js/app/

# Make sure both persistent graphs and server configuration files
# are available on server startup
ENV FUSEKI_HOME /fuseki
ENV FUSEKI_BASE /content

WORKDIR /fuseki

# Persist changes to the outside
VOLUME $FUSEKI_BASE

# Start the service
ENTRYPOINT sh fuseki-server --port=4044
