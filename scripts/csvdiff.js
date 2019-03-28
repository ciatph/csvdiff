/**
 * Compares (2) identical column csv files and write their similar 
 * columns and rows into an output csv file
 * ciatph; 20190329
 */

const _fs = require('fs');
const _fastcsv = require('fast-csv');


var CSVDiff = function() {
    this.TYPE_FILE_BASE = 1;
    this.TYPE_FILE_COMPARE = 2;

    // Base file to reference
    this.file1 = {
        path: '',
        csvdata: []
    };

    // File to compare to base file
    // file to compare to base file
    this.file2 = {
        path: '',
        csvdata: []
    };

    // Items that are present in file_compare but absent in file_base
    this.diff = [];

    // CSV table column to compare
    this.column_check;

    // filename where output results will be written
    this.filename_out = '';    

    // Print console logs
    this.log = true;
};


/**
 * Sets the column names to check for equal content in the CSV files
 * @param {Array[] of String column names to check for equality } columns 
 */
CSVDiff.prototype.setColumnCheck = function(columns){
    this.column_check = columns;
};


/**
 * Set the filename of CSV file where output data will be written
 * @param {String: CSV output filename} filename 
 */
CSVDiff.prototype.setOutputFilename = function(filename){
    this.filename_out = filename;
};


/**
 * Set the base or reference file
 * @param {CSV file path with file name} filepath 
 * @param {CSV reference type: TYPE_FILE_BASE | TYPE_FILE_COMPARE} type 
 */
CSVDiff.prototype.setFile = function(filepath, type){
    if(type === this.TYPE_FILE_BASE){
        this.file1 = {
            path: '',
            csvdata: []
        };

        this.file1.path = filepath;
    }
    else if(this.TYPE_FILE_COMPARE){
        this.file2 = {
            path: '',
            csvdata: []
        };

        this.file2.path = filepath;
    }
};


/**
 * Read the CSV file
 * @param {CSV file path to read} file 
 */
CSVDiff.prototype.readFile = function(fileObject, callback){
    let readableStreamInput = _fs.createReadStream(fileObject.path);

    _fastcsv
        .fromStream(readableStreamInput, {headers: true})
        .on('data', function(data){
            let rowData = {};

            Object.keys(data).forEach(key => {
                rowData[key] = data[key];
            });

            fileObject.csvdata.push(rowData);
        })
        .on('end', () => {
            if(callback !== undefined)
                callback();
        });
};


/**
 * Write the difference of selected column to a text file
 */
CSVDiff.prototype.writeToFile = function(){
    _fs.writeFile('results.txt', this.diff.toString(), function(err) {
        if (err) {
            return console.log('Error writing file. ' + err);
        }
        console.log('Difference saved as results.txt');
    })
};


CSVDiff.prototype.getArray = function(objArray, columnName){
    let array = [];
    objArray.forEach((item) => {
        array.push(item[columnName]);
    });
    return array;
};


/**
 * Compare each column of @file2's row with @file1 for an exact row-match.
 * Store all "not found" items to this.difference[]. 
 * Return an array[] containing the indices of all matched rows
 * @param {Array of JSON data (converted from CSV). Reference file} file1 
 * @param {Array of JSON data (converted from CSV). File to compare} file2
 */
CSVDiff.prototype.difference = function(file1, file2){
    let f1 = (file1 !== undefined) ? file1 : this.file1.csvdata;
    let f2 = (file2 !== undefined) ? file2 : this.file2.csvdata;
    f1 = this.getArray(f1, this.column_check);
    f2 = this.getArray(f2, this.column_check);
    let base = f1;
    let find = f2;

    if (base.length !== find.length) {
        base = (f1.length > f2.length) ? f1 : f2;
        find = (f1.length < f2.length) ? f1 : f2;
    }

    if (this.log){
        console.log(base.toString());
        console.log(find.toString());
    }

    base.forEach((item) => {
        if (find.indexOf(item) === -1) {
            this.diff.push(item);
            if (this.log)
                console.log('not found ' + item);
        }
    });

    console.log('checking base ' + base.length + ' against to check ' + find.length);
    return this.diff;
};


module.exports = new CSVDiff();