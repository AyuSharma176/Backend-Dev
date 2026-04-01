const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

const DB_FILE = "./db.json";

/* ========= Helper Functions ========= */

// Read data
function readData() {
  const data = fs.readFileSync(DB_FILE, "utf-8");
  return JSON.parse(data);
}

// Write data
function writeData(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

/* ========= ROUTES ========= */

// 1. Add new student
app.post("/students", (req, res) => {
  const db = readData();

  const newStudent = {
    id: Date.now(),
    ...req.body
  };

  db.students.push(newStudent);
  writeData(db);

  res.send(newStudent);
});

// 2. View all students
app.get("/students", (req, res) => {
  const db = readData();
  res.send(db.students);
});

// 2.1 Search students by name
app.get("/students/search", (req, res) => {
  const db = readData();
  const nameQuery = (req.query.name || "").toString().trim().toLowerCase();

  if (!nameQuery) {
    return res.status(400).send("Query parameter 'name' is required");
  }

  const result = db.students.filter(s =>
    (s.name || "").toString().toLowerCase().includes(nameQuery)
  );

  res.send(result);
});

// 3. Find student by email
app.get("/students/email/:email", (req, res) => {
  const db = readData();

  const student = db.students.find(
    s => s.email === req.params.email
  );

  if (!student) return res.status(404).send("Not found");

  res.send(student);
});

// 4. Update student GPA
app.put("/students/:id", (req, res) => {
  const db = readData();

  const student = db.students.find(
    s => s.id == req.params.id
  );

  if (!student) return res.status(404).send("Not found");

  student.GPA = req.body.GPA;

  writeData(db);
  res.send(student);
});

// 5. Delete student
app.delete("/students/:id", (req, res) => {
  const db = readData();

  const index = db.students.findIndex(
    s => s.id == req.params.id
  );

  if (index === -1) return res.status(404).send("Not found");

  db.students.splice(index, 1);
  writeData(db);

  res.send("Deleted successfully");
});

/* ========= ADVANCED ========= */

// 1. GPA between range
app.get("/students/gpa", (req, res) => {
  const { min, max } = req.query;
  const db = readData();

  const result = db.students.filter(
    s => s.GPA >= min && s.GPA <= max
  );

  res.send(result);
});

// 2. More than 5 courses
app.get("/students/courses", (req, res) => {
  const db = readData();

  const result = db.students.filter(
    s => s.courses.length > 5
  );

  res.send(result);
});

// 3. Top 10 students
app.get("/students/top", (req, res) => {
  const db = readData();

  const result = db.students
    .sort((a, b) => b.GPA - a.GPA)
    .slice(0, 10);

  res.send(result);
});

// 4. Count by city
app.get("/students/city-count", (req, res) => {
  const db = readData();

  const result = {};

  db.students.forEach(s => {
    result[s.city] = (result[s.city] || 0) + 1;
  });

  res.send(result);
});

/* ========= AGGREGATION ========= */

// 1. Avg GPA by department
app.get("/students/avg-gpa", (req, res) => {
  const db = readData();

  const map = {};

  db.students.forEach(s => {
    if (!map[s.department]) {
      map[s.department] = { total: 0, count: 0 };
    }
    map[s.department].total += s.GPA;
    map[s.department].count++;
  });

  for (let dept in map) {
    map[dept].avg = map[dept].total / map[dept].count;
  }

  res.send(map);
});

// 2. Most popular courses
app.get("/students/popular-courses", (req, res) => {
  const db = readData();

  const courseCount = {};

  db.students.forEach(s => {
    s.courses.forEach(c => {
      courseCount[c] = (courseCount[c] || 0) + 1;
    });
  });

  res.send(courseCount);
});

// 3. Performance report
app.get("/students/report", (req, res) => {
  const db = readData();

  const result = db.students.map(s => ({
    name: s.name,
    GPA: s.GPA,
    performance: s.GPA >= 3.5 ? "Excellent" : "Average"
  }));

  res.send(result);
});

/* ========= SERVER ========= */
app.listen(3000, () => {
  console.log("Server running on port http://localhost:3000");
});