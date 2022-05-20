import {atom} from "recoil";
import {IPost} from "../types/IPost";


export const handlePostState = atom({
  key: "handlePostState",
  default: false,
});

export const getPostState = atom({
  key: "getPostState",
  default: {} as IPost,
});

export const useSSRPostState = atom({
  key: "useSSRPostState",
  default: true,
});