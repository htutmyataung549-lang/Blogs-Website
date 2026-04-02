export function calculateReadTime(content: string ): string {

  const text = typeof content === 'string' 
    ? content 
    : JSON.stringify(content);

  const wordsPerMinute = 200; 
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  
  return `${minutes} min read`;
}