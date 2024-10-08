import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ProductMesh from './ProductMesh';

const ProductImage3D = ({ imageUrl }) => {
  return (
    <Canvas>
      <ambientLight intensity={2} />
      <directionalLight position={[5, 5, 5]} />
      <ProductMesh imageUrl={imageUrl} />
      <OrbitControls />
    </Canvas>
  );
};

export default ProductImage3D;
