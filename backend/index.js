const express = require('express');
const admin = require('firebase-admin');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const port = 3000;

const upload = multer({ dest: 'temp/uploads/' });
// Inicialize o Firebase Admin SDK
const serviceAccount = require('./etl-angular-firebase-adminsdk-qhrmn-5506b7c1ca.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://etl-angular.firebaseio.com'
});

const db = admin.firestore();

// Endpoint para importar o CSV
app.post('/import-csv', upload.single('file'), (req, res) => {
  const filePath = path.join(__dirname, 'temp/uploads', req.file.filename);

  const results = [];
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      for (const row of results) {
        await db.collection('import_csv').add(row);
      }
      res.send('CSV importado com sucesso!');
    })
    .on('error', (error) => {
      console.error(error);
      res.status(500).send('Erro ao importar CSV');
    });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
