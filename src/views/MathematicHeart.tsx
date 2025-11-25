import * as React from "react";
import type { Position } from "../types.ts";
import degreeToRadian from "../utils/degree-to-radian.ts";

const MathematicHeart = () => {
  const canvasRef = React.useRef<null | HTMLCanvasElement>(null);
  const restertFnRef = React.useRef<() => void>(() => void 0);

  // init canvas
  React.useEffect(() => {
    const { current: canvas } = canvasRef;

    if (!canvas) return;

    const parentElement = canvas.parentElement;

    if (!parentElement) return;

    const { width: parentWidth, height: parentHeight } =
      parentElement.getBoundingClientRect();

    canvas.width = parentWidth;
    canvas.height = parentHeight;
  }, []);

  // main logic
  React.useEffect(() => {
    const { current: canvas } = canvasRef;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    //========== SETUP ==========//

    const { width: canvasWidth, height: canvasHeight } =
      canvas.getBoundingClientRect();

    const setupContext = () => {
      ctx.lineWidth = 2;
      ctx.strokeStyle = "black";
      ctx.fillStyle = "red";
    };

    const heartScale = 5;
    const origin: Position = [canvasWidth / 2, canvasHeight / 2];
    const interval = 5;
    const circleRadius = 3;

    let timeoutId: NodeJS.Timeout | null = null;
    let isMounted = true;

    //========== HELPERS ==========//

    const drawDot = ([x, y]: Position) => {
      ctx.beginPath();
      ctx.arc(x, y, circleRadius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
    };

    /**
     * `t` is in range `[0,2pi]`.
     */
    const getHeartPoint = (t: number): Position => {
      const x = 16 * Math.pow(Math.sin(t), 3);

      const y =
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t);

      return [x * heartScale + origin[0], -y * heartScale + origin[1]];
    };

    const resetTimeout = () => {
      if (timeoutId) clearTimeout(timeoutId);
    };

    //========== ... ==========//

    let degree = 0;

    const render = () => {
      if (!isMounted) return;
      if (degree > 360) return;

      drawDot(getHeartPoint(degreeToRadian(degree)));

      degree++;

      timeoutId = setTimeout(render, interval);
    };

    const restart = () => {
      ctx.reset();
      resetTimeout();
      setupContext();

      degree = 0;
      render();
    };

    setupContext();
    render();

    restertFnRef.current = restart;

    return () => {
      isMounted = false;
      resetTimeout();
    };
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default MathematicHeart;
