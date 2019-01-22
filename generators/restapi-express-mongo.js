const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs')
const sh = require('shelljs')

exports.generate = async (current_dir, projectName, templatePath) => {
  const question0 = {
    name: 'db_url',
    type: 'input',
    message: 'Enter database url: ',
    default: 'mongodb://localhost:27017/db'
  }

  const answer0 = await inquirer.prompt(question0)
  const db_url = answer0['db_url']

  const db_files = [path.join(current_dir, projectName, 'app.js')]
  for (const db_file of db_files) {
    await sh.sed('-i', 'db_url', db_url, db_file)
  }

  await sh.exec(
    'cd ' +
      path.join(current_dir, projectName, '/') +
      ' && git init && touch .gitignore && echo "node_modules" > .gitignore'
  )

  const question1 = {
    name: 'install-n-start',
    type: 'confirm',
    message: 'Project created. May i run `npm install && npm start`'
  }

  const answer1 = await inquirer.prompt(question1)
  const install_n_start = answer1['install-n-start']
  if (install_n_start) {
    await sh.exec(
      'cd ' +
        path.join(current_dir, projectName, '/') +
        ' && npm install && npm start'
    )
  } else {
    console.log('Have a good day!')
  }
}
