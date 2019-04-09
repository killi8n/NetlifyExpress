const manifest = require("../build/asset-manifest.json.js");
const render = require("./index").default;

function buildHtml({ html, helmet }) {
  const title = { helmet };
  const jsKeys = Object.keys(manifest)
    .filter(jsKey => jsKey.match(/.js$/))
    .map(key => {
      if (key === "service-worker.js") return null;
      return `<script src="${manifest[key]}"></script>`;
    })
    .join("\n\t\t");

  const cssKeys = Object.keys(manifest)
    .filter(cssKey => cssKey.match(/.css$/))
    .map(key => {
      return `<link href="${manifest[key]}" rel="stylesheet">`;
    })
    .join("\n\t\t");

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8" />
        <link rel="shortcut icon" href="./HeaderIcon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="./manifest.json" />
        ${title.toString()}
        ${cssKeys}
    </head>
    <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root">
            ${html}
        </div>
       ${jsKeys}
    </body>
    </html>
    `;
}

export default async (req, res) => {
  try {
    // const rendered = await render()
  } catch (e) {
    console.log(e);
    return buildHtml({});
  }
};
