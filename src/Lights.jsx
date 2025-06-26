import { useFrame } from "@react-three/fiber"
import { useRef } from "react"

export default function Lights(){
    
    const lightRef=useRef()
    useFrame((state)=>{
        lightRef.current.position.z=state.camera.position.z+1-4
         lightRef.current.target.position.z=state.camera.position.z-4
         lightRef.current.target.updateMatrixWorld()
    })
    
    return <>

            <directionalLight 
           
            ref={lightRef}
            castShadow
            position={ [ 4, 4, 1 ] }
            intensity={ 9 }
            shadow-mapSize={ [ 1024, 1024 ] }
            shadow-camera-near={ 1 }
            shadow-camera-far={ 10 }
            shadow-camera-top={ 10 }
            shadow-camera-right={ 10 }
            shadow-camera-bottom={ - 10 }
            shadow-camera-left={ - 10 }
            color={"#9ee9f7"}
            />
            <ambientLight color={"cyan"} intensity={0.5} />
        
    </>
}