import Txn from "../models/txn.model.js";
import {
  createNew,
  deleteById,
  getAll,
  getById,
  updateById,
} from "../utils/controller.helper.fxns.js";

export const getTxn = getById(Txn);

export const getTxns = getAll(Txn);

export const createTxn = createNew(Txn);

export const updateTxn = updateById(Txn);

export const deleteTxn = deleteById(Txn);
