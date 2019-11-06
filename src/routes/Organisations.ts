import { OrganisationDao, IOrganisationDao } from '@daos';
import { logger } from '@shared';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK, NOT_FOUND } from 'http-status-codes';
import { Organisation, OrganisationSchema, IOrganisation } from '@entities';
import ValidationMiddleware from './middleware/validation';

const router = Router();
const organisationDao: IOrganisationDao = new OrganisationDao();

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const organisation = await organisationDao.find(req.params.id);
        if (organisation !== null) {
            res.send(organisation);
        } else {
            res.status(NOT_FOUND).send();
        }
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

router.post('/', ValidationMiddleware(OrganisationSchema), async (req: Request, res: Response) => {
    try {
        const dto: IOrganisation = req.body;
        const organisation = new Organisation(dto.name, dto.founded, dto.revenue, dto.parentId);
        await organisationDao.add(organisation);
        return res.status(CREATED).json(organisation);
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: 'Could not create organisation',
        });
    }
});

router.put('/:id', ValidationMiddleware(OrganisationSchema), async (req: Request, res: Response) => {
    try {
        const dto: IOrganisation = req.body;
        const organisation = await organisationDao.find(req.params.id);
        if (!organisation) {
            return res.status(BAD_REQUEST).json({
                error: 'Organisation does not exist',
            });
        }
        organisation.name = dto.name;
        organisation.founded = dto.founded;
        organisation.revenue = dto.revenue;
        organisation.parentId = dto.parentId;
        await organisationDao.update(organisation as Organisation);
        return res.status(OK).json(organisation);
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: 'Could not update organisation',
        });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const organisation = await organisationDao.find(req.params.id);
        if (!organisation) {
            return res.status(BAD_REQUEST).json({
                error: 'Organisation does not exist',
            });
        }
        await organisationDao.delete(organisation as Organisation);
        return res.status(OK).send();
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: 'Could not delete organisation',
        });
    }
});

export default router;
