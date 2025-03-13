import { test, chromium } from '@playwright/test';
import * as XLSX from 'xlsx';

// Path to the Excel file
const excelFilePath = './data/googleform-data.xlsx';
const sheetName = 'Sheet1'; 

// Read data from Excel
function readExcelData(filePath: string, sheetName: string) {
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(sheet,{raw:false});
}

test('Fill Google Form using Excel data', async ({page}) => {
    // Read data from Excel
    const formData:any = readExcelData(excelFilePath, sheetName);
    console.log(formData)
    console.log(typeof(formData))

    for (const entry of formData) {
        await page.goto('https://docs.google.com/forms/d/e/1FAIpQLSfZklEAIBRD9jWj9H0rAlQbAA2nMfiUDARmw1XMwvujUeTETg/viewform');
        await page.fill(`//input[@type="email"]`, entry['Email']); 
        await page.fill(`(//span[text()='name']/following::div/input)[1]`, entry['Name']); 
        await page.click(`//span[text()='fav car']/following::div/span[text()='Choose']`);
        await page.waitForTimeout(5000);
        await page.click(`(//div/span[text()='${entry[`FavCar`]}'])[2]`);
        let dob = entry['DOB'];
        let formattedDate = dob.split('-').reverse().join('-');
        console.log(formattedDate);
        await page.fill(`//input[@type='date']`,formattedDate);
        const timeString = entry['TOB'];
        const [hour, minutes, _seconds, period] = timeString.split(/[: ]/);
        await page.fill(`//div/input[@aria-label="Hour"]`,hour);
        await page.fill(`//div/input[@aria-label="Minute"]`,minutes);
        // await page.click(`//span[text()='time of birth']/following::div[@role="option"][1]`)
        await page.waitForTimeout(2000);
        // await page.click(`(//span[text()='${period}'])[1]`)
        await page.click(`//div/span[text()='${entry[`PickAnOption`]}']`) // Selects the second radio option
        await page.click(`//span[text()='Submit']`);
        console.log(`Form submitted for: ${entry['Name']}`);
        await page.waitForTimeout(2000);
    }

   
});
