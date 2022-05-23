import { Context } from "netlify:edge";

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  console.log(request.url);
  
  // Look for the query parameter, and return if we don't find it
  if (url.searchParams.get("method") !== "transform") {
    return;
  }

  context.log(`Transforming the response from this ${url}`);

  const response = await context.next();

  const text = await response.text();
  //return new Response(text.toUpperCase(), response);
  //return new Response(url.href = "xyz.php")
  
};
