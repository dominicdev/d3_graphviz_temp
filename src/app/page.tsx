"use client"
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useCenteredTree } from './components/helper';
import { Graphviz } from "@hpcc-js/wasm/graphviz";

export default function Home() {
  const inputdrop: any = useRef(null);
  const svgRef: any = useRef(null);
  
  const [ containerRef] = useCenteredTree();
 

  const [fileContent, setFileContent] = useState  (null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const graphviz = await Graphviz.load();

    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const content = e.target?.result as string;
        setFileContent(content);

        const dot = content;

        const svg = graphviz.dot(dot);

        const div = document.getElementById("grah_holder");
        div.innerHTML = graphviz.layout(dot, "svg", "dot"); 
 
      };

      reader.readAsText(file);
    }
  };

  useEffect(() => {
    const svg = d3.select(canvasRef.current); 
    const container = d3.select(containerRef.current); 
 
    // Define zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([1, 4])
      .on('zoom', (event) => {
        svg.attr('transform', event.transform);
      });

    // Apply zoom behavior to the SVG
    svg.call(zoom);
    
}, []); // Run only once on component mount

  const containerStyles = {
    width: "100%",
  };

  const canvasRef = useRef();

  useEffect(() => {
   
  }, []);

   
  // return (
  //   <div style={containerStyles} className='overflow-x-auto p-12' ref={containerRef}>
  //     <div  id='graph_holder' className='text-sm h-full flex items-center justify-center'>
  //       <svg
  //         ref={canvasRef}
  //         width={800}
  //         height={600}
  //         style={{ border: '1px solid black' }}
  //       />
  //     </div>
  //   </div>
  // );

  return ( 
    <main className="bg-white min-h-screen flex w-full flex-col items-center justify-center py-3">
      <div className='text-black text-center w-full mb-10'>
        <h1 className="font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-black to-blue-800">
          D3 for Graphviz
        </h1>
      </div>
      <section className="flex flex-col  px-3 py-8 overflow-auto">
        <header className="flex flex-col items-center justify-center py-12 border-2 border-gray-400 border-dashed px-8">
          <p className="flex flex-col items-center justify-center mb-3 font-semibold text-center text-gray-900">
            <span className='text-sm text-black'>You can import from .dot formats</span>
          </p>
          <div className="flex justify-center flex-col gap-3">
            <input
              accept=".dot"
              ref={inputdrop}
              onChange={handleFileChange}
              type="file"
              className="hidden"
            />
            <button onClick={() => inputdrop.current.click()}
              className={"flex flex-row justify-center items-center px-5 py-1 mt-2 text-white bg-blue-600 border-transparent rounded-lg hover:border-transparent btn hover:bg-blue-400 focus:shadow-outline focus:outline-none loading "}>
              Browse Files
            </button>
          </div>
        </header>
      </section>

      <div style={containerStyles} className=' overflow-x-auto p-12 border-2 border-black max-w-[80%]' ref={containerRef}>
      <svg
      id='grah_holder'
      ref={canvasRef}  
      className='w-[2200px] h-[600px]' 
    />
      </div>  
    </main>
  )
}
