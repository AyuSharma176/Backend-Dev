const express = require("express");
const session = require("express-session");
const fs = require("fs").promises;
  

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'your-secret-key-here',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 3600000 } 
})); 

app.use((req, res, next) => {
  console.log("i am middle ware");
  next();
});

app.set("view engine", "ejs");

const PORT = 8002;

const sessionAuthMiddleware = (req, res, next) => {
  if (req.session && req.session.isAuthenticated) {
    next();
  } else {
    res.redirect("/");
  }
};

const readfile = async () => {
  const data = await fs.readFile("./db.json", "utf-8");
  return JSON.parse(data);
};
const writefile = async (data) => {
  await fs.writeFile("./db.json", JSON.stringify(data));
}


let students = [];
(async () => {
  students = await readfile();
})();


app.get("/", (req, res) => {
  if (req.session && req.session.isAuthenticated) {
    res.redirect("/form");
  } else {
    res.render("login");
  }
});



app.get("/form", sessionAuthMiddleware, async (req, res) => {
  res.render("form", { allStudents: students });
});


app.post("/submit", sessionAuthMiddleware, async (req, res) => {
  const newStudent = req.body;
  students.push(newStudent);
  await writefile(students);
  res.redirect("/form");
});

app.delete("/delete/:id", sessionAuthMiddleware, async (req, res) => {
  const studentId = parseInt(req.params.id);
  const foundIndex = students.findIndex((s) => s.id === studentId);
  if(foundIndex === -1){
    return res.status(404).json({success: false, message:"Student not found"})
  }
  students.splice(foundIndex,1);
  await writefile(students);
  return res.status(200).json({success: true, message:"Student deleted successfully"});
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "password") {
    req.session.isAuthenticated = true;
    req.session.username = username;
    
    if (req.headers['content-type'] === 'application/json') {
      return res.json({message:"Login successful", token: "fake-jwt-token" });
    } else {
      return res.redirect("/form");
    }
  } else {  
    if (req.headers['content-type'] === 'application/json') {
      return res.status(401).json({ message: "Invalid credentials" });
    } else {
      return res.redirect("/");
    }
  }
});



app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Error logging out" });
    }
    res.redirect("/");
  });
});
app.listen(PORT, () => {
  console.log(`Server is running : http://localhost:${PORT}`);
});