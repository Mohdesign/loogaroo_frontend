const {jobs} = require("./data.json");

export default function handler(req, res) {
     const oneJob = jobs.filter((item) => item.slug === req.query.slug);
     res.status(200).json(oneJob);
  }
  