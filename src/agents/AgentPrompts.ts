/**
 * AgentPrompts.ts
 * Template prompts for agent operations.
 */

export const AgentPrompts = {
  /**
   * System prompt for general assistance
   */
  systemPrompt: `You are an AI assistant designed to be helpful, harmless, and honest. 
Your goal is to provide accurate information and assistance to the user.
You should respond to queries with relevant, concise, and helpful information.`,

  /**
   * Template for planning complex tasks
   */
  planningTemplate: `Given the user's goal: "{goal}"
Create a detailed step-by-step plan to accomplish this goal efficiently.
Each step should be specific and actionable.
Include any necessary tools, resources, or prerequisites for each step.`,

  /**
   * Template for reasoning through problems
   */
  reasoningTemplate: `Let's think through this problem step-by-step:
Problem: {problem}

1. What are the key components of this problem?
2. What information do we already have?
3. What information do we need to find?
4. What techniques or approaches could help solve this?
5. Let's work through the solution methodically.`,

  /**
   * Template for code generation
   */
  codeGenerationTemplate: `I'll write {language} code to accomplish the following task:
Task: {task}

Let me break this down:
1. First, I'll understand the requirements
2. Then, I'll choose the appropriate approach
3. Finally, I'll implement the solution with clean, well-commented code

Here's the implementation:
\`\`\`{language}
// Code implementation will go here
\`\`\``,

  /**
   * Template for summarizing information
   */
  summarizationTemplate: `I'll provide a concise summary of the following information:
Information: {text}

Key points:
1. 
2. 
3.

Summary: `,

  /**
   * Template for tool usage instruction
   */
  toolUsageTemplate: `I need to use the "{toolName}" tool to accomplish this task.
Task: {task}

The tool requires the following parameters:
{parameters}

I'll execute this tool with the appropriate inputs to get the information needed.`,

  /**
   * Template for error handling
   */
  errorHandlingTemplate: `I encountered an error while executing the task.
Error: {error}

Let me analyze what went wrong:
1. The error indicates: ...
2. Possible causes include: ...
3. To resolve this, I will: ...`,

  /**
   * Template for web search analysis
   */
  webSearchAnalysisTemplate: `Based on the search results for "{query}", here is my analysis:

Search Results:
{results}

Key findings:
1. 
2. 
3.

Conclusion: `,

  /**
   * Template for multi-step reasoning
   */
  chainOfThoughtTemplate: `To solve this problem, I need to think step-by-step.
Problem: {problem}

Step 1: ...
Step 2: ...
Step 3: ...

Therefore, the answer is: ...`
}; 