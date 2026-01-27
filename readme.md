# Backend Development – Course Repository

This repository contains classwork and assignments from the Backend Development course, organized into separate branches for each module. It reflects hands-on practice with **Node.js core concepts, file systems, streams, servers, and APIs**.

---

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
- Higher-order functions (`map`, `filter`, `reduce`)
- Closures and lexical scope
- Callbacks and callback patterns
- Asynchronous JavaScript concepts
- Promises and `async/await`

### Class 4–5: Node.js Introduction
- Node.js architecture and event loop
- NPM (Node Package Manager)
- Core modules (`fs`, `http`, `os`, `path`)

### Class 6–7: Node.js Servers & APIs
- Creating HTTP servers
- Request and response handling
- Routing and URL parsing
- RESTful API development
- Working with JSON data

### Class 8: OS Module
- System and CPU information
- Memory management
- User and network information
- System uptime and load averages
- Practical OS module usage

### Class 9: File System Operations
- Asynchronous file handling
- File creation, deletion, copying
- Directory operations
- Error handling patterns

### Class 10: Streams in Node.js
- Readable, Writable, Duplex, Transform streams
- Stream piping using `pipe()`
- Efficient handling of large files
- Backpressure (conceptual)
- Stream error handling

### Class 11: Transform Streams
- Custom Transform streams
- Data modification while streaming
- Real-world use cases

---

## 📂 Repository Structure

This repository follows a **branch-based structure**:

- `main` – Documentation and course overview
- `unix-commands-git-github` – Assignment 1
- `NodeJS_Programming` – Assignment 2
- `streams-nodejs` – Streams and Transform Streams

---

## 📝 Assignments

### Assignment 1: Unix Commands & Git
**Branch:** `unix-commands-git-github`

- Unix/Linux command usage
- Git workflow and branching
- Repository setup and management

---

### Assignment 2: Node.js Programming
**Branch:** `NodeJS_Programming`

**Files Included:**
1. `eventLoopDemo.js` – Demonstrates Node.js event loop execution order
2. `stringUtils.js` – String utility functions
3. `systemLogger.js` – Logs system info periodically
4. `todoServer.js` – RESTful CRUD API server
5. `wordCounter.js` – Word count using file system operations

---

## ✅ Assignment 3: File System & Streams (Completed)

### 📁 Lab Exercise 1: File Manager Application
**Folder:** `Submission_Of_File_System_Operations`

**Features:**
- Read files
- Write files
- Copy files
- Delete files
- List directory contents

**Concepts Used:**
- Asynchronous `fs/promises`
- `path` module for cross-platform compatibility
- Proper error handling
- UTF-8 encoding for text files

---

### 📁 Lab Exercise 2: Log File Analyzer (Streams)
**Folder:** `LabExercise2__LogFileAnalyzerStreams`

**Functionality:**
- Reads large log files using streams
- Parses log entries
- Generates summary statistics (INFO, WARNING, ERROR)

**Concepts Used:**
- `createReadStream`
- `readline` for line-by-line processing
- Memory-efficient stream usage
- Stream error handling

---

### 📁 Lab Exercise 3: File Synchronization Tool
**Folder:** `LabExercise3__FileSynchronizationTool`

**Functionality:**
- Compares source and target directories
- Recursively synchronizes files
- Copies missing files using streams
- Handles errors gracefully

**Concepts Used:**
- Recursive directory traversal
- Stream-based file copying
- Asynchronous file system operations
- Cross-platform path handling

---

## 🚀 How to Use This Repository

```bash
git clone https://github.com/AyuSharma176/Backend-Dev.git
cd Backend-Dev
