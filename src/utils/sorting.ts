export type SortDirection = "asc" | "desc" | null;

export type SortConfig = {
  key: string;
  direction: SortDirection;
};

export function sortData<T>(data: T[], sortConfig: SortConfig | null): T[] {
  if (!sortConfig || !sortConfig.key || !sortConfig.direction) {
    return data;
  }

  return [...data].sort((a, b) => {
    const aValue = getNestedValue(a, sortConfig.key);
    const bValue = getNestedValue(b, sortConfig.key);

    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortConfig.direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return sortConfig.direction === "asc"
      ? Number(aValue) - Number(bValue)
      : Number(bValue) - Number(aValue);
  });
}

function getNestedValue<T>(obj: T, path: string): unknown {
  return path.split(".").reduce((acc, part) => (acc ? acc[part] : null), obj);
}