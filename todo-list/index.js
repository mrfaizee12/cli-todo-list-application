#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.bgBlueBright.bold("\n \t Welcome to Faizee todo list App\n"));
let todos = [];
let condition = true;
async function main() {
    while (condition) {
        let choice = await inquirer.prompt([
            {
                name: 'option',
                type: 'list',
                message: 'Choose an option:',
                choices: ['Add Task', 'Read Tasks', 'Update Task', 'Delete Task', 'Exit']
            }
        ]);
        switch (choice.option) {
            case 'Add Task':
                await addTask();
                break;
            case 'Read Tasks':
                readTasks();
                break;
            case 'Update Task':
                await updateTask();
                break;
            case 'Delete Task':
                await deleteTask();
                break;
            case 'Exit':
                condition = false;
                console.log(chalk.red.bold('Exiting...'));
                break;
        }
    }
}
async function addTask() {
    let addTask = await inquirer.prompt([
        {
            name: 'todo',
            type: 'input',
            message: "What do you want to add to your Todos?"
        }
    ]);
    todos.push(addTask.todo);
    console.log(chalk.bgGreenBright.bold(`\n \t${addTask.todo} task added to todo list.\n`));
}
function readTasks() {
    console.log(chalk.bgGreenBright.bold('\n \t Your Todo List:\n'));
    todos.forEach((task, index) => {
        console.log(chalk.yellowBright.bold(`\n \t ${index + 1}. ${task}\n`));
    });
}
async function updateTask() {
    if (todos.length === 0) {
        console.log(chalk.yellow('No tasks to update.'));
        return;
    }
    let updateChoice = await inquirer.prompt([
        {
            name: 'index',
            type: 'number',
            message: 'Enter the index of the task you want to update:',
            validate: input => input > 0 && input <= todos.length || 'Invalid index.'
        },
        {
            name: 'updatedTask',
            type: 'input',
            message: 'Enter the updated task:'
        }
    ]);
    todos[updateChoice.index - 1] = updateChoice.updatedTask;
    console.log(chalk.bgMagentaBright.bold('\n \t Task updated successfully.\n'));
}
async function deleteTask() {
    if (todos.length === 0) {
        console.log(chalk.yellow('No tasks to delete.'));
        return;
    }
    let deleteChoice = await inquirer.prompt([
        {
            name: 'index',
            type: 'number',
            message: 'Enter the index of the task you want to delete:',
            validate: input => input > 0 && input <= todos.length || 'Invalid index.'
        }
    ]);
    todos.splice(deleteChoice.index - 1, 1);
    console.log(chalk.bgRedBright.bold('\n \t Task deleted successfully.\n'));
}
main();
