import Experience from "./Experience.jsx"
import Interface from "./Interface.jsx"
import {Canvas} from "@react-three/fiber"
import {KeyboardControls,Loader} from "@react-three/drei"
import * as Three from "three"
import { useState,Suspense } from "react"




 function App() {
 const [isReady,setIsReady]=useState(false)
  const created=({scene})=>{
   
    scene.background=new Three.Color('#dfecf0')
  }
 

  return (
    <>
      <KeyboardControls 
        map={[
          {name:'forward',keys:['ArrowUp','KeyW']},
          {name:'backward',keys:['ArrowDown','KeyS']},
          {name:'left',keys:['ArrowLeft','KeyA']},
          {name:'right',keys:['ArrowRight','KeyD']},
          {name:'jump',keys:['Space']}
        ]}
      >
   
     <Canvas 
        shadows
        camera={ {
            fov: 45,
            near: 0.1,
            far: 200,
            position: [2.5, 4, 6]
        } }
        onCreated={created}
        >
        <Suspense fallback={null}>
        <Experience/>
        </Suspense>
      </Canvas>
      <Loader
         containerStyles={
            {backgroundColor:'#01012b', 
           
          backgroundRepeat: 'no-repeat',}}
         barStyles={{ backgroundColor: 'green' }}
         dataStyles={{fontWeight:900,position:'absolute', left:'45%',top:'40%', textAlign:'center', fontFamily:'Kranky', color: 'mediumaquamarine', fontSize: '4vh' }}
         dataInterpolation={(p) => `Loading: ${p.toFixed(0)}%`}
      />
     {<Interface />}
      
     </KeyboardControls>

    </>
  )
}

export default App
