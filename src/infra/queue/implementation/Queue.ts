/* eslint-disable @typescript-eslint/ban-types */
import Queue, { Job } from 'bull';
import * as jobs from '@/infra/jobs';
import Config from '@/config/index';
import logger from '@/utils/logger';

const queues = Object.values(jobs).map(job => ({
  bull: new Queue(job.key, {
    redis: Config.redis,
  }),
  name: job.key,
  handle: job.handle,
}));

export default {
  queues,
  add(name: string, data: Object): Promise<Job<void>> | undefined {
    const queue = this.queues.find(q => q.name === name);
    return queue?.bull.add(data);
  },
  process(): void {
    return this.queues.forEach(queue => {
      queue.bull.process(queue.handle);
      queue.bull.on('failed', (job, error) => {
        logger.error('Error Job');
        logger.error(error);
        logger.error(job.data, queue.name);
      });
    });
  },
};
