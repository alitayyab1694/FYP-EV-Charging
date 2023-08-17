import Company from '../models/Company.js'
import HttpError from '../util/http-error.js'

export const getCompanies = async (req, res, next) => {
  try {
      const { search } = req.query;
    let query = {};
    if (search) {
      query = { name: { $regex: new RegExp(search, 'i') } };
    }
    const company = await Company.find(query)
    res.status(200).json(company)
  } catch (error) {
    console.log('error', error)
    next(error)
  }
}

export const getCompany = async (req, res, next) => {
  try {
    const { id } = req.params
    const company = await Company.findById(id)
    if (!company) {
      const err = new HttpError('company not found', 404)
      next(err)
    }
    res.status(200).json(company)
  } catch (error) {
    console.log('error', error)
    next(error)
  }
}

export const addCompany = async (req, res, next) => {
  try {
    const newcompany = req.body
    const company = new Company(newcompany)
    const createdcompany = await company.save()
    res.status(200).json(createdcompany)
  } catch (error) {
    console.log('error', error)
    next(error)
  }
}

export const updateCompany = async (req, res, next) => {
  try {
    const { id } = req.params
    const company = await Company.findById({ _id: id })
    if (!company) {
      const error = new HttpError('Chargbox not found', 404)
      return next(error)
    }
    const oldCompany = req.body
    delete oldCompany._id
    delete oldCompany.createdAt
    delete oldCompany.updatedAt
    const updatedCompany = await Company.findOneAndUpdate(
      { _id: id },
      oldCompany
    )
    res.status(200).json(updatedCompany)
  } catch (error) {
    console.log('error', error)
    next(error)
  }
}


