'use server';
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

export async function getPostsByCategoryName(categoryName, page, perPage = 12) {
  try {
    // Get the category by slug
    const categoryResponse = await fetch(
      `https://snehaltayde.com/wp-json/wp/v2/categories?slug=${categoryName}`
    );
    const categories = await categoryResponse.json();

    // Check if the category exists
    if (categories.length === 0) {
      console.log('Category not found');
      return [];
    }

    const categoryId = categories[0].id;

    // Get posts by category ID
    const postsResponse = await fetch(
      `https://snehaltayde.com/wp-json/wp/v2/posts?categories=${categoryId}&page=${page}&per_page=${perPage}`
    );
    const posts = await postsResponse.json();
    const totalPages = postsResponse.headers.get('X-WP-TotalPages');
    return { posts, totalPages: parseInt(totalPages, 10) };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export default async function getCategories() {
  const res = await fetch(`https://snehaltayde.com/wp-json/wp/v2/categories`);
  const categories = await res.json();
  return categories;
}
