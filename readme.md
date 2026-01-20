# Backend Development - Course Repository

This repository contains classwork and assignments from the Backend Development course, organized into separate branches for each module.

## 📚 Course Overview

### Class 1: Unix Commands
- Introduction to Unix/Linux command line
- Basic file system navigation and manipulation
- Git fundamentals and version control
- GitHub repository setup and management

### Class 2: JavaScript Basics
- Variables, data types, and operators
- Control structures (if/else, loops)
- Functions and scope
- Arrays and objects manipulation

### Class 3: JavaScript Advanced Concepts
- Higher-order functions (map, filter, reduce)
- Closures and lexical scope
- Callbacks and callback patterns
- Asynchronous JavaScript concepts
- Promises and async/await syntax

### Class 4-5: Node.js Introduction
- Node.js architecture and event loop
- Node.js installation and setup
- NPM (Node Package Manager) basics
- Core modules (fs, http, os, path)

### Class 6-7: Node.js Server & APIs
- Creating HTTP servers with Node.js
- Request and response handling
- Routing and URL parsing
- Building RESTful APIs
- Working with JSON data
- Fetching and processing data

### Class 8: OS Module (Operating System)
- Introduction to Node.js OS module
- Getting system information (platform, architecture, release)
- CPU information and core details
- Memory management (total memory, free memory)
- User information and home directory
- Network interfaces
- System uptime and load average
- Hostname and temporary directory paths
- Practical applications of OS module

---

## 📂 Repository Structure

This repository uses a **branch-based structure** where each topic has its own dedicated branch:

- `main` - Main branch with documentation
- `unix-commands-git-github` - Assignment 1: Unix commands and Git
- `NodeJS_Programming` - Assignment 2: Node.js programming tasks

---

## 📝 Assignments

### Assignment 1: Unix Commands & Git (Branch: `unix-commands-git-github`)
**Topics Covered:**
- Unix/Linux command line operations
- File and directory management
- Git workflow and commands
- Repository setup and branch management

**Files:**
- `AssignmentUnixcommands.md` - Git workflow documentation

### Assignment 2: Node.js Programming (Branch: `NodeJS_Programming`)
**Topics Covered:**
- Event loop demonstration
- String manipulation utilities
- File system operations
- HTTP server creation
- RESTful API implementation
- System monitoring

**Files in `SubmissionOfNodeJSProgramming/` folder:**

1. **eventLoopDemo.js**
   - Demonstrates Node.js event loop execution order
   - Shows priority of `process.nextTick`, `Promise`, `setTimeout`, and `setImmediate`

2. **stringUtils.js**
   - String utility module with three functions:
     - `capitalize()` - Capitalizes first letter of a string
     - `reverseString()` - Reverses a string
     - `countVowels()` - Counts vowels in a string

3. **systemLogger.js**
   - System monitoring application
   - Logs platform info, CPU cores, and memory stats every 5 seconds
   - Writes logs to `system.log` file

4. **todoServer.js**
   - RESTful HTTP server for TODO management
   - Implements CRUD operations (GET, POST, PUT, DELETE)
   - Runs on port 3000

5. **wordCounter.js**
   - File processing utility
   - Reads `input.txt`, counts words, and writes result to `output.txt`

---

## 🚀 How to Use This Repository

### Clone the Repository
```bash
git clone https://github.com/AyuSharma176/Backend-Dev.git
cd Backend-Dev
```

### Switch Between Branches
```bash
# View all branches
git branch -a

# Switch to Unix Commands assignment
git checkout unix-commands-git-github

# Switch to Node.js Programming assignment
git checkout NodeJS_Programming

# Return to main branch
git checkout main
```

### Run Node.js Programs
```bash
# Navigate to the assignment folder
cd SubmissionOfNodeJSProgramming

# Run event loop demo
node eventLoopDemo.js

# Start TODO server
node todoServer.js

# Run system logger (creates system.log file)
node systemLogger.js

# Run word counter (requires input.txt file)
node wordCounter.js
```

---

## 📖 Key Concepts Learned

### JavaScript Fundamentals
- Variables, functions, and control flow
- Array and object manipulation
- ES6+ features (arrow functions, destructuring, template literals)

### Asynchronous Programming
- Callbacks and callback hell
- Promises and promise chaining
- Async/await syntax
- Event loop understanding

### Node.js Core Concepts
- Event-driven architecture
- Non-blocking I/O operations
- Module system (CommonJS)
- Built-in modules (fs, http, os, path)

### Server Development
- HTTP protocol basics
- Request/response cycle
- Routing and URL handling
- RESTful API design principles
- CRUD operations

---

## 🛠️ Technologies Used

- **Node.js** - JavaScript runtime environment
- **Git** - Version control system
- **GitHub** - Code hosting platform
- **Unix/Linux** - Command line interface

---

## 👨‍💻 Author

**Ayu Sharma**
- GitHub: [@AyuSharma176](https://github.com/AyuSharma176)

---

## 📅 Course Progress

- [x] Class 1: Unix Commands
- [x] Class 2: JavaScript Basics
- [x] Class 3: JavaScript Advanced & Async/Await
- [x] Class 4-5: Node.js Basics & Installation
- [x] Class 6-7: Node.js Servers & APIs
- [x] Class 8: OS Module
- [ ] Upcoming: Express.js Framework
- [ ] Upcoming: Database Integration
- [ ] Upcoming: Authentication & Authorization

---

## 📌 Future Modules

- `file-system-operations` - File handling and streams
- `express-framework` - Express.js basics
- `restful-apis-routing` - Advanced routing and middleware
- `introduction-to-databases` - Database fundamentals
- `middleware-express-session-cookies` - State management
- `authentication-authorization` - Security implementation
- `rest-security` - API security best practices
- `deployment` - Deployment strategies

---

*Last Updated: January 20, 2026*
