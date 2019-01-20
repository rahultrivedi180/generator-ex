#!/usr/bin/env
const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs')
const shell = require('shelljs')

const CUR_DIR = process.cwd()
const CHOICES = fs.readdirSync(path.join(__dirname, 'templates'))
shell.exec('clear')
const QUESTIONS = [
  {
    name: 'template-choice',
    type: 'list',
    message: 'Select a template: ',
    choices: CHOICES
  },
  {
    name: 'project-name',
    type: 'input',
    message: 'Set a project name: ',
    default: 'express-project',
    validate: function(input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) {
        return true
      } else {
        return '!!Invalid project name!!'
      }
    }
  }
]

async function ReadFile() {
  try {
    const answers = await inquirer.prompt(QUESTIONS)
    const templateChoice = answers['template-choice']
    const projectName = answers['project-name']
    const templatePath = path.join(__dirname, 'templates', templateChoice)

    await shell.mkdir(path.join(CUR_DIR, projectName))

    const source = path.join(templatePath, '/*')
    const destnation = path.join(__dirname, projectName, '/')
    const dbFile = path.join(CUR_DIR, projectName, 'app.js')
    const copyDir = await shell.cp('-R', source, destnation)
    const DB = {
      name: 'DB_URL',
      type: 'input',
      message: 'Specify database url: ',
      default: 'mongodb://localhost/db',
      validate: function(input) {
        if (/^([A-Za-z0-9\/\:])+$/.test(input)) {
          return true
        } else {
          return '!!Invalid database name!!'
        }
      }
    }

    const getDB_URL = await inquirer.prompt(DB)
    const DB_URL = getDB_URL['DB_URL']
    await shell.sed('-i', 'DB_URL', DB_URL, dbFile)
    await shell.exec('cd ' + destnation + ' && npm install && npm start')
  } catch (err) {
    console.log(err)
  }
}
ReadFile()
