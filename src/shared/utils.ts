const sortByVersionNumber = <T>(array: Array<T>, selector: (w: T) => string): T[] =>
  array.slice().sort((v, w) => selector(w).localeCompare(selector(v), [], { numeric: true }));

export { sortByVersionNumber };
