const inquirer = require('inquirer')
const path = require('path')
const sh = require('shelljs')
const globals = require('../globals')

exports.generate = async (current_dir, projectName) => {
  // FILES and DIRECTORIES
  const paths = globals.paths(current_dir, projectName)
  const projectDir = paths.projectDir
  const packageJson = paths.packageJson

  // SH EXEC COMMANDS
  const gitInit = globals.execs.gitInit
  const npmInstall = globals.execs.npmInstall

  await sh.sed('-i', 'project-name', projectName, packageJson)

  const dbUrl = await globals.dbUrl()
  const dbFiles = [paths.appJs]
  for (const dbFile of dbFiles) {
    console.log(dbFile)
    await sh.sed('-i', 'db_url', dbUrl, dbFile)
  }
  await sh.exec('cd ' + projectDir + gitInit)
  await globals.npmInstall(projectDir, npmInstall)
}
