import React, { useRef, useState } from 'react';
import Draggable from 'react-draggable';
import './App.css';

function App() {
  const [boxes, setBoxes] = useState([
    { id: 1, x: 0, y: 0, className: "BoxX", text: "X" },
    { id: 2, x: 120, y: 0, className: "BoxX", text: "X" },
    { id: 3, x: 240, y: 0, className: "BoxY", text: "Y" },
    { id: 4, x: 360, y: 0, className: "BoxY", text: "Y" }
  ]);
  const boxRefs = useRef({});

  const addBoxX = () => {
    const newId = Date.now();
    setBoxes(prev => [...prev, { id: newId, x: Math.random() * window.innerWidth / 2, y: Math.random() * window.innerHeight / 2, className: "BoxX", text: `X` }]);
  };
  const addBoxY = () => {
    const newId = Date.now();
    setBoxes(prev => [...prev, { id: newId, x: Math.random() * window.innerWidth / 2, y: Math.random() * window.innerHeight / 2, className: "BoxY", text: `Y` }]);
  };
  const addBoxNegX = () => {
    const newId = Date.now();
    setBoxes(prev => [...prev, { id: newId, x: Math.random() * window.innerWidth / 2, y: Math.random() * window.innerHeight / 2, className: "BoxNegX", text: `-X` }]);
  };
  const addBoxNegY = () => {
    const newId = Date.now();
    setBoxes(prev => [...prev, { id: newId, x: Math.random() * window.innerWidth / 2, y: Math.random() * window.innerHeight / 2, className: "BoxNegY", text: `-Y` }]);
  };

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

    for (let other of boxes) {
      if (other.id === id) continue;

      const otherRef = boxRefs.current[other.id];
      if (!otherRef) continue;

      const otherRect = otherRef.current.getBoundingClientRect();

      if (checkOverlap(currentRect, otherRect) && !(currentBox.current.className.includes("BoxXX") && otherRef.current.className.includes("BoxXX")) && !(currentBox.current.className.includes("BoxYY") && otherRef.current.className.includes("BoxYY")) && otherRef.current.className.split(" ")[0] == currentBox.current.className.split(" ")[0]) {
        if (currentBox.current.className.split(" ")[0] == "BoxX") {
          setBoxes(prev =>
            prev
              .filter(box => box.id !== other.id)
              .map(box =>
                box.id === id
                  ? { ...box, className: "BoxXX", text: "X²", x: data.x, y: data.y }
                  : box)
          );
        } else if (currentBox.current.className.split(" ")[0] == "BoxY") {
          setBoxes(prev =>
            prev
              .filter(box => box.id !== other.id)
              .map(box =>
                box.id === id
                  ? { ...box, className: "BoxYY", text: "Y²", x: data.x, y: data.y }
                  : box)
          );
        } else if (currentBox.current.className.split(" ")[0] == "BoxNegX") {
          setBoxes(prev =>
            prev
              .filter(box => box.id !== other.id)
              .map(box =>
                box.id === id
                  ? { ...box, className: "BoxNegXX", text: "-X²", x: data.x, y: data.y }
                  : box)
          );
        } else if (currentBox.current.className.split(" ")[0] == "BoxNegY") {
          setBoxes(prev =>
            prev
              .filter(box => box.id !== other.id)
              .map(box =>
                box.id === id
                  ? { ...box, className: "BoxNegYY", text: "-Y²", x: data.x, y: data.y }
                  : box)
          );
        } 
        return;
      } else if (checkOverlap(currentRect, otherRect) && (currentBox.current.className.includes("Neg") || otherRef.current.className.includes("Neg"))) {
        if (otherRef.current.className.split(" ")[0].replace("Neg", "") == currentBox.current.className.split(" ")[0] || currentBox.current.className.split(" ")[0].replace("Neg", "") == otherRef.current.className.split(" ")[0]) {
          setBoxes(prev =>
            prev.filter(box => box.id !== other.id && box.id !== currentBox.current.id)
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
      <button onClick={addBoxX}>Add X</button>
      <button onClick={addBoxY}>Add Y</button>
      <button onClick={addBoxNegX}>Add -X</button>
      <button onClick={addBoxNegY}>Add -Y</button>

      {boxes.map(box => {
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
      })}
    </div>
  );
}

export default App;
