import { createReadStream, writeFileSync } from "fs";
import csv from "csv-parser";

interface NaceCode {
  Section: string | null;
  Division: string | null;
  Group: string | null;
  Class: string | null;
  Activity: string;
}

const inputFilePath = "./data/source/codes-2.1.csv";
const outputFilePath = "./data/codes-2.1.json";

const results: NaceCode[] = [];
let currentSection = "";
let currentDivision = "";
let currentGroup = "";

createReadStream(inputFilePath)
  .pipe(csv())
  .on("data", (row) => {
    if (row.Section && row.Section.trim() !== "") {
      currentSection = row.Section;
      currentDivision = ""; // Reset division when a new section starts
      currentGroup = ""; // Reset group when a new section starts
    }
    if (row.Division && row.Division.trim() !== "") {
      currentDivision = row.Division;
      currentGroup = ""; // Reset group when a new division starts
    }
    if (row.Group && row.Group.trim() !== "") {
      currentGroup = row.Group;
    }

    const section = currentSection || null;
    const division = currentDivision || null;
    const group = currentGroup || null;
    const classCode = row.Class || null;
    const activity = row.Activity;

    results.push({
      Section: section,
      Division: division,
      Group: group,
      Class: classCode,
      Activity: activity,
    });
  })
  .on("end", () => {
    writeFileSync(outputFilePath, JSON.stringify(results, null, 2));
    console.log("CSV file successfully processed and JSON file created.");
  });
