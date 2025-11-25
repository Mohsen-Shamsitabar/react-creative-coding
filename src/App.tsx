import { BrowserRouter, Route, Routes } from "react-router";
import MainHeader from "./components/MainHeader.tsx";
import { projectsArr } from "./constants/project-data.tsx";
import classes from "./styles/App.module.css";
import MainMenu from "./views/MainMenu.tsx";
import NotFound from "./views/NotFound.tsx";

const App = () => {
  const createProjectRoutes = () => {
    return projectsArr.map(project => (
      <Route
        key={`${project.title}-route`}
        path={project.route}
        element={project.element}
      />
    ));
  };

  return (
    <main className={classes["root"]}>
      <BrowserRouter>
        <MainHeader className={classes["main-header"]} />

        <section className={classes["main-content"]}>
          <Routes>
            <Route
              index
              element={<MainMenu />}
            />

            {createProjectRoutes()}

            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </section>
      </BrowserRouter>
    </main>
  );
};

export default App;
