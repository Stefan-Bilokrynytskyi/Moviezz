import { Filter } from "./Models/Filter";

const getFiltersFromString = (
  filtersUrl: string,
  filters: Filter[]
): Filter[] => {
  const filtersArray = filtersUrl.split("&").filter(Boolean);

  return filters.map((filter) => {
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
};

export { getFiltersFromString };

const getStringFromFilters = (filters: Filter[]): string => {
  return filters.reduce((acc, filter) => {
    if (filter.parameters.length > 0) {
      acc += filter.urlParameter + "=" + filter.parameters.join("|") + "&";

      return acc;
    }
    return acc;
  }, "");
};

export { getStringFromFilters };

const parseNumberIntoStringShortcut = (number: number): string => {
  if (number > 1000000000) {
    return (number / 1000000000).toFixed(1) + "b";
  } else if (number > 1000000) {
    return (number / 1000000).toFixed(1) + "m";
  } else if (number > 1000) {
    return (number / 1000).toFixed(1) + "k";
  } else {
    return number.toFixed(1);
  }
};

export { parseNumberIntoStringShortcut };
