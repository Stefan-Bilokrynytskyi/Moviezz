import { createSlice } from "@reduxjs/toolkit";
import { Filter } from "../Models/Filter";
import { getFiltersFromString, getStringFromFilters } from "../utils";

export interface RootState {
  filters: Filter[];
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
    {
      name: "Country",
      parameters: [],
      urlParameter: "with_origin_country",
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
      state.filters = getFiltersFromString(previousFilters, state.filters);
    },
    setFilters(state, action) {
      console.log("sdhbhs" + action.payload.queryParameters);
      const filters = getFiltersFromString(
        action.payload.queryParameters,
        state.filters
      );
      state.previousFilters = getStringFromFilters(filters);
      state.filters = filters;
    },
  },
});

export const filtersActions = filtersSlice.actions;

export default filtersSlice.reducer;
