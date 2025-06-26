// import {SelectiveBloom,DepthOfField, EffectComposer } from "@react-three/postprocessing";
// import { useThree } from '@react-three/fiber'
// import { KernelSize } from 'postprocessing'
// import { useEffect } from "react";

// export default function Effects(){
//      const { scene, camera } = useThree()
//          useEffect(() => {
//           camera.layers.enable(1)
//          }, [camera])

//     return <EffectComposer>
//     <SelectiveBloom
//         intensity={1}
//         luminanceThreshold={0}
//         luminanceSmoothing={0.9}
//         mipmapBlur
//         kernelSize={KernelSize.LARGE}
//         lights={scene.children} // optional
//       />
//     </EffectComposer>
// }