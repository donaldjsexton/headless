'use server';
// export async function getPosts() {
//   const res = await fetch('https://snehaltayde.com//wp-json/wp/v2/posts');
//   const posts = await res.json();
//   return posts;
// }

export async function getPosts(page, perPage = 12) {
  const res = await fetch(
    `https://snehaltayde.com/wp-json/wp/v2/posts?page=${page}&per_page=${perPage}`
  );
  const posts = await res.json();
  //return posts;
  const totalPages = res.headers.get('X-WP-TotalPages');
  return { posts, totalPages: parseInt(totalPages, 10) };
}

export async function getPost(slug) {
  const res = await fetch(
    `https://snehaltayde.com//wp-json/wp/v2/posts?slug=${slug}`
  );
  const post = await res.json();
  return post;
}

export async function getMediaURL(id) {
  const res = await fetch(`https://snehaltayde.com//wp-json/wp/v2/media/${id}`);
  const media = await res.json();
  // console.log(media.source_url);
  return media.source_url;
}
