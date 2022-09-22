// Validation middelware

export const validation = (schema) => async (req, res, next) => {
  const body = req.body;

  try {
    await schema.validate(body);
    next();
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const validation2 = (schema1, schema2) => async (req, res, next) => {
  const { agency, client } = req.body;

  try {
    await schema1.validate(agency);
    await schema2.validate(client);
    next();
  } catch (error) {
    res.status(400).json({ error });
  }
};
