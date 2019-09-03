// We have defined all JOBs configuration in this file

const jobs = [
    {
        job_name: 'job1',
        source_path: './in_out_folder/source/job1',
        dest_path: './in_out_folder/destination/job1',
        regex_condition: /\d.txt/,
        operation: 'copy',
        type: 'scheduled',
        scheduler: {
            from: '5 * 16 * * *',  // sec minute hour day month week 
            to: '45 * 16 * * *'     // * means
        },
        enabled: true
    },
    {
        job_name: 'job2',
        source_path: './in_out_folder/source/job2',
        dest_path: './in_out_folder/destination/job2',
        regex_condition: /\d.txt/,
        operation: 'move',
        type: 'realtime',
        scheduler: {
            from: '00 06 15 * * *',  // HH:mm  -  24 hour format. Considers local systems time
            to: '00 55 15 * * *'
        },
        enabled: false
    },
    {
        job_name: 'job3',
        source_path: './in_out_folder/source/job3',
        dest_path: './in_out_folder/destination/job3',
        regex_condition: /\d.txt/,
        operation: 'move',
        type: 'realtime',
        scheduler: {
            from: '00 53 14 * * *',  // HH:mm  -  24 hour format. Considers local systems time
            to: '00 55 14 * * *'
        },
        enabled: false
    }, {
        job_name: 'job4',
        source_path: './in_out_folder/source/job4',
        dest_path: './in_out_folder/destination/job4',
        regex_condition: /\d.txt/,
        operation: 'move',
        type: 'scheduled',
        scheduler: {
            from: '00 13 15 * * *',  // HH:mm  -  24 hour format. Considers local systems time
            to: '00 19 15 * * *'
        },
        enabled: false
    },
    {
        job_name: 'job5',
        source_path: './in_out_folder/source/job5',
        dest_path: './in_out_folder/destination/job5',
        regex_condition: /\d.txt/,
        operation: 'move',
        type: 'realtime',
        scheduler: {
            from: '00 53 14 * * *',  // HH:mm  -  24 hour format. Considers local systems time
            to: '00 55 14 * * *'
        },
        enabled: false
    }
];


// exporting configured jobs

module.exports = jobs;
