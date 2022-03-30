const {services} = require("./data.json");

export default function handler(req, res) {
  res.status(200).json(services)
}