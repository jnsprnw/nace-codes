# NACE code API

Request a NACE code and get section, division, group and class back.

Source: https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:32006R1893

`http://localhost:3000/?code=16.23`

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