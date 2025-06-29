export const getCallback = (req, res) => {
  const payload = req.body;
  try {
    console.log("Jenga callback received", payload);

    

    res.status(200).send("OK");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "response error" });
  }
  console.log(response);
  res.send(response.data);
};
