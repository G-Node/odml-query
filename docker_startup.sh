#!/usr/bin/env sh

# Cleanup leftover database lock file if a server crash has happened,
# otherwise the service can encounter restart issues.
if [ -f /content/system/tdb.lock ]; then
   rm /content/system/tdb.lock
fi

# start the service
sh fuseki-server --port=4044

