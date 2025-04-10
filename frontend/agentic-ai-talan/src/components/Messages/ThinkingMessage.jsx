import { motion } from 'framer-motion';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';

const ThinkingMessage = () => {
  return (
    <motion.div
      data-testid="message-assistant-loading"
      className="w-full mx-auto max-w-3xl px-4 group/message"
      initial={{ y: 5, opacity: 0 }} 
      animate={{ y: 0, opacity: 1, transition: { delay: 1 } }} 
      exit={{ opacity: 0 }} 
      data-role="assistant"
    >
      <div className="d-flex gap-3 align-items-center">
        <motion.div
          className="size-8 d-flex align-items-center justify-content-center  shrink-0"
          animate={{
            scale: [1, 1.1, 1], 
            opacity: [1, 0.5, 1], 
            transition: {
              repeat: Infinity, 
              duration: 1, 
              ease: "easeInOut",
            },
          }}
        >
          <AutoAwesomeRoundedIcon className="icon-thinking"  fontSize="small" />
        </motion.div>

        <div className="flex-column text-muted-foreground">
          <span style={{color:"#888"}}>Thinking...</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ThinkingMessage;
