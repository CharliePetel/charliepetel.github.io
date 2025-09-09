const fs = require("fs");

const template = fs.readFileSync("artist-template.html", "utf8");
const data = JSON.parse(fs.readFileSync("kuenstler.json", "utf8"));

let galleryHtml = "";

data.forEach((artist) => {
  const bio = `<p>${artist.bio}</p>`;
  const images = artist.images.map((img) => `<img src="${img}" alt="Artwork by ${artist.name}">`).join("\n");

  const html = template
    .replace(/{{name}}/g, artist.name)
    .replace("{{bild}}", artist.images[0])
    .replace("{{bio}}", bio)
    .replace("{{images}}", images);

  fs.writeFileSync(artist.filename, html, "utf8");
  console.log(`✅ Künstlerseite erstellt: ${artist.filename}`);

  galleryHtml += `
  <div class="artist-tile">
    <a href="${artist.filename}">
      <img src="${artist.thumbnail}" alt="${artist.name}">
      <div class="artist-name">${artist.name}</div>
    </a>
  </div>\n`;
});

// Build artists.html
const artistsHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Artists – Charlie Petel</title>
    <link rel="icon" type="image/png" href="images/favicon.png" />
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        margin: 0;
        font-family: Helvetica, Arial, sans-serif;
        background: #fff;
        color: #000;
      }

      header {
        padding: 2rem 2rem 1rem;
      }

      .header-inner {
        max-width: 900px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
      }

      .logo a {
        text-decoration: none;
        color: black;
        font-weight: bold;
        font-size: 1.3rem;
        white-space: nowrap;
      }

      nav {
        display: flex;
        flex-wrap: wrap;
        gap: 1.5rem;
        justify-content: flex-end;
      }

      nav a {
        position: relative;
        text-decoration: none;
        color: #000;
        font-size: 0.9rem;
        text-transform: uppercase;
        padding: 0.5rem 0;
      }

      nav a::before,
      nav a::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        height: 1px;
        background: #000;
        transform: scaleX(0);
        transition: transform 0.3s ease;
      }

      nav a::before {
        top: 0; /* obere Linie */
      }

      nav a::after {
        bottom: 0; /* untere Linie */
      }

      nav a:hover::before,
      nav a:hover::after,
      nav a.active::before,
      nav a.active::after {
        transform: scaleX(1); /* Linien sichtbar machen */
      }

      main {
        max-width: 1000px;
        margin: 4rem auto;
        padding: 0 2rem;
      }
      h1 {
        font-size: 3rem;
        font-weight: bold;
        margin-bottom: 2rem;
        text-align: center;
      }

      .artist-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
      }

      .artist-tile {
        position: relative;
        overflow: hidden;
      }

      .artist-tile img {
        width: 265px;
        height: 295px;
        display: block;
        margin-bottom: 0.5rem;
        object-fit: cover;
      }

      .artist-tile:hover img {
        transform: scale(1.02);
      }

      .artist-name {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        color: #fff;
        padding: 2rem;
        font-size: 1.2rem;
        text-align: left;
        text-transform: uppercase;
        font-weight: bold;
        text-shadow:
          -0.5px -0.5px 0 #4f4949,
          0.5px -0.5px 0 #4f4949,
          -0.5px 0.5px 0 #4f4949,
          0.5px 0.5px 0 #4f4949;
      }

      footer {
        text-align: center;
        padding: 2rem;
        font-size: 0.85rem;
        color: #000;
        border-top: 1px solid #ccc;
        margin-top: 4rem;
      }
    </style>
  </head>

  <body>
    <header>
      <div class="header-inner">
        <div class="logo"><a href="index.html">Charlie Petel</a></div>
        <nav>
          <a href="artists.html" class="active">ARTISTS</a>
          <a href="about.html">ABOUT</a>
          <a href="exhibitions.html">EXHIBITIONS</a>
          <a href="contact.html">CONTACT</a>
        </nav>
      </div>
    </header>
    
    <main>
      <div class="artist-grid">${galleryHtml}</div>
    </main>;

  <footer>© 2025 Studio23. All rights reserved.</footer>
</body>
</html>
`;

fs.writeFileSync("../artists.html", artistsHtml, "utf8");
console.log("✅ Übersichtsseite erstellt: artists.html");
