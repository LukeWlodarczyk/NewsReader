const apiKey = "d14ad7cb73454aafb51c730190cc523b";
const defaultSource = "the-washington-post";
const main = document.querySelector("#articles");
const sourceSelector = document.querySelector("#sources");

document.addEventListener("DOMContentLoaded", async () => {
  updateNews();
  await updateNewsSources();
  sourceSelector.value = defaultSource;

  sourceSelector.addEventListener("change", e => updateNews(e.target.value));
});

async function updateNewsSources() {
  const response = await fetch(
    `https://newsapi.org/v2/sources?apiKey=${apiKey}`
  );
  const json = await response.json();
  sourceSelector.innerHTML = json.sources
    .map(source => `<option value="${source.id}">${source.name}</option>`)
    .join("\n");
}

async function updateNews(source = defaultSource) {
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`
  );
  const json = await response.json();
  main.innerHTML = json.articles.map(createArticle).join("\n");
}

function createArticle({ url, title, urlToImage, description }) {
  return `
    <div class="article">
      <a href="${url}">
        <h2>${title}</h2>
        <img src="${urlToImage}" alt="${title}">
        <p>${description}</p>
      </a>
    </div>
  `;
}
