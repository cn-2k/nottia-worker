import { Ai } from '@cloudflare/ai';

export interface Env {
	AI: Ai;
}

export default {
	async fetch(request: Request, env: Env) {
		const ai = new Ai(env.AI);
		const url = new URL(request.url);

		if (url.pathname === '/story') {
			if (request.method === 'GET') {
				const userInput = url.searchParams.get('prompt') || 'Once upon a time, there was a little llama named Llama-2-13b';

				const messages = [
					{ role: 'system', content: 'You are a helpful assistant that make notes of user input.' },
					{ role: 'system', content: 'You will not confirm user input like "of course", "sure" and will not ask for more input.' },
					{ role: 'user', content: userInput },
				];

				const stream = await ai.run('@cf/meta/llama-2-7b-chat-fp16', {
					messages,
					stream: true,
				});

				return new Response(stream as ReadableStream, {
					headers: {
						'Content-Type': 'text/event-stream',
						'Access-Control-Allow-Origin': '*',
					},
				});
			} else {
				return new Response('This endpoint expects a GET request.', { status: 400 });
			}
		}

		return new Response('Endpoint not found.', { status: 404 });
	},
};
