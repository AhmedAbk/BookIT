import React from 'react' 
import Dest from '../Dest/Dest' 
import Search from '../Search/Search'
import Foot from '../Footer/Foot'
import Pack from '../Pack/Pack'
function Home() {
  return (
    <div> 
       <Dest/>
       
        <Search/>
        <Pack/>
       
       <Foot/>
    </div>
  )
}

export default Home