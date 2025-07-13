import useExtensionsStore, {
  FILTER_TYPES,
  type FilterType,
} from "@/store/extension-store";
import FilterTypes from "./filter-type";
import { useState } from "react";
import { easeOut, motion } from "framer-motion";

const submenuVariants = {
  hidden: { opacity: 0, y: -20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeOut,
    },
  },
};

function SubMenu() {
  const [active, setActive] = useState<FilterType>("all");
  const { setFilter } = useExtensionsStore();

  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter);
    setActive(newFilter);
  };

  return (
    <motion.div
      variants={submenuVariants}
      initial="hidden"
      animate="show"
      className="container mt-10 mb-8 lg:mt-20 lg:mb-14 flex flex-col gap-4 items-center md:flex-row md:justify-between"
    >
      <motion.h2
        layout
        className="text-3xl lg:text-4xl font-semibold"
        transition={{ duration: 0.4 }}
      >
        Extension List
      </motion.h2>

      <motion.div
        layout
        className="flex items-center gap-3"
        transition={{ duration: 0.4 }}
      >
        <FilterTypes
          name="All"
          onClick={() => handleFilterChange(FILTER_TYPES.ALL)}
          isActive={FILTER_TYPES.ALL === active}
        />
        <FilterTypes
          name="Active"
          onClick={() => handleFilterChange(FILTER_TYPES.ACTIVE)}
          isActive={FILTER_TYPES.ACTIVE === active}
        />
        <FilterTypes
          name="Inactive"
          onClick={() => handleFilterChange(FILTER_TYPES.INACTIVE)}
          isActive={FILTER_TYPES.INACTIVE === active}
        />
      </motion.div>
    </motion.div>
  );
}

export default SubMenu;
