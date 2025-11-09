'use server';

/**
 * @fileOverview This file defines a Genkit flow for a medical chatbot.
 *
 * - getChatResponse - A function that takes conversation history and a new message, and returns an AI-generated response.
 * - ChatInput - The input type for the getChatResponse function.
 * - ChatOutput - The return type for the getChatResponse function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MessageSchema = z.object({
  text: z.string(),
  sent: z.boolean(), // true for user, false for AI
});

const ChatInputSchema = z.object({
  history: z.array(MessageSchema).describe('The conversation history.'),
  newMessage: z.string().describe('The new message from the user.'),
});

export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.string().describe("The AI's response.");
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function getChatResponse(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const chatPrompt = ai.definePrompt({
  name: 'chatPrompt',
  input: { schema: ChatInputSchema },
  output: { schema: ChatOutputSchema },
  prompt: `You are a friendly and helpful AI medical assistant for MediSync Pro. Your role is to provide helpful, safe, and general medical information.

  IMPORTANT: You must always include the following disclaimer at the end of your very first response in any conversation: "Please remember, I am an AI assistant and not a substitute for professional medical advice. Consult with a qualified healthcare provider for any medical concerns."

  Do not provide a diagnosis. You can provide information on conditions, but you should not diagnose the user.
  Keep your responses concise and easy to understand.

  Here is the conversation history:
  {{#each history}}
    {{#if this.sent}}
      User: {{{this.text}}}
    {{else}}
      AI: {{{this.text}}}
    {{/if}}
  {{/each}}

  Now, respond to the user's latest message:
  User: {{{newMessage}}}`,
});

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    const { output } = await chatPrompt(input);
    return output!;
  }
);
