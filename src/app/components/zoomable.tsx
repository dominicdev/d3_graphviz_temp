// components/ZoomableIframe.tsx
import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

interface ZoomableIframeProps {
  src: string;
  width: string;
  height: string;
}

const ZoomableIframe: React.FC<ZoomableIframeProps> = ({ src, width, height }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  return (
    <Draggable>
      <TransformWrapper
        options={{ limitToBounds: false, minScale: 0.5 }}
        pan={{ disabled: true }}
        wheel={{ disabled: false }}
        doubleClick={{ disabled: false }}
        pinch={{ disabled: false }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <React.Fragment>
            <div className="controls">
              <button onClick={() => zoomIn()}>Zoom In</button>
              <button onClick={() => zoomOut()}>Zoom Out</button>
              <button onClick={() => resetTransform()}>Reset</button>
            </div>
            <TransformComponent>
              {/* Your div goes here */}
              <div style={{ position: 'absolute', top: 50, left: 50, zIndex: 2 }}>
                {/* Your content inside the div */}

                
                <p>Your draggable content</p>
              </div>
              {/* The iframe */}
              <iframe
                ref={iframeRef}
                src={src}
                width={width}
                height={height}
                style={{ border: '1px solid #ccc' }}
              />
            </TransformComponent>
          </React.Fragment>
        )}
      </TransformWrapper>
    </Draggable>
  );
};

export default ZoomableIframe;
