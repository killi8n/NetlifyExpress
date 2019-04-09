// const manifest = require("../build/asset-manifest.json");
const render = require("./index").default;
const axios = require("axios");

const getManifest = async () => {
  try {
    const manifest = await axios.get(
      "https://s3.ap-northeast-2.amazonaws.com/trible-client-ssr-build/build/asset-manifest.json"
    );
    return manifest.data;
  } catch (e) {
    console.log(e);
  }
};

async function buildHtml({ html, helmet }) {
  const { title } = helmet;
  const manifest = await getManifest();
  const jsKeys = Object.keys(manifest)
    .filter(jsKey => jsKey.match(/.js$/))
    .map(key => {
      if (key === "service-worker.js") return null;
      return `<script src="https://s3.ap-northeast-2.amazonaws.com/trible-client-ssr-build/build${
        manifest[key]
      }"></script>`;
    })
    .join("\n\t\t");

  const cssKeys = Object.keys(manifest)
    .filter(cssKey => cssKey.match(/.css$/))
    .map(key => {
      return `<link href="https://s3.ap-northeast-2.amazonaws.com/trible-client-ssr-build/build${
        manifest[key]
      }" rel="stylesheet">`;
    })
    .join("\n\t\t");

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="theme-color" content="#000000" />
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

module.exports = async ctx => {
  try {
    const rendered = await render(ctx);
    const html = await buildHtml(rendered);
    ctx.body = html;
  } catch (e) {
    console.log(e);
    return buildHtml({});
  }
};
