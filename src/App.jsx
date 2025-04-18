import React, { useRef, useState } from 'react';
import Draggable from 'react-draggable';
import './App.css';

function App() {
  const [genBoxes] = useState([
    { id: 69, x: 0.05 * window.innerWidth + 0.1214 * window.innerWidth * 0, y: 0.1 * visualViewport.height, className: "BoxX", text: "X" },
    { id: 696, x: 0.05 * window.innerWidth + 0.1214 * window.innerWidth * 1, y: 0.1 * visualViewport.height, className: "BoxXX", text: "X²" },
    { id: 6969, x: 0.05 * window.innerWidth + 0.1214 * window.innerWidth * 2, y: 0.1 * visualViewport.height, className: "BoxY", text: "Y" },
    { id: 69696, x: 0.05 * window.innerWidth + 0.1214 * window.innerWidth * 3, y: 0.1 * visualViewport.height, className: "BoxYY", text: "Y²" },
    
    { id: 696969, x: 0.05 * window.innerWidth + 0.1214 * window.innerWidth * 4, y: 0.1 * visualViewport.height, className: "BoxNegX", text: "-X" },
    { id: 6969696, x: 0.05 * window.innerWidth + 0.1214 * window.innerWidth * 5, y: 0.1 * visualViewport.height, className: "BoxNegXX", text: "-X²" },
    { id: 69696969, x: 0.05 * window.innerWidth + 0.1214 * window.innerWidth * 6, y: 0.1 * visualViewport.height, className: "BoxNegY", text: "-Y" },
    { id: 696969696, x: 0.05 * window.innerWidth + 0.115 * window.innerWidth * 7, y: 0.1 * visualViewport.height, className: "BoxNegYY", text: "-Y²" },
  ]);
  const [boxes, setBoxes] = useState([
  ]);
  const boxRefs = useRef({});

  const checkOverlap = (rect1, rect2) => {
    return !(
      rect1.right < rect2.left ||
      rect1.left > rect2.right ||
      rect1.bottom < rect2.top ||
      rect1.top > rect2.bottom
    );
  };

  const onStop = (id, data) => {
    const currentBox = boxRefs.current[id];
    if (!currentBox) return;

    const currentRect = currentBox.current.getBoundingClientRect();
    const uniqueId = Date.now() + Math.random() * 10;

    for (let genBox of genBoxes) {
      if (genBox.id === id) {
        setBoxes(prev => [
          ...prev,
          {
            id: uniqueId,
            x: data.x,
            y: data.y,
            className: currentBox.current.className,
            text: genBox.text
          }
        ]);
        break;
      }
    }

    for (let other of boxes) {
      if (other.id === id) continue;

      const otherRef = boxRefs.current[other.id];
      if (!otherRef) continue;

      const otherRect = otherRef.current.getBoundingClientRect();

      if (checkOverlap(currentRect, otherRect) && !(currentBox.current.className.includes("BoxXX") && otherRef.current.className.includes("BoxXX")) && !(currentBox.current.className.includes("BoxYY") && otherRef.current.className.includes("BoxYY")) && otherRef.current.className.split(" ")[0] == currentBox.current.className.split(" ")[0]) {
        /*if (currentBox.current.className.split(" ")[0] == "BoxX") {
          setBoxes(prev =>
            prev
              .filter(box => box.id !== other.id)
              .map(box =>
                box.id === id
                  ? { ...box, className: "BoxXX", text: "X²", x: data.x, y: data.y }
                  : box)
          );
        }  else if (currentBox.current.className.split(" ")[0] == "BoxNegY") {
          setBoxes(prev =>
            prev
              .filter(box => box.id !== other.id)
              .map(box =>
                box.id === id
                  ? { ...box, className: "BoxNegYY", text: "-Y²", x: data.x, y: data.y }
                  : box)
          );
        } */
      } else if (checkOverlap(currentRect, otherRect) && (currentBox.current.className.includes("Neg") || otherRef.current.className.includes("Neg"))) {
        if (otherRef.current.className.split(" ")[0].replace("Neg", "") == currentBox.current.className.split(" ")[0] || currentBox.current.className.split(" ")[0].replace("Neg", "") == otherRef.current.className.split(" ")[0]) {
          
          setBoxes(prev =>
            prev.filter(box => box.id !== other.id && box.id !== currentBox.current.id && box.id !== uniqueId)
            .map(box =>
              box.id === id
                ? { ...box, className: "", text: "", x: 0, y: 0 }
                : box)
          );
        }
      } 
    }
    setBoxes(prev =>
      prev.map(b => (b.id === id ? { ...b, x: data.x, y: data.y } : b))
    );
  };

  return (
    <div className="App">
  
      {[
        ...boxes.map(box => {
          if (!boxRefs.current[box.id]) {
            boxRefs.current[box.id] = React.createRef();
          }
  
          return (
            <Draggable
              key={box.id}
              nodeRef={boxRefs.current[box.id]}
              position={{ x: box.x, y: box.y }}
              onStop={(_, data) => onStop(box.id, data)}>
              <div ref={boxRefs.current[box.id]} className={box.className}>
                {box.text}
              </div>
            </Draggable>
          );
        }),
  
        ...genBoxes.map(box => {
          if (!boxRefs.current[box.id]) {
            boxRefs.current[box.id] = React.createRef();
          }
  
          return (
            
            <Draggable
              key={box.id}
              nodeRef={boxRefs.current[box.id]}
              position={{ x: box.x, y: box.y }}
              onStop={(_, data) => onStop(box.id, data)}>
              <div ref={boxRefs.current[box.id]} className={box.className}>
                {box.text}
              </div>
            </Draggable>
          );
        })
      ]}
    </div>
  );  
}

export default App;
