import { configureStore } from "@reduxjs/toolkit";

import filtersReducer from "./currentFilters";

const store = configureStore({
  reducer: { filters: filtersReducer },
});

export default store;
