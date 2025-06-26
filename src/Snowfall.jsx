import { useFrame } from '@react-three/fiber'

import React, { useMemo, useRef } from 'react'

export default function Snowfall({ count = 10000,blockCount=100 }) {
  const points = useRef()
  const snowflakes = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 10 // x
      positions[i * 3 + 1] = Math.random() * 20         // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * -800 // z
    }
    return positions
  }, [count])

  useFrame(() => {
    const pos = points.current.geometry.attributes.position
    for (let i = 0; i < count; i++) {
      pos.array[i * 3 + 1] -= 0.013
      if (pos.array[i * 3 + 1] < 0) pos.array[i * 3 + 1] = 20
    }
    pos.needsUpdate = true
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={snowflakes.length / 3}
          array={snowflakes}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#96bdd4" size={0.1} sizeAttenuation />
    </points>
  )
}
//#94e7f7