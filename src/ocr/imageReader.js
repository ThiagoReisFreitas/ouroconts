const Tesseract = require('tesseract.js');
const sharp = require('sharp');

const inputImagePath = '/home/threis/Imagens/printFudido.png';

sharp(inputImagePath)
    .resize({ width: 1500, height: 1500, fit: 'inside' })
    .grayscale()
    .normalise()
    .toBuffer()
    .then(buffer => {
        return Tesseract.recognize(buffer, 'por', {
            logger: m => console.log(m),
        });
    })
    .then(({ data: { text } }) => {
        console.log(text);
    })
    .catch(err => {
        console.error("Erro: ", err);
    });