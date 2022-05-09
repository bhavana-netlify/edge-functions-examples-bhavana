import type { Context } from "netlify:edge";

export default async (request: Request, context: Context) => {
  // look for existing "test_bucket" cookie
  const bucketName = "test_bucket";
  const bucket = context.cookies.get(bucketName);

  // return here if we find a cookie
 /* if (bucket) {
    return new Response(`Welcome back! You were assigned ${bucketName} **${bucket}** when you last visited the site!`);
    //return context.rewrite("/something-to-serve-with-a-rewrite-A");
    //return context.json({ splittest: "versiona" });
  }*/

  if (bucket == "b") {
    return context.json({ splittest: "versionb" });
  }

  else{
    return context.json({ splittest: "versiona" });
  }

  // if no "test_bucket" cookie is found, assign the user to a bucket
  // in this example we're using two buckets (a, b) with an equal weighting of 50/50
  const weighting = 0.9;

  // get a random number between (0-1)
  // this is a basic example and you may want to experiment
  const random = Math.random();
  const newBucketValue = random <= weighting ? "a" : "b";

  // set the new "test_bucket" cookie
  context.cookies.set({
    name: bucketName,
    value: newBucketValue,
  });

  //return new Response(
    //`Congratulations! You have been assigned ${bucketName} **${newBucketValue}**. View your browser cookies to check it out!`,
    
  //);
  if (newBucketValue == "b") {
    context.log("Hello from the logging service cookie A");
    return context.json({ splittest: "versionb" });
  }

  else{
    context.log("Hello from the logging service cookie B");
    return context.json({ splittest: "versiona" });
  }


  /*  const joke = await fetch("https://icanhazdadjoke.com/", {
      "headers": {
        "Accept": "application/json"
      }
    });
    const jsonData = await joke.json();
    return context.json(jsonData);
  */
  
};
