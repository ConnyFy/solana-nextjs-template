# Solana application
This is a starting template for Solana project with Next JS frontend.

## Program
The source code of the Solana application found in the programs folder.

To build the application, run:

```
yarn program:build
```

To deploy your program, run:
```
yarn program:deploy
```
Note: It will use your default Solana configuration and programs/dist/program/program-keypair.json for the program ID.

## Frontend
The project frontend is a Next JS application, found in the client folder.

To start a development server, run:

```bash
yarn client:dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.