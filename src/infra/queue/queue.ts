import 'dotenv/config';
import '@/infra/typeorm';

import Queue from './implementation/Queue';

Queue.process();
