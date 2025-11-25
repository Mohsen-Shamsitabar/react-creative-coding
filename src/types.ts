import type React from "react";

export type Project = {
  title: string;
  route: string;
  element: React.ReactNode;
  description?: string;
  image?: string;
};

export type Position = [number, number];
