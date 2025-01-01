import { motion, useMotionValue } from 'framer-motion';
import { useState, useEffect } from 'react';

const Achievements = ({ title, amount, children }) => {
  const number = useMotionValue(0);
  const [displayNumber, setDisplayNumber] = useState(0); // To store and render the animated number
  const [isCounting, setIsCounting] = useState(false);
  const [countComplete, setCountComplete] = useState(false); // To check if the counting is complete

  const count = (amount) => {
    let i = 0;
    const updateCount = () => {
      let timeOut;
      if (i <= amount) {
        number.set(i++); // Update motion value
        setDisplayNumber(i - 1); // Update the displayed number
        timeOut = setTimeout(updateCount, 10);
      } else {
        setCountComplete(true); // Set count complete when done
        clearTimeout(timeOut);
      }
    };
    updateCount();
  };

  useEffect(() => {
    if (isCounting) {
      count(amount);
    }
  }, [isCounting, amount]);

  return (
    <div className="flex items-end gap-x-3">
      <span className="text-4xl lg:text-2xl text-gray-300">{children}</span>
      <h1 className="flex flex-col gap-y-2">
        <motion.span
          className="text-2xl lg:text-xl font-light text-yellow-500"
          onViewportEnter={() => setIsCounting(true)}
          viewport={{ once: true }}
        >
          {displayNumber}
          {countComplete && '+'} {/* Append the `+` sign after count is complete */}
        </motion.span>
        <span className="text-sm tracking-wide text-gray-500 dark:text-white transition-colors">
          {title}
        </span>
      </h1>
    </div>
  );
};

export default Achievements;
