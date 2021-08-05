//Service to change HTML links to match Salesforce requirement for src="./" and href="./"

const yourAssetReplacer = async ({ name, bundler }) => {
  if (name.split("/").pop() === "index.html") {
    return (assetText) =>
      assetText.replace('src="/', 'src="./').replace('href="/', 'href="./');
  }
};

module.exports = yourAssetReplacer;
