import { times } from "./utils";
import { useState, useEffect } from 'preact/hooks';

const starCount = Math.round(window.innerWidth * window.innerHeight * 0.0001);

export default function StarryBackground() {
  const size = useWindowSize();

  return (
    <div class="starry-background-container">
      {times(starCount, () => (
        <div
          class="star"
          style={{
            left: randomXPos(size.width),
            top: randomYPos(size.height),
            animationDelay: randomAnimationDelay(),
            transform: randomScale(),
          }}
        ></div>
      ))}
    </div>
  );
}

const starSize = 2;

function useWindowSize() { //https://usehooks.com/useWindowSize/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    window.addEventListener("resize", handleResize);
    handleResize();
    
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}

function randomXPos(windowWidth) {
  return Math.floor(Math.random() * windowWidth - starSize);
}

function randomYPos(windowHeight) {
  return Math.floor(Math.random() * windowHeight - starSize);
}

function randomScale() {
  return `scale(${Math.floor(Math.random() * 10) / 10})`;
}

function randomAnimationDelay() {
  return Math.floor(Math.random() * 10) / 10 + "s";
}
