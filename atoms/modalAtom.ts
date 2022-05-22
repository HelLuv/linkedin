import {atom} from "recoil";

export const modalState = atom({
  key: "modalState",
  default: false,
});

export const modalTypeState = atom<"dropIn" | "gifYouUp">({
  key: "modalTypeState",
  default: "dropIn",
});