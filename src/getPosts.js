function getAllPosts() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      innerPosts(data);
    })
    .catch(() => {
      innerPosts();
    })
}
