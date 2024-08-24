import { createSlice } from "@reduxjs/toolkit";

export interface RootState {
  filters: { name: string; parameters: string[]; urlParameter: string }[];
  previousFilters: string;
}

const initialFiltersState: RootState = {
  filters: [
    {
      name: "Genres",
      parameters: [],
      urlParameter: "with_genres",
    },
    {
      name: "Year",
      parameters: [],
      urlParameter: "primary_release_year",
    },
  ],
  previousFilters: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState: initialFiltersState,
  reducers: {
    add(state, action) {
      console.log("here");
      state.filters = state.filters.map((filter) => {
        if (filter.name === action.payload.name) {
          filter.parameters.push(action.payload.linkName);
        }
        return filter;
      });
    },
    remove(state, action) {
      state.filters = state.filters.map((filter) => {
        if (filter.name === action.payload.name) {
          filter.parameters = filter.parameters.filter(
            (parameter) => parameter !== action.payload.linkName
          );
        }
        return filter;
      });
    },
    setPreviousFilters(state, action) {
      state.previousFilters = action.payload.filters;
    },
  },
});

export const filtersActions = filtersSlice.actions;

export default filtersSlice.reducer;
