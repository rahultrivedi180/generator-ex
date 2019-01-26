const inquirer = require('inquirer')
const path = require('path')
const sh = require('shelljs')

exports.paths = function(current_dir, projectName) {
  const projectDir = path.join(current_dir, projectName, '/')
  const packageJson = path.join(projectDir, 'package.json')
  const appJs = path.join(projectDir, 'app.js')

  return {
    projectDir,
    packageJson,
    appJs
  }
}

exports.execs = {
  gitInit:
    '&& git init && touch .gitignore && echo "node_modules" > .gitignore',
  npmInstall: '&& npm install && npm start'
}

exports.dbUrl = async function() {
  const question = {
    name: 'dbUrl',
    type: 'input',
    message: 'Enter database url: ',
    default: 'mongodb://localhost:27017/db'
  }
  const answer = await inquirer.prompt(question)
  return answer['dbUrl']
}

exports.npmInstall = async function(projectDir, npmInstall) {
  const question = {
    name: 'install-n-start',
    type: 'confirm',
    message: 'Project created. May i run `npm install` and `npm start`'
  }

  const answer = await inquirer.prompt(question)
  if (answer['install-n-start']) {
    await sh.exec('cd ' + projectDir + npmInstall)
  } else {
    console.log('goodbye!')
  }
}
