'use server';
export async function getPosts() {
  const res = await fetch('https://snehaltayde.com//wp-json/wp/v2/posts');
  const posts = await res.json();
  return posts;
}

export async function getMediaURL(id) {
  const res = await fetch(`https://snehaltayde.com//wp-json/wp/v2/media/${id}`);
  const media = await res.json();
  console.log(media.source_url);

  return media.source_url;
}
