import { Ai } from '@cloudflare/ai';

export interface Env {
	AI: Ai;
}

export default {
	async fetch(request: Request, env: Env) {
		const ai = new Ai(env.AI);
		const url = new URL(request.url);

		if (url.pathname === '/note') {
			if (request.method === 'GET') {
				const userInput = url.searchParams.get('prompt') || 'Generate a short note about llamas!';

				const messages = [
					{
						role: 'system',
						content: `You are an assistant that generates notes in markdown format (md) based on user input, use markdown syntax. Your role is to provide concise and informative notes about the given topic, starting with a title in the '## Title' format followed by a list of key points in bullet points (started with "-"). Maintain a neutral and impersonal tone throughout the response. Do not include any personal opinions or anecdotes, and avoid using conversational language or filler words. Your goal is to create a helpful and concise summary of the given topic.`,
					},
					{ role: 'user', content: `Note on ${userInput}` },
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

		if (url.pathname === '/generate-image') {
			if (request.method === 'POST' && request.headers.get('Content-Type') === 'application/json') {
				const { prompt }: any = await request.json();

				const inputs = {
					prompt: prompt || 'cat writing a note',
				};

				const response = await ai.run('@cf/stabilityai/stable-diffusion-xl-base-1.0', inputs);

				return new Response(response, {
					headers: {
						'content-type': 'image/png',
						'Access-Control-Allow-Origin': '*',
					},
				});
			} else if (request.method === 'OPTIONS') {
				// Handle preflight request
				return new Response(null, {
					headers: {
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Methods': 'POST',
						'Access-Control-Allow-Headers': 'Content-Type',
					},
				});
			}
		}

		return new Response('Endpoint not found.', { status: 404 });
	},
};
