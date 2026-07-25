import { motion } from "framer-motion";
import { Logo } from "@/components/ui/logo";

export function PageLoader() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-6 bg-background">
      <motion.div
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Logo />
      </motion.div>
      <div className="h-1 w-40 overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full w-1/3 rounded-full bg-gradient-to-r from-primary-400 to-primary-600"
          animate={{ x: ["-100%", "220%"] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
