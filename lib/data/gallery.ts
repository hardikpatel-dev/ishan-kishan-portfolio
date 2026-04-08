export type GalleryImage = {
  src: string;
  alt: string;
  credit: string;
  aspect: "portrait" | "landscape" | "square";
  caption: string;
  year: string;
};

export const gallery: GalleryImage[] = [
  {
    src: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1400&q=85",
    alt: "Stadium under floodlights",
    credit: "Unsplash",
    aspect: "landscape",
    caption: "Wankhede, Mumbai",
    year: "2024",
  },
  {
    src: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1400&q=85",
    alt: "Batsman playing a shot",
    credit: "Unsplash",
    aspect: "portrait",
    caption: "Pull shot · vs BAN",
    year: "2022",
  },
  {
    src: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=1400&q=85",
    alt: "Crowd celebration",
    credit: "Unsplash",
    aspect: "landscape",
    caption: "IPL Final, Dubai",
    year: "2020",
  },
  {
    src: "https://images.unsplash.com/photo-1624880357913-a8539238245b?w=1400&q=85",
    alt: "Cricket ball on grass",
    credit: "Unsplash",
    aspect: "square",
    caption: "Test debut, Dominica",
    year: "2023",
  },
  {
    src: "https://images.unsplash.com/photo-1607734834519-d8576ae60ea6?w=1400&q=85",
    alt: "Wicketkeeper gloves",
    credit: "Unsplash",
    aspect: "portrait",
    caption: "Behind the stumps",
    year: "2024",
  },
  {
    src: "https://images.unsplash.com/photo-1566577134770-3d85bb3a9cc4?w=1400&q=85",
    alt: "Players in huddle",
    credit: "Unsplash",
    aspect: "landscape",
    caption: "Squad huddle, Mohali",
    year: "2023",
  },
  {
    src: "https://images.unsplash.com/photo-1599982170029-5bb5adf34e39?w=1400&q=85",
    alt: "Bat and ball",
    credit: "Unsplash",
    aspect: "square",
    caption: "Net session",
    year: "2024",
  },
  {
    src: "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=1400&q=85",
    alt: "Stadium lights at night",
    credit: "Unsplash",
    aspect: "landscape",
    caption: "Chattogram nights",
    year: "2022",
  },
  {
    src: "https://images.unsplash.com/photo-1569155999796-2d25f43d1f2c?w=1400&q=85",
    alt: "Player silhouette",
    credit: "Unsplash",
    aspect: "portrait",
    caption: "Walking out",
    year: "2021",
  },
  {
    src: "https://images.unsplash.com/photo-1593766787879-49dcb9be26bc?w=1400&q=85",
    alt: "Cricket pitch",
    credit: "Unsplash",
    aspect: "landscape",
    caption: "Ranji prep, Ranchi",
    year: "2024",
  },
];
