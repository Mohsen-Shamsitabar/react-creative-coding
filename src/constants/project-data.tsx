import type { Project } from "../types.ts";
import FractalTree from "../views/FractalTree.tsx";
import InfinitSquareSpiral from "../views/InfiniteSquareSpiral.tsx";
import MathematicHeart from "../views/mathematic-heart/MathematicHeart.tsx";
import ROUTES from "./routes.ts";

const projects: Set<Project> = new Set([
  {
    title: "Fractal Tree",
    description: "A binary tree created with numeric fractions.",
    route: ROUTES.fractalTree,
    element: <FractalTree />,
  },
  {
    title: "Infinit Square Spiral",
    route: ROUTES.infinitSquareSpiral,
    element: <InfinitSquareSpiral />,
  },
  {
    title: "Mathematic Heart",
    description: "A heart drawn with pure mathematics and formulas.",
    route: ROUTES.mathematicHeart,
    element: <MathematicHeart />,
  },
]);

const projectsArr = Array.from(projects);

export default projectsArr;
