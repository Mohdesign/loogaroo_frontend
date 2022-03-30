const {casestudies} = require("./data.json");

export default function handler(req, res) {
     const oneCaseStudie = casestudies.filter((item) => item.slug === req.query.slug);
     res.status(200).json(oneCaseStudie);
  }
  