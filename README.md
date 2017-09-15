# contacts-snapshot-starter

Testing an existing web application that queries an API.

## Project Members

[Jonathan Pool](https://github.com/jrpool)

[Rhonda Smith](https://github.com/smithrm941)

## Discussion

### Requirement Summary

This application satisfies the [requirements](https://curriculum.learnersguild.org/modules/Testing-Snapshot--Goal-446/) of the “Testing Snapshot” module (Module 446) in Phase 3 of the [Learners Guild][lg] curriculum.

### Implementation Summary

The required end-to-end and integration tests were implemented with the `mocha` and `chai` libraries. The UI tests were implemented with the `selenium-webdriver` library.

Experiments with using `zombie` as a UI testing library were conducted, and incomplete and erroneous code for these is present in the “test” directory, for inspection and further development if desired.

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
