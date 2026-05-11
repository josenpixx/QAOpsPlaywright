import { test, expect } from "@playwright/test";

const ExcelJs = require('exceljs');
 
async function writeExcelTest(searchText, replaceText, change, filePath) {
  const workbook = new ExcelJs.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet('Sheet1');
  const output = readExcel(worksheet, searchText); // not async
 
  const cell = worksheet.getCell(output.row, output.column + change.colChange);
  cell.value = replaceText;
  await workbook.xlsx.writeFile(filePath);
}
 
// This does no async work, so don't mark it async.
function readExcel(worksheet, searchText) {
  let output = { row: -1, column: -1 };
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === searchText) {
        output = { row: rowNumber, column: colNumber };
      }
    });
  });
  return output;
}
 
//update Mango Price to 350. 
//writeExcelTest("Mango",350,{rowChange:0,colChange:2},"/Users/rahulshetty/downloads/excelTest.xlsx");

test("Upload donwload excel validation", async ({page})=>{
    const textSearch = 'Mango';
    const updateValue = '350';
    await page.goto('https://rahulshettyacademy.com/upload-download-test/'); // переходим сюда
    const downloadPromise = page.waitForEvent('download'); // приказываем ждать когда случится ситуация что-то скачать, мы успешно это скачаем
    await page.getByRole("button", {name:'Download'}).click(); // кликаем
    const dl = await downloadPromise; // ждём пока скачает
    const filePath = '/Users/josenpix/downloads/download.xlsx'; // указываем куда скачать файл мне на комп, не во временную папку PR - путь и название файла я указываю
    await dl.saveAs(filePath); // дождаться пока сохранит на комп файл.

    writeExcelTest(textSearch,updateValue,{rowChange:0, colChange:2},filePath);

    await page.locator("#fileinput").click(); // кликнуть на кнопку upload
    await page.locator("#fileinput").setInputFiles(filePath); // указать PR что нужно использовать обходной путь и загрузить файл с компа по этому адресу, что указан в filePath
    const textlocator = page.getByText(textSearch); // найти элемент по нашему тексту - Mango
    const desiredRow = await page.getByRole('row').filter({has: textlocator}); // найти ряд в таблице где есть этот наш Mango
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue); // удостовериться, что в этом ряду есть наше обновлённое значение из updateValue
});
