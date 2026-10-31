// ========================================
// ROTAS: CLIENTES (view/clientesRoutes.js)
//
// Define os "endereços" da API para clientes.
// Quem conversa com o banco de verdade é o
// arquivo controller/clientesController.js.
// Este arquivo só diz: "quando chegar este pedido,
// chame esta função do controller".
// ========================================


// ---------- IMPORTAÇÕES ----------
import { Router } from "express";
import * as mycontroller from "../controller/clientesController.js";


// ---------- CONFIGURAÇÃO ----------
// O endereço é montado com o nome da tabela, que vem do controller.
// Se o controller não informar, usa "clientes" como padrão.
const pointName = mycontroller.getTableName() || "clientes";
const endPoint = `/${pointName}`;

const router = Router();


// ---------- CONSULTAS (GET)