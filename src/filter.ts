import { RSSEntry } from "./models";
import { comparePriorDate } from "./utils";

interface FilterOptions {
  maxDays?: number;
  currency?: string;
  maxCost?: number;
}

export function filterRSSEntries(
  entries: RSSEntry[],
  options: FilterOptions
): RSSEntry[] {
  //TODO: NaN check?
  return entries?.filter(
    (e) =>
      (options.maxDays === undefined ||
        comparePriorDate(e.updated[0], options.maxDays)) &&
      (options.currency === undefined ||
        e.summary[0]._.startsWith(options.currency)) &&
      (options.maxCost === undefined ||
        parseFloat(e.summary[0]._.split(" ")[1]) < options.maxCost)
  );
}
