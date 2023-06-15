function fetchPostDetails(postId) {
  async function innerOnePost() {
    let data = null;

    // Try to find /posts data in cache
    const cache = await caches.open("pwa-blog-cache");

    const cacheData = await cache.match(API_URL);
    if (cacheData) {
      const jsonData = await cacheData.json();
      const findPost = jsonData.filter(post => post.id == postId);
      if (findPost.length) data = findPost[0];
    }

    if (data) {
      const title = data.title[0].toUpperCase() + data.title.slice(1);
      const body = data.body[0].toUpperCase() + data.body.slice(1);
  
      document.getElementById("post").innerHTML = `
        <div class="post">
          <h3>${title}</h3>
          <p>${body.replace("\n", "<br/><br/>")}</p>
        </div>
      `;
    } else {
      console.error("Post not found")
    }
  }

  fetch(API_URL)
    .then((res) => res.json())
    .then(() => {
      innerOnePost()
    })
    .catch(() => {
      innerOnePost()
    });
}
