export interface PageData {
  page: number;
  pages: number;
  per_page: number;
  items: number;
  urls: any;
}

interface Artist {
  name: string;
  anv: string;
  join: string;
  role: string;
  tracks: string;
  id: number;
  resource_url: string;
}

interface BasicInfo {
  id: number;
  master_id: number;
  master_url: string;
  resource_url: string;
  title: string;
  year: number;
  formats: any[];
  labels: any[];
  artists: Artist[];
  thumb: string;
  cover_image: string;
  genres: string[];
  styles: string[];
}

interface WantItem {
  id: number;
  resource_url: string;
  rating: number;
  date_added: string;
  basic_information: BasicInfo;
}

export interface Wantlist {
  pagination: PageData;
  wants: WantItem[];
}

export interface RSSEntry {
  id: string[];
  title: string[];
  updated: string[];
  link: [
    {
      $: {
        href: string;
        rel: string;
      };
    }
  ];
  summary: [
    {
      _: string;
      $: {
        type: string;
      };
    }
  ];
}

export interface RSSData {
  feed: {
    $: any;
    id: string[];
    title: string[];
    updated: string[];
    link: any[];
    generator: string[];
    entry: RSSEntry[];
  };
}
