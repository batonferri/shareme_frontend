import { atom } from "recoil";

export const saveState = atom({
  key: "saveState",
  default: false,
});

export const deleteState = atom({
  key: "deleteState",
  default: false,
});
