# Project Name

This project is built with Svelte and powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Initial Setup

If you're reading this, you've probably already set up a new project. Congratulations!

To create a new project, you can run one of the following commands:

\`\`\`bash
# Create a new project in the current directory
npm create svelte@latest

# Create a new project in a directory called my-app
npm create svelte@latest my-app
\`\`\`

## Development

Once you've created the project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), you can start the development server:

\`\`\`bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
\`\`\`

## Building for Production

To create a production-ready build of your app:

\`\`\`bash
npm run build
\`\`\`

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Environment Variables

In the `.env` file, several environment variables are defined:

- `PUBLIC_API_URL`: The API URL you want to point to in Express.
- `VERCEL_ENV`: Environment variable used by both Vercel and us to determine the environment we are in.
- `PUBLIC_COOKIE_DOMAIN`: Used for the cookies we store to be domain-aware. This setting is mainly for production environments.

Make sure to configure these environment variables according to your project's needs.

### Important Note on `.env` File

After cloning the repository, make sure to copy the `.env.template` file and rename the copy to `.env`. This ensures that you have all the necessary environment variables while keeping the template intact for future reference.
