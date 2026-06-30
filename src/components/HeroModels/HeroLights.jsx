import * as THREE from "three";


const HeroLights = () => {
    return (
        <>
            <spotLight
                position={[2,5,6]}
                angle={0.15}
                penumbra={0.2}
                color={"white"}
                intensity={100}
            />

            <spotLight
                position={[4,5,4]}
                angle={0.3}
                penumbra={2.5}
                color={"#4cc9f0"}
                intensity={40}
            />

            <spotLight
                position={[-3,5,5]}
                angle={0.4}
                penumbra={1}
                color={"#9d4edd"}
                intensity={40}
            />

            <primitive
                object={new THREE.RectAreaLight('#ccc7d3', 8, 3, 2)}
                position={[1,3,4]}
                intensity={15}
                rotation={[-Math.PI/4, Math.PI/4, 0]}
            />

            <pointLight
                position={[1,2,-2]}
                intensity={10}
                color={"#bd7ee7"}
            />
        </>
    )
}
export default HeroLights
