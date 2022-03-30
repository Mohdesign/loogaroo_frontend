const {services} = require("./data.json");

export default function handler(req, res) {
     const oneService = services.filter((item) => item.slug === req.query.slug);
     res.status(200).json(oneService);
  }
  