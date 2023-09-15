import express from "express";
import {
  downloadExcelFile,
  exportToExcelFile,
} from "../controllers/excelController";

const apiRouter = express.Router();

apiRouter.route("/excel").post(exportToExcelFile);

apiRouter.route("/excel/:fileName").get(downloadExcelFile);

export default apiRouter;
