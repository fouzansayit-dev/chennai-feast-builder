export interface ChatMessage {
  role: 'user' | 'model' | 'assistant';
  content: string;
}

interface LLMProviderConfig {
  type: 'gemini' | 'openai';
  apiKey: string;
  model: string;
}

/**
 * Call the Gemini API using the official @google/genai SDK.
 */
async function callGemini(
  apiKey: string,
  model: string,
  history: ChatMessage[],
  systemPrompt: string
): Promise<string> {
  const { GoogleGenAI } = await import('@google/genai');
  const ai = new GoogleGenAI({ apiKey });

  // Map history to Gemini content format.
  // The Gemini SDK expects: { role: 'user' | 'model', parts: [{ text: string }] }
  const contents = history.map(h => ({
    role: h.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: h.content }]
  }));

  const response = await ai.models.generateContent({
    model: model,
    contents: contents,
    config: {
      systemInstruction: systemPrompt,
      temperature: 0.7,
    }
  });

  if (!response.text) {
    throw new Error('Empty response received from Gemini');
  }

  return response.text;
}

/**
 * Call the OpenAI API using direct fetch to keep it lightweight.
 */
async function callOpenAI(
  apiKey: string,
  model: string,
  history: ChatMessage[],
  systemPrompt: string
): Promise<string> {
  const messages = [
    { role: 'system', content: systemPrompt },
    ...history.map(h => ({
      role: h.role === 'model' || h.role === 'assistant' ? 'assistant' : 'user',
      content: h.content
    }))
  ];

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: model,
      messages: messages,
      temperature: 0.7
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const choice = data.choices?.[0];
  if (!choice?.message?.content) {
    throw new Error('Empty response received from OpenAI');
  }

  return choice.message.content;
}

/**
 * Get LLM response using fallback mechanism across configured keys.
 */
export async function getLLMResponse(
  history: ChatMessage[],
  systemPrompt: string
): Promise<string> {
  const providers: LLMProviderConfig[] = [];

  // 1. Gather all configured API keys
  if (process.env.GEMINI_API_KEY_1) {
    providers.push({
      type: 'gemini',
      apiKey: process.env.GEMINI_API_KEY_1,
      model: process.env.GEMINI_MODEL || 'gemini-2.0-flash',
    });
  }
  if (process.env.GEMINI_API_KEY_2) {
    providers.push({
      type: 'gemini',
      apiKey: process.env.GEMINI_API_KEY_2,
      model: process.env.GEMINI_MODEL || 'gemini-2.0-flash',
    });
  }
  // Try standard GEMINI_API_KEY if specific ones aren't defined
  if (process.env.GEMINI_API_KEY && !process.env.GEMINI_API_KEY_1 && !process.env.GEMINI_API_KEY_2) {
    providers.push({
      type: 'gemini',
      apiKey: process.env.GEMINI_API_KEY,
      model: process.env.GEMINI_MODEL || 'gemini-2.0-flash',
    });
  }

  if (process.env.OPENAI_API_KEY_1) {
    providers.push({
      type: 'openai',
      apiKey: process.env.OPENAI_API_KEY_1,
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    });
  }
  if (process.env.OPENAI_API_KEY_2) {
    providers.push({
      type: 'openai',
      apiKey: process.env.OPENAI_API_KEY_2,
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    });
  }
  // Try standard OPENAI_API_KEY if specific ones aren't defined
  if (process.env.OPENAI_API_KEY && !process.env.OPENAI_API_KEY_1 && !process.env.OPENAI_API_KEY_2) {
    providers.push({
      type: 'openai',
      apiKey: process.env.OPENAI_API_KEY,
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    });
  }

  if (providers.length === 0) {
    throw new Error('No API keys configured (GEMINI_API_KEY_1/2 or OPENAI_API_KEY_1/2).');
  }

  let lastError: any = null;

  // 2. Iterate through providers and try to get a response
  for (let i = 0; i < providers.length; i++) {
    const provider = providers[i];
    console.log(`[LLM Service] Attempting chat completions via ${provider.type} (Index: ${i + 1}/${providers.length})`);
    
    try {
      let result = '';
      if (provider.type === 'gemini') {
        result = await callGemini(provider.apiKey, provider.model, history, systemPrompt);
      } else {
        result = await callOpenAI(provider.apiKey, provider.model, history, systemPrompt);
      }
      console.log(`[LLM Service] Success using ${provider.type} (Index: ${i + 1})`);
      return result;
    } catch (err: any) {
      console.error(`[LLM Service] Error with provider ${provider.type} at index ${i}:`, err.message || err);
      lastError = err;
      // Continue to next provider in fallback sequence
    }
  }

  throw new Error(`All configured LLM providers failed. Last error: ${lastError?.message || lastError}`);
}
