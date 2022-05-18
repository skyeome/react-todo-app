import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { categoryState } from "../atoms";

interface ICategory {
  newCategory: string;
}

function CreateCategory() {
  const setCategory = useSetRecoilState(categoryState);
  const { register, handleSubmit, setValue } = useForm<ICategory>();
  const handleValid = ({ newCategory }: ICategory) => {
    setCategory((oldCategory) => {
      return oldCategory;
    });
    setValue("newCategory", "");
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("newCategory", { required: "Please write a category" })}
        placeholder="Write a category"
      />
    </form>
  );
}
export default CreateCategory;
