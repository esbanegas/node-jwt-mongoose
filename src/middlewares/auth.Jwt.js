//Proteger rutas

import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";
import Role from "../models/Role";

export const verifyToken = async (req, res, next) => {
  try {
    //Verificar en rutas si token existe.
    const token = req.headers["x-access-token"];

    if (!token) return res.status(403).json({ message: "No token provider" });

    const decoded = jwt.verify(token, config.SECRET);
    req.userId = decoded.id;

    const userFound = await User.findById(req.userId, { password: 0 }); //decoded.id => id del user, devolver contraseña en 0

    if (!userFound) return res.status(404).json({ message: "No user found" });

    next(); //next method / Controller
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const isModerator = async (req, res, next) => {
  const userFound = await User.findById(req.userId);
  const roles = await Role.find({ _id: { $in: userFound.roles } });

  for (const role in roles) {
    if (role.name === "moderator") {
      next();
      return;
    }
  }

  return res.status(403).json({ message: "Required Moderator Role..." });
};

export const isAdmin = async (req, res, next) => {
  const userFound = await User.findById(req.userId);
  const roles = await Role.find({ _id: { $in: userFound.roles } });

  for (const role in roles) {
    if (role.name === "admin") {
      next();
      return;
    }
  }

  return res.status(403).json({ message: "Required Admin Role..." });
};
