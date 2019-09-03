const fs = require('fs');
const moveFile = require('move-file');

function customCopy(src_copy_path, dest_paste_path) {

    fs.copyFile(src_copy_path, dest_paste_path, err => {

        if (err) {
            throw err;
        }
        console.log(`File copied successfully`);
    })
}


async function customMovefile(src_move_path, dest_paste_path) {

    try {
        await moveFile(src_move_path, dest_paste_path);
        console.log(`File moved succesfully`);
    } catch (err) {
        console.log('Error Occured while transfering the files')
        throw err;
    }

}


function findDestinationPath( job ){
    return job.arch_path ? job.arch_path : job.dest_path;
    }



// export what you need. Put all properties in export object

exports.copy = customCopy;
exports.move = customMovefile;
exports.getDestPath = findDestinationPath;