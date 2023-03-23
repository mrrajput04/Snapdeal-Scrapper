const axios = require("axios");

const fetch = (url) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response) => resolve(response.data))
      .catch((e) => reject(e));
  });
};

module.exports = fetch;
