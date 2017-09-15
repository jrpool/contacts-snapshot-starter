const {exec, execSync} = require('child_process');

const webdriver = require('selenium-webdriver'),
  By = webdriver.By,
  until = webdriver.until,
  browser = 'chrome';

const makeDriver = () => {
  return new webdriver.Builder().forBrowser(browser).build();
};

const reload = () => {
  execSync('npm run load_schema && npm run load_contacts');
  return '';
};

module.exports = {browser, By, makeDriver, reload, until};
