import Queue from '@/infra/queue/implementation/Queue';
import { Request, Response } from 'express';

class QueueController {
  async create(request: Request, response: Response): Promise<Response> {
    await Queue.add('integration', {});

    return response.json({
      status: 'sucess',
      message:
        'we are processing the integration, in a moment check your bling account for new data',
    });
  }
}

export default QueueController;
