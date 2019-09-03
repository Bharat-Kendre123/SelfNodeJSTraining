const jobs = require('./config');
const watcher = require('./watcher')


for (let job of jobs) {

    if (job.enabled) {
        job.type == 'realtime' ? watcher.realTimeWatcher(job) : watcher.scheduledWather(job);
    } else {
        console.log(`Job ${job.job_name} is disabled`);
    }
}


