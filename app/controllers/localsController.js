const { indexLocals, searchInLocals } = require("../services/meiliService");

exports.getLocals = async (req, res) => {
  try {
    const results = await meili.index("locals").getDocuments();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération" });
  }
};

exports.addLocals = async (req, res) => {
  try {
    const response = await indexLocals(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.searchLocals = async (req, res) => {
  try {
    const query = req.query.q || "";
    const results = await searchInLocals(query);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
