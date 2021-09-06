import { filterRSSEntries } from "../filter";
import { RSSEntry } from "../models";

describe("filterRSSEntries", () => {
  test("should filter old entries", () => {
    const result = filterRSSEntries(
      [
        {
          id: ["expected"],
          updated: ["2021-09-06T02:31:03-07:53"],
        } as RSSEntry,
        {
          id: ["unexpected"],
          updated: ["1821-09-06T05:00:00-00:00"],
        } as RSSEntry,
      ],
      {
        maxDays: 36500,
      }
    );
    expect(result).toEqual([expect.objectContaining({ id: ["expected"] })]);
    expect(result).not.toEqual([
      expect.objectContaining({ id: ["unexpected"] }),
    ]);
  });
  test("should filter wrong currency", () => {
    const result = filterRSSEntries(
      [
        {
          id: ["unexpected"],
          summary: [{ _: "EUR", $: { type: "" } }],
        } as RSSEntry,
        {
          id: ["expected"],
          summary: [{ _: "USD", $: { type: "" } }],
        } as RSSEntry,
      ],
      {
        currency: "USD",
      }
    );
    expect(result).toEqual([expect.objectContaining({ id: ["expected"] })]);
    expect(result).not.toEqual([
      expect.objectContaining({ id: ["unexpected"] }),
    ]);
  });
  test("should filter over maxCost", () => {
    const result = filterRSSEntries(
      [
        {
          id: ["unexpected"],
          summary: [{ _: "ASDF 99.34 - foo/bar condition", $: { type: "" } }],
        } as RSSEntry,
        {
          id: ["expected"],
          summary: [
            { _: "ASDF 44.44 - Great deal - pls buy c:", $: { type: "" } },
          ],
        } as RSSEntry,
      ],
      {
        maxCost: 65.2,
      }
    );
    expect(result).toEqual([expect.objectContaining({ id: ["expected"] })]);
    expect(result).not.toEqual([
      expect.objectContaining({ id: ["unexpected"] }),
    ]);
  });
});
