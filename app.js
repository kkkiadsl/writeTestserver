
/**
 * Module dependencies.
 */

const cluster = require('cluster');
cluster.schedulingPolicy = cluster.SCHED_RR;
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
	// Fork workers.
	
	for (var i = 0; i < 2; i++) {
		cluster.fork();
	}

	cluster.on('exit', (worker, code, signal) => {
		console.log(`worker ${worker.process.pid}`);
		console.log('exit code = '+code);
		if(code === 1){
			cluster.fork();
		}
	});
} else {
	// Workers can share any TCP connection
	// In this case it is an HTTP server

	require('./server.js');
}
