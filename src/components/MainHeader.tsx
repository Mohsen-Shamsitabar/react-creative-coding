import projectsArr from "@/constants/project-data.tsx";
import { useLocation } from "react-router";
import classes from "../styles/MainHeader.module.css";
import mergeCss from "../utils/merge-css.ts";

type Props = {
  className?: string;
};

const MainHeader = (props: Props) => {
  const { className } = props;

  const location = useLocation();
  const pathname = location.pathname;

  const findProjectTitle = () => {
    const project = projectsArr.find(project => {
      if (pathname.includes(project.route)) {
        return true;
      }

      return false;
    });

    if (!project) return "Creative Coding";

    return project.title;
  };

  const title = findProjectTitle();

  return (
    <header className={mergeCss(classes["root"], className)}>{title}</header>
  );
};

export default MainHeader;
