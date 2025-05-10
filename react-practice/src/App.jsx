
import { useState } from 'react'
import './App.css'

function App() {
const [count,setCount]=useState(0)
  return (
   <div>
<p>Hello World ! Please let me know if you have any problem</p>
Please check count value {count}

<div>
  <button onClick={()=>setCount(prev=>prev+1)}>Please click to increase</button>
  <button onClick={()=>setCount(prev=>prev-1)}>Please click to decrease</button>

</div>
</div>
  )
}

export default App