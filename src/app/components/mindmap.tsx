// components/MindMap.js
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const MindMap = () => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 800;
    const height = 600;

    // Sample data
    const data = {
      name: 'Root',
      children: [
        { name: 'Node 1', children: [{ name: 'Node 1.1' }, { name: 'Node 1.2' }] },
        { name: 'Node 2', children: [{ name: 'Node 2.1' }, { name: 'Node 2.2' }] },
      ],
    };

    // Create a tree layout
    const treeLayout = d3.tree().size([width, height]);

    // Create a hierarchy from the data
    const root = d3.hierarchy(data);

    // Assign x, y coordinates to each node
    treeLayout(root);

    // D3 code to create the mind map with arrows
    const svg = d3.select(svgRef.current);

    // Create links
    svg
      .selectAll('.link')
      .data(root.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', d3.linkHorizontal().x((d) => d.y).y((d) => d.x));

    // Create nodes
    const nodes = svg
      .selectAll('.node')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', (d) => `translate(${d.y},${d.x})`);

    // Add circles to nodes
    nodes.append('circle').attr('r', 5);

    // Add text labels to nodes
    nodes
      .append('text')
      .attr('dy', '0.31em')
      .attr('x', (d) => (d.children ? -6 : 6))
      .attr('text-anchor', (d) => (d.children ? 'end' : 'start'))
      .text((d) => d.data.name);
  }, []);

  return (
    <svg ref={svgRef} width="800" height="600">
      {/* SVG content goes here */}
    </svg>
  );
};

export default MindMap;
