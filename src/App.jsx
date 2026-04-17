import { useState } from 'react'
import { Rnd } from "react-rnd";
import './App.css'

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0",
};

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <p> Hello World. Deploy testing the site! </p>


        <Rnd
        style={style}
          default={{
            x: 0,
            y: 0,
            width: 320,
            height: 200,
          }}
        >
          Rnd
        </Rnd>
      </section>
    </>
  )
}

export default App
