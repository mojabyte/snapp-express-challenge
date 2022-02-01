import React from 'react';
import { motion } from 'framer-motion';
import { PulseLoader } from 'react-spinners';

type LoadingProps = {
  isLoading: boolean;
};

const Loading: React.FC<LoadingProps> = ({ isLoading }) => {
  if (isLoading) {
    return (
      <motion.div
        className="absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center backdrop-blur-sm bg-white bg-opacity-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <PulseLoader color="var(--color-accent)" size={26} />
      </motion.div>
    );
  }

  return null;
};

export default Loading;
