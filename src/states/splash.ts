import { select } from "d3-selection";
import Tetris from "../tetris";
import {render} from './../dom';

export default class Splash {
  game: Tetris;

  constructor(game: Tetris) {
    this.game = game;
    const splash = select("body").append("div").attr("class", "splash");

    splash.append("div").attr("class", "title").text("Tetris");
    splash.append("div").attr("class", "subtitle").text("By Berend");

    // document.querySelector('body').appendChild(render(`
    //   <table>
    //   <tr>
    //   <td>hello</td>
    //   <td>hello</td>
    //   <td>hello</td>
    //   </tr>
    //   </table>
    // `))

    splash
      .append("div")
      .attr("class", "begin")
      .selectAll("span")
      .data(() =>
        game.isDesktop
          ? "press space to start".split("")
          : "touch here to start".split("")
      )
      .enter()
      .append("span")
      .attr("class", "letter")
      .attr("style", (d, i) => `animation-delay: -${i * 2}s`)
      .text((d) => d);

    splash
      .append("a")
      .attr("class", "social")
      .attr("href", "https://github.com/Berenddeperend/tetris")
      .attr("target", "_blank")
      .text("Github");

    // const onKeyDown = (e: any) => {
    //   if (e.code === "Space") {
    //     window.removeEventListener("keydown", onKeyDown);
    //     select(".splash").remove();
    //     this.game.setGameState("playing");
    //   }
    // };
    // window.addEventListener("keydown", onKeyDown);
  }
  

  get controls() {
    return {
      continue: () => {
        select(".splash").remove();
        this.game.setGameState("playing");
      }
    }
  }
}
