import { atom, selector } from "recoil";

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories | string;
}
export interface ICategoryObj {
  [key: Categories | string]: string;
}
export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const categoryListState = atom<ICategoryObj[]>({
  key: "categoryList",
  default: [{ TO_DO: "To Do" }, { DOING: "Doing" }, { DONE: "Done" }],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const orgToDos = get(toDoState);
    const category = get(categoryState);
    return orgToDos.filter((toDo) => toDo.category === category);
  },
});
