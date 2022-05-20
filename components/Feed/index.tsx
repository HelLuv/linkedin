import * as React from 'react';
import {useRecoilState} from "recoil";

import {handlePostState, useSSRPostState} from "../../atoms/postAtom";
import {IPost} from "../../types/IPost";
import {Input, Post} from "../index";

interface FeedProps {
  posts: Array<IPost>;
}

const Feed: React.FC<FeedProps> = ({posts}) => {
  const [realtimePosts, setRealtimePosts] = React.useState<Array<IPost>>([]);
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);
  const [useSSRPosts, setUseSSRPosts] = useRecoilState(useSSRPostState);

  React.useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/posts", {
        method: "GET",
        headers: {"Content-type": "application/json"},
      });

      const responseData = await response.json();
      setRealtimePosts(responseData);
      setHandlePost(false);
      setUseSSRPosts(false);
    };

    fetchPosts();
  }, [handlePost])

  return (
    <div className="space-y-6 pb-24 max-w-lg">
      <Input/>
      {/*Posts*/}
      {!useSSRPosts
        ? realtimePosts?.map((post) => <Post key={post._id} post={post}/>)
        : posts.map((post) => <Post key={post._id} post={post}/>)
      }


    </div>
  )
};

export default React.memo<FeedProps>(Feed);