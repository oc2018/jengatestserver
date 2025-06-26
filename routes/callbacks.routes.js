import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  console.log(res);
  res.send(res);
});

export default router;
