export type Team = {
  name: string;
  short: string;
  years: string;
  role: string;
  accent: string;
};

export const teams: Team[] = [
  { name: "India", short: "IND", years: "2021–present", role: "Wicketkeeper-Batsman", accent: "#0055b8" },
  { name: "Mumbai Indians", short: "MI", years: "2018–present", role: "Wicketkeeper-Batsman", accent: "#004ba0" },
  { name: "Jharkhand", short: "JHA", years: "2016–present", role: "Wicketkeeper-Batsman", accent: "#ffb400" },
  { name: "India A", short: "IND-A", years: "2019–present", role: "Wicketkeeper-Batsman", accent: "#ff6b00" },
  { name: "India U-19", short: "U19", years: "2014–2016", role: "Captain", accent: "#5b8cff" },
];
