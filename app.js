"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

window.addEventListener("load", initApp); // When the page is loaded, run initApp function

// Function to initialize the Web App
async function initApp() {
  console.log("initApp: app.js is running 🎉"); // Log to the console that the app is running
  const posts = await getPosts();
  console.log(posts); // Log the fetched posts
  displayPostsGrid(posts);
}

async function getPosts() {
  const response = await fetch(
    "https://headless.sofiaalessiod.dk/wp-json/wp/v2/posts?acf_format=standard&orderby=date&order=asc"
  );
  const data = await response.json();
  return data;
}

function displayPostsGrid(posts) {
  const postsGrid = document.querySelector("#posts-grid");

  for (const post of posts) {
    console.log("Post data:", post); // Log the entire post object

    // Check if acf and Image fields are present
    if (post.acf && post.acf.Image) {
      console.log("Image URL:", post.acf.Image); // Log the image URL

      const imageUrl = post.acf.Image; // Adjust this if image URL is nested differently
      const title = post.title.rendered || "Untitled";

      postsGrid.insertAdjacentHTML(
        "beforeend",
        /*html*/ `
        <article class="grid-item">
          <img src="${imageUrl}" alt="${title}" />
          <h2>${title}</h2>
        </article>
      `
      );
    } else {
      console.warn("Missing image URL for post:", post);
    }
  }
}
