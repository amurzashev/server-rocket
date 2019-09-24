const Unsplash = require('unsplash-js').default;
const axios = require('axios').default;
const https = require('https');

const unsplash = new Unsplash({
  applicationId: process.env.APP_KEY,
  secret: process.env.SECRET,
});


const login = (_req, res) => {
  const authenticationUrl = unsplash.auth.getAuthenticationUrl([
    "public",
    "read_user",
    "write_user",
    "read_photos",
    "write_photos"
  ]);
  res.send({ authenticationUrl });
};

const list = (req, res) => {
  const pos = Number(req.query.pos) || 1;
  unsplash.photos.listPhotos(pos, 10, 'latest')
  .then(resp => resp.json())
  .then(items => {
    res.send({ items });
  })
  .catch(err => console.log(err));
};

const image = (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(418).send({
      status: `I'm a teampot!`,
    });
  };
  unsplash.photos.getPhoto(id)
    .then(resp => resp.json())
    .then(image => {
      if (image.errors) {
        res.status(404).send({
          status: `Couldn't find photo`,
        });
      };
      res.send({
        image
      });
    })
    .catch(err => {
      console.log(err);
      res.status(404).send({
        status: `Couldn't find photo`,
      });
    })
};

const search = (req, res) => {
  const { keyword } = req.params;
  unsplash.search.photos(keyword, 1, 10)
    .then(resp => resp.json())
    .then(items => {
      res.send({ items: items.results });
    })
    .catch(error => {
      console.log(error);
    });
};

module.exports = {
  login,
  list,
  image,
  search,
};
