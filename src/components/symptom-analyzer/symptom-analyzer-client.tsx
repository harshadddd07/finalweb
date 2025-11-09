'use client';

import { useState } from 'react';
import { symptomAnalysis, type SymptomAnalysisOutput } from '@/ai/flows/symptom-analysis';
import { Button } from '@/components/ui/button';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartTooltipContent } from '@/components/ui/chart';
import { AlertCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ChartContainer } from '../ui/chart';

export default function SymptomAnalyzerClient() {
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SymptomAnalysisOutput | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) {
        toast({
            variant: "destructive",
            title: "Input Required",
            description: "Please enter symptoms before analyzing.",
        });
        return;
    }
    setLoading(true);
    setResults(null);
    try {
      const output = await symptomAnalysis({ symptoms });
      setResults(output);
    } catch (err) {
      toast({
          variant: "destructive",
          title: "Analysis Failed",
          description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const chartData = results?.potentialDiseases.map(d => ({
      name: d.disease,
      confidence: (d.confidenceLevel * 100).toFixed(0),
  })) || [];

  const chartConfig = {
    confidence: {
      label: 'Confidence',
      color: 'hsl(var(--primary))',
    },
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardContent>
        <Textarea
          placeholder="e.g., fever, cough, headache, sore throat..."
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          disabled={loading}
          rows={4}
        />
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            'Analyze Symptoms'
          )}
        </Button>

        {results && (
            <div className="w-full pt-4">
                <h3 className="text-lg font-semibold mb-2">Analysis Results</h3>
                <div className="h-[300px] w-full">
                    <ChartContainer config={chartConfig}>
                        <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis unit="%" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                             <Tooltip
                                cursor={{ fill: 'hsl(var(--muted))' }}
                                content={<ChartTooltipContent unit="%" />}
                            />
                            <Bar dataKey="confidence" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ChartContainer>
                </div>
            </div>
        )}
      </CardFooter>
    </form>
  );
}
