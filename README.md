# Network Canvas Studio

Studio is an ambitious new project from the Network Canvas team. Our aim is to create a platform that will allow researchers to design, build, and deploy personal network studies. We are building on the features already present in our Interviewer and Architect tools, and adding new features such as language localisation, longitudinal data collection, and the ability for participants to complete studies via a web browser.

This is the GitHub repository that stores the code for Studio. For user facing documentation, please see the [documentation website](https://documentation.networkcanvas.com/).

For discussion and support, please visit the [community forum](https://community.networkcanvas.com/).

![Alt](https://repobeats.axiom.co/api/embed/3e2c041a337177e4bb0b83d55c52b47edc95d4ca.svg "Repobeats analytics image")

## Development

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Environment Variables

Team members can pull the `.env` file automatically, using the Vercel CLI and the following command:

```bash
vercel env pull .env 
```

You may need to link your local repository to the Vercel project first.

### Requirements

Local development requires Docker, and docker-compose to be installed. 

The project runs on the LTS version of Node, which as of the time of writing is v20.11.

The project uses `pnpm` as the package manager, via corepack. To set this up, run the following command:

```bash
corepack enable
```

### Getting Started

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
