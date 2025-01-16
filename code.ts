import { readFileSync } from "fs";

interface NaceCode {
  Section: string;
  Division: string;
  Group?: string;
  Class?: string;
  Activity: string;
}

interface CodeDetails {
  section: string;
  division: {
    description: string;
    id: string;
  };
  group?: {
    description: string;
    id: string;
  };
  class?: {
    description: string;
    id: string;
  };
}

const codes: NaceCode[] = JSON.parse(readFileSync("./data/codes.json", "utf8"));

class BadRequestError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = "BadRequestError";
    this.statusCode = 400; // HTTP status code for a bad request
  }
}

class NotFoundError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404; // HTTP status code for "not found"
  }
}

export function getCode(code: string): CodeDetails {
  if (!code) {
    throw new BadRequestError("No code provided.");
  }

  const regex = /^(?<division>\d+)(\.(?<group>\d?)(?<klass>\d?))?$/;
  const matches = regex.exec(code);

  if (!matches || !matches.groups?.division) {
    throw new BadRequestError("The provided code has an invalid format.");
  }

  const { division, group, klass } = matches.groups;
  const answer: CodeDetails = {
    section: "",
    division: {
      description: "",
      id: "",
    },
  };

  const divisionEntry = codes.find((item) => item.Division === division);

  if (!divisionEntry) {
    throw new NotFoundError(`No division found with ID ${division}.`);
  }

  answer.section = divisionEntry.Section;
  answer.division = {
    description: divisionEntry.Activity,
    id: division,
  };

  if (group) {
    const termGroup = `${division}.${group}`;
    const groupEntry = codes.find(
      (item) => item.Division === division && item.Group === termGroup,
    );

    if (!groupEntry) {
      throw new NotFoundError(`No group found with ID ${termGroup}.`);
    }

    answer.group = {
      description: groupEntry.Activity,
      id: termGroup,
    };

    if (klass) {
      const termClass = `${division}.${group}${klass}`;
      const classEntry = codes.find(
        (item) =>
          item.Division === division &&
          item.Group === termGroup &&
          item.Class === termClass,
      );

      if (!classEntry) {
        throw new NotFoundError(`No class found with ID ${termClass}.`);
      }

      answer.class = {
        description: classEntry.Activity,
        id: termClass,
      };
    }
  }

  return answer;
}
