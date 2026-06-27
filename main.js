const API = "https://jsonplaceholder.typicode.com/posts";
let allPosts = [];

const postsContainer = document.querySelector("#postsContainer");
const searchInput = document.querySelector("#searchInput");

async function loadPosts() {
  try {
    postsContainer.innerHTML = "Loading...";
    const response = await fetch(API);
    if (!response.ok) throw new Error("Failed to fetch");
    const data = await response.json();
    allPosts = data;
    renderPosts(allPosts);
    console.log(allPosts);
  } catch (error) {
    console.error(error);
    postsContainer.innerHTML = `<div class="error">Error : ${error.message}</div>`;
  }
}

function renderPosts(posts) {
  postsContainer.innerHTML = "";

  if (posts.length === 0) {
    postsContainer.innerHTML = `<div class="error">Hech narsa topilmadi!</div>`;
    return;
  }

  posts.forEach((element) => {
    const { title, userId, body, id } = element;

    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
        <div class="card-header">
        <span class="card-id">#${id}</span>
        <span class="card-user">User ${userId}</span>
        </div>
        <h2 class="card-title">${title.slice(0, 50)}</h2>
        <p class="card-body">${body}</p>
        `;

    postsContainer.appendChild(card);
  });
}

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    e.preventDefault();
    const text = e.target.value.toLowerCase();
    const filteredData = allPosts.filter((post) => {
      return (
        post.title.toLowerCase().includes(text) ||
        post.id.toString().includes(text)
      );
    });
    renderPosts(filteredData);
  });
}

loadPosts();
