import Tenant from "../models/tenants.model.js";

export const getTenant = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const data = await Tenant.find({ _id });

    res.status(200).json(data);
  } catch (error) {
    console.log({ error: error?.message || error });
    res.status(500).json({ error: "Tenant request failed" });
  }
};

export const getTenants = async (req, res) => {
  try {
    const tenants = await Tenant.find();

    res.status(200).json(tenants);
  } catch (error) {
    console.log({ error: error.message || error });
    res.status(500).json({ error: `Tenants fetch failed` });
  }
};

export const createTenant = async (req, res) => {
  const { email, name, phoneNumber, property } = req.body;

  try {
    const isExistingTenant = await Tenant.findOne({ email });
    if (isExistingTenant)
      return res.status(400).json({ error: `Tenant already exists` });
    const newTenant = new Tenant({ email, name, phoneNumber, property });
    const response = await newTenant.save();

    res.status(200).json(response);
  } catch (error) {
    console.log({ error: error?.message || error });
    res.status(500).json({ error: "Tenant create failed" });
  }
};
