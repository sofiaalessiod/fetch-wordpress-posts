"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

window.addEventListener("load", initApp); // When the page is loaded, run initApp function

// Function to initialize the Web App
async function initApp() {
  console.log("initApp: app.js is running 🎉"); // Log to the console that the app is running
  const posts = await getPosts();
  console.log(posts);
}

async function getPosts() {
  const response = await fetch(
    "https://headless.cederdorff.dk/wp-json/wp/v2/posts?acf_format=standard"
  );
  const data = await response.json();
  return data;
}

function displayPosts(posts) {
  const postsList = document.querySelector("#posts-list");
  for (const post of posts) {
    postsList.insertAdjacentHTML(
      "beforeend"
      `
      <li>${post.title.rendered}</li>
    `
    );
  }
}






