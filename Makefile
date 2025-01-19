run:
	bun index.ts

netlify:
	netlify dev

convert:
	bun data/csv_to_json.ts
