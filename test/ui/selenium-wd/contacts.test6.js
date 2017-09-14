const webdriver = require('selenium-webdriver'),
  By = webdriver.By,
  until = webdriver.until;

const driver = new webdriver.Builder()
  .forBrowser('safari')
  .build();

driver.get('http://www.google.com/ncr');
driver.findElement(By.name('q')).sendKeys('lq');
driver.findElement(By.name('btnK')).click();
driver.wait(until.titleIs('lq - Google Search'), 5000);
driver.quit();
