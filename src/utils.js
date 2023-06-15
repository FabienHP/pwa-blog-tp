// Check connection status and update document
const appStatusBgCol = document.getElementById("appStatus").style;
window.navigator.onLine
  ? (appStatusBgCol.backgroundColor = "green")
  : (appStatusBgCol.backgroundColor = "red");

// Check if Service Worker avaible, and register file observer
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js", {
    scope: "/",
  });
}

// Router for execute correct function of post getter
function getPostIdFromUrl() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get("id");
}

// if postId found so get one post else get all posts
const postId = getPostIdFromUrl();
if (postId) {
  fetchPostDetails(postId);
} else {
  getAllPosts();
}
