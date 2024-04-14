# Note and image generator

This repo is the worker for Nottia challenge app, combines two AI models to generate notes or images based on user prompts, using Cloudflare Workers.

Check the Web App that use this worker: <a href="https://github.com/cn-2k/nottia" target="_blank">Nottia</a>

## Installation Instructions
PS: you dont need to make this steps if you just want to use the webapp since it's used the worker link that was deployed on cloudflare network.

But if you want to run and see the worker:

### Clone the repo

```bash
# Clone the repo with git clone command
$ git clone https://github.com/cn-2k/nottia-worker.git
# Go to project folder
$ cd nottia-worker
```

### Run the worker on dev mode

```bash
# Install Wrangler
$ npm install wrangler --save-dev
# Install project dependencies
$ npm install
# Go to project folder and run the dev command
$ wrangler dev
```

Now see the output in terminal and check where the worker is running.

## Usage

If you want to deploy the worker just use the ``wrangler deploy`` command and it will deploy the worker on your cloudflare network account.

## Cloudflare Workers Documentation

- [Cloudflare Workers](https://workers.cloudflare.com/)
- [Cloudflare AI Models](https://developers.cloudflare.com/workers-ai/models)
