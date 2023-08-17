/** @format */

import express from 'express'
import { addCompany, getCompanies, getCompany, updateCompany } from '../controller/CompanyController.js'

const router = express.Router()

router.get('/', getCompanies)
router.get('/:id', getCompany)
router.post('/create', addCompany)
router.patch('/:id', updateCompany)

export default router
