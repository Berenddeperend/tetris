import { times } from "./utils";

export default function StarryBackground() {
  return (
    <div class="starry-background-container">
      {times(100, () => (
        <div
          class="star"
          style={{
            left: randomXPos(),
            top: randomYPos(),
            animationDelay: randomAnimationDelay(),
            transform: randomScale(),
          }}
        ></div>
      ))}
    </div>
  );
}

const starSize = 2;

function randomXPos() {
  return Math.floor(Math.random() * window.innerWidth - starSize);
}

function randomYPos() {
  return Math.floor(Math.random() * window.innerHeight - starSize);
}

function randomScale() {
  return `scale(${Math.floor(Math.random() * 10) / 10})`;
}

function randomAnimationDelay() {
  return Math.floor(Math.random() * 10) / 10 + "s";
}
