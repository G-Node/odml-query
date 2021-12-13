#!/usr/bin/env sh

# Mitigation of log4j vulnerability; required until the built in
# log4j version in fuseki-server.jar has been updated to >= 2.15.0
# Check fuseki-server.jar:METAINF/DEPENDENCIES for the used version.
# Check https://logging.apache.org/log4j/2.x/security.html for details
LOG4J_FORMAT_MSG_NO_LOOKUPS=true

# Cleanup leftover database lock file if a server crash has happened,
# otherwise the service can encounter restart issues.
find /content/system/ -type f -name "tdb.lock" -delete

# start the service
sh fuseki-server --port=4044
