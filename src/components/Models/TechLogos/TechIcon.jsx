import {Environment, Float, OrbitControls, useGLTF} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";
import {useEffect, Suspense} from "react";
import * as THREE from 'three';

const Model = ({ model }) => {
    const scene = useGLTF(model.modelPath);

    useEffect(() => {
        if(model.name === 'Interactive Developer'){
            scene.scene.traverse((child) => {
                if(child.isMesh && child.name === 'Object_5'){
                    child.material = new THREE.MeshStandardMaterial({color:'white'})
                }
            })
        }
    }, [scene, model.name]);

    return (
        <Float speed={5.5} rotationIntensity={0.5} floatIntensity={0.9}>
            <group scale={model.scale} rotation={model.rotation}>
                <primitive object={scene.scene} />
            </group>
        </Float>
    );
};

const TechIcon = ({model}) => {
    return (
        <Canvas>
            <ambientLight intensity={0.3} />
            <directionalLight position={[5,5,5]} intensity={1} />
            <Environment preset={"city"} />
            <OrbitControls enableZoom={false}/>

            <Suspense fallback={null}>
                <Model model={model} />
            </Suspense>
        </Canvas>
    )
}
export default TechIcon
