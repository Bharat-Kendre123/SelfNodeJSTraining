// We have defined all JOBs configuration in this file

const loggingLevel = 'debug';
const jobs = [
    {
        job_name: 'job1',
        source_path: './in_out_folder/source/job1',
        dest_path: './in_out_folder/destination/job1',
        arch_path:'./in_out_folder/archive/job1',
        regex_condition: /\d.txt/,
        operation: 'copy',
        type: 'scheduled',
        scheduler:[{
            from: '00 25 11 * * *',  //sec min hour day month week
            to: '00 30 11 * * *'
        },{
            from: '00 35 11 * * *',  
            to: '00 40 11 * * *'
        }
        ] ,
        enabled: true
    },
    {
        job_name: 'job2',
        source_path: './in_out_folder/source/job2',
        dest_path: './in_out_folder/destination/job2',
        arch_path:'',
        regex_condition: /\d.txt/,
        operation: 'move',
        type: 'realtime',
        scheduler:[{
            from: '00 25 11 * * *',  
            to: '00 30 11 * * *'
        },{
            from: '00 35 11 * * *',  
            to: '00 40 11 * * *'
        }
        ] ,
        enabled: true
    },
    {
        job_name: 'job3',
        source_path: './in_out_folder/source/job3',
        dest_path: './in_out_folder/destination/job3',
        regex_condition: /\d.txt/,
        operation: 'move',
        type: 'realtime',
        scheduler:[{
            from: '00 53 14 * * *',  
            to: '00 55 14 * * *'
        },{
            from: '00 53 14 * * *',  
            to: '00 55 14 * * *'
        }
        ] ,
        enabled: true
    }, {
        job_name: 'job4',
        source_path: './in_out_folder/source/job4',
        dest_path: './in_out_folder/destination/job4',
        arch_path:'./in_out_folder/archive/job4',
        regex_condition: /\d.txt/,
        operation: 'move',
        type: 'scheduled',
        scheduler:[{
            from: '00 30 11 * * *',  
            to: '00 35 11 * * *'
        }
        ] ,
        enabled: true
    },
    {
        job_name: 'job5',
        source_path: './in_out_folder/source/job5',
        dest_path: './in_out_folder/destination/job5',
        regex_condition: /\d.txt/,
        operation: 'move',
        type: 'realtime',
        scheduler:[{
            from: '00 53 14 * * *',  
            to: '00 55 14 * * *'
        },{
            from: '00 53 14 * * *',  
            to: '00 55 14 * * *'
        }
        ] ,
        enabled: false
    }
];


// exporting configured jobs

module.exports.jobs = jobs;
module.exports.loggingLevel = loggingLevel;
