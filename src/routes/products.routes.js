import { Router } from "express";

const router = Router();

import * as productController from "../controllers/products.controller";
import { authJwt } from "../middlewares";

router.get("/", productController.getProducts);
router.post(
  "/",
  [authJwt.verifyToken, authJwt.isAdmin],
  productController.createProduct
);
router.get("/:productId", productController.getProductById);
router.put(
  "/:productId",
  [authJwt.verifyToken, authJwt.isAdmin],
  productController.updateProductById
);
router.delete(
  "/:productId",
  [authJwt.verifyToken, authJwt.isAdmin],
  productController.deleteProductById
);

export default router;
