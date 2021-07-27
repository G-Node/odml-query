[![Docker Automated build](https://img.shields.io/docker/automated/gnode/meta.svg)](https://hub.docker.com/repository/docker/gnode/meta/)

# The G-Node odml-query service

odml-query is a SPARQL server based on [Apache Fuseki](
https://jena.apache.org/documentation/fuseki2/index.html), the service is modified 
to query [odML](https://g-node.github.io/python-odml/) specific RDF.  

For more information on the odML data formats, please check the sections below.


## The odML (Open metaData Markup Language) format

The open metadata Markup Language is a file based format (XML, JSON, YAML) for storing
metadata in an organised human- and machine-readable way. odML is an initiative to define
and establish an open, flexible, and easy-to-use format to transport metadata.

The source code of the core library is freely available on 
[GitHub](https://github.com/G-Node/python-odml) and can be installed via the 
Python package manager `pip` by typing `pip install odml`.

More information about the project including related projects as well as tutorials and
examples can be found at our odML [project page](https://g-node.github.io/python-odml/).

The odML specific RDF definitions can be found [here](
https://raw.githubusercontent.com/G-Node/python-odml/master/odml/resources/odml-ontology.ttl).


## Docker setup

The service is set up to be used with Docker and docker-compose. A running Docker container will map the systems folders to the outside to persist a graph even between container shutdowns.

To this end the service expects a specific folder structure and a `shiro.ini` file to specify administrative rights. Please refer to the Apache documentation for a full description of Apache Fuseki/Shiro handling.

The service requires the following folder structure and files before the docker container is started; the user and group owners should be in the docker group; find example files in the `resources` folder.

```
$ROOT_FOLDER
├── service
|   └── shiro.ini
└── env
    └── docker-compose.yml
```

Once the service is started locally using docker-compose, the service is available at `localhost:4044`, the port can be adjusted via the `docker-compose.yml` entry.
