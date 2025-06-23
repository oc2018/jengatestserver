import Property from "../models/properties.model.js";
import {
  createNew,
  deleteById,
  getAll,
  getById,
  updateById,
} from "../utils/controller.helper.fxns.js";

export const getProperty = getById(Property);

export const getProperties = getAll(Property);

export const createProperty = createNew(Property);

export const updateProperty = updateById(Property);

export const deleteProperty = deleteById(Property);
