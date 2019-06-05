FROM java:8

# Create content folder that will be linked from the outside into
# the container. It will contain the persistent graphs contents
# and the configuration files of the Fuseki server
RUN mkdir -p /fuseki
RUN mkdir -p /content

# Copy all files including the modified fuseki files into the main directory.
ADD ./fuseki /fuseki

# Make sure both persistent graphs and server configuration files
# are available on server startup
ENV FUSEKI_HOME /fuseki
ENV FUSEKI_BASE /content

WORKDIR /fuseki

ARG user=fuseki
ARG group=fuseki
ARG uid=4044
ARG gid=4044

# Fuseki server is run with user `fuseki`, uid = 1510
# If you bind mount a volume from the host or a data container,
# ensure you use the same uid
RUN groupadd -g ${gid} ${group} \
&& useradd -d "$FUSEKI_HOME" -u ${uid} -g ${gid} -m -s /bin/bash ${user}

# Persist changes to the outside
VOLUME $FUSEKI_BASE

USER ${user}

# Start the service
ENTRYPOINT sh fuseki-server --port=4044
