import puppeteer from 'puppeteer';

const express = require('express')
const fileUpload = require("express-fileupload");

import { mapHandleError } from './handle_map_error';

const app = express()
const port = 3000

app.use(express.urlencoded({ extended : false }));
app.use(express.json());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

app.post('/verify-signature', (req: any, res: any) => {
    try {
        if (req.files?.file?.length > 1) {
            return res.status(422).send({
                message: 'É permitido somente um arquivo para validação.'
            });
        }
    
        if (!req.files || !req.files.file || req.files.file.mimetype !== 'application/pdf') {
            return res.status(422).send(mapHandleError(422));
        }

        puppeteer.launch().then(async function(browser) {
            try {
                const urlPage = 'https://validar.iti.gov.br';
                const pathTmpSignature = req.files.file.tempFilePath;
                const pathTmpSignatureExt = req.files.file.name.slice((req.files.file.name.lastIndexOf(".") - 1 >>> 0) + 2);
                const pathTmpSignatureWithExt = pathTmpSignature + '.' + pathTmpSignatureExt;

                await req.files.file.mv(pathTmpSignatureWithExt);
                
                const page = await browser.newPage();
        
                await page.goto(urlPage, { waitUntil: 'networkidle0' });
            
                await page.click('div.buttonDiv button[onclick="cookiebutton()"]');
            
                await page.waitForSelector('input[type=file]')
                const inputUpload = await page.$('input[type=file]')
                
                inputUpload?.uploadFile(pathTmpSignatureWithExt)
            
                const checkbox = await page.$('#acceptTerms');
                const isChecked = await checkbox?.evaluate(el => (el as HTMLInputElement).checked);
                
                if (!isChecked) await checkbox?.click();
            
                await page.click('#validateSignature')
            
                const response = await page.waitForResponse(response => response.url().endsWith('/arquivo'))

                if (response.status() != 200) {
                    res.status(response.status()).send(mapHandleError(response.status()))  
                } else {
                    res.send((await response.json())[0])
                }
            } catch (err) {
                console.error(err)
                res.status(500).send(mapHandleError(500))  
            }
        })   
    } catch (error) {
        console.error(error)
        res.status(500).send(mapHandleError(500))   
    }
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

export default app