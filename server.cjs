const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwMjIyNzg5MiwiaWF0IjoxNzAyMjI3ODkyfQ.DLSZMBoRMmwQkUC7h2VAGgDoxDYWHfn_Fk8gg9';

// Sample user data (in-memory for demonstration purposes)
const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
];

app.use(bodyParser.json());

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Find user by username
  const user = users.find((u) => u.username === username);

  // Check if the user exists and the password is correct
  if (user && user.password === password) {
    // Generate JWT token
    const token = jwt.sign({ userId: user.id, username: user.username }, SECRET_KEY, {
      expiresIn: '1h', // Token expiration time (adjust as needed)
    });

    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
