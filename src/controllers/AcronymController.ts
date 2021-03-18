import { Request, Response } from 'express';
// import { createAcronym } from '../useCases/acronym/createAcronym';

export class AcronymController {
  async create(request: Request, response: Response): Promise<Response> {
    return response.status(201).send();
  }
}
