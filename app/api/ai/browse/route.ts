import { NextRequest, NextResponse } from 'next/server';

// Types for AI conversation
interface SymptomPattern {
  category: string;
  severity: number;
  duration: string;
  triggers: string[];
  related: string[];
}

interface AIResponse {
  message: string;
  visualization: {
    type: 'neural' | 'symptom' | 'timeline' | 'connection';
    data: any;
  };
  patterns: SymptomPattern[];
  recommendations: string[];
  personalizedContent: {
    title: string;
    sections: Array<{
      heading: string;
      content: string;
      interactive: boolean;
    }>;
  };
  rpm_suggestion?: number;
}

// Simulated AI analysis (in production, this would connect to a real AI service)
class TMJAIAnalyzer {
  analyzeSymptoms(input: string): SymptomPattern[] {
    const patterns: SymptomPattern[] = [];
    const lowerInput = input.toLowerCase();
    
    // Pattern detection based on keywords
    if (lowerInput.includes('jaw') || lowerInput.includes('tmj')) {
      patterns.push({
        category: 'jaw_dysfunction',
        severity: this.calculateSeverity(lowerInput),
        duration: this.extractDuration(lowerInput),
        triggers: this.extractTriggers(lowerInput),
        related: ['neck pain', 'headaches', 'ear fullness']
      });
    }
    
    if (lowerInput.includes('headache') || lowerInput.includes('migraine')) {
      patterns.push({
        category: 'neurological',
        severity: this.calculateSeverity(lowerInput),
        duration: this.extractDuration(lowerInput),
        triggers: ['stress', 'jaw clenching', 'poor posture'],
        related: ['light sensitivity', 'nausea', 'dizziness']
      });
    }
    
    if (lowerInput.includes('stress') || lowerInput.includes('anxiety')) {
      patterns.push({
        category: 'psychological',
        severity: this.calculateSeverity(lowerInput),
        duration: 'ongoing',
        triggers: ['work', 'sleep deprivation', 'life events'],
        related: ['teeth grinding', 'muscle tension', 'sleep issues']
      });
    }
    
    return patterns;
  }
  
  private calculateSeverity(input: string): number {
    const severityKeywords = {
      mild: 3,
      moderate: 5,
      severe: 8,
      extreme: 10,
      unbearable: 10,
      constant: 8,
      occasional: 4
    };
    
    for (const [keyword, score] of Object.entries(severityKeywords)) {
      if (input.includes(keyword)) {
        return score;
      }
    }
    
    return 5; // Default moderate
  }
  
  private extractDuration(input: string): string {
    const durationPatterns = [
      /(\d+)\s*(day|week|month|year)s?/,
      /(chronic|acute|recent|long-term)/
    ];
    
    for (const pattern of durationPatterns) {
      const match = input.match(pattern);
      if (match) {
        return match[0];
      }
    }
    
    return 'unspecified';
  }
  
  private extractTriggers(input: string): string[] {
    const triggers = [];
    const triggerKeywords = [
      'stress', 'eating', 'talking', 'morning', 'night',
      'cold', 'heat', 'chewing', 'yawning', 'sleeping'
    ];
    
    for (const trigger of triggerKeywords) {
      if (input.includes(trigger)) {
        triggers.push(trigger);
      }
    }
    
    return triggers.length > 0 ? triggers : ['various'];
  }
  
  generateRecommendations(patterns: SymptomPattern[]): string[] {
    const recommendations: string[] = [];
    
    for (const pattern of patterns) {
      switch (pattern.category) {
        case 'jaw_dysfunction':
          recommendations.push(
            'Consider jaw relaxation exercises',
            'Avoid hard or chewy foods',
            'Apply warm compress to jaw muscles',
            'Practice proper posture alignment'
          );
          break;
        case 'neurological':
          recommendations.push(
            'Track headache triggers in a journal',
            'Maintain regular sleep schedule',
            'Consider stress reduction techniques',
            'Stay hydrated throughout the day'
          );
          break;
        case 'psychological':
          recommendations.push(
            'Practice mindfulness meditation',
            'Engage in regular physical activity',
            'Consider cognitive behavioral therapy',
            'Develop healthy sleep hygiene'
          );
          break;
      }
    }
    
    return Array.from(new Set(recommendations)); // Remove duplicates
  }
  
