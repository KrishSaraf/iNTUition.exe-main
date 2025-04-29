/**
 * AgentTools.ts
 * Collection of tools available to the agent.
 */

import { Tool, ToolResult, ToolInput } from './AgentTypes';

export class AgentTools {
  private tools: Map<string, Tool> = new Map();
  
  constructor(availableTools: string[] = []) {
    this.registerDefaultTools();
    
    // Filter to only include specified tools if provided
    if (availableTools.length > 0) {
      const filteredTools = new Map();
      availableTools.forEach(toolName => {
        if (this.tools.has(toolName)) {
          filteredTools.set(toolName, this.tools.get(toolName));
        }
      });
      this.tools = filteredTools;
    }
    
    console.log('Agent Tools initialized with:', Array.from(this.tools.keys()));
  }
  
  private registerDefaultTools(): void {
    // Web search tool
    this.tools.set('web_search', {
      name: 'web_search',
      description: 'Search the web for information',
      parameters: {
        query: { type: 'string', description: 'The search query' }
      },
      execute: async (input: ToolInput) => {
        console.log(`Placeholder: Executing web search for: "${input.query}"`);
        return Promise.resolve({
          status: 'success',
          data: {
            results: [
              { title: 'Example result 1', snippet: 'This is a placeholder search result' },
              { title: 'Example result 2', snippet: 'Another placeholder search result' }
            ]
          }
        });
      }
    });
    
    // Code execution tool
    this.tools.set('code_execution', {
      name: 'code_execution',
      description: 'Execute code in a sandbox environment',
      parameters: {
        code: { type: 'string', description: 'The code to execute' },
        language: { type: 'string', description: 'The programming language' }
      },
      execute: async (input: ToolInput) => {
        console.log(`Placeholder: Executing ${input.language} code: "${input.code.substring(0, 50)}..."`);
        return Promise.resolve({
          status: 'success',
          data: {
            output: 'This is a placeholder code execution result',
            executionTime: '0.5s'
          }
        });
      }
    });
    
    // File operations tool
    this.tools.set('file_operations', {
      name: 'file_operations',
      description: 'Perform file operations',
      parameters: {
        operation: { type: 'string', description: 'The operation type (read, write, list)' },
        path: { type: 'string', description: 'The file path' },
        content: { type: 'string', description: 'The content to write (for write operations)' }
      },
      execute: async (input: ToolInput) => {
        console.log(`Placeholder: Executing file ${input.operation} on path: "${input.path}"`);
        return Promise.resolve({
          status: 'success',
          data: {
            result: `Placeholder result for ${input.operation} operation`
          }
        });
      }
    });
  }
  
  async executeTool(toolName: string, input: ToolInput): Promise<ToolResult> {
    console.log(`Placeholder: Executing tool ${toolName} with input:`, input);
    
    if (!this.tools.has(toolName)) {
      return Promise.resolve({
        status: 'error',
        error: `Tool ${toolName} not found`
      });
    }
    
    try {
      return await this.tools.get(toolName)!.execute(input);
    } catch (error) {
      return Promise.resolve({
        status: 'error',
        error: `Error executing tool ${toolName}: ${error}`
      });
    }
  }
  
  getAvailableTools(): string[] {
    return Array.from(this.tools.keys());
  }
  
  getToolDescription(toolName: string): string | null {
    const tool = this.tools.get(toolName);
    return tool ? tool.description : null;
  }
} 