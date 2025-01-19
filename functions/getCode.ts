import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import {
  getCode,
  BadRequestError,
  NotFoundError,
  CodeDetails,
} from "../src/code";

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext,
) => {
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  const { queryStringParameters } = event;
  const code: string | undefined = queryStringParameters?.code as
    | string
    | undefined;
  const version: string | undefined =
    (queryStringParameters?.version as string | undefined) || "2.1";

  try {
    if (!code) {
      throw new BadRequestError("No code provided.");
    }

    const answer: CodeDetails = getCode(code, version);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(answer),
    };
  } catch (error) {
    console.error("Error in getCode function:", error);

    const statusCode =
      error instanceof Error && "statusCode" in error
        ? (error as any).statusCode
        : 500;
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";

    return {
      statusCode: statusCode,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: errorMessage }),
    };
  }
};

export { handler };
