import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { redirect } from "react-router-dom";

import Project from "../components/project/Project";
import style from "./Home.module.css";
import MainContext from "../context/Main.jsx";

const Home = () => {
  const [data, setData] = useState([]);
  const { user } = useContext(MainContext);
  const [filterMode, setFilterMode] = useState();
  const [filter, setFilter] = useState(false);
  const [filterOptions, setFilterOptions] = useState([]);

  if (!user) redirect("/");

  useEffect(() => {
    axios
      .get("http://localhost:3000")
      .then((resp) => {
        const sortedData = [...resp.data];
        console.log({ unsortedData: sortedData });
        sortedData.sort((a, b) => {
          return (
            new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf()
          );
        });
        console.log({ sortedData: sortedData });
        if (filter) {
          const filteredData = sortedData.filter((data) => {
            return (
              data.author[Object.keys(filter)[0]] ===
              filter[Object.keys(filter)[0]]
            );
          });
          // console.log({unfilteredData:data.author[Object.keys(filter)[0]]})
          // console.log({filter:filter[Object.keys(filter)[0]]})
          console.log({ filteredData: filteredData });
          setData(filteredData);
        } else setData(sortedData);
      })
      .catch((err) => console.log(err.message));
  }, [filter]);

  useEffect(() => {
    if (!filterMode) return;
    setFilterOptions(
      data
        .map((obj) => obj.author)
        .filter(
          (author, index) =>
            index ===
            data
              .map((obj) => obj.author)
              .findIndex((obj) => {
                console.log(
                  "author:",
                  author,
                  "obj:",
                  obj,
                  "filtermode:",
                  filterMode
                );
                return author[filterMode.key] === obj[filterMode.key];
              })
        )
        .map((author) => ({
          ...author,
          filterKey:
            filterMode.key === "party_name"
              ? { party_name: author.party_name }
              : { _id: author._id },
          displayName:
            filterMode.key === "party_name"
              ? author.party_name
              : author.name + author.surname,
        }))
    );
  }, [filterMode]);

  return (
    <div className={style.home_background}>
      <div className="container">
        <div className={style.sort_projects_container}>
          <div
            className={
              "flex gap-3 flex items-center" + style.project_display_controls
            }
          >
            <div className="dropdown dropdown-bottom">
              <div tabIndex={0} role="button" className="btn m-1">
                Filtruoti Pagal
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li onClick={() => setFilterMode({})}>
                  <a>-</a>
                </li>
                <li
                  onClick={() => setFilterMode({ key: "_id", name: "Autorių" })}
                >
                  <a>Autorių</a>
                </li>
                <li
                  onClick={() =>
                    setFilterMode({ key: "party_name", name: "Partiją" })
                  }
                >
                  <a>Partiją</a>
                </li>
              </ul>
            </div>

            {filterMode && (
              <div className="gap-3 col-7 flex items-center">
                <div className="dropdown dropdown-bottom">
                  <div tabIndex={0} role="button" className="btn m-1">
                    {filterMode?.name}
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    {filterOptions.map((author) => {
                      return (
                        <li
                          onClick={() => setFilter(author.filterKey)}
                          key={author._id}
                        >
                          <a>{author.displayName}</a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="flex gap-3 px-5">
                  <button
                    className="btn glass px-6"
                    type="submit"
                    form="filter"
                  >
                    <p class="text-black">Filtruoti</p>
                  </button>
                  <button
                    className="btn glass"
                    onClick={() => {
                      setFilter(false);
                      setFilterMode();
                    }}
                  >
                    <p class="text-black">Valyti filtra</p>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="container">
        <div className={style.projects}>
          {data.map((project) => {
            // console.log(project);
            return <Project data={project} key={project._id} />;
          })}
        </div>
      </div>
      <footer class="bg-white rounded-lg shadow m-4 dark:bg-gray-700 ">
        <div class="w-full mx-auto max-w-screen-xl p-4 flex flex-col">
          <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024 <a class="hover:underline ">Seimo Portalas</a>. All Rights
            Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
};
export default Home;
