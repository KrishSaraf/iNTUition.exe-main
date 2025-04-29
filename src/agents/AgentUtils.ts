/**
 * AgentUtils.ts
 * Utility functions for the agent system.
 */

export class AgentUtils {
  /**
   * Formats a timestamp into a human-readable string
   */
  static formatTimestamp(timestamp: string | Date): string {
    console.log(`Placeholder: Formatting timestamp: ${timestamp}`);
    const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
    return date.toLocaleString();
  }

  /**
   * Truncates text to a specified length with ellipsis
   */
  static truncateText(text: string, maxLength: number): string {
    console.log(`Placeholder: Truncating text of length ${text.length} to ${maxLength}`);
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  }

  /**
   * Calculates similarity between two strings (placeholder implementation)
   */
  static calculateSimilarity(text1: string, text2: string): number {
    console.log(`Placeholder: Calculating similarity between texts of lengths ${text1.length} and ${text2.length}`);
    // Placeholder implementation - in reality would use cosine similarity or other algorithm
    const commonLength = Math.min(text1.length, text2.length);
    return commonLength / Math.max(text1.length, text2.length);
  }

  /**
   * Extracts keywords from text (placeholder implementation)
   */
  static extractKeywords(text: string): string[] {
    console.log(`Placeholder: Extracting keywords from text of length ${text.length}`);
    // Placeholder implementation - would normally use NLP techniques
    const words = text.toLowerCase().split(/\W+/).filter(word => word.length > 3);
    const uniqueWords = [...new Set(words)];
    return uniqueWords.slice(0, 5); // Return at most 5 "keywords"
  }

  /**
   * Deep clones an object
   */
  static deepClone<T>(obj: T): T {
    console.log('Placeholder: Deep cloning object');
    return JSON.parse(JSON.stringify(obj));
  }

  /**
   * Sanitizes user input to prevent injection attacks
   */
  static sanitizeInput(input: string): string {
    console.log(`Placeholder: Sanitizing input of length ${input.length}`);
    // Placeholder implementation - would normally do actual sanitization
    return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  }

  /**
   * Generates a unique ID for agent operations
   */
  static generateId(): string {
    console.log('Placeholder: Generating unique ID');
    return `agent-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }

  /**
   * Simple template string replacement
   */
  static fillTemplate(template: string, values: Record<string, string>): string {
    console.log('Placeholder: Filling template with values');
    let result = template;
    for (const [key, value] of Object.entries(values)) {
      result = result.replace(new RegExp(`{${key}}`, 'g'), value);
    }
    return result;
  }
} 