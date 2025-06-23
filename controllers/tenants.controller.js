import Tenant from "../models/tenants.model.js";
import {
  createNew,
  deleteById,
  getAll,
  getById,
  updateById,
} from "../utils/controller.helper.fxns.js";

export const getTenant = getById(Tenant);

export const getTenants = getAll(Tenant);

export const createTenant = createNew(Tenant, { unique: true });

export const updateTenant = updateById(Tenant);

export const deleteTenant = deleteById(Tenant);
