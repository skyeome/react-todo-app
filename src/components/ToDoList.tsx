import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  Categories,
  categoryListState,
  categoryState,
  toDoSelector,
  toDoState,
} from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
interface ICategory {
  newCategory: string;
}
function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [allToDos, setAllToDos] = useRecoilState(toDoState);
  const [category, setCategory] = useRecoilState<Categories>(categoryState);
  const [categoryList, setCategoryList] = useRecoilState(categoryListState);
  const { register, handleSubmit, setValue } = useForm<ICategory>();
  const local = localStorage.getItem("toDoState");
  const localCategory = localStorage.getItem("categoryList");
  const slct = useRef<HTMLSelectElement>(null);
  useEffect(() => {
    if (local !== null) {
      const toDoLocal = JSON.parse(local);
      setAllToDos(toDoLocal);
    }
    if (localCategory !== null) {
      setCategoryList(JSON.parse(localCategory));
    }
  }, [local]);
  /* window.addEventListener("beforeunload", (event: BeforeUnloadEvent) => {
    localStorage.setItem("toDoState", JSON.stringify(allToDos));
  }); */
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  const handleValid = ({ newCategory }: ICategory) => {
    setCategoryList((oldCategory) => {
      localStorage.setItem(
        "categoryList",
        JSON.stringify([...oldCategory, { [newCategory]: newCategory }])
      );
      return [...oldCategory, { [newCategory]: newCategory }];
    });
    setValue("newCategory", "");
  };
  return (
    <div>
      <h1>To Dos App</h1>
      <hr />
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register("newCategory", { required: "Please write a category" })}
          placeholder="Write a category"
        />
      </form>
      <hr />
      <select onInput={onInput} ref={slct}>
        {categoryList.map((cat) => (
          <option key={Object.keys(cat)[0]} value={Object.keys(cat)[0]}>
            {Object.values(cat)[0]}
          </option>
        ))}
      </select>
      <CreateToDo />
      {toDos?.map((aToDo) => (
        <ToDo key={aToDo.id} {...aToDo} />
      ))}
    </div>
  );
}
export default ToDoList;
