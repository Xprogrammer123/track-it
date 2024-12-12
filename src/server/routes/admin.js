import express from 'express';
import { getUsers, updatePackageStatus, deleteUser } from '../controllers/admin.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.use(authMiddleware, adminMiddleware);

router.get('/users', getUsers);
router.put('/packages/:packageId/status', updatePackageStatus);
router.delete('/users/:userId', deleteUser);

export default router;