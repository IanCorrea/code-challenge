const express = require('express');
const app = express();
port = 3000;


app.use(express.json());

const tasks = [];


app.get('/tasks', (req, res) => {
    //Retrive all tasks
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const { title, completed } = req.body;

    if (!title) res.status(400).json({ error: "Title is required!" });
    if (completed === undefined) res.status(400).json({ error: "Completed is required!" });

    const task = {
        id: tasks.length + 1,
        title,
        completed
    }

    tasks.push(task);
    res.status(201).json(task);
});

app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const { title, completed } = req.body;

    if (!title) return res.status(400).json({ error: "Title is required!" });
    if (completed === undefined) return res.status(400).json({ error: "Completed is required!" });

    const indexTask = tasks.findIndex(obj => obj.id === taskId);

    if(indexTask === -1) return res.status(404).json({ error: "Task Not Found!" });

    tasks[indexTask] = { id:taskId, title, completed };

    res.json(tasks[indexTask]);
});

app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);

    const indexTask = tasks.findIndex(obj => obj.id === taskId);

    if(indexTask === -1) return res.status(404).json({ error: "Task Not Found!" });

    tasks.splice(indexTask, 1);

    res.status(200).send();
});


app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})