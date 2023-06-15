const API_URL = 'https://jsonplaceholder.typicode.com/posts';

async function innerPosts(data) {
  let posts = null;

  if (!data) {
    // Try to find /posts data in cache
    const cache = await caches.open("pwa-blog-cache");

    const cacheData = await cache.match(API_URL);
    if (cacheData) {
      const jsonData = await cacheData.json();
      posts = jsonData;
    }
  } else {
    posts = data
  }

  if (posts) {
    const postsDoc = document.getElementById("posts")
    postsDoc.innerHTML = "";

    posts?.forEach(ele => {
      let title = ele.title[0].toUpperCase() + ele.title.slice(1);
      let body = ele.body[0].toUpperCase() + ele.body.slice(1);

      if (title.split(" ").length > 10) {
        title = title.split(" ").slice(0, 10).join(" ") + "...";
      }
      if (body.split(" ").length > 10) {
        body = body.split(" ").slice(0, 10).join(" ") + "...";
      }

      postsDoc.innerHTML += `
          <div class="post">
            <h3 title="${ele.title}">
              <a href="/?id=${ele.id}">${title}</a>
            </h3>
            <p>${body.replace("\n", "</br>")}</p>
            <a href="/?id=${ele.id}">Plus d'info →</a>
          </div>
      `;
    });
  } else {
    console.error("Cache of posts not found")
  }
}
