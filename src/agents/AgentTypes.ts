/**
 * AgentTypes.ts
 * Type definitions for the agent system.
 */

// Agent configuration
export interface AgentConfig {
  model: string;
  availableTools: string[];
  maxIterations?: number;
  temperature?: number;
  debugMode?: boolean;
}

// Agent state types
export type AgentState = 'idle' | 'initialized' | 'processing' | 'error' | 'terminated';

// Memory item types
export type MemoryType = 'user_input' | 'agent_response' | 'tool_result' | 'reasoning';

export interface MemoryItem {
  type: MemoryType;
  content: string;
  timestamp: string;
  relevanceScore?: number;
  metadata?: Record<string, any>;
}

// Language model types
export interface LLMConfig {
  temperature: number;
  maxTokens: number;
  systemPrompt: string;
  presencePenalty?: number;
  frequencyPenalty?: number;
}

export interface LLMResponse {
  text: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  model: string;
  finishReason?: string;
}

export interface LLMStreamCallbacks {
  onToken: (token: string) => void;
  onComplete: (response: LLMResponse) => void;
  onError?: (error: Error) => void;
}

// Tool types
export interface ToolParameterDefinition {
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  description: string;
  required?: boolean;
  default?: any;
}

export interface Tool {
  name: string;
  description: string;
  parameters: Record<string, ToolParameterDefinition>;
  execute: (input: ToolInput) => Promise<ToolResult>;
}

export type ToolInput = Record<string, any>;

export interface ToolResult {
  status: 'success' | 'error';
  data?: any;
  error?: string;
}

// API types
export interface ApiConfig {
  apiKeys?: Record<string, string>;
  endpoints?: Record<string, string>;
  defaultTimeoutMs?: number;
}

export interface ApiRequest {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path?: string;
  params?: Record<string, string>;
  body?: any;
  headers?: Record<string, string>;
}

export interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
  status?: number;
}

// Planning types
export interface Plan {
  query: string;
  steps: PlanStep[];
  reasoning: ReasoningStep[];
}

export interface PlanStep {
  id: number;
  type: 'tool_execution' | 'analysis' | 'response_generation' | 'refinement';
  tool?: string;
  parameters?: Record<string, any>;
  description?: string;
  completed: boolean;
  result?: any;
}

export interface ReasoningStep {
  id: number;
  thought: string;
  timestamp: string;
}

// Observer types
export interface ObserverConfig {
  enableMetrics: boolean;
  enableLogging: boolean;
  logToConsole: boolean;
  logFilePath?: string;
}

export interface AgentEvent {
  type: 'user_request' | 'agent_response' | 'tool_execution' | 'llm_request' | 'error';
  timestamp: string;
  data: any;
}

export interface AgentMetrics {
  totalRequests: number;
  averageResponseTime: number;
  toolUsageCounts: Record<string, number>;
  successRate: number;
  tokenUsage: {
    prompt: number;
    completion: number;
    total: number;
  };
} 