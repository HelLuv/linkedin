import * as React from 'react';
import {useSession} from "next-auth/react";
import {useRecoilState} from "recoil";

import {modalState} from "../../atoms/modalAtom";
import {handlePostState} from "../../atoms/postAtom";
import {IPost} from "../../types/IPost";

interface FormProps {

}

const Form: React.FC<FormProps> = ({}) => {
  const [input, setInput] = React.useState("");
  const [photoUrl, setPhotoUrl] = React.useState("");
  const {data: session} = useSession();
  const [_, setModalOpen] = useRecoilState(modalState);
  const [__, setHandlePost] = useRecoilState(handlePostState);

  const uploadPost = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        input: input,
        photoUrl: photoUrl,
        username: session?.user?.name,
        email: session?.user?.email,
        userImg: session?.user?.image,
        createdAt: new Date().toString(),
      } as IPost),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    console.log({responseData});

    setHandlePost(true);
    setModalOpen(false);
  }

  return (
    <form className="flex flex-col relative space-y-2 text-black/80 dark:text-white/75">
     <textarea
       value={input}
       placeholder="What do you want to talk about"
       onChange={(event) => setInput(event.target.value)}
       rows={4}
       className="bg-transparent focus:outline-none dark:placeholder-white/75 overflow-auto max-h-[8.5rem]"
     />
      <input
        type="text"
        placeholder="Add a photo URL (optional)"
        className="bg-transparent focus:outline-none truncate max-w-xs md:max-w-sm dark:placeholder-white/75"
        value={photoUrl}
        onChange={(event) => setPhotoUrl(event.target.value)}
      />

      <button
        className="absolute bottom-0 right-0 font-medium bg-blue-400
                   hover:bg-blue-500 disabled:text-black/40
                   disabled:bg-white/75 disabled:cursor-not-allowed
                   text-white rounded-full px-3.5 py-1 transition duration-150"
        type="submit"
        onClick={uploadPost}
        disabled={!input.trim() && !photoUrl.trim()}
      >
        Post
      </button>
    </form>
  )
};

export default React.memo<FormProps>(Form);