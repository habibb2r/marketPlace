import React from 'react';
import { useTexture } from '@react-three/drei';

const ProductMesh = ({ imageUrl }) => {
  const texture = useTexture(imageUrl);

  return (
    <mesh rotation={[0, 0, 0]}>
      <boxGeometry args={[3.4, 4, 5]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

export default ProductMesh;
