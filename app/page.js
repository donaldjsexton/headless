'use client';
import { getPosts, getMediaURL } from '@/actions/wp.actions';
import { useEffect, useState } from 'react';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const allPosts = async () => {
    await getPosts().then((posts) => {
      console.log(posts[0]);
      setPosts(posts);
    });
  };

  const allMedia = async (id) => {
    const data = await getMediaURL(id);
    console.log('Data', data);
    return data;
  };

  useEffect(() => {
    allPosts();
  }, []);
  return (
    <>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title.rendered}</h2>
          <p>{post.excerpt.rendered}</p>
          <img src={allMedia(post.featured_media)} />
        </div>
      ))}
    </>
  );
}
