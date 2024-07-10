'use client';
import { getPosts, getMediaURL } from '@/actions/wp.actions';
import { useEffect, useState } from 'react';
import Postgrid from '@/components/Postgrid';
import Header from '@/components/Header';
import HomeTitle from '@/components/HomeTitle';
export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // const allPosts = async () => {
  //   setLoading(true);
  //   await getPosts().then((posts) => {
  //     console.log(posts[0]);
  //     setPosts(posts);
  //     setLoading(false);
  //   });
  // };

  const allPosts = async () => {
    setLoading(true);
    const res = await getPosts(page);
    // console.log(res);
    setPosts(res.posts);
    setLoading(false);

    const totalPages = res?.totalPages;
    setTotalPages(totalPages);
  };

  const allMedia = async (id) => {
    const data = await getMediaURL(id);
    return data;
  };

  useEffect(() => {
    allPosts();
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  return (
    <>
      <section className="py-12 bg-white sm:py-16 lg:py-20">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <HomeTitle />
          <div className="grid max-w-md grid-cols-1 mx-auto mt-12 sm:mt-16 md:grid-cols-3 gap-y-12 md:gap-x-8 lg:gap-x-16 md:max-w-none">
            {loading ? (
              <p>Loading...</p>
            ) : posts.length ? (
              posts.map((post) => (
                <Postgrid
                  key={post.id}
                  post={post}
                  featured_media={post.featured_media}
                  allMedia={allMedia}
                />
              ))
            ) : (
              <p>No Posts</p>
            )}
          </div>
          <div className="flex justify-between mt-8">
            <button onClick={handlePreviousPage} disabled={page === 1}>
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button onClick={handleNextPage} disabled={page === totalPages}>
              Next
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
