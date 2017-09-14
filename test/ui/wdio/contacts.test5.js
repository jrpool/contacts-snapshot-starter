const {execSync} = require('child_process');

const webdriverio = require('webdriverio');
const options = {
  desiredCapabilities: {browserName: 'chrome'},
  logOutput: process.cwd() + '/test/ui',
  logLevel: 'verbose'
};
const client = webdriverio.remote(options);
console.log('About to run official test.');
client
  .init()
  .url('https://duckduckgo.com/')
  .getTitle()
  .then(function(title) {
      console.log('Title is: ' + title);
  })
  .end();
  // client
  //   .init()
  //   .url('https://duckduckgo.com/')
  //   .setValue('#search_form_input_homepage', 'WebdriverIO')
  //   .click('#search_button_homepage')
  //   .getTitle().then(function(title) {
  //       console.log('Title is: ' + title);
  //       // outputs: "Title is: WebdriverIO (Software) at DuckDuckGo"
  //   })
  //   .end();