  suggestRPM(patterns: SymptomPattern[]): number {
    // Calculate suggested RPM based on severity
    const avgSeverity = patterns.reduce((sum, p) => sum + p.severity, 0) / patterns.length;
    
    // Higher severity = higher starting RPM (more stressed nervous system)
    return Math.round(800 + (avgSeverity * 520)); // Range: 800-6000 RPM
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json();
    
    // Initialize AI analyzer
    const analyzer = new TMJAIAnalyzer();
    
    // Analyze symptoms
    const patterns = analyzer.analyzeSymptoms(message);
    const recommendations = analyzer.generateRecommendations(patterns);
    const suggestedRPM = analyzer.suggestRPM(patterns);
    
    // Generate visualization data based on patterns
    const visualizationData = {
      type: 'neural' as const,
      data: {
        stressPoints: patterns.map(p => ({
          location: p.category,
          intensity: p.severity / 10,
          connections: p.related
        })),
        neuralActivity: suggestedRPM / 6000,
        affectedRegions: patterns.map(p => p.category)
      }
    };
    
    // Generate personalized content
    const personalizedContent = {
      title: `Your TMJ Nervous System Analysis`,
      sections: [
        {
          heading: 'Identified Patterns',
          content: patterns.map(p => 
            `${p.category.replace('_', ' ').toUpperCase()}: Severity ${p.severity}/10, Duration: ${p.duration}`
          ).join('\n'),
          interactive: true
        },
        {
          heading: 'Neural Connections',
          content: 'Your symptoms show interconnected patterns across multiple body systems. The visualization shows how jaw dysfunction can cascade through your nervous system.',
          interactive: true
        },
        {
          heading: 'Personalized Recommendations',
          content: recommendations.join('\n• '),
          interactive: false
        },
        {
          heading: 'Your Nervous System State',
          content: `Current stress level indicates ${suggestedRPM} RPM. Use the interactive controls to gradually reduce this to a calm 800 RPM.`,
          interactive: true
        }
      ]
    };
    
    // Generate AI response
    const response: AIResponse = {
      message: generateConversationalResponse(patterns, recommendations),
      visualization: visualizationData,
      patterns,
      recommendations,
      personalizedContent,
      rpm_suggestion: suggestedRPM
    };
    
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('AI Browse API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process AI request' },
      { status: 500 }
    );
  }
}

function generateConversationalResponse(
  patterns: SymptomPattern[],
  recommendations: string[]
): string {
  if (patterns.length === 0) {
    return "I'm here to help you understand your TMJ and nervous system connection. Could you describe what you're experiencing? For example, any jaw pain, headaches, or stress-related symptoms?";
  }
  
  const primaryPattern = patterns[0];
  const severity = primaryPattern.severity;
  
  let response = '';
  
  if (severity >= 7) {
    response = `I understand you're experiencing significant ${primaryPattern.category.replace('_', ' ')} symptoms. This level of discomfort often indicates your nervous system is in a heightened state of alert. `;
  } else if (severity >= 4) {
    response = `I see you're dealing with moderate ${primaryPattern.category.replace('_', ' ')} issues. This is quite common with TMJ dysfunction and shows your nervous system is trying to adapt. `;
  } else {
    response = `You're experiencing mild ${primaryPattern.category.replace('_', ' ')} symptoms, which is a good sign that your nervous system hasn't become overly sensitized. `;
  }
  
  // Add pattern connections
  if (patterns.length > 1) {
    response += `\n\nInterestingly, I've identified multiple interconnected patterns: ${patterns.map(p => p.category.replace('_', ' ')).join(', ')}. This interconnection is typical of TMJ-related nervous system dysfunction.`;
  }
  
  // Add immediate actionable advice
  response += `\n\nBased on your symptoms, I'd suggest starting with: ${recommendations[0]}. The visualization I'm creating will show you exactly how these patterns affect your nervous system.`;
  
  return response;
}

export async function GET(request: NextRequest) {
  // Return API information
  return NextResponse.json({
    service: 'TMJ AI Browse Assistant',
    version: '1.0.0',
    capabilities: [
      'Symptom pattern analysis',
      'Neural visualization generation',
      'Personalized recommendations',
      'RPM state assessment'
    ]
  });
}