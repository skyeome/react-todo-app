import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryListState, IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const categoryList = useRecoilValue(categoryListState);
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIdx = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      localStorage.setItem(
        "toDosState",
        JSON.stringify([
          ...oldToDos.slice(0, targetIdx),
          newToDo,
          ...oldToDos.slice(targetIdx + 1),
        ])
      );
      return [
        ...oldToDos.slice(0, targetIdx),
        newToDo,
        ...oldToDos.slice(targetIdx + 1),
      ];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {categoryList
        .filter((cat) => Object.keys(cat)[0] !== category)
        .map((cat) => (
          <button
            key={Object.keys(cat)[0]}
            name={Object.keys(cat)[0]}
            onClick={onClick}
          >
            {Object.values(cat)[0]}
          </button>
        ))}
      {/* {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
      )} */}
    </li>
  );
}

export default ToDo;
