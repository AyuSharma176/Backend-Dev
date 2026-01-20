const http = require('http');

let todos = [];
let id = 1;

const server = http.createServer((req, res) => {
  const { method, url } = req;

  res.setHeader('Content-Type', 'application/json');

  // GET all todos
  if (url === '/todos' && method === 'GET') {
    res.end(JSON.stringify(todos));
  }

  // POST new todo
  else if (url === '/todos' && method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const todo = JSON.parse(body);
      todo.id = id++;
      todos.push(todo);
      res.statusCode = 201;
      res.end(JSON.stringify(todo));
    });
  }

  // PUT update todo
  else if (url.match(/\/todos\/\d+/) && method === 'PUT') {
    const todoId = parseInt(url.split('/')[2]);
    let body = '';

    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const updated = JSON.parse(body);
      const todo = todos.find(t => t.id === todoId);
      if (!todo) {
        res.statusCode = 404;
        return res.end(JSON.stringify({ error: 'Not found' }));
      }
      todo.title = updated.title;
      res.end(JSON.stringify(todo));
    });
  }

  // DELETE todo
  else if (url.match(/\/todos\/\d+/) && method === 'DELETE') {
    const todoId = parseInt(url.split('/')[2]);
    todos = todos.filter(t => t.id !== todoId);
    res.end(JSON.stringify({ message: 'Deleted' }));
  }

  else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Route not found' }));
  }
});

server.listen(3000, () => {
  console.log('TODO API running on http://localhost:3000');
});
