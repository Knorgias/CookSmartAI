# CookSmartAI - README

## Getting Started

1. Clone this repo: `git clone https://github.com/Knorgias/CookSmartAI.git`
2. Install dependencies: `npm i`
3. Start the app: `npm start`

Done!✨ You can now use and extend this web app to make your own. Enjoy!

Want to deploy this live to the world? [Here's my step-by-step article](https://medium.com/@SynnefonK/how-i-created-and-published-an-openai-based-app-step-by-step-guide-c0baaa425d13) on doing just that with Netlify.

## Local development

To use Netlify functions locally for development purposes, you can use the Netlify Dev CLI tool. Here's a step-by-step guide to running your Netlify function locally:

1. Install Netlify Dev: First, make sure you have Node.js installed on your machine. Then, install Netlify Dev globally by running the following command in your terminal:

```shell
npm install netlify-cli -g
```

1. Set up a Netlify Dev configuration file: Create a `netlify.toml` file in the root directory of your project (if you don't have one already) and configure it to specify the settings for your Netlify function. Here's an example `netlify.toml` file:

```toml
[build]
  functions = "functions"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[redirects]]
  from = "/.netlify/functions/*"
  to = "http://localhost:9000/:splat"
  status = 200
  force = true
```

In this example, the `functions` directory is specified as the location for your Netlify functions. The redirects configuration ensures that requests to `.netlify/functions/*` are forwarded to the local development server.

1. Install dependencies and start the development server: Navigate to the root directory of your project in the terminal and install the project dependencies by running:

```shell
npm install
```

Once the dependencies are installed, start the Netlify Dev server by running:

```shell
netlify dev
```

This command starts the local development server and runs your Netlify function locally.

1. Test your Netlify function: With the Netlify Dev server running, you can now test your Netlify function locally by making requests to the specified endpoint. In your client-side code, make sure the fetch request points to `http://localhost:8888/.netlify/functions/openai-api` instead of the production URL.
