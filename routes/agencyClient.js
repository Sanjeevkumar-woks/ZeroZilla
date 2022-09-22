import express from "express";
import {
  addAgency,
  addClient,
  deleteAgencyById,
  deleteClientById,
  getAgencyById,
  getAgencyByName,
  getAllAgencies,
  getAllClients,
  getClientById,
  getClientByName,
  getMaxBillClient,
  updateAgencyById,
  updateClientById,
} from "../helper.js";
import { auth } from "../middlewares/auth.js";
import { validation2 } from "../middlewares/validationMiddleware.js";
import {
  agencyValidation,
  clientValidation,
} from "../validations/agencyClientValidation.js";
const router = express.Router();

//Create Agency and Client
router.post(
  "/create",
  validation2(agencyValidation, clientValidation),
  async (req, res) => {
    const { agency, client } = req.body;
    const isAgencyExist = await getAgencyByName(agency.agencyName);
    const isClientExist = await getClientByName(client.clientName);
    if (isAgencyExist || isClientExist) {
      res.status(400).send({ message: "Agrncy or Client alrady Exists" });
      return;
    }
    const result1 = await addAgency(agency);
    const result2 = await addClient(client);
    const result = { ...result1, ...result2 };
    res.send(result);
  }
);

//Read Agencies
router.get("/agencies", auth, async (req, res) => {
  const agencies = await getAllAgencies().toArray();
  res.send(agencies);
});

//Update Agency
router.put("/update/agency/:agencyId", auth, async (req, res) => {
  const { agencyId } = req.params;
  const updateAgency = req.body;
  const result = await updateAgencyById(agencyId, updateAgency);
  res.send(result);
});

//Delete Agency
router.delete("/delete/agency/:agencyId", auth, async (req, res) => {
  const { agencyId } = req.params;
  const result = await deleteAgencyById(agencyId);
  res.send(result);
});

//Read Clients
router.get("/clients", auth, async (req, res) => {
  const clients = await getAllClients().toArray();
  console.log(clients);
  res.send(clients);
});

//Update Client
router.put("/update/client/:clientId", auth, async (req, res) => {
  const { clientId } = req.params;
  const updateClient = req.body;
  const result = await updateClientById(clientId, updateClient);
  res.send(result);
});

//Delete Client
router.delete("/delete/client/:clientId", auth, async (req, res) => {
  const { clientId } = req.params;
  const result = await deleteClientById(clientId);
  res.send(result);
});

//Get Top Agency
router.get("/bestAgency", async (req, res) => {
  const maxTotalBillClient = await getMaxBillClient().toArray();
  const { agencyId,clientName, totalBill } = maxTotalBillClient[0];
  const  {agencyName} = await getAgencyById(agencyId);
  const bestAgency = {
    agencyName,
    clientName,
    totalBill,
  };
  res.send(bestAgency);
});

export const agencyClientRouter = router;
