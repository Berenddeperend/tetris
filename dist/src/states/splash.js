import {select} from "../../_snowpack/pkg/d3-selection.js";
export default class Splash {
  constructor(game) {
    this.game = game;
    const splash = select("body").append("div").attr("class", "splash");
    splash.append("div").attr("class", "title").text("Tetris");
    splash.append("div").attr("class", "subtitle").text("By Berend");
    splash.append("div").attr("class", "begin").selectAll("span").data(() => game.isDesktop ? "press space to start".split("") : "touch here to start".split("")).enter().append("span").attr("class", "letter").attr("style", (d, i) => `animation-delay: -${i * 2}s`).text((d) => d);
    splash.append("a").attr("class", "social").attr("href", "https://github.com/Berenddeperend/tetris").attr("target", "_blank").text("Github");
  }
  get controls() {
    return {
      continue: () => {
        select(".splash").remove();
        this.game.setGameState("playing");
      }
    };
  }
}
