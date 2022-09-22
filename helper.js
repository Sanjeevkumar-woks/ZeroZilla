import { client } from "./index.js";
import bcrypt from "bcrypt";

// users

export async function genPassword(password) {
  const salt = await bcrypt.genSalt(10); //bcrypt.genSalt(no. of rounds)
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export async function addUser(firstName, lastName, email, hashPassword) {
  const newuser = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashPassword,
  };
  return await client.db("zerozilla").collection("users").insertOne(newuser);
}

export async function getUserByEmail(email) {
  return await client
    .db("zerozilla")
    .collection("users")
    .findOne({ email: email });
}

// Agency Client

// ADD Agency Client

export async function addAgency(newAgency) {
  return await client
    .db("zerozilla")
    .collection("agencies")
    .insertOne(newAgency);
}
export async function addClient(newClient) {
  return await client
    .db("zerozilla")
    .collection("clients")
    .insertOne(newClient);
}

//Update Agency Client

export function updateClientById(clientId, updateClient) {
  return client
    .db("zerozilla")
    .collection("clients")
    .updateOne({ clientId: clientId }, { $set: updateClient });
}
export function updateAgencyById(agencyId, updateAgency) {
  return client
    .db("zerozilla")
    .collection("agencies")
    .updateOne({ agencyId: agencyId }, { $set: updateAgency });
}

// Read Agency Client

export function getAllAgencies() {
  return client.db("zerozilla").collection("agencies").find({});
}

export function getAllClients() {
  return client.db("zerozilla").collection("clients").find({});
}

// Get BY name Agency Client

export function getAgencyByName(agencyName) {
  return client.db("zerozilla").collection("agencies").findOne({ agencyName: agencyName });
}

export function getClientByName(clientName) {
  return client.db("zerozilla").collection("clients").findOne({ clientName: clientName });
}

//Get BY ID Agency Client

export function getAgencyById(agencyId) {
  return client
    .db("zerozilla")
    .collection("agencies")
    .findOne({ agencyId: agencyId });
}
export function getClientById(clientId) {
  return client
    .db("zerozilla")
    .collection("clients")
    .findOne({ clientId: clientId });
}

//Delete By ID Agency Client

export function deleteAgencyById(agencyId) {
  return client
    .db("zerozilla")
    .collection("agencies")
    .deleteOne({ agencyId: agencyId });
}

export function deleteClientById(clientId) {
  return client
    .db("zerozilla")
    .collection("clients")
    .deleteOne({ clientId: clientId });
}

// Get High Total Bill Agency

export function getMaxBillClient(){
  return client
    .db("zerozilla")
    .collection("clients")
    .find({}).sort({totalBill:-1}).limit(1)
}