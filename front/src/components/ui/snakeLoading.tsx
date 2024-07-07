import React from 'react';
import { motion } from 'framer-motion';

const SnakeLoading = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <motion.div
        style={{
          width: 20,
          height: 20,
          borderRadius: '50%',
          backgroundColor: 'blue',
          margin: 10,
        }}
        animate={{ y: [0, 20, 0, -20, 0], rotate: [0, 45, 90, 135, 180] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        style={{
          width: 20,
          height: 20,
          borderRadius: '50%',
          backgroundColor: 'red',
          margin: 10,
        }}
        animate={{ y: [0, -20, 0, 20, 0], rotate: [0, -45, -90, -135, -180] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        style={{
          width: 20,
          height: 20,
          borderRadius: '50%',
          backgroundColor: 'green',
          margin: 10,
        }}
        animate={{ y: [0, 20, 0, -20, 0], rotate: [0, 45, 90, 135, 180] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  );
};

export default SnakeLoading;
