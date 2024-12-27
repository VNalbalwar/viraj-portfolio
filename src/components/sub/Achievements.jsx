import {motion, useMotionValue} from 'framer-motion'
import { useState, useEffect } from 'react';

const Achievements = ({ title, amount, children }) => {
    const number = useMotionValue(0);
    const [isCounting, setIsCounting] = useState(false);

    const count = (amount) => {
        let i = 0;
        const updateCount = () =>{
            let timeOut;
            if(i <= amount){
                number.set(i++);
                timeOut = setTimeout(updateCount, 10);
            }else{
                clearTimeout(timeOut);
            }
        }
        updateCount();
    }

    useEffect(()=>{
      if(isCounting){
        count(amount);
      }
    }, [isCounting], amount);

  return (
    <div className="flex items-end gap-x-3">
      <span className="text-4xl lg:text-2xl text-gray-300 ">{children}</span>
      <h1 className="flex flex-col gap-y-2">
        <motion.span className="text-2xl lg:text-xl font-light text-yellow-500 " onViewportEnter={() => setIsCounting(true)} viewport={{once: true}}>
          {number}
        </motion.span>
        <span className="text-sm tracking-wide text-gray-500 dark:text-white transition-colors">
          {title}
        </span>
      </h1>
    </div>
  );
};
export default Achievements;
