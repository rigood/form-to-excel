import ExcelJS from "exceljs";
import fs from "fs";

export const exportToExcelFile = async (req, res) => {
  const { companyName, representative, businessNumber, address, phone, fax } =
    req.body;

  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(process.cwd() + "/src/assets/transaction.xlsx");

  const sheet = wb.getWorksheet("거래명세서");
  sheet.getCell("O3").value = companyName;
  sheet.getCell("T3").value = representative;
  sheet.getCell("O4").value = businessNumber;
  sheet.getCell("O5").value = address;
  sheet.getCell("O7").value = phone;
  sheet.getCell("T7").value = fax;

  const fileName = companyName + Date.now();

  await wb.xlsx.writeFile(process.cwd() + `/src/assets/${fileName}.xlsx`);

  return res.json({ ok: true, fileName });
};

export const downloadExcelFile = async (req, res) => {
  const fileName = req.params["fileName"];
  const filePath = process.cwd() + `/src/assets/${fileName}.xlsx`;

  const fileExists = fs.existsSync(filePath);

  if (fileExists) {
    return res.sendFile(filePath);
  }

  return res.end();
};
