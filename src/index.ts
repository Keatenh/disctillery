import dc from "disconnect";
import axios from "axios";
import { parseString as xmlParseString } from "xml2js";
import tableify from "tableify";
import { RSSData, RSSEntry, Wantlist, Output } from "./models";
import { checkEnv } from "./config";
import { comparePriorDate, getDateRangeString, sendEmail } from "./utils";
import { filterRSSEntries } from "./filter";

checkEnv();

axios.defaults.baseURL = "https://discogs.com";
const rssPath = "/sell/mplistrss";

const user = process.env.DST_DC_USR;
const currency = process.env.DST_CURRENCY?.toUpperCase() || "";
const expirePeriod = parseInt(process.env.DST_DAYS_BACK || "1", 10);

// Get wantlist for user via client
const Discogs = dc.Client;
const dis = new Discogs("DisctilleryClient/1.0");
const wantlist = dis.user().wantlist();
//TODO: Config mgmt?
//TODO: Pagination

const entries: RSSEntry[] = [];

async function main(): Promise<void> {
  wantlist.getReleases(user, {}, async (_err: unknown, data: Wantlist) => {
    // Use release IDs to check RSS feed:
    for (const release of data.wants) {
      try {
        const xml = await axios.get(rssPath, {
          params: { release_id: release.id },
        });
        // Convert XML
        xmlParseString(xml.data, (_err, rssData: RSSData) => {
          // Filter entries by date updated + currency
          //TODO: filter on budget param?
          const filtered = filterRSSEntries(rssData.feed.entry, {
            maxDays: expirePeriod,
            currency,
          });
          entries.push(...filtered);
        });
      } catch (e) {
        console.warn(
          `WARN: Could not verify recent releases for ${release.resource_url}`
        );
      }
    }
    console.log(`MATCHED ${entries.length} ENTRIES!`);
    const out = entries.map((e): Output => {
      return {
        title: e.title[0],
        updated: e.updated[0],
        link: e.link[0].$.href,
        summary: e.summary[0]._,
      };
    });
    const html = tableify(out).replace(
      "<table>",
      '<table cellspacing="40" cellpadding="10" style="width:100%">'
    );
    sendEmail(
      process.env.DST_EMAIL_SVC || "",
      process.env.DST_EMAIL_USR || "",
      process.env.DST_EMAIL_PW || "",
      process.env.DST_EMAIL_TO || "",
      `Discogs Marketplace Finds ${getDateRangeString(expirePeriod)}`,
      html
    );
  });
}

main();
