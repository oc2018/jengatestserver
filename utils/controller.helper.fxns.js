import mongoose from "mongoose";

export function isValidObjectId(id) {
  const { ObjectId } = mongoose.Types;
  return (
    typeof id === "string" &&
    ObjectId.isValid(id) &&
    new ObjectId(id).toString() === id
  );
}

export const getById = (Model) => async (req, res) => {
  const { id: _id } = req.params;
  try {
    const data = await Model.findOne({ _id });

    return res.status(200).json(data);
  } catch (error) {
    console.error({ error: error.message || error });
    return res.status(400).json({ error: `${Model.modelName} query failed` });
  }
};

export const getAll = (Model) => async (req, res) => {
  try {
    const data = await Model.find();

    return res.status(200).json(data);
  } catch (error) {
    console.error({ error: error.message || error });
    return res.status(500).json({ error: `${Model.modelName}s query failed` });
  }
};

export const createNew = (Model, unique) => async (req, res) => {
  const { email, ...data } = req.body;
  try {
    if (unique) {
      const doc = await Model.findOne({ email });
      if (doc)
        return res
          .status(400)
          .json({ error: `${Model.modelName} alreadly exists` });
    }
    const newModel = new Model({ email, ...data });
    const response = await newModel.save();

    return res.status(200).json(response);
  } catch (error) {
    console.error({ error: error.message || error });
    return res
      .status(500)
      .json({ error: `${Model.modelName} data capture failed` });
  }
};

export const updateById = (Model) => async (req, res) => {
  const { id: _id } = req.params;
  const data = req.body;

  if (!isValidObjectId(_id)) {
    return res.status(400).json({ error: `Invalid ID format` });
  }

  try {
    const doc = await Model.findOne({ _id });

    if (!doc)
      return res.status(404).json({ error: `${Model.modelName} not found` });

    const updatedItem = await Model.findOneAndUpdate(
      { _id },
      { ...data },
      { new: true }
    );

    return res.status(200).json(updatedItem);
  } catch (error) {
    console.error({ error: error.message || error });
    return res.status(500).json({ error: `${Model.modelName} Update failed` });
  }
};

export const deleteById = (Model) => async (req, res) => {
  const { id: _id } = req.params;

  if (!isValidObjectId(_id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const doc = await Model.findByIdAndDelete(_id);
    if (!doc) {
      return res.status(404).json({ error: `${Model.modelName} not found` });
    }

    return res
      .status(200)
      .json({ message: `${Model.modelName} deleted successfully` });
  } catch (error) {
    console.error(err);
    return res.status(500).json({ error: `${Model.modelName} delete failed` });
  }
};

export const deleteManyByIds = (Model) => async (req, res) => {
  const { ids } = req.body; // expect array of IDs
  if (
    !Array.isArray(ids) ||
    ids.some((id) => !mongoose.Types.ObjectId.isValid(id))
  ) {
    return res.status(400).json({ error: "Invalid ID(s) format" });
  }

  try {
    const { deletedCount } = await Model.deleteMany({ _id: { $in: ids } });
    return res
      .status(200)
      .json({ message: `Deleted ${deletedCount} ${Model.modelName}(s)` });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: `${Model.modelName} bulk delete failed` });
  }
};
