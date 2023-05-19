const express = require('express');
const basicAuth = require('express-basic-auth');
const fs = require('fs').promises;

const app = express();
app.use(express.json());

// Endpoint 1: Read file using promise with await
app.get(
  '/read-file-promise-await',
  basicAuth({ users: { username: 'password' } }),
  async (req, res) => {
    try {
      const fileContent = await fs.readFile('file.txt', 'utf-8');
      console.log('File Content (Promise with Await):', fileContent);
      res
        .status(200)
        .json({ message: 'File content retrieved (Promise with Await)' });
    } catch (error) {
      console.error('An error occurred:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  }
);

// Endpoint 2: Read file using promise without await
app.get(
  '/read-file-promise',
  basicAuth({ users: { username: 'password' } }),
  (req, res) => {
    fs.readFile('file.txt', 'utf-8')
      .then((fileContent) => {
        console.log('File Content (Promise):', fileContent);
        res.status(200).json({ message: 'File content retrieved (Promise)' });
      })
      .catch((error) => {
        console.error('An error occurred:', error);
        res.status(500).json({ error: 'An error occurred' });
      });
  }
);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
