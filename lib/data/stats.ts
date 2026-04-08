export type FormatStats = {
  matches: number;
  runs: number;
  avg: number;
  sr: number;
  fifties: number;
  hundreds: number;
  hs: string;
  debut: string;
};

export const stats: Record<"test" | "odi" | "t20i" | "ipl", FormatStats> = {
  test: { matches: 2, runs: 74, avg: 18.5, sr: 61.16, fifties: 1, hundreds: 0, hs: "52", debut: "2023-07-20" },
  odi: { matches: 27, runs: 933, avg: 42.4, sr: 105.23, fifties: 5, hundreds: 1, hs: "210", debut: "2021-07-23" },
  t20i: { matches: 32, runs: 796, avg: 26.53, sr: 141.13, fifties: 6, hundreds: 0, hs: "89*", debut: "2021-03-14" },
  ipl: { matches: 106, runs: 2644, avg: 28.74, sr: 135.3, fifties: 18, hundreds: 1, hs: "99", debut: "2016-04-09" },
};

export const runsPerYear: { year: string; runs: number }[] = [
  { year: "2016", runs: 184 },
  { year: "2017", runs: 120 },
  { year: "2018", runs: 275 },
  { year: "2019", runs: 516 },
  { year: "2020", runs: 516 },
  { year: "2021", runs: 465 },
  { year: "2022", runs: 418 },
  { year: "2023", runs: 454 },
  { year: "2024", runs: 351 },
];
