const path = require('path');
const chokidar = require('chokidar');
const util = require('./utility');
const schedular = require('node-schedule');

function realTimeWatcher(realTimeJob) {

    console.log(`Real time job wacher started for ${realTimeJob.job_name}`);
    let src_path = path.normalize(realTimeJob.source_path);
    let dest_path = path.normalize(realTimeJob.dest_path);

    // start watcher 
    let watcher = chokidar.watch(src_path, { persistent: true });

    watcher.on('add', function (filePath) {

        let filename = path.basename(filePath);

        if (filename.match(realTimeJob.regex_condition)) {

            let temp_dest_path = path.resolve(dest_path, filename);
            let temp_src_path = path.resolve(src_path, filename);
            realTimeJob.operation == 'copy' ? util.copy(temp_src_path, temp_dest_path) : util.move(temp_src_path, temp_dest_path);

        } else {
            console.log(`File ${filename} is not matching with regex - ${realTimeJob.regex_condition}`);
        }

    })

}



function scheduledWather(scheduledJob) {

    console.log('I am in scheduled job');
    let src_path = path.normalize(scheduledJob.source_path);
    let dest_path = path.normalize(scheduledJob.dest_path);

    let watcher;

    schedular.scheduleJob(scheduledJob.scheduler.from, function () {

        watcher = chokidar.watch(src_path, { persistent: true });

        watcher.on('add', function (filePath) {
            let filename = path.basename(filePath);

            if (filename.match(scheduledJob.regex_condition)) {
                let temp_src_path = path.resolve(src_path, filename);
                let temp_dest_path = path.resolve(dest_path, filename);
                scheduledJob.operation == 'copy' ? util.copy(temp_src_path, temp_dest_path) : util.move(temp_src_path, temp_dest_path);
            } else {
                console.log(`File ${filename} is not matching with regex - ${scheduledJob.regex_condition}`);
            }
        })
    });

    schedular.scheduleJob(scheduledJob.scheduler.to, () => {
        if (watcher) {
            watcher.close();
            console.log(`${scheduledJob.job_name} Watcher closed`);
        }
    })

}


// export what you need. Put all properties in export object

exports.realTimeWatcher = realTimeWatcher;
exports.scheduledWather = scheduledWather;
