import {Float,Sparkles, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import {CuboidCollider, RigidBody } from '@react-three/rapier'
import { useMemo, useRef, useState } from 'react'
import Witch from './Witch.jsx'
import Portal from './Portal.jsx'
import * as Three from 'three'
import Snowfall from './Snowfall.jsx'


const BoxGeometry=new Three.BoxGeometry(1,1,1)
const LimeGreen=new Three.MeshStandardMaterial({color:'#00f2ff',metalness:1,roughness:0.6,envMapIntensity:1})
const GreenYellow=new Three.MeshStandardMaterial({color:'white',metalness:1,roughness:0.5,envMapIntensity:1})
const Orangered=new Three.MeshStandardMaterial({color:'#12e1fc',metalness:1,envMapIntensity:1})
const SlateGray=new Three.MeshPhysicalMaterial({color:"#0089a8",metalness:1,roughness:0.5,envMapIntensity:1})

export const StartBlock=({position=[0,0,0]})=>{
    return<group position={position}>
        <mesh geometry={BoxGeometry} material={LimeGreen} position={[0,-1,0]} scale={[4,0.2,4]} castShadow receiveShadow>
        </mesh>
    
    </group>

}
export const StopBlock=({position=[0,0,0]})=>{

    // const portal=useGLTF('/models/heart_shaped_porta.glb')
    
    // portal.scene.traverse((mesh)=>{
    //     mesh.castShadow=true
    // })
    return<group position={position}>
        <Float>
        <Witch position={[0,-0.67,-0.5]} scale={0.8}  />
        </Float>
        <mesh geometry={BoxGeometry} material={LimeGreen} position={[0,-1,0]} scale={[4,0.2,4]} castShadow receiveShadow/>
        <RigidBody type='fixed' colliders="hull" >
            <Portal position={[0,0,-0.6]} scale={[2,1.5,1.5]} />
        </RigidBody>
        <Sparkles position-y={0.4} size={6} scale={[3,2,3.5]} count={300} color={'#12e1fc'} noise={[10,1,2]} />
    </group>

}
export const SpinnerBlock=({position=[0,0,0]})=>{

    const obstacleRef=useRef()
    const [speed]=useState(()=>(Math.random()+0.2)*(Math.random()<0.49?-1:1))
    useFrame((state)=>{
       
        const time=state.clock.getElapsedTime()
        const eulerRotation=new Three.Euler(0,time*speed,0)
        const quaternionRotation=new Three.Quaternion().setFromEuler(eulerRotation)
        if (!obstacleRef.current) return;
        obstacleRef.current.setNextKinematicRotation(quaternionRotation)
    })


    const [sound_hit]=useState(()=>new Audio('/audios/glassy-hit.wav'))

    const hitSound=()=>{
        sound_hit.currentTime=0
        sound_hit.volume=Math.random()
        sound_hit.play();
    }

    
    return(

    <group position={position} >
        <mesh geometry={BoxGeometry} material={GreenYellow} position={[0,-1,0]}  scale={[4,0.2,4]} castShadow receiveShadow/>
        <RigidBody ref={obstacleRef} type='kinematicPosition' position={[0,-0.4,0]} friction={0} restitution={0.2} onCollisionEnter={hitSound}>
        <mesh geometry={BoxGeometry} material={Orangered} scale={[3.5,0.3,0.3]} castShadow receiveShadow/>
        </RigidBody>
          <Float rotationIntensity={0} speed={0.3} floatIntensity={0.3}>
            <Snowfall count={50} />
         </Float>
    </group>
    )
}
export const WallBlock=({position=[0,0,0]})=>{

    const obstacleRef=useRef()
    const [speed]=useState(()=>(Math.random()+0.2)*(Math.random()<0.49?-1:1))
    useFrame((state)=>{
       
        const time=state.clock.getElapsedTime()
        const movement=Math.sin(time*(speed+0.2))
       if (!obstacleRef.current) return;
        obstacleRef.current.setNextKinematicTranslation({x:movement+position[0],y:position[1],z:position[2]})
    })


    const [sound_hit]=useState(()=>new Audio('/audios/glassy-hit.wav'))

    const hitSound=()=>{
        sound_hit.currentTime=0
        sound_hit.volume=Math.random()
        sound_hit.play();
    }

    
    return(

    <group position={position} >
        <mesh geometry={BoxGeometry} material={GreenYellow} position={[0,-1,0]}  scale={[4,0.2,4]} castShadow receiveShadow/>
        <RigidBody ref={obstacleRef} type='kinematicPosition'  friction={0} restitution={0.2} onCollisionEnter={hitSound}>
        <mesh  geometry={BoxGeometry} material={Orangered} position={[0,-0.2,0]} scale={[1.5,1.5,0.3]} castShadow receiveShadow/>
        </RigidBody>
        <Float rotationIntensity={0} speed={0.3} floatIntensity={0.3}>
            <Snowfall count={50} />
         </Float>
    </group>
    )
}

export const ShutterBlock=({position=[0,0,0]})=>{

    const obstacleRef=useRef()
   // const [speed]=useState(()=>(Math.random()+0.2)*(Math.random()<0.49?-1:1))
    const [timeOffset]=useState(()=>Math.random()*2*Math.PI)
    useFrame((state)=>{
       
        const time=state.clock.getElapsedTime()
        const movement=Math.sin(time+timeOffset)*0.7
       if (!obstacleRef.current) return;
        obstacleRef.current.setNextKinematicTranslation({x:position[0],y:movement+position[1],z:position[2]})

       
        const eulerRotation=new Three.Euler(time,0,0)
        const quaternionRotation=new Three.Quaternion().setFromEuler(eulerRotation)
        if (!obstacleRef.current) return;
        obstacleRef.current.setNextKinematicRotation(quaternionRotation)
    })

    const [sound_hit]=useState(()=>new Audio('/audios/glassy-hit.wav'))

    const hitSound=()=>{
        sound_hit.currentTime=0
        sound_hit.volume=Math.random()
        sound_hit.play();
    }


    
    return(

    <group position={position} >
        <mesh geometry={BoxGeometry} material={GreenYellow} position={[0,-1,0]}  scale={[4,0.2,4]} castShadow receiveShadow/>
        <RigidBody ref={obstacleRef} type='kinematicPosition'  friction={0} restitution={0.2} onCollisionEnter={hitSound}>
        <mesh geometry={BoxGeometry} material={Orangered} position={[0,0.3,0]} scale={[3,0.3,0.3]} castShadow receiveShadow/>
        </RigidBody>
        {/* <Float rotationIntensity={0} speed={0.3} floatIntensity={0.3}> */}
            <Snowfall  count={100} />
         
    </group>
    )
}

function Bounds({length=1}){

    const [sound_hit]=useState(()=>new Audio('/audios/hit.mp3'))

    const hitSound=()=>{
        sound_hit.currentTime=0
        const randomVol=Math.random()
        sound_hit.volume=1
        sound_hit.play();
    }


    return <>
    <Snowfall  count={1000}/>
    <RigidBody onCollisionEnter={hitSound} type='fixed' restitution={0.2} friction={1}>
        <mesh geometry={BoxGeometry} material={SlateGray} position={[2.1,0.55,-(length*2)+2]} scale={[0.2,3,length*4]} receiveShadow />
        <mesh geometry={BoxGeometry} material={SlateGray} position={[-2.1,0.55,-(length*2)+2]} scale={[0.2,3,length*4]} castShadow receiveShadow />
        <mesh geometry={BoxGeometry} material={SlateGray} position={[0,0.55,-(length*4)+2]} scale={[4,3,0.2]} castShadow receiveShadow />
        <CuboidCollider args={[2,0.1,2*length]} position={[0,-1,-(length*2)+2]} restitution={0.2} friction={1}/>
    </RigidBody>    
    </>
}


export function Level({count=3,obstacleType=[SpinnerBlock,WallBlock,ShutterBlock],seed=0}){



    const blocks=useMemo(()=>{
        const obstacle=[]
        for(let i=0;i<count;i++){
            obstacle.push(obstacleType[Math.floor(Math.random()*obstacleType.length)])
        }
        return obstacle;
    },[count,obstacleType,seed])


    return <>
    <StartBlock position={[0,0,0]} />
    {blocks.map((Block,index)=><Block key={index} position={[0,0,-(index+1)*4]}/>)}
    <StopBlock position={[0,0,-(count+1)*4]}/>
    <Bounds length={count+2}/>
    </>
}