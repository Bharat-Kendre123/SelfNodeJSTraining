const path = require('path');
const chokidar = require('chokidar');
const util = require('./utility');
const schedular = require('node-schedule');
const logger = require('./logger');

function realTimeWatcher(realTimeJob) {

    logger.debug('Realtime watcher for job ** %s ** has started', realTimeJob.job_name);
    let src_path = path.normalize(realTimeJob.source_path);
    let dest_path = path.normalize(util.getDestPath(realTimeJob));

    logger.info('normlized source path for job %s is %s', realTimeJob.job_name, src_path);
    logger.info('normlized desination path for job %s is %s', realTimeJob.job_name, dest_path);

    // start watcher 
    let watcher = chokidar.watch(src_path, { persistent: true });

    watcher.on('add', function (filePath) {

        logger.debug('Add events is raised for job %s. Filepath - %s', realTimeJob.job_name, filePath);
        let filename = path.basename(filePath);
        if (filename.match(realTimeJob.regex_condition)) {

            let temp_dest_path = path.resolve(dest_path, filename);
            let temp_src_path = path.resolve(src_path, filename);
            realTimeJob.operation == 'copy' ? util.copy(temp_src_path, temp_dest_path) : util.move(temp_src_path, temp_dest_path);

        } else {
            logger.warn('File %s is not matching with regex - %s}', filename, realTimeJob.regex_condition);
        }

    })

}



function scheduledWatcher(scheduledJob) {

    let src_path = path.normalize(scheduledJob.source_path);
    let dest_path = path.normalize(util.getDestPath(scheduledJob));

    logger.debug('Schedula watcher for job ** %s ** has started', scheduledJob.job_name);
    for(let scheduleTime of scheduledJob.scheduler){
        
        startSchedular(scheduledJob, scheduleTime, src_path, dest_path);
    }
}


function startSchedular(scheduledJob, scheduleTime, src_path, dest_path){

    console.log(`schedule job ** ${scheduledJob.job_name} started `);
    
    let watcher;

    schedular.scheduleJob(scheduleTime.from, function () {

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

    schedular.scheduleJob(scheduleTime.to, () => {
        if (watcher) {
            watcher.close();
            console.log(`schedule job ** ${scheduledJob.job_name} closed `);
        }
    })
}


// export what you need. Put all properties in export object

exports.realTimeWatcher = realTimeWatcher;
exports.scheduledWather = scheduledWatcher;
