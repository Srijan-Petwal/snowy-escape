
import {useGLTF, useKeyboardControls } from "@react-three/drei";
import useGame from "./store/useGame";
import { useRef,useState,useEffect } from "react";
import { addEffect } from "@react-three/fiber";


export default function Interface(){

        const forward=useKeyboardControls((state)=>state.forward)
        const backward=useKeyboardControls((state)=>state.backward)
        const left=useKeyboardControls((state)=>state.left)
        const right=useKeyboardControls((state)=>state.right)
        const jump=useKeyboardControls((state)=>state.jump)
        const [restartVisible,setRestart]=useState(false) 
        const restart=useGame((state)=>state.restart)
        const phase=useGame((state)=>state.phase)

    //     useEffect(()=>{
    //     const unsubscribeRestart=useGame.subscribe(
    //                 (state)=>state.phase,
    //                 (value)=>{
    //                     if(value=='ended'){
    //                         setRestart(true)
    //                     }
                        
    //                 }
    //             )
        
    //     return (()=> unsubscribeRestart())
    // }
    // ,[])



    const timerRef=useRef()
    useEffect(()=>{
       const unsubscribeEffect= addEffect(()=>{
            const state=useGame.getState()
            let elapsedTime=0;
            if(state.phase=='playing'){
                elapsedTime=Date.now()-state.startTime
            }
            else if(state.phase=='ended'){
                elapsedTime=state.endTime-state.startTime
            }
            elapsedTime/=1000
            elapsedTime=elapsedTime.toFixed(2)

            if(timerRef.current) timerRef.current.textContent=elapsedTime
        })

        return()=>{
            unsubscribeEffect()
        }
    },[])


    //AUDIO
    useEffect(() => {
    if (phase === "playing") {
      audioRef.current?.play();
    } else {
      // Pause audio when not playing (optional)
      audioRef.current.volume=0.025;
      audioRef.current.currentTime = 0; // rewind to start
    }
  }, [phase]);

    
    const start=useGame((state)=>state.start)
    const audioRef=useRef()
    const startGame=()=>{
          audioRef.current.volume=0.18
          
        start()
      
    }

    // const tweens=gsap.to('.start',{
    //     scale:"4",
    //     duration:2,
    //     paused:true
    // }) 
   
useEffect(() => {
  const startEl = document.querySelector('.start')
  if (startEl && phase=='ready') {
    const tween = gsap.to(startEl,{
      scale: 5,
      duration: 1.5,
      paused: true,
       ease: "elastic.out(1,0.3)",
       onComplete:()=>{gsap.to(startEl,{y:200,duration:2.5,ease:"elastic.out(1,0.3),"});tween.reverse()}
    })
     tween.play()
  }
 
}, [phase])
  
    return <div className="interface-container">
        <audio
        ref={audioRef}
        src="audios/retro-game-arcade-super-compressed.mp3"
        loop
        preload="auto"
      />
        <div ref={timerRef} className="timer">0.00</div>
        {phase=='ended' && < div className={`restart`} onClick={restart} >Restart</div>}
        {phase=='ready' && <div className="start" onClick={startGame} >Start</div>}
        <div className="controls">
            <div className="raw">
                <div className={`key up ${forward?'active':''}`}>W</div>
            </div>
            <div className="raw">
                <div className={`key left ${left?'active':''}`}>A</div>
                <div className={`key back ${backward?'active':''}`}>S</div>
                <div className={`key right ${right?'active':''}`}>D</div>
               
            </div>
            <div className="raw">
                <div className={`key space ${jump?'active':''}`}></div>
            </div>
        </div>
        
    </div>;
}