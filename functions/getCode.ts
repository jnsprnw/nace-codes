import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import {
  getCode,
  BadRequestError,
  NotFoundError,
  CodeDetails,
} from "../src/code";

// Define the handler function
const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext,
) => {
  // Only handle GET requests
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405, // Method Not Allowed
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  // Parse query parameters
  const { queryStringParameters } = event;
  const code: string | undefined = queryStringParameters?.code as
    | string
    | undefined;

  try {
    if (!code) {
      throw new BadRequestError("No code provided.");
    }

    // Invoke the getCode function
    const answer: CodeDetails = getCode(code);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(answer),
    };
  } catch (error) {
    // Determine the status code and error message
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
