const config = require('./config');
const watcher = require('./watcher');
const logger = require('./logger')

let jobs = config.jobs;
logger.debug('!!!!!!!   Jobs execution started    !!!!!!!!!!');


for (let job of jobs) {
    
    if (job.enabled) {
        job.type == 'realtime' ? watcher.realTimeWatcher(job) : watcher.scheduledWather(job);
    } else {
        console.log(`Job ${job.job_name} is disabled`);
        throw new Error();
    }
}

logger.debug('!!!!!!!   All Jobs are running in Async    !!!!!!!!!!');
