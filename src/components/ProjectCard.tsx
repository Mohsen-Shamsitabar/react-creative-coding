import { useNavigate } from "react-router";
import classes from "../styles/ProjectCard.module.css";
import type { Project } from "../types.ts";

type Props = Project;

const ProjectCard = (props: Props) => {
  const { route, title, description, image } = props;

  const navigate = useNavigate();

  const handleCardClick = () => {
    void navigate(route);
    return;
  };

  return (
    <button
      onClick={handleCardClick}
      className={classes["root"]}
    >
      <div className={classes["text-container"]}>
        <h4 className={classes["title"]}>{title}</h4>

        <p className={classes["description"]}>{description}</p>
      </div>

      <div className={classes["image-container"]}>
        <img
          src={image}
          alt="</>"
        />
      </div>
    </button>
  );
};

export default ProjectCard;
