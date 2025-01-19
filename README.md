# NACE code API

Request a NACE code and get section, division, group and class back. It supports both 2.0 and 2.1 versions of the NACE codes. 2.1 is the default version.

The 2.1 version is sourced from [eur-lex.europa.eu](https://eur-lex.europa.eu/eli/reg_del/2023/137/oj). Thanks to [@szymon-jez](https://github.com/jnsprnw/nace-codes/issues/5).
The 2.0 version is sourced from [eur-lex.europa.eu](https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:32006R1893).

## Usage

This is a simple API that takes a NACE code as a query parameter and returns the section, division, group and class of the code.

You can use the API by sending a GET request to the root URL with the code as a query parameter.

You can either run the API locally or use my deployed version on Netlify: [https://nace.prnw.dev/?code=16.23](https://nace.prnw.dev/?code=16.23)

### Run locally

I’m using [Bun](https://bun.sh/), but you can also use `npm`.

```bash
bun install
bun index.ts
```

or

```bash
bun install
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

To select the version of the NACE codes use the `version` query parameter:

```bash
http://localhost:3000/?code=01.11&version=2.0
http://localhost:3000/?code=01.11&version=2.1
```

### Netlify Function

The script can also be used as a [Netlify Function](https://www.netlify.com/platform/core/functions/).

#### Local Netlify development

```bash
netlify dev
```

Request: `http://localhost:8888/?code=16.23`
