import { Shape } from "./block";
export const possibleForms: { shape: Shape; color: string, id: number }[] = [
  { id: 0, color: "light-blue", shape: [[1, 1, 1, 1]] },
  {
    id: 1,
    color: "purple",
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
  },
  {
    id: 2,
    color: "green",
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
  },
  {
    id: 3,
    color: "red",
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
  },
  {
    id: 4,
    color: "yellow",
    shape: [
      [1, 1],
      [1, 1],
    ],
  },

  {
    id: 5,
    color: "dark-blue",
    shape: [
      [1, 0, 0],
      [1, 1, 1],
    ],
  },
  {
    id: 6,
    color: "orange",
    shape: [
      [0, 0, 1],
      [1, 1, 1],
    ],
  },
  
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
