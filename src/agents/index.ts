/**
 * Agent System - Index file
 * Exports all agent-related components.
 */

// Export all agent-related components
export { AgentController } from './AgentController';
export { AgentMemory } from './AgentMemory';
export { AgentLLM } from './AgentLLM';
export { AgentTools } from './AgentTools';
export { AgentAPI } from './AgentAPI';
export { AgentPlanner } from './AgentPlanner';
export { AgentUtils } from './AgentUtils';
export { AgentPrompts } from './AgentPrompts';
export { AgentObserver } from './AgentObserver';

// Export all types
export * from './AgentTypes';

// Main entry point for creating an agent
export const createAgent = (config: any) => {
  console.log('Placeholder: Creating agent with config:', config);
  return new AgentController(config);
}; 