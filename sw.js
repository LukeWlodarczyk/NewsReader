const staticAssets = ["./", "./styles.css", "./app.js"];

self.addEventListener("install", async e => {
  const cache = await caches.open("news-static");
  cache.addAll(staticAssets);
});

self.addEventListener("fetch", e => {
  console.log(e);
  console.log("fetch");
});
