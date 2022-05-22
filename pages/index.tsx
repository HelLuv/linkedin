import type {NextPage} from 'next';
import Head from 'next/head';
import {CtxOrReq} from "next-auth/client/_utils";
import {getSession} from "next-auth/react";

import {Feed, Header, Modal, Sidebar, Widgets} from "../components";
import {connectToDatabase} from "../utils/mongodb";
import {IPost} from "../types/IPost";
import {AnimatePresence} from "framer-motion";
import {useRecoilState} from "recoil";
import {modalState, modalTypeState} from "../atoms/modalAtom";
import {handlePostState} from "../atoms/postAtom";

interface HomeProps {
  posts: Array<IPost>;
  articles: Array<any>;
}

const Home: NextPage<HomeProps> = ({posts, articles}) => {
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState<"dropIn" | "gifYouUp">(modalTypeState);
  return (
    <div className="bg-[#f3f2ef] dark:bg-black dark:text-white h-screen overflow-y-scroll md:space-y-6">
      <Head>
        <title>Feed | LinkedIn</title>
        <meta name="description" content="Feeds of LinkedIn page"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <Header/>

      <main className="flex justify-center gap-x-5 px-4 sm:px-12">
        <div className="flex flex-col md:flex-row gap-5">
          <Sidebar/>
          <Feed posts={posts}/>
        </div>
        <Widgets articles={articles}/>
        <AnimatePresence>
          {modalOpen && (
            <Modal handleClose={() => setModalOpen(false)} type={modalType}/>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

export default Home;

export async function getServerSideProps(context: CtxOrReq) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/home",
      },
    };
  }

  const {db} = await connectToDatabase();

  const posts = await db.collection("posts").find().sort({timestamp: -1}).toArray();

  const result = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`
  ).then((res) => res.json());

  return {
    props: {
      session,
      articles: result?.articles,
      posts: posts.map((post) => ({
        _id: post._id.toString(),
        input: post.input,
        photoUrl: post.photoUrl,
        username: post.username,
        email: post.email,
        userImg: post.userImg,
        createdAt: post.createdAt,
      })),
    },
  };
}