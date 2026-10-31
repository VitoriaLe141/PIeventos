// ========================================
// ROTAS: AUTH
// ========================================


import { Router } from "express";
import * as mycontroller from "../controller/rolesController.js";


// O caminho é montado com o nome da tabela (ex: /roles)
const pointName = mycontroller.getTableName() || "roles";
const endPoint = `/${pointName}`;

const router = Router();


// Consultas
router.get(endPoint, (req, res) => { mycontroller.Get(req, res); });
router.get(`${endPoint}/:id`, (req, res) => { mycontroller.GetById(req, res); });
router.get(`${endPoint}/email/:email`, (req, res) => { mycontroller.GetByEmail(req, res); });

// Cadastro, alteração e exclusão
router.post(endPoint, (req, res) => { mycontroller.Post(req, res); });
router.put(`${endPoint}/:id`, (req, res) => { mycontroller.Put(req, res); });
router.delete(`${endPoint}/:id`, (req, res) => { mycontroller.Delete(req, res); });


export default router;