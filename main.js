const API = "https://jsonplaceholder.typicode.com/posts";
const postsContainer = document.querySelector("#postsContainer");
const searchInput = document.querySelector(".search-input");

let allPosts = [];

async function fetchPosts() {
  const response = await fetch(API);
  if (!response.ok) {
    throw new Error(`Fetch xato: ${response.status}`);
  }
  return response.json();
}

function createCard(post) {
  const card = document.createElement("article");
  card.className = "card";

  const headerDiv = document.createElement("div");
  headerDiv.className = "card-header";

  const idSpan = document.createElement("span");
  idSpan.className = "card-id";
  idSpan.textContent = `#${post.id}`;

  const userSpan = document.createElement("span");
  userSpan.className = "card-user";
  userSpan.textContent = `User ${post.userId}`;

  headerDiv.appendChild(idSpan);
  headerDiv.appendChild(userSpan);

  const title = document.createElement("h2");
  title.className = "card-title";
  title.textContent = post.title;

  const body = document.createElement("p");
  body.className = "card-body";
  body.textContent = post.body;

  card.appendChild(headerDiv);
  card.appendChild(title);
  card.appendChild(body);

  return card;
}

function renderPosts(posts) {
  if (!postsContainer) return;

  postsContainer.innerHTML = "";

  if (posts.length === 0) {
    postsContainer.innerHTML = '<div class="error">Hech narsa topilmadi</div>';
    return;
  }

  posts.forEach((post) => {
    postsContainer.appendChild(createCard(post));
  });
}

function showLoadingMessage() {
  if (!postsContainer) return;
  postsContainer.innerHTML = '<div class="loading">Loading...</div>';
}

function showErrorMessage(message) {
  if (!postsContainer) return;
  postsContainer.innerHTML = `<div class="error">${message}</div>`;
}

function handleSearch(term) {
  const searchValue = term.toLowerCase().trim();
  const filteredPosts = allPosts.filter((post) =>
    post.title.toLowerCase().includes(searchValue),
  );
  renderPosts(filteredPosts);
}

async function main() {
  showLoadingMessage();

  try {
    allPosts = await fetchPosts();
    renderPosts(allPosts);

    if (searchInput) {
      searchInput.addEventListener("input", (event) => {
        handleSearch(event.target.value);
      });
    }
  } catch (error) {
    console.log("Xato:", error);
    showErrorMessage(error.message);
  }
}

main();
