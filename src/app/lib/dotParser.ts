// utils/dotParser.ts
 
import * as graphviz from 'graphviz';

const parseDotFile = (dotContent: string): graphviz.Graph | null => {
  try {
    const parsedGraph = graphviz.parse(dotContent);
    return parsedGraph;
  } catch (error) {
    console.error('Error parsing DOT content:', error);
    return null;
  }
};

export default parseDotFile;
