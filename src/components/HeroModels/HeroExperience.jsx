import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { Room } from "./Room.jsx";
import HeroLights from "./HeroLights.jsx";
import Particles from "./Particles.jsx";
import { Suspense } from "react";

const HeroExperience = () => {

    const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    return (
        <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
            <HeroLights/>
            <Particles count={100} />


            <OrbitControls
                enableDamping={true}
                dampingFactor={0.05}
                enableZoom={!isTablet}
                enablePan={false}
                maxDistance={20}
                minDistance={5}
                minPolarAngle={Math.PI / 5}
                maxPolarAngle={Math.PI / 2}
            />

            <group
                scale={isMobile? 0.7 : 1}
                position={[0,-3.5, 0]}
                rotation={[0, -Math.PI / 4, 0]}
            >

                <Suspense fallback={null}>
                    <Room />
                </Suspense>
            </group>
        </Canvas>
    )
}
export default HeroExperience

