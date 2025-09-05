// app/controllers/usersController.js
import { User } from "../models/index.js";
import { indexUsers, searchInUsers } from "../services/meiliUserService.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role, actif, bio, location } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      role,
      actif,
      bio,
      location,
    });

    // Indexation dans Meilisearch
    await indexUsers([
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        location: user.location,
        bio: user.bio,
      },
    ]);

    res.status(201).json(user);
  } catch (err) {
    console.error("Erreur createUser:", err);
    res.status(500).json({ error: "Erreur création user" });
  }
};

export const searchUsers = async (req, res) => {
  try {
    const { q } = req.query;
    const result = await searchInUsers(q);
    res.json(result);
  } catch (err) {
    console.error("Erreur searchUsers:", err);
    res.status(500).json({ error: "Erreur recherche utilisateur" });
  }
};
