export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();
    let prompt = [];
	const previousMessage = JSON.parse(await readBody(event)).pop();

	prompt.push({
        role: previousMessage.role,
        content: `Say nothing else, just Translate this to ${previousMessage.language}: ${previousMessage.content}`
    });

	const req = await fetch('https://api.openai.com/v1/chat/completions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${config.openaiApiKey}`
		},
		body: JSON.stringify({
			model: 'gpt-4o-mini',
			messages: prompt,
			temperature: 0.9,
		})
	});

	const result = await req.json();
	return {
		message: result.choices[0].message.content
	};
});