import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, categoryState, toDoState } from "../atoms";

export interface IForm {
  toDo: string;
}

function CreateToDo() {
  const category = useRecoilValue(categoryState);
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => {
      localStorage.setItem(
        "toDoState",
        JSON.stringify([{ text: toDo, id: Date.now(), category }, ...oldToDos])
      );
      return [{ text: toDo, id: Date.now(), category }, ...oldToDos];
    });
    setValue("toDo", "");
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", {
          required: "Please write a To Do",
        })}
        placeholder="Write a to do"
        autoComplete="off"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
