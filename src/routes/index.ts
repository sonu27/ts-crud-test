import { Router } from 'express';
import OrganisationRouter from './Organisations';

// Init router and path
const router = Router();

// Add sub-routes organisations
router.use('/organisations', OrganisationRouter);

// Export the base-router
export default router;
