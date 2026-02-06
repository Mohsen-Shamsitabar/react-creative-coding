import classes from "@/styles/MathematicHeart.module.css";
import type { Position } from "@/types.ts";
import degreeToRadian from "@/utils/degree-to-radian.ts";
import * as React from "react";

const MathematicHeart = () => {
  const canvasRef = React.useRef<null | HTMLCanvasElement>(null);
  const restertFnRef = React.useRef<() => void>(() => void 0);
  const { current: settings } = React.useRef({
    heartScale: 5,
    interval: 5,
    circleRadius: 3,
    circleColor: "red",

    xTModifier: 1,
    xPower: 3,

    yTModifier1: 1,
    yTModifier2: 2,
    yTModifier3: 3,
    yTModifier4: 4,
  });

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
      const { circleColor } = settings;

      ctx.fillStyle = circleColor;
    };

    const origin: Position = [canvasWidth / 2, canvasHeight / 2];

    let timeoutId: NodeJS.Timeout | null = null;
    let isMounted = true;

    //========== HELPERS ==========//

    const drawDot = ([x, y]: Position) => {
      const { circleRadius } = settings;

      ctx.beginPath();
      ctx.arc(x, y, circleRadius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
    };

    /**
     * `t` is in range `[0,2pi]`.
     */
    const getHeartPoint = (t: number): Position => {
      const {
        heartScale,
        xPower,
        xTModifier,
        yTModifier1,
        yTModifier2,
        yTModifier3,
        yTModifier4,
      } = settings;

      const x = 16 * Math.pow(Math.sin(t * xTModifier), xPower);

      const y =
        13 * Math.cos(t * yTModifier1) -
        5 * Math.cos(t * yTModifier2) -
        2 * Math.cos(t * yTModifier3) -
        Math.cos(t * yTModifier4);

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

      const { interval } = settings;

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

  const handleRestartClick = () => {
    restertFnRef.current();
  };

  return (
    <div className={classes["root"]}>
      <div className={classes["canvas-container"]}>
        <canvas ref={canvasRef}></canvas>
      </div>

      <div className={classes["control-container"]}>
        <div className={classes["controls"]}>
          <button
            className={classes["restart-btn"]}
            onClick={handleRestartClick}
          >
            Restart
          </button>

          <div className={classes["field"]}>
            <label
              id="Scale-label"
              htmlFor="Scale-input"
            >
              Scale:
            </label>

            <input
              id="Scale-input"
              name="Scale-input"
              aria-labelledby="Scale-label"
              aria-label="Scale:"
              type="number"
              defaultValue={settings.heartScale}
              onChange={e => {
                const newVal = e.target.value;
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MathematicHeart;
