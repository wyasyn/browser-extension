import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

function FilterTypes({
  name,
  onClick,
  isActive,
}: {
  name: string;
  onClick: () => void;
  isActive: boolean;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      type="button"
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-full border cursor-pointer ",
        isActive
          ? "bg-red-400  border-red-400 hover:bg-red-500 duration-300 text-linear1"
          : "bg-card border-foreground/30 hover:bg-border duration-300"
      )}
    >
      {name}
    </motion.button>
  );
}

export default FilterTypes;
