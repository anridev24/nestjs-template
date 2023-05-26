import { Logger } from '@nestjs/common';
import { cpus } from 'node:os';
import cluster from 'node:cluster';
import process from 'node:process';

const numCPUs = cpus().length;

/**
 * Determine your total CPU to create certain threads to improve the performance
 */
export const clusterize = (callback: () => Promise<void>) => {
  const logger = new Logger('Clustering');

  if (cluster.isPrimary) {
    logger.log(`Master server started`);
    for (let i = 0; i < numCPUs; i += 1) {
      cluster.fork();
    }
    cluster.on('exit', (worker) => {
      logger.log(`Worker ${worker.process.pid} died. Restarting`);
      cluster.fork();
    });
  } else {
    logger.log(`Cluster server started on ${process.pid}`);
    callback();
  }
};
