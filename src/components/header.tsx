import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react";
import SubMenu from "./sub-menu";
import { motion, easeOut } from "framer-motion";

const navVariants = {
  hidden: { opacity: 0, y: -20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
};

function Header() {
  const { setTheme, actualTheme } = useTheme();

  return (
    <header className="mt-8">
      <motion.nav
        initial="hidden"
        animate="show"
        variants={navVariants}
        className="container bg-card/50 backdrop-blur-sm flex items-center justify-between py-3 !px-4 rounded-2xl shadow"
      >
        <h1>
          <img
            src={
              actualTheme === "dark"
                ? "/images/logo-white.svg"
                : "/images/logo.svg"
            }
            className="h-8 md:h-10"
            alt="extensions manager"
          />
          <span className="sr-only">Extensions manager</span>
        </h1>

        <button
          type="button"
          aria-label={`${actualTheme}-theme`}
          onClick={() => setTheme(actualTheme === "dark" ? "light" : "dark")}
          className="aspect-square rounded-xl bg-border/50 hover:bg-border/75 duration-300 cursor-pointer p-4"
        >
          {actualTheme === "dark" ? (
            <Sun className="w-5 h-5 text-title" />
          ) : (
            <Moon className="w-5 h-5 text-title" />
          )}
        </button>
      </motion.nav>

      <SubMenu />
    </header>
  );
}

export default Header;
