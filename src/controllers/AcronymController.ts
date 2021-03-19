import { Request, Response } from 'express';

import {
  countAcronyms,
  createAcronym,
  editAcronym,
  getAcronym,
  getRandomAcronyms,
  searchAcronyms,
  removeAcronym,
} from '../useCases/acronym';

import {
  ICreateBodyRequest,
  IEditBodyRequest,
  IEditParams,
  IFindParams,
  IRandomParams,
  IRemoveParams,
  ISearchQuery,
} from './@types';

export class AcronymController {
  async create(
    request: Request<any, any, ICreateBodyRequest>,
    response: Response
  ): Promise<Response> {
    try {
      const { text, definition } = request.body;
      if (!text || !definition) {
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
    request: Request<IFindParams>,
    response: Response
  ): Promise<Response> {
    try {
      const { id } = request.params;
      const acronym = await getAcronym({ id: Number(id) });

      return acronym
        ? response.status(200).json(acronym)
        : response.status(404).send();
    } catch (error) {
      console.log(error);
      return response
        .status(400)
        .json({ error, message: 'error while getting acronym.' });
    }
  }

  async random(
    request: Request<IRandomParams>,
    response: Response
  ): Promise<Response> {
    try {
      const { count } = request.params;
      const validCount = count ? Number(count) : 1;
      const acronyms = await getRandomAcronyms({ count: validCount });

      return response.status(200).json(acronyms);
    } catch (error) {
      console.log(error);
      return response
        .status(400)
        .json({ error, message: 'error while getting acronyms.' });
    }
  }

  async edit(
    request: Request<IEditParams, any, IEditBodyRequest>,
    response: Response
  ): Promise<Response> {
    try {
      const { id } = request.params;
      const { text, definition } = request.body;

      await editAcronym({
        id: Number(id),
        definition,
        text,
      });
      return response.status(204).send();
    } catch (error) {
      console.log(error);
      return response
        .status(400)
        .json({ error, message: 'error while editing acronym.' });
    }
  }

  async remove(
    request: Request<IRemoveParams>,
    response: Response
  ): Promise<Response> {
    try {
      const { id } = request.params;

      await removeAcronym({
        id: Number(id),
      });
      return response.status(204).send();
    } catch (error) {
      console.log(error);
      return response
        .status(400)
        .json({ error, message: 'error while deleting acronym.' });
    }
  }
}
