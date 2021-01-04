const possibleForms: number[][][] = [
  [
    [0, 1, 0],
    [1, 1, 1]
  ],
  [
    [0, 1, 1],
    [1, 1, 0]
  ]
]

export default class Block {
  value: number[][];
  i:number

  constructor() {
    this.i = Math.floor(Math.random() * possibleForms.length)
    this.value = possibleForms[Math.floor(Math.random() * possibleForms.length)];
  }
}