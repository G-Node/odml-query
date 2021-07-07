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
      { "name": "Keyword query",
        "query": "SELECT ?file ?keyword ?id_type_value ?doi_link\n" +
                 "WHERE {\n" +
                    "?doc rdf:type odml:Document .\n" +
                    "?doc odml:hasFileName ?file .\n" +
                    "?doc odml:hasSection ?s .\n" +
                    "?s odml:hasSection ?ids .\n" +
                    "?ids odml:hasProperty ?idp .\n" +
                    "?ids odml:hasName ?secidname .\n" +
                    "?idp odml:hasName \"identifier\" .\n" +
                    "?idp odml:hasValue ?doival .\n" +
                    "?ids odml:hasProperty ?pt .\n" +
                    "?pt odml:hasName \"identifierType\" .\n" +
                    "?pt odml:hasValue ?idtype .\n" +
                    "?idtype rdfs:member ?id_type_value .\n" +
                    "?doival rdfs:member ?doi_val .\n" +
                    "?s odml:hasSection ?subcont .\n" +
                    "?s odml:hasName ?sec_name .\n" +
                    "?subcont odml:hasSection ?subj .\n" +
                    "?subj odml:hasProperty ?p .\n" +
                    "?p odml:hasName ?prop_name .\n" +
                    "?p odml:hasValue ?v .\n" +
                    "{?v rdfs:member \"Neuroscience\"} UNION {?v rdfs:member \"Electrophysiology\"} .\n" +
                    "?v rdfs:member ?keyword .\n" +
                    "BIND(CONCAT(\"https://doi.org/\", ?doi_val) AS ?doi_link)\n" +
                 "}\n" +
                 "ORDER BY ?file\n" +
                 "LIMIT 100",
        "prefixes": ["rdf", "rdfs", "odml"]
      },

      { "name": "Available keywords",
        "query": "SELECT ?available_keywords (COUNT(?available_keywords) as ?num_keywords)\n" +
                  "WHERE {\n" +
                  "  ?property odml:hasName \"subject\" .\n" +
                  "  ?property odml:hasValue ?value .\n" +
                  "  ?value rdfs:member ?available_keywords .\n" +
                  "}\n" +
                  "GROUP BY ?available_keywords ORDER BY DESC( ?num_keywords )",
        "prefixes": ["rdf", "rdfs", "odml"]
      },
      { "name": "Property query",
        "query": "SELECT ?file ?sec_name ?prop_name\nWHERE {\n" +
                 "  ?d rdf:type odml:Document .\n" +
                 "  ?d odml:hasFileName ?file .\n" +
                 "  ?d odml:hasSection ?s .\n" +
                 "  ?s odml:hasName ?sec_name .\n" +
                 "  ?s odml:hasProperty ?p .\n" +
                 "  ?p odml:hasName ?prop_name .\n}\n" +
                 "ORDER BY ?file\nLIMIT 100",
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
                 "ORDER BY ?file\nLIMIT 100",
        "prefixes": ["rdf", "rdfs", "odml"]
      },
      { "name": "Generic query",
        "query": "SELECT ?subject ?predicate ?object\nWHERE {\n" +
                 "  ?subject ?predicate ?object\n}\n" +
                 "LIMIT 100"
      }
    ]
  };
} );
