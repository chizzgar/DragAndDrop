
import './App.css';
import { useState } from "react";
import { useRef } from "react";

function App() {
  const [items, setItems] = useState([
    {
      id: 'square',
      class: 'item',
      src: 'https://chizzgar.ru/wp-content/uploads/2021/10/red_sq.jpg'

    },
    {
      id: 'circle',
      class: 'item',
      src: 'https://chizzgar.ru/wp-content/uploads/2021/10/green_circle.jpg'

    }
  ]);
  const [elem, setElem] = useState();
  const [count, setCount] = useState(0)
  const elementMain = useRef(null);
  const elementSet = useRef(null);

  function dropMain(e) {
    elem.style.position = 'absolute';
    elem.style.top = (e.pageY - (elem.offsetHeight + elem.offsetHeight * 0.1)) + 'px';
    elem.style.left = (e.pageX - (elem.offsetWidth - elem.offsetWidth * 0.1)) + 'px';
    e.target.append(elem)
    setCount(e.target.childElementCount)
  }

  function dropSet(e) {
    elem.style.position = 'relative ';
    elem.style.top = '0px';
    elem.style.left = '0px';
    e.target.append(elem)
    setCount(elementMain.current.childElementCount)
  }

  function dropContainer(e) {
    if (e.target.className === 'container') {
      elem.style.position = 'relative ';
      elem.style.top = '0px';
      elem.style.left = '0px';
      elementSet.current.appendChild(elem);
      setCount(elementMain.current.childElementCount)
    }
  }

  return (

    <div className="App">

      <div className="container" onDragOver={e => e.preventDefault()} onDrop={dropContainer}>
        <div className="counter">
          <div>Фигур в зоне для перетаскивания: <span>{count}</span></div>
        </div>


        <div className="main block"
          onDragOver={e => {
            e.preventDefault()
          }}
          onDrop={dropMain}
          ref={elementMain}>
        </div >

        <div className="set block"
          onDragOver={e => e.preventDefault()}
          onDrop={dropSet}
          ref={elementSet}>

          {items.map(item =>
            <img
              onDragStart={e => {
                setElem(e.target)
              }
              }
              key={item.id}
              src={item.src}
              id={item.id}
              alt="element"
              className={item.class}
              draggable={true}
              width={75}
              height={75} />
          )}


        </div>
      </div>

    </div >

  );
}

export default App;
