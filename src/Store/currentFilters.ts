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
    cancelFilters(state) {
      state.filters = state.filters.map((filter) => {
        filter.parameters = [];
        return filter;
      });
      state.previousFilters = "";
    },
    resetFilters(state) {
      const previousFilters = state.previousFilters;

      const filtersArray = previousFilters.split("&").filter(Boolean);

      state.filters = state.filters.map((filter) => {
        const matchingFilter = filtersArray.find((param) =>
          param.startsWith(filter.urlParameter + "=")
        );

        if (matchingFilter) {
          const parametersString = matchingFilter.split("=")[1];
          filter.parameters = parametersString.split("|");
        } else {
          filter.parameters = [];
        }
        return filter;
      });
    },
  },
});

export const filtersActions = filtersSlice.actions;

export default filtersSlice.reducer;
