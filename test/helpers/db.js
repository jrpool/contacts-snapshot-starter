const {exec, execSync} = require('child_process');
const webdriver = require('selenium-webdriver')
const By = webdriver.By
const until = webdriver.until

const reloadDatabase = function(){
  exec('npm run load_schema && npm run load_contacts')
};

let driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build();

  module.exports = {
    webdriver,
    driver,
    By,
    until,
    reloadDatabase
  }
