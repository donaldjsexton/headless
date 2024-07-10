'use client';
import { getPosts, getMediaURL } from '@/actions/wp.actions';
import { useEffect, useState } from 'react';
import Postgrid from '@/components/Postgrid';
import Header from '@/components/Header';
import HomeTitle from '@/components/HomeTitle';
export default function Home() {
  const [posts, setPosts] = useState([]);
  const [locading, setLoading] = useState(false);
  const allPosts = async () => {
    setLoading(true);
    await getPosts().then((posts) => {
      console.log(posts[0]);
      setPosts(posts);
      setLoading(false);
    });
  };

  const allMedia = async (id) => {
    const data = await getMediaURL(id);
    return data;
  };

  useEffect(() => {
    allPosts();
  }, []);
  return (
    <>
      <Header />
      <section className="py-12 bg-white sm:py-16 lg:py-20">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <HomeTitle />
          <div className="grid max-w-md grid-cols-1 mx-auto mt-12 sm:mt-16 md:grid-cols-3 gap-y-12 md:gap-x-8 lg:gap-x-16 md:max-w-none">
            {locading && <p>Loading...</p>}
            {posts.map((post) => (
              <Postgrid
                key={post.id}
                post={post}
                featured_media={post.featured_media}
                allMedia={allMedia}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
