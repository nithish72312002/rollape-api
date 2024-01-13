import express, { Router } from "express";
import { fetchNFTMetadata } from "../controllers"; // Update the import

const router: Router = express.Router();

router.get("/nft-metadata/:tokenId", fetchNFTMetadata); // Update the route

export default router;
