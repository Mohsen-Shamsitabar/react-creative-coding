import * as React from "react";
import type { Position } from "../types.ts";
import degreeToRadian from "../utils/degree-to-radian.ts";

type BranchProps = {
  startPos: Position;
  length: number;
  degree: number;
  branchCount: number;
};

const FractalTree = () => {
  const canvasRef = React.useRef<null | HTMLCanvasElement>(null);

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

    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";

    //========== HELPERS ==========//

    const drawLine = ([fromX, fromY]: Position, [toX, toY]: Position) => {
      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      ctx.lineTo(toX, toY);
      ctx.stroke();
      ctx.closePath();
    };

    //========== ... ==========//

    const initialLength = 100;

    const degreeFraction = 22.5;
    const lengthFraction = 12;
    const maxBranchCount = 6;

    const stack: BranchProps[] = [
      {
        branchCount: 0,
        degree: 270,
        length: initialLength,
        startPos: [canvasWidth / 2, canvasHeight - 3 * initialLength],
      },
    ];

    const handleBranch = (branch: BranchProps) => {
      const { branchCount, degree, length, startPos } = branch;

      if (branchCount >= maxBranchCount) return;
      if (length <= 0) return;

      const newX = Math.cos(degreeToRadian(degree)) * length + startPos[0];
      const newY = Math.sin(degreeToRadian(degree)) * length + startPos[1];

      const newStartPos: Position = [newX, newY];

      drawLine(startPos, newStartPos);

      stack.push({
        branchCount: branchCount + 1,
        degree: degree + degreeFraction,
        length: length - lengthFraction,
        startPos: newStartPos,
      });

      stack.push({
        branchCount: branchCount + 1,
        degree: degree - degreeFraction,
        length: length - lengthFraction,
        startPos: newStartPos,
      });
    };

    while (stack.length > 0) {
      const branch = stack.pop()!;

      handleBranch(branch);
    }
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default FractalTree;
