# NACE code API

Request a NACE code and get section, division, group and class back.

## Usage

This is a simple API that takes a NACE code as a query parameter and returns the section, division, group and class of the code.

## Installation

```bash
bun index.ts
```

or

```bash
make run
```

### Example

Request: `http://localhost:3000/?code=16.23`

```json
{
  "section": "C",
  "division": {
    "description": "Manufacture of wood and of products of wood and cork, except furniture; manufacture of articles of straw and plaiting materials",
    "id": "16"
  },
  "group": {
    "description": "Manufacture of products of wood, cork, straw and plaiting materials",
    "id": "16.2"
  },
  "class": {
    "description": "Manufacture of other builders' carpentry and joinery",
    "id": "16.23"
  }
}
```

## NACE codes source

https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:32006R1893

# Local Netlify development

```bash
netlify dev
```

Request: `http://localhost:8888/.netlify/functions/getCode?code=16.23`
