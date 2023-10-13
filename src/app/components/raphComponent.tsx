import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { useCenteredTree } from './helper';
import { Graphviz } from "@hpcc-js/wasm/graphviz";
interface GraphComponentProps {
    dotSource: string;
}

const GraphComponent: React.FC<GraphComponentProps> = ({ dotSource }) => {
    const svgRef = useRef < SVGSVGElement | null > (null);

    const [translate, containerRef] = useCenteredTree();
    useEffect(() => {
        const svg = d3.select(svgRef.current!);

        const zoom = d3.zoom().on('zoom', function () {
            svg.attr('transform', d3.event.transform);
        });

        svg.call(zoom);

        const drag = d3.drag().subject(function (d) {
            return d3.select(this);
        }).on('start', function () {
            d3.event.sourceEvent!.stopPropagation();
        }).on('drag', function () {
            d3.select(this).attr('cx', d3.event.x).attr('cy', d3.event.y);
        });

        svg.call(drag);
    }, []); // Run only once on component mount

    const OnLoadGraph = async () => {
        const graphviz = await Graphviz.load();
        const dot = dotSource;
        const svg = graphviz.dot(dot);
        const div = document.getElementById("grah_holder");
        div.innerHTML = graphviz.layout(dot, "svg", "dot");
        console.log(dotSource)
    }

    useEffect(() => {
        // Render Graphviz output here using d3.select(svgRef.current) and dotSource
        if (dotSource) {
            OnLoadGraph()
        }
    }, [dotSource]);

    const containerStyles = {
        width: "100%",
    };
    return (
        <svg ref={svgRef}>
            <div style={containerStyles} className=' overflow-x-auto p-12' ref={containerRef}>
                <div id='grah_holder' className='text-sm h-full flex  items-center justify-center' >
                </div>
            </div>
        </svg>
    );
};

export default GraphComponent;
