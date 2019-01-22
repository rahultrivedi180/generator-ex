#!/usr/bin/env node
const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs')
const sh = require('shelljs')
const current_dir = process.cwd()
const choices = fs.readdirSync(path.join(__dirname, 'templates'))

const generator0 = require('./generators/restapi-express-mongo').generate

sh.exec('clear')

const questions = [
  {
    name: 'template-choice',
    type: 'list',
    message: 'Select a template: ',
    choices: choices
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

async function init() {
  try {
    const answers = await inquirer.prompt(questions)
    const templateChoice = answers['template-choice']
    const projectName = answers['project-name']
    const templatePath = path.join(__dirname, 'templates', templateChoice)
    const src = path.join(templatePath, '/*')
    const dest = path.join(current_dir, projectName, '/')

    await sh.mkdir(path.join(current_dir, projectName))
    const cp = await sh.cp('-R', src, dest)

    if (templateChoice === choices[0]) {
      generator0(current_dir, projectName, templatePath)
    }
  } catch (err) {
    console.log(err)
  }
}
init()
