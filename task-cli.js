const fs = require('fs')
const path = require('path')

const TASKS_FILE = path.join(__dirname, 'tasks.json')

function readTasks() {
    try {
        if (!fs.existsSync(TASKS_FILE)) {
            return []
        }
        const data = fs.readFileSync(TASKS_FILE, 'utf8')
        return JSON.parse(data)
    } catch (error) {
        console.error('Error reading tasks', error.message)
        return [];
    }
}

function writeTasks(tasks) {
    try {
        const data = JSON.stringify(tasks, null, 2)
        fs.writeFileSync(TASKS_FILE, data, 'utf8')
    } catch (error) {
        console.error('Error writing tasks', error.message)
    }
}
function addTask(description) {
    if (!description || description.trim() === '') {
        console.error('Error: tasks description cannot be empty')
        return;
    }
    const tasks = readTasks()
    const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1
    const newTask = {
        id: newId,
        description: description.trim(),
        status: 'todo',
        createdAt: new Date().toISOString(),
        updateAt: new Date().toISOString()
    }
    tasks.push(newTask)
    writeTasks(tasks)
    console.log(`Tasks added successfull: ${newId}`,)
}
function listTasks(status = null) {
    const tasks = readTasks();
    if (tasks.length === 0) {
        console.log('No found tasks')
        return;
    }
    let filterTasks = tasks;
    if (status) {
        filterTasks = tasks.filter(t => t.status === status);
        if (filterTasks.length === 0) {
            console.log(`No tag with status: ${status}`)
            return;
        }
        console.log(`List tasks with status: ${status}`)
    }
    console.log('='.repeat(80));
    filterTasks.forEach(item => {
        console.log(`ID: ${item.id}`)
        console.log(`Description: ${item.description}`)
        console.log(`Status: ${item.status}`)
        console.log(`createdAt: ${item.createdAt.toISOString()}`)
        console.log(`updateAt: ${item.updateAt.toISOString()}`)
    });
    console.log('='.repeat(80));
}
function updateTasks(id, newDescription) {
    if (!id || !newDescription) {
        console.error('Error: Please provide task ID and new description')
        return;
    }
    const tasks = readTasks();
    //validate id
    const taskIndex = tasks.findIndex(t => t.id === parseInt(id))
    if (taskIndex === -1) {
        console.error(`Error: Task with ID ${id} not found`)
        return;
    }
    tasks[taskIndex].description = newDescription.trim()
    tasks[taskIndex].updateAt = new Date().toISOString()
    writeTasks(tasks);
    console.log(`Task ${id} updated successfully`);
}
function deleteTask(id) {
    if (!id) {
        console.error('Error: Please provide task ID')
        return;
    }
    const tasks = readTasks()
    const taskIndex = tasks.findIndex(t => t.id === parseInt(id));
    if (taskIndex === -1) {
        console.error(`Error: Task with ID ${id} not found`)
        return;
    }
    tasks.splice(taskIndex, 1);
    writeTasks(tasks)
    console.log(`Task ${id} deleted successfully`);
}
function markTask(id, newStatus) {
    if (!id || !newStatus) {
        console.error('Error: Please provide task ID and Status')
        return;
    }
    const validateStatus = ['todo', 'in-progress', 'done']
    if (!validateStatus.includes(newStatus)) {
        console.error('Error: Invalid status');
        return;
    }
    const tasks = readTasks()
    const taskIndex = tasks.findIndex(t => t.id === parseInt(id));
    if (taskIndex === -1) {
        console.error(`Error: Task with ID ${id} not found`)
        return;
    }
    tasks[taskIndex].status = newStatus;
    tasks[taskIndex].updatedAt = new Date().toISOString();

    writeTasks(tasks)
    console.log(`Task ${id} marked as ${newStatus}`);
}
function main() {
    const args = process.argv.slice(2)
    console.log('args', args)
    const command = args[0]
    console.log('command', command)
    switch (command) {
        case 'add':
            const description = args[1];
            addTask(description);
            break;
        case 'list':
            const status = args[1]
            listTasks(status)
            break;
        case 'update':
            updateTasks(args[1], args[2])
            break;
        case 'delete':
            deleteTask(args[1])
            break;
        case 'mark-in-progress':
            markTask(args[1], 'in-progress')
            break;
        case 'mark-done':
            markTask(args[1], 'done')
            break;
        default:
            console.log('Unknown command. Use: add, update, delete, list, mark-in-progress, mark-done');
    }
}
main()