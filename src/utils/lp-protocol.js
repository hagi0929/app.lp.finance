import * as anchor from "@project-serum/anchor";
import { getProgram } from "./contract";
import lp_idl from "idls/lpfinance.json";
import { SEED_PDA } from "constants/global";

const { PublicKey } = anchor.web3;
