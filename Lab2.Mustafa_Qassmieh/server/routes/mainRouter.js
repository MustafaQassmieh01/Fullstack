import express from 'express';
import {Controller} from '../controller/index.js';


export const router = express.Router();

router.post('/api/employees', Controller.createEmployee);
router.post('/api/projects', Controller.createProject);
router.post('/api/assignments',Controller.assignToProject);
router.get('/api/assignments', Controller.getAssignments);