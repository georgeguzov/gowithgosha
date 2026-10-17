// Прошедшие туры. Чтобы добавить фильм или отзывы — заполни `film` / `reviews`,
// и они сами появятся на карточке на главной и в блоке «Как это было» на странице тура.

export type TripFilm = {
  src: string; // "/china-film.mp4" — горизонтальное видео в /public
  poster: string;
  duration?: string; // "3:42"
};

export type TripReview = {
  author: string;
  text?: string;
  role?: string;
  video?: string; // вертикальный видео-отзыв (9:16) в /public
  poster?: string;
};

export type PastTrip = {
  slug: string;
  country: string;
  title: string;
  subtitle: string;
  dates: string;
  finished: string; // короткая дата для штампа
  image: string;
  frames: string[]; // кадры для «плёнки»
  stats: { value: string; label: string }[];
  film?: TripFilm;
  reviews: TripReview[];
};

export const pastTrips: PastTrip[] = [
  {
    slug: "china",
    country: "Китай",
    title: "Панды и Киберпанк",
    subtitle: "Чэнду + Чунцин",
    dates: "16–24 октября 2026",
    finished: "10.2026",
    image: "/ченду-панда-1.jpg",
    frames: ["/день-2.jpg", "/день-5.jpg", "/день-6.jpg", "/день-7.jpg"],
    stats: [
      { value: "9", label: "дней" },
      { value: "2", label: "города" },
      { value: "∞", label: "воспоминаний" },
    ],
    film: undefined,
    reviews: [],
  },
];

export function getPastTrip(slug: string) {
  return pastTrips.find((t) => t.slug === slug);
}
