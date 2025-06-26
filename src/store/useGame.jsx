import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export default create(subscribeWithSelector((set)=>{
    return{
        blocksCount:100,
        blockSeed:0,

        phase: 'ready',

        startTime:0,
        endTime:0,

        start:()=>{
            set((state)=>{
                //console.log("playing")
               if(state.phase=='ready')
                    return {phase:'playing',startTime:Date.now()}
               return {}
            })
        },
        end:()=>{
            
            set((state)=>{
               // console.log("ended")
              if(state.phase=='playing')
                return {phase:'ended',endTime:Date.now()}
              return {}
            })
        },
        restart:()=>{
            set((state)=>{
               // console.log("restart")
                if(state.phase=='playing' || state.phase=='ended')
                     return {phase:'ready',blockSeed:Math.random()}
                return{}
            })
        },
       

    }
}))