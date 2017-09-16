# contacts-snapshot-starter

Testing an existing web application that queries an API.

## Project Members

[Jonathan Pool](https://github.com/jrpool)

[Rhonda Smith](https://github.com/smithrm941)

## Discussion

### Requirement Summary

This application satisfies the [requirements](https://curriculum.learnersguild.org/modules/Testing-Snapshot--Goal-446/) of the “Testing Snapshot” module (Module 446) in Phase 3 of the [Learners Guild][lg] curriculum.

Per the requirements, the above-named authors have created the tests in this repository, but have not created or revised the other code.

### Implementation Summary

The required end-to-end and integration tests were implemented with the `mocha` and `chai` libraries. The UI tests were implemented with the `selenium-webdriver` library.

Experiments with using `zombie` as a UI testing library were conducted, and incomplete and erroneous code for these is present in the “test” directory, for inspection and further development if desired.

### Recommended Improvements

In a code review by Punit Rathore on 2017-09-15, recommendations for improvements included:

- Mocha/chai can wrap system commands, so all existing UI tests could be run within mocha without using the selenium-webdriver mocha integration library.

- Reinitialization between tests can consist of truncations and reloadings of tables, omitting schema reloading, to save substantial execution time (see Phase 3 video on this).

- A makeDriver function in the helper file could be imported and executed in the UI test files.

- Check whether mocha identifies specific `expect` failures (e.g., by line number) when multiple `expect` statements appear in an `it` function. If so, combine more `expect` statements within an `it` when they interrogate the same document.

- Avoid naming values passed by promises to `then` functions “data”. Use more expressive names, even in tests where the values may turn out not to be what the names describe.

- Separate more completely production and test environments by ensuring that any loading scripts and seed data belong to one or the other only.

- Test for more expectations of response data, e.g. not only count of items but what they are, e.g. by checking deep equality of an object with an expected object, and not only 1 item in an array but all (e.g. with .map, .reduce, .join).

## Installation and Configuration

0. These instructions presuppose that (1) [npm][npm] and [PostgreSQL][pg] are installed, (2) there is a PostgreSQL database cluster, (3) PostgreSQL is running, and (4) when you connect to the cluster you are a PostgreSQL superuser.

1. Your copy of this project will be located in its own directory, inside some other directory that you may choose or create. For example, to create that parent directory inside your own home directory’s `Documents` subdirectory and call it `projects`, you can execute:

    `mkdir ~/Documents/projects`

Make that parent directory your working directory, by executing, for example:

    `cd ~/Documents/projects`

2. Clone this project’s repository into it, thereby creating the project directory, named (for example) `testing`, by executing:

    `git clone https://github.com/jrpool/helpshare.git testing`

3. Make the project directory your working directory by executing:

    `cd testing`

4. Install required dependencies (you can see them listed in `package.json`) by executing:

    `npm i`

5. To create the database, execute `npm run db:create`.

6. To equip it with the schema, execute `npm run load_schema`.

7. To seed it with the required data for the tests, execute `npm run load_contacts`.

8. To start the application, execute `npm start`.

9. In a separate terminal window: To perform the `mocha` and `chai` tests, execute `npm run test:mocha`. To perform the `selenium-webdriver` tests, execute `npm run test:selenium`.

[lg]: https://www.learnersguild.org
[npm]: https://www.npmjs.com/
