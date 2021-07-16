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
        "query": "SELECT ?file (SAMPLE(?kwd) as ?keyword) ?doi_link\n" +
                  "WHERE {\n" +
                  "  ?doc rdf:type odml:Document .\n" +
                  "  ?doc odml:hasFileName ?file .\n" +
                  "  ?doc odml:hasSection* ?sec_id .\n" +
                  "  ?sec_id odml:hasProperty ?prp_id .\n" +
                  "  ?prp_id odml:hasName \"identifier\" .\n" +
                  "  ?prp_id odml:hasValue ?val_doi .\n" +
                  "  ?val_doi ?pred_doi ?doival .\n" +
                  "  ?doc odml:hasSection* ?sec_subj .\n" +
                  "  ?sec_subj odml:hasType \"datacite/subject\" .\n" +
                  "  ?sec_subj odml:hasProperty ?prp_subj .\n" +
                  "  ?prp_subj odml:hasValue ?val_subj .\n" +
                  "  ?val_subj ?pred_subj ?kwd .\n" +
                  "  {?val_subj ?pred_subj \"Neuroscience\"} UNION\n" +
                  "  {?val_subj ?pred_subj \"Electrophysiology\"} .\n" +
                  "  FILTER regex(str(?pred_doi), '_')\n" +
                  "  BIND(URI(CONCAT(\"https://doi.org/\", STR(?doival))) as ?doi_link)\n" +
                  "}\n" +
                  "GROUP BY ?file ?doi_link\n" +
                  "ORDER BY ?file\n" +
                  "LIMIT 50",
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
      { "name": "Author query",
        "query": "SELECT ?author ?doi_link\n" +
                  "WHERE {\n" +
                  "  ?doc rdf:type odml:Document .\n" +
                  "  ?doc odml:hasFileName ?file .\n" +
                  "  ?doc odml:hasSection ?s .\n" +
                  "  ?s odml:hasSection ?ids .\n" +
                  "  ?ids odml:hasProperty ?idp .\n" +
                  "  ?ids odml:hasName ?secidname .\n" +
                  "  ?idp odml:hasName \"identifier\" .\n" +
                  "  ?idp odml:hasValue ?doival .\n" +
                  "  ?ids odml:hasProperty ?pt .\n" +
                  "  ?pt odml:hasName \"identifierType\" .\n" +
                  "  ?pt odml:hasValue ?idtype .\n" +
                  "  ?idtype rdfs:member ?id_type_value .\n" +
                  "  ?doival rdfs:member ?doi_val .\n" +
                  "  ?s odml:hasSection ?subcont .\n" +
                  "  ?s odml:hasName ?sec_name .\n" +
                  "  ?subcont odml:hasSection ?subj .\n" +
                  "  ?subj odml:hasProperty ?prop .\n" +
                  "  ?prop odml:hasName \"creatorName\" .\n" +
                  "  ?prop odml:hasValue ?val .\n" +
                  "  ?val rdfs:member ?author .\n" +
                  "  BIND(URI(CONCAT(\"https://doi.org/\", ?doi_val)) AS ?doi_link)\n" +
                  "}\n" +
                  "ORDER BY ?author\n" +
                  "LIMIT 1000",
        "prefixes": ["rdf", "rdfs", "odml"]
      },
      { "name": "Title query",
        "query": "SELECT ?title ?doi_link\n" +
                  "WHERE {\n" +
                  "  ?doc rdf:type odml:Document .\n" +
                  "  ?doc odml:hasFileName ?file .\n" +
                  "  ?doc odml:hasSection ?s .\n" +
                  "  ?s odml:hasSection ?ids .\n" +
                  "  ?ids odml:hasProperty ?idp .\n" +
                  "  ?ids odml:hasName ?secidname .\n" +
                  "  ?idp odml:hasName \"identifier\" .\n" +
                  "  ?idp odml:hasValue ?doival .\n" +
                  "  ?ids odml:hasProperty ?pt .\n" +
                  "  ?pt odml:hasName \"identifierType\" .\n" +
                  "  ?pt odml:hasValue ?idtype .\n" +
                  "  ?idtype rdfs:member ?id_type_value .\n" +
                  "  ?doival rdfs:member ?doi_val .\n" +
                  "  ?s odml:hasSection ?subcont .\n" +
                  "  ?s odml:hasName ?sec_name .\n" +
                  "  ?subcont odml:hasSection ?subj .\n" +
                  "  ?subj odml:hasProperty ?prop .\n" +
                  "  ?prop odml:hasName \"title\" .\n" +
                  "  ?prop odml:hasValue ?val .\n" +
                  "  ?val rdfs:member ?title .\n" +
                  "  BIND(URI(CONCAT(\"https://doi.org/\", ?doi_val)) AS ?doi_link)\n" +
                  "}\n" +
                  "ORDER BY ?title\n" +
                  "LIMIT 500",
        "prefixes": ["rdf", "rdfs", "odml"]
      },
      { "name": "Property query",
        "query": "SELECT ?s ?sec_name ?p ?prop_name\n" +
                  "WHERE {\n" +
                  "  ?s odml:hasName ?sec_name .\n" +
                  "  ?s odml:hasProperty ?p .\n" +
                  "  ?p odml:hasName ?prop_name .\n" +
                  "}\n" +
                  "ORDER BY ?s ?sec_name ?p ?prop_name\n" +
                  "LIMIT 100",
        "prefixes": ["rdf", "odml"]
      },
      { "name": "Generic query",
        "query": "SELECT ?subject ?predicate ?object\nWHERE {\n" +
                 "  ?subject ?predicate ?object\n}\n" +
                 "LIMIT 100"
      }
    ]
  };
} );
