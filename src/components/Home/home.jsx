import React from 'react' 
import Dest from '../Cat/Cat' 
import Search from '../Search/Search'
import Foot from '../Footer/Foot'
import Pack from '../Pack/Pack'
import About from '../About us/about'
function Home() {
  return (
    <div> 
      <Dest/>
      <Search/>
      <Pack/>
      <About/>
      <Foot/>

    </div>
  )
}

export default Home