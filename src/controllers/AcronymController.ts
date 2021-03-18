import { Request, Response } from 'express';
import {
  countAcronyms,
  createAcronym,
  getAcronym,
  searchAcronyms,
} from '../useCases/acronym';
import { ICreateRequest, IFindRequest, ISearchQuery } from './@types';

export class AcronymController {
  async create(
    request: Request<any, any, ICreateRequest>,
    response: Response
  ): Promise<Response> {
    try {
      const { text, definition } = request.body;
      if (!text || !definition) {
        console.log(request.body);
        return response.status(400).json({
          error: 'Please, provide the text and the definition of the acronym.',
        });
      }
      await createAcronym({ text, definition });

      return response.status(201).send();
    } catch (error) {
      console.log(error);

      return response
        .status(400)
        .json({ error, message: 'error while creating new acronym.' });
    }
  }

  async search(
    request: Request<any, any, any, ISearchQuery>,
    response: Response
  ): Promise<Response> {
    try {
      const { from, limit, search } = request.query;
      const acronymsList = await searchAcronyms({
        from: Number(from),
        limit: Number(limit),
        search,
      });
      const total = await countAcronyms({
        search,
      });

      return response
        .set({
          'Api-Total-Count': total,
          'Api-Remaining': Math.max(total - Number(from) - Number(limit), 0),
        })
        .status(200)
        .json(acronymsList);
    } catch (error) {
      console.log(error);
      return response
        .status(400)
        .json({ error, message: 'error while searching new acronym.' });
    }
  }

  async find(
    request: Request<IFindRequest>,
    response: Response
  ): Promise<Response> {
    try {
      const { text } = request.params;
      const acronym = await getAcronym({ text });

      return acronym
        ? response.status(200).json(acronym)
        : response.status(404).send();
    } catch (error) {
      console.log(error);
      return response
        .status(400)
        .json({ error, message: 'error while getting new acronym.' });
    }
  }
}
