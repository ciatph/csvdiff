var csvdiff = require('./scripts/csvdiff.js');

// Set the original base data set to search from
csvdiff.setFile('./data/masterlist.csv', csvdiff.TYPE_FILE_BASE);

// Set data set to look for in the TYPE_FILE_BASE
csvdiff.setFile('./data/newlist.csv', csvdiff.TYPE_FILE_COMPARE);

// Set the CSV file output filename (where rows from TYPE_FILE_COMPARE 
// that matches with TYPE_FILE_BASE will be written)
csvdiff.setOutputFilename('results.csv');

// Set the CSV columns to check for in TYPE_FILE_BASE and TYPE_FILE_COMPARE.
// The CSV files can contain other column names but should have similar column names listed here, in any order
csvdiff.setColumnCheck([
    'name'
]);

// Print detailed logs
// csvdiff.log = false;

csvdiff.readFile(csvdiff.file1, function() {
    csvdiff.readFile(csvdiff.file2, function() {
        console.log('file 1: ' + csvdiff.file1.csvdata.length + ' rows (' + csvdiff.file1.path + ')');
        console.log('file 2: ' + csvdiff.file2.csvdata.length + ' rows (' + csvdiff.file2.path + ')');
        const items = csvdiff.difference();
        console.log('Difference: ' + items.length);
        csvdiff.writeToFile();
    });
});