## csvdiff

Retrieves the items from a CSV column that are not present from the columns of another CSV file.


## Prerequisites
NodeJS must have been installed in your system. Used version as of this writing is Node = v10.15.2, Npm = 6.4.0.


### Dependency Libraries
These are node modules that are used in this project.

- **fast-csv** v.2.4.1


## Installation/Usage
1. Clone this repository to your local PC, or download as a `.zip` file.
2. Go into the project directory from the command line.
3. Run `npm install`.
4. Obtain the input CSV data sets that will be used. Put them in the `/data` directory.
4. Start debugging using VS Code. Open and edit `index.js` and make sure it contains proper input file names and file paths.
5. Run `npm run diff` from the command line.