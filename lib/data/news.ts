export type NewsItem = {
  date: string;
  source: string;
  headline: string;
  thumbnail: string;
  url: string;
};

export const news: NewsItem[] = [
  {
    date: "2024-11-18",
    source: "ESPNcricinfo",
    headline: "Ishan Kishan makes emphatic Ranji return with a double century",
    thumbnail: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600",
    url: "https://www.espncricinfo.com/",
  },
  {
    date: "2024-03-22",
    source: "Cricbuzz",
    headline: "MI back Kishan for the IPL season opener",
    thumbnail: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=600",
    url: "https://www.cricbuzz.com/",
  },
  {
    date: "2022-12-10",
    source: "BCCI",
    headline: "Kishan smashes fastest double ton by an Indian in ODIs",
    thumbnail: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600",
    url: "https://www.bcci.tv/",
  },
  {
    date: "2023-07-20",
    source: "ICC",
    headline: "Kishan earns maiden Test cap in West Indies",
    thumbnail: "https://images.unsplash.com/photo-1624880357913-a8539238245b?w=600",
    url: "https://www.icc-cricket.com/",
  },
];
