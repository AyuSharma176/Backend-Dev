const fs = require('fs');

fs.copyFile('./file_handling.txt', './copied_file.txt', (err) => {
    if (err) {
        console.log('Error while copying file');
        return;
    }
    console.log('File is copied');
});

fs.writeFile('./newFile.txt', 'This is new file', (err) => {
    if (err) {
        console.log('Error while writing file');
        return;
    }
    console.log('File is created');
});

fs.mkdir('./folders/folder2', {recursive: true}, (err) => {
    if (err) {
        console.log('');
        return;
    }
    console.log('Directory is created');
});

fs.readdir('./file_handling_files', (err, files) => {
    if (err) {
        console.log('Error while reading directory');
        return;
    }
    console.log(files);
});
