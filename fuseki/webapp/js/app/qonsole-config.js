/** Standalone configuration for qonsole on index page */
/** Prefixes and example queries have been modified from the original version of the Fuseki distribution. */

define( [], function() {
  return {
    prefixes: {
      "rdf":      "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
      "rdfs":     "http://www.w3.org/2000/01/rdf-schema#",
      "owl":      "http://www.w3.org/2002/07/owl#",
      "xsd":      "http://www.w3.org/2001/XMLSchema#",
      "odml":     "https://g-node.org/odml-rdf#"
    },
    queries: [
      { "name": "Generic query",
        "query": "SELECT ?subject ?predicate ?object\nWHERE {\n" +
                 "  ?subject ?predicate ?object\n}\n" +
                 "LIMIT 25"
      },
      { "name": "Property query",
        "query": "SELECT ?file ?sec_name ?prop_name\nWHERE {\n" +
                 "  ?d rdf:type odml:Document .\n" +
                 "  ?d odml:hasFileName ?file .\n" +
                 "  ?d odml:hasSection ?s .\n" +
                 "  ?s odml:hasName ?sec_name .\n" +
                 "  ?s odml:hasProperty ?p .\n" +
                 "  ?p odml:hasName ?prop_name .\n}\n" +
                 "ORDER BY ?file\nLIMIT 50",
        "prefixes": ["rdf", "odml"]
      },
      { "name": "Value query",
        "query": "SELECT ?file ?sec_name ?prop_name ?value\nWHERE {\n" +
                 "  ?d rdf:type odml:Document .\n" +
                 "  ?d odml:hasFileName ?file .\n" +
                 "  ?d odml:hasSection ?s .\n" +
                 "  ?s odml:hasName ?sec_name .\n" +
                 "  ?s odml:hasProperty ?p .\n" +
                 "  ?p odml:hasName ?prop_name .\n" +
                 "  ?p odml:hasValue ?v .\n" +
                 "  ?v rdfs:member ?value .\n" +
                 "  {?p odml:hasName \"experiment\"} UNION {?p odml:hasName \"Recording duration\"} .\n}\n" +
                 "ORDER BY ?file\nLIMIT 50",
        "prefixes": ["rdf", "rdfs", "odml"]
      }
    ]
  };
} );
