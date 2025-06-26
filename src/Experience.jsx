
import {Sky,Float,Text} from '@react-three/drei'
//import { Perf } from 'r3f-perf'
import Lights from './Lights.jsx'
import { Level } from './Level.jsx'
import {Physics } from '@react-three/rapier'
import { SpinnerBlock,WallBlock,ShutterBlock } from './Level.jsx'
import Player from './Player.jsx'
import useGame from './store/useGame.jsx'
import Witch from "./Witch.jsx";
import {useState, useEffect } from 'react'
import Smoll from './Smoll.jsx'


export default function Experience(){

    const blockCount=useGame((state)=>state.blocksCount)
    const blockSeed=useGame((state)=>state.blockSeed)
    const phase=useGame(state=>state.phase)
    const [started, setStarted] = useState(false)
    // const vanish = () => {
    //   if(phase=='playing'){}
    //         //  setStarted(true)
    //     }

    return(
        <>
         
           {/* <Perf position="top-left" /> */}
           {/* <Environment backgroundIntensity={1} files="/textures/background/studio_small_01_4k.exr" ground  background/> */}
           {/* <Environment backgroundIntensity={2} files="textures/background/HdrOutdoorSnowMountainsEveningClear001_HDR_4K.exr" background/> */}
            <Lights/>
            {/* <OrbitControls makeDefault /> */}
            <Physics >
            <Level count={blockCount} obstacleType={[ShutterBlock,SpinnerBlock,WallBlock]} seed={blockSeed} />

           <Player  />
           
         
          
            </Physics>

           <Text
            font='/fonts/Jersey25Charted-Regular.ttf'
             scale={0.07} 
             position={[0,-0.87,0.2]} 
             fontSize={3.2} 
             color={"#7bd7e3"}
             rotation-x={Math.PI*-0.5}
             maxWidth={28}
             textAlign='center'
             >
             Use WASD/Arrow keys for controls
           </Text>
           
           {phase=='ready' && <Text
             font='/fonts/Jersey25Charted-Regular.ttf'
             scale={0.07} 
             position={[0,-0.88,0.65]} 
             fontSize={4} 
             color={"#025222"}
             rotation-x={Math.PI*-0.5}
             maxWidth={30}
             textAlign='center'>
             Click START to play
           </Text>}
           <Float  floatIntensity={0.0} rotationIntensity={0.2}>
           //{phase=='playing' && <Witch  position={[1,-0.88,0.75]} scale={0.5} rotation-y={Math.PI*-0.6}/>}
             <Witch  position={[1,-0.88,0.75]} scale={0.5} rotation-y={Math.PI*-0.6}/>
            </Float>
            {/* <primitive object={smoll.scene}/> */}
            {/* <Effects/> */}
            <Smoll  scale={0.25} position={[-1.4,-0.8995,-2]}  rotation-y={phase=='playing'?Math.PI*0.25:Math.PI*0.2}/>
            {/* <Stars  radius={100} depth={35} count={5000} factor={4} saturation={1} fade speed={5} /> */}
            <Sky mieCoefficient={0.005} turbidity={150} rayleigh={0.57} distance={450000} sunPosition={[30, 2, 0]} inclination={0} azimuth={0.1}  />
        </>
    )
}
