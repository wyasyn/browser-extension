import { cn } from "@/lib/utils";
import useExtensionsStore, { type Extension } from "@/store/extension-store";
import { motion, AnimatePresence } from "framer-motion";
import { easeInOut, easeOut } from "framer-motion";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
  exit: {
    opacity: 0,
    scale: 0.85,
    y: 20,
    transition: { duration: 0.3, ease: easeInOut },
  },
};

const ExtensionsComponent: React.FC = () => {
  const { toggleExtension, removeExtension, getFilteredExtensions } =
    useExtensionsStore();

  const filteredExtensions: Extension[] = getFilteredExtensions();

  const handleToggle = (id: string) => {
    toggleExtension(id);
  };

  return (
    <motion.main
      variants={containerVariants}
      layout
      initial="hidden"
      animate="show"
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 container mb-20"
    >
      <AnimatePresence initial={false}>
        {filteredExtensions.map((ext: Extension) => (
          <motion.div
            key={ext.id}
            variants={cardVariants}
            exit="exit"
            layoutId={`card-${ext.id}`}
            layout
            whileHover={{
              scale: 1.02,
              boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
            }}
            className="bg-card/50 backdrop-blur-sm border border-foreground/15 shadow-lg rounded-2xl p-4"
          >
            <div className="flex gap-4 mb-6 items-start">
              <img
                src={ext.logo}
                alt={ext.name}
                className="w-12 h-12 object-contain"
              />

              <div>
                <h3 className="text-title text-xl font-semibold mb-2">
                  {ext.name}
                </h3>
                <p className="max-w-[30ch]">{ext.description}</p>
              </div>
            </div>
            <div className="flex items-center justify-between gap-5">
              <button
                type="button"
                onClick={() => removeExtension(ext.id)}
                className="border px-4 py-2 rounded-full font-medium cursor-pointer hover:bg-red-400 duration-300"
              >
                Remove
              </button>

              <motion.button
                aria-label={ext.name}
                aria-pressed={ext.isActive}
                type="button"
                onClick={() => handleToggle(ext.id)}
                className={cn(
                  "w-9 h-5.5 p-1 flex items-center rounded-full duration-300",
                  ext.isActive
                    ? "bg-red-400 justify-end"
                    : "bg-border justify-start"
                )}
                layout
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div
                  layout
                  className="w-4 h-4 rounded-full bg-white shadow"
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.main>
  );
};

export default ExtensionsComponent;
