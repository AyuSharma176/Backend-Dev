# Backend Development - Course Repository

This repository contains classwork and assignments from the Backend Development course, organized into separate branches for each module. It reflects hands-on practice with Node.js core concepts, servers, file systems, and streams.

---

## 📚 Course Overview

### Class 1: Unix Commands

* Introduction to Unix/Linux command line
* Basic file system navigation and manipulation
* Git fundamentals and version control
* GitHub repository setup and management

### Class 2: JavaScript Basics

* Variables, data types, and operators
* Control structures (if/else, loops)
* Functions and scope
* Arrays and objects manipulation

### Class 3: JavaScript Advanced Concepts

* Higher-order functions (map, filter, reduce)
* Closures and lexical scope
* Callbacks and callback patterns
* Asynchronous JavaScript concepts
* Promises and async/await syntax

### Class 4–5: Node.js Introduction

* Node.js architecture and event loop
* Node.js installation and setup
* NPM (Node Package Manager) basics
* Core modules (fs, http, os, path)

### Class 6–7: Node.js Server & APIs

* Creating HTTP servers with Node.js
* Request and response handling
* Routing and URL parsing
* Building RESTful APIs
* Working with JSON data
* Fetching and processing data

### Class 8: OS Module (Operating System)

* Introduction to Node.js OS module
* Getting system information (platform, architecture, release)
* CPU information and core details
* Memory management (total memory, free memory)
* User information and home directory
* Network interfaces
* System uptime and load average
* Hostname and temporary directory paths
* Practical applications of OS module

### Class 9: File System Operations

* File operations using Node.js `fs` module
* Asynchronous file handling with callbacks
* `copyFile()` – Copying files from source to destination
* `writeFile()` – Creating new files with content
* `mkdir()` – Creating directories with recursive option
* `readdir()` – Reading directory contents
* Error handling patterns in async operations
* Working with file paths and directory structures

### ✅ Class 10: Streams in Node.js (Reviewed)

* Introduction to streams and stream types

  * Readable streams
  * Writable streams
  * Duplex streams
  * Transform streams
* Reading files using `createReadStream`
* Writing files using `createWriteStream`
* Handling large files efficiently with streams
* Using `pipe()` to connect streams
* Backpressure handling (conceptual understanding)
* Error handling in streams

**Files Practiced:**

* `readable.js` – Reading data from files using streams
* `writable.js` – Writing data to files using streams
* `pipe.js` – Copying data from one file to another using pipe

### ✅ Class 11: Transform Streams (Completed with Guidance)

* Understanding Transform streams as Duplex streams
* Modifying data while streaming
* Creating custom Transform streams
* Real-world use cases (data processing, compression, encryption)

**Files Implemented:**

* `transform.js` – Converts file data to UPPERCASE while streaming from input to output

---

## 📂 Repository Structure

This repository uses a **branch-based structure** where each topic has its own dedicated branch:

* `main` – Documentation and course overview
* `unix-commands-git-github` – Assignment 1: Unix commands and Git
* `NodeJS_Programming` – Assignment 2: Node.js programming tasks
* `streams-nodejs` – Class 10 & 11: Streams and Transform streams

---

## 📝 Assignments

### Assignment 1: Unix Commands & Git

**Branch:** `unix-commands-git-github`

**Topics Covered:**

* Unix/Linux command line operations
* File and directory management
* Git workflow and commands
* Repository setup and branch management

**Files:**

* `AssignmentUnixcommands.md`

---

### Assignment 2: Node.js Programming

**Branch:** `NodeJS_Programming`

**Topics Covered:**

* Event loop demonstration
* String manipulation utilities
* File system operations
* HTTP server creation
* RESTful API implementation
* System monitoring

**Files in `SubmissionOfNodeJSProgramming/`:**

1. **eventLoopDemo.js**

   * Demonstrates Node.js event loop execution order
   * Shows priority of `process.nextTick`, `Promise`, `setTimeout`, and `setImmediate`

2. **stringUtils.js**

   * Utility functions:

     * `capitalize()`
     * `reverseString()`
     * `countVowels()`

3. **systemLogger.js**

   * Logs system info every 5 seconds
   * Writes data to `system.log`

4. **todoServer.js**

   * RESTful HTTP server
   * CRUD operations (GET, POST, PUT, DELETE)
   * Runs on port 3000

5. **wordCounter.js**

   * Reads `input.txt`
   * Counts words
   * Writes results to `output.txt`

---

## 🚀 How to Use This Repository

```bash
git clone https://github.com/AyuSharma176/Backend-Dev.git
cd Backend-Dev
```

### Switch Branches

```bash
git checkout streams-nodejs
```

### Run Stream Examples

```bash
node readable.js
node writable.js
node pipe.js
node transform.js
```

---

## 📖 Key Concepts Learned

### JavaScript & Async Programming

* Event loop and execution order
* Non-blocking I/O
* Promises and async/await

### Node.js Core

* Streams and buffers
* File system efficiency
* Core modules (`fs`, `http`, `os`, `path`)

### Backend Skills

* HTTP servers
* REST APIs
* Stream-based file handling
* Scalable backend patterns

---

## 🛠️ Technologies Used

* **Node.js**
* **JavaScript (ES6+)**
* **Git & GitHub**
* **Unix/Linux CLI**

---

## 👨‍💻 Author

**Ayu Sharma**
GitHub: [@AyuSharma176](https://github.com/AyuSharma176)

---

## 📅 Course Progress

* [x] Class 1: Unix Commands
* [x] Class 2: JavaScript Basics
* [x] Class 3: JavaScript Advanced
* [x] Class 4–5: Node.js Basics
* [x] Class 6–7: Node.js Servers & APIs
* [x] Class 8: OS Module
* [x] Class 9: File System Operations
* [x] Class 10: Streams (Reviewed)
* [x] Class 11: Transform Streams
* [ ] Upcoming: Express.js Framework
* [ ] Upcoming: Database Integration
* [ ] Upcoming: Authentication & Authorization

---

*Last Updated: January 27, 2026*
