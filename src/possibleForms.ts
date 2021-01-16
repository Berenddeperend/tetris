import { Shape } from "./block";
export const possibleForms: { shape: Shape; color: string }[] = [
  {
    color: "purple",
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
  },
  {
    color: "green",
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
  },
  {
    color: "red",
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
  },
  {
    color: "yellow",
    shape: [
      [1, 1],
      [1, 1],
    ],
  },

  {
    color: "dark-blue",
    shape: [
      [1, 0, 0],
      [1, 1, 1],
    ],
  },
  {
    color: "orange",
    shape: [
      [0, 0, 1],
      [1, 1, 1],
    ],
  },
  { color: "light-blue", shape: [[1, 1, 1, 1]] },
  // {
  //   color: "red",
  //   shape: [
  //     [0, 0, 1, 0, 0],
  //     [0, 1, 0, 1, 0],
  //     [0, 1, 1, 1, 0],
  //     [0, 1, 0, 1, 0],
  //     [1, 1, 0, 1, 1],
  //     [1, 0, 0, 0, 1],
  //     [0, 1, 1, 1, 0],
  //   ],
  // },
];
