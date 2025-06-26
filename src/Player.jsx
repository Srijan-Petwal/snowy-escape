import {useRapier, RigidBody } from "@react-three/rapier";
import { useKeyboardControls,PositionalAudio } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import useGame from "./store/useGame";
import * as Three from 'three'
import Snowfall from "./Snowfall.jsx";

export default function Player(){
    const ball=useRef()
    const meshRef=useRef()
    const {rapier,world}=useRapier()
    
    const rapierWorld=world
   // console.log(rapierWorld)
    const [subscribeKeys,getKeys]=useKeyboardControls()
    //console.log(getKeys)



   const start= useGame(state=>state.start)
   const end= useGame(state=>state.end)
   const restart= useGame(state=>state.restart)
   const blocksCount= useGame(state=>state.blocksCount)
   const reset=()=>{
      if (!ball.current || !ball.current.translation()) return;
        ball.current.setTranslation({x:0,y:1,z:0})
        ball.current.setLinvel({x:0,y:0,z:0})
        ball.current.setAngvel({x:0,y:0,z:0})
   }


   
    useEffect(()=>{


       const unsubscribeReset= useGame.subscribe(
            (state)=>state.phase,
            (value)=>{
                    if(value=='ready'){
                        reset()
                    }
                }
        )


        const unsubscribe=subscribeKeys(
            (state)=>state.jump,
            (value)=>{
                if(value){
                    //console.log(value)
                    const origin=ball.current?.translation()
                    origin.y-=0.31
                    const direction={x:0,y:-1,z:0}
                    const ray=new rapier.Ray(origin,direction)
                    const hit=rapierWorld.castRay(ray,10,true)
                    if(hit.timeOfImpact<0.15)
                        {if(!ball.current) return
                            ball.current?.applyImpulse({x:0,y:0.5,z:0})
                        }
                }
            }
        )
        // const unsubscribePhase=subscribeKeys(()=>{
        //     start()
        // })
        return( ()=>{
            unsubscribe()
          //  unsubscribePhase()
            unsubscribeReset()
        })

    },[])
    const phase=useGame(state=>state.phase)
     useEffect(()=>{
            levelCompleteCheck.current=false
        },[phase])

       

    const [smoothCameraPos]=useState(()=>new Three.Vector3(20,20,20))
    const [smoothCameraTarget]=useState(()=>new Three.Vector3())
    useFrame((state,delta)=>{
        const {forward,backward,left,right}=getKeys()
    
        const impluse={x:0,y:0,z:0}
        const torque={x:0,y:0,z:0}

        const impulseMag=0.2*delta
        const torqueMag=0.3*delta
         ball.current.wakeUp()
        if(phase=='playing' && forward){     
            impluse.z-=impulseMag
            torque.x-=torqueMag
        }
        if(backward){     
            impluse.z+=impulseMag
            torque.x+=torqueMag
        }
        if(left){     
            impluse.x-=impulseMag
            torque.z+=torqueMag
        }
        if(right){     
            impluse.x+=impulseMag
            torque.z-=torqueMag
        }
        if(!ball.current) return
        ball.current.applyImpulse(impluse)
        ball.current.applyTorqueImpulse(torque)


        //CAMERA MOVEMENTS
        if(!ball.current) return
        const ballPos=ball.current.translation()
        const cameraPos=new Three.Vector3().copy(ballPos)
        cameraPos.y+=0.7
        cameraPos.z+=2.5
        

        const cameraTarget=new Three.Vector3().copy(ballPos)
        cameraTarget.copy(ballPos)
        cameraTarget.y+=0.25
        smoothCameraPos.lerp(cameraPos,5*delta)
        smoothCameraTarget.lerp(cameraTarget,5*delta)

        state.camera.position.copy(smoothCameraPos)
        state.camera.lookAt(smoothCameraTarget)

       

        if(ballPos.z< -(blocksCount*4+2)){
            end()
            setLevelSoundPlayed(false) 
              if (!levelCompleteCheck.current && levelCompleteAudioRef.current) {
                levelCompleteAudioRef.current.play()
                 // ensures it plays only once

                 levelCompleteCheck.current=true

            }
           
        }
        if(ballPos.y<-4 ){
          
            restart()

            if(ballPos.y<-10) start()
           // ballPos.position=[0,0,0]
        }
        // if(phase=='ready'){
        //     levelCompleteCheck.current=false
        // }
    })

//       useEffect(() => {
//     if (meshRef.current) {
//       meshRef.current.layers.set(1)
//     }
//   }, [])

   
    const [levelSoundPlayed, setLevelSoundPlayed] = useState(true)
    const levelCompleteAudioRef=useRef()
    const levelCompleteCheck=useRef(false)
   // const [levelCompletionSound,setLevelCompletionSound]=useState(false)
 
 

    return <><RigidBody ref={ball} colliders="ball" restitution={0.2} friction={1} linearDamping={2} angularDamping={1 } >
        <mesh ref={meshRef} castShadow>
           <icosahedronGeometry args={[0.3,1]} />
           <meshNormalMaterial  flatShading color={"#c20288"} />
          
          {< PositionalAudio
                ref={levelCompleteAudioRef}
                url="/audios/game-level-completed.wav"
                distance={1}
                autoplay={false}
                loop={false}
            />}
        </mesh>
         
    </RigidBody>
    
    </>
}