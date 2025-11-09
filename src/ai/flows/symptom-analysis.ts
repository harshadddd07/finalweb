'use server';

/**
 * @fileOverview This file defines a Genkit flow for symptom analysis to assist doctors in identifying potential diseases.
 *
 * - symptomAnalysis - A function that takes patient symptoms as input and returns a list of potential diseases with confidence levels.
 * - SymptomAnalysisInput - The input type for the symptomAnalysis function.
 * - SymptomAnalysisOutput - The return type for the symptomAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SymptomAnalysisInputSchema = z.object({
  symptoms: z
    .string()
    .describe('A comma-separated list of symptoms reported by the patient.'),
});

export type SymptomAnalysisInput = z.infer<typeof SymptomAnalysisInputSchema>;

const SymptomAnalysisOutputSchema = z.object({
  potentialDiseases: z.array(
    z.object({
      disease: z.string().describe('The name of the potential disease.'),
      confidenceLevel: z
        .number()
        .describe(
          'A numerical value (0-1) representing the confidence level of the diagnosis.'
        ),
    })
  ).describe('A list of potential diseases with confidence levels.'),
});

export type SymptomAnalysisOutput = z.infer<typeof SymptomAnalysisOutputSchema>;

export async function symptomAnalysis(
  input: SymptomAnalysisInput
): Promise<SymptomAnalysisOutput> {
  return symptomAnalysisFlow(input);
}

const symptomAnalysisPrompt = ai.definePrompt({
  name: 'symptomAnalysisPrompt',
  input: {schema: SymptomAnalysisInputSchema},
  output: {schema: SymptomAnalysisOutputSchema},
  prompt: `You are an AI assistant designed to help doctors analyze patient symptoms and provide a list of potential diseases with confidence levels.

  Analyze the following symptoms:
  {{symptoms}}

  Provide a list of potential diseases with confidence levels (0-1) based on the provided symptoms.
  Format the output as a JSON object with a 'potentialDiseases' array. Each object in the array should have 'disease' and 'confidenceLevel' fields.
  Example:
  {
    "potentialDiseases": [
      { "disease": "Common Cold", "confidenceLevel": 0.8 },
      { "disease": "Influenza", "confidenceLevel": 0.7 },
      { "disease": "Allergic Rhinitis", "confidenceLevel": 0.6 }
    ]
  }`,
});

const symptomAnalysisFlow = ai.defineFlow(
  {
    name: 'symptomAnalysisFlow',
    inputSchema: SymptomAnalysisInputSchema,
    outputSchema: SymptomAnalysisOutputSchema,
  },
  async input => {
    const {output} = await symptomAnalysisPrompt(input);
    return output!;
  }
);
