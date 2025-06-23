import Property from "../models/properties.model.js";

export const getProperty = async (req, res) => {
  const { id: _id } = req.params;

  try {
    const proprty = await Property.findOne({ _id });

    res.status(200).json(proprty);
  } catch (error) {
    console.log({ error: error?.message || error });
    res.status(500).json({ error: `Property fetch failed` });
  }
};

export const getProperties = async (req, res) => {
  try {
    const properties = await Property.find();

    res.status(200).json(properties);
  } catch (error) {
    console.log({ error: error.message || error });
    res.status(500).json({ error: `Properties fetch failed` });
  }
};

export const createProperty = async (req, res) => {
  const { address, rent } = req.body;
  try {
    const newProperty = new Property({ address, rent });

    newProperty.save();
    res.status(200).json(newProperty);
  } catch (error) {
    console.log({ error: error.message || error });
    res.status(500).json({ error: `New property details capture failed` });
  }
};
