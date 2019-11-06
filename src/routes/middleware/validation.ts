import { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from 'http-status-codes';
import Joi from '@hapi/joi';
import { logger } from '@shared';

export default (schema: Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        const valid = error == null;

        if (valid) {
            next();
        } else {
            const { details } = error;
            const message = details.map((i) => i.message).join(', ');

            logger.error(message, error);
            res.status(BAD_REQUEST).json({ error: message });
        }
    };
};
