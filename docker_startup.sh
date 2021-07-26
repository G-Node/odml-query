#!/usr/bin/env sh

# Cleanup leftover database lock file if a server crash has happened,
# otherwise the service can encounter restart issues.
find /content/system/ -type f -name "tdb.lock" -delete

# start the service
sh fuseki-server --port=4044
