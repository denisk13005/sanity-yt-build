import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typings";

// on defini l'interface pour renseigner les types des variables
interface Props {
  posts: [Post];
}

const Home = ({ posts }: Props) => {
  console.log(posts);

  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="flex justify-between items-center bg-yellow-400 border-black border-y py-10 lg:py-0">
        <div className=" px-10 space-y-5">
          <h1 className="text-6xl max-w-xl font-serif">
            <span className="underline decoration-black decoration-4">
              Medium
            </span>{" "}
            is a place to write, read, and connect
          </h1>
          <h2>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse,
            tenetur? Nemo esse fugiat voluptatum culpa.{" "}
          </h2>
        </div>
        <img
          className="hidden md:inline-flex h-32 lg:h-full"
          src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png"
        ></img>
      </div>
      {/* post */}
      <div>
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className="cursor-pointer">
              test
              <img src={urlFor(post.mainImage).url()!} alt="" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

//va récupérer les paramètre du post défini dans le query
export const getServerSideProps = async () => {
  const querry = `
  *[_type=="post"]{
    _id,
    title,
    slug,
    author -> {
    name,
    image
  },
  description,
  mainImage
  }
  `;
  const posts = await sanityClient.fetch(querry);

  //a revoir !!
  return {
    props: {
      posts,
    },
  };
};

export default Home;
