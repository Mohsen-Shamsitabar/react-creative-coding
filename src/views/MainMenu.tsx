import ProjectCard from "../components/ProjectCard.tsx";
import { projectsArr } from "../constants/project-data.tsx";
import classes from "../styles/MainMenu.module.css";

const MainMenu = () => {
  const renderProjectCards = () => {
    return projectsArr.map(project => (
      <ProjectCard
        key={`${project.title}-card`}
        {...project}
      />
    ));
  };

  return (
    <div className={classes["root"]}>
      <h2>Projects:</h2>

      <div className={classes["projects-container"]}>
        {renderProjectCards()}
      </div>
    </div>
  );
};

export default MainMenu;
