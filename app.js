const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { Blob } = require('buffer');

const app = express();
const port = 3000;

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get('/',(req,res)=>{
  res.send(200)
})

app.post('/Pest', upload.single('image'), async (req, res) => {
  try {
    // Ensure the file was uploaded
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    // Get the uploaded file
    const imageBuffer = req.file.buffer;
    const blob = new Blob([imageBuffer], { type: 'image/png' });

    // Import Gradio client
    const { Client } = await import('@gradio/client');
    const client = await Client.connect("Thesis-GROOT/Pest");
    const result = await client.predict("/predict", { 
      image: blob,
    });

    // Log and send the result
    console.log(result.data);
    res.send(result.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred');
  }
});

app.post('/Disease', upload.single('image'), async (req, res) => {
  try {
    // Ensure the file was uploaded
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    // Get the uploaded file
    const imageBuffer = req.file.buffer;
    const blob = new Blob([imageBuffer], { type: 'image/png' });

    // Import Gradio client
    const { Client } = await import('@gradio/client');
    const client = await Client.connect("Thesis-GROOT/Disease");
    const result = await client.predict("/predict", { 
      image: blob,
    });

    // Log and send the result
    console.log(result.data);
    res.json(result.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred');
  }
});


// app.post('/Pest', upload.single('image'), async (req, res) => {
//   try {
//     // Ensure the file was uploaded
//     if (!req.file) {
//       return res.status(400).send('No file uploaded.');
//     }

//     // Get the uploaded file
//     const imageBuffer = req.file.buffer;
//     const blob = new Blob([imageBuffer], { type: 'image/png' });

//     // Import Gradio client
//     const { Client } = await import('@gradio/client');
//     const client = await Client.connect("Thesis-GROOT/Pest");
//     const result = await client.predict("/predict", { 
//       image: blob,
//     });

//     // Log and send the result
//     console.log(result.data);
//     res.json(result.data);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).send('An error occurred');
//   }
// });


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
