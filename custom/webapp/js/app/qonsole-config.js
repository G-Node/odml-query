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
        "query": "# Query returning DOI links for all datasets with specified keywords.\n" +
                  "SELECT ?file (SAMPLE(?kwd) as ?keyword) ?doi_link\n" +
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
        "query": "# Query returning all available keywords that are registered for datasets in this graph\n" +
                  "SELECT ?available_keywords (COUNT(?available_keywords) as ?num_keywords)\n" +
                  "WHERE {\n" +
                  "  ?property odml:hasName \"subject\" .\n" +
                  "  ?property odml:hasValue ?value .\n" +
                  "  ?value rdfs:member ?available_keywords .\n" +
                  "}\n" +
                  "GROUP BY ?available_keywords ORDER BY DESC( ?num_keywords )",
        "prefixes": ["rdf", "rdfs", "odml"]
      },
      { "name": "Author query",
        "query": "# Query returning all authors of registered datasets in this graph\n" +
                  "SELECT ?author ?doi_link\n" +
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
        "query": "# Query returning all titles of registered datasets in this graph\n" +
                  "SELECT ?title ?doi_link\n" +
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
      { "name": "Available classes query",
        "query": "# Return all odml classes that are available for queries\n" +
                  "SELECT ?type\n" +
                  "WHERE {\n" +
                  "  ?subject rdf:type ?type .\n" +
                  "}\n" +
                  "GROUP by ?type ORDER BY ?type",
        "prefixes": ["rdf", "odml"]
      },
      { "name": "Section via Property query",
        "query": "# Identify odml:Section via odml:Property value\n" +
                  "SELECT ?sec ?sec_name ?prop_name ?val_str\n" +
                  "WHERE {\n" +
                  "  ?sec odml:hasName ?sec_name .\n" +
                  "  ?sec odml:hasProperty ?prop .\n" +
                  "  ?prop odml:hasName ?prop_name .\n" +
                  "  ?prop odml:hasValue ?val .\n" +
                  "  ?val rdfs:member ?val_str .\n" +
                  "  FILTER(STRSTARTS(?val_str, \"Ludwig\"))\n" +
                  "}\n" +
                  "ORDER BY ?sec_name ?prop_name ?val_str\n" +
                  "LIMIT 100",
        "prefixes": ["rdf", "rdfs", "odml"]
      },
      { "name": "odml types query",
        "query": "# Count and display all odml specific types in this graph as well as their RDF class.\n" +
                  "SELECT ?subClass ?sec_type (COUNT(?sec_type) AS ?section_type_count)\n" +
                  "WHERE {\n" +
                  "  {?subClass rdfs:subClassOf odml:Section} UNION { ?sec rdf:type odml:Section } .\n" +
                  "  ?sec rdf:type ?subClass .\n" +
                  "  ?sec odml:hasType ?sec_type .\n" +
                  "}\n" +
                  "GROUP BY ?subClass ?sec_type ORDER BY DESC(?section_type_count)\n" +
                  "LIMIT 100",
        "prefixes": ["rdf", "rdfs", "odml"]
      },
      { "name": "Section from odml type query",
        "query": "# Find all sections by specific odml section types\n" +
                  "SELECT ?sec ?sec_name\n" +
                  "WHERE {\n" +
                  "  ?sec rdf:type odml:Section .\n" +
                  "  ?sec odml:hasName ?sec_name .\n" +
                  "  ?sec odml:hasType \"datacite/titles\" .\n" +
                  "}\n" +
                  "LIMIT 100",
        "prefixes": ["rdf", "odml"]
      },
      { "name": "Section content query",
        "query": "# Congregate all subsections and values of a specific parent section (example class: odml:Creator).\n" +
                  "SELECT ?sec ?creator_name (GROUP_CONCAT(CONCAT(?subprop_name, \": \", ?subval_str); SEPARATOR=\" | \") AS ?property_values)\n" +
                  "WHERE {\n" +
                  "  ?sec rdf:type odml:Creator .\n" +
                  "  ?sec odml:hasProperty ?prop .\n" +
                  "  ?prop odml:hasName ?prop_name .\n" +
                  "  ?prop odml:hasValue ?val .\n" +
                  "  ?val rdfs:member ?creator_name .\n" +
                  "  ?sec odml:hasSection ?subsec .\n" +
                  "  ?subsec odml:hasName ?subsec_name .\n" +
                  "  ?subsec odml:hasProperty ?subprop .\n" +
                  "  ?subprop odml:hasName ?subprop_name .\n" +
                  "  ?subprop odml:hasValue ?subval .\n" +
                  "  ?subval rdfs:member ?subval_str .\n" +
                  "}\n" +
                  "GROUP BY ?sec ?creator_name ORDER BY ?sec ?subprop_name\n" +
                  "LIMIT 100",
        "prefixes": ["rdf", "rdfs", "odml"]
      },
      { "name": "Generic query",
        "query": "# The most generic query possible\n" +
                 "SELECT ?subject ?predicate ?object\nWHERE {\n" +
                 "  ?subject ?predicate ?object\n}\n" +
                 "LIMIT 100"
      }
    ]
  };
} );
