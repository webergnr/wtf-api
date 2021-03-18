import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authHeader = request.headers.authorization as string;

  if (!authHeader) {
    return response.status(401).json({
      message: 'Authorization header not present.',
    });
  }

  /*
      If its a "bearer token" or anything like that:
      const [, token] = authHeader.split(' ');

      if (!token) {
        return response.status(401).json({
          message: 'Token not present.',
        });
      }
  */

  try {
    /*
      Here we can add a fancy token validation
      and set the user within the request
      Eg:
      const decoded = jwt.verify(token, 'secret');
      request.user = { id: decoded.user_id };
    */

    next();
  } catch (err) {
    throw new Error('Token not valid.');
  }
};
