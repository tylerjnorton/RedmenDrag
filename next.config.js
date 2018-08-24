module.exports = {
  pageExtensions: ["jsx", "js", "bs.js"],
  exportPathMap: function() {
    return {
      "/": { page: "/" },
      "/upload": { page: "/upload" }
    };
  }
};
