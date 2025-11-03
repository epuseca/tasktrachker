# Task Tracker CLI

A command-line interface application for managing tasks with basic CRUD operations.

## Features

- Add new tasks
- List all tasks or filter by status
- Update task descriptions
- Delete tasks
- Mark tasks as in-progress or done
- Persistent storage using JSON file

## Installation

1. Clone this repository
2. Make sure you have Node.js installed
3. Navigate to the project directory

## Usage

### Add a new task
```sh
node task-cli.js add "Your task description"
```

### List tasks
List all tasks:
```sh
node task-cli.js list
```

List tasks by status (todo/in-progress/done):
```sh
node task-cli.js list todo
```

### Update a task
```sh
node task-cli.js update <task-id> "New description"
```

### Delete a task
```sh
node task-cli.js delete <task-id>
```

### Mark task status
Mark as in-progress:
```sh
node task-cli.js mark-in-progress <task-id>
```

Mark as done:
```sh
node task-cli.js mark-done <task-id>
```

## Task Statuses

- `todo` - Default status for new tasks
- `in-progress` - Tasks that are currently being worked on
- `done` - Completed tasks

## Data Storage

Tasks are stored in `tasks.json` in the project root directory. Each task contains:
- Unique ID
- Description
- Status
- Creation timestamp
- Last update timestamp

## Error Handling

The application includes error handling for:
- Invalid commands
- Missing task descriptions
- Invalid task IDs
- Invalid status values
- File read/write operations