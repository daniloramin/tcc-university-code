module.exports = () => {
  const whitelist = ["http://example1.com", "http://example2.com"];
  return {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  };
};
