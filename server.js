const express = require('express');
const path = require('path');
const courses = require('./data/courses.json');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/courses', (req, res) => {
  res.json(courses);
});

app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'Course comparator API is running.' });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Course comparator app started at http://localhost:${port}`);
});
