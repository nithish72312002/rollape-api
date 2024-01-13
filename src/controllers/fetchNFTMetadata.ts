import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { BigNumber } from "ethers";
import { Request, Response } from "express";

const fetchNFTMetadata = async (req: Request, res: Response) => {
  // Initialize the SDK with the correct parameters
  const sdk = new ThirdwebSDK({
    chainId: 6833895,
    rpc: ["https://evmrpc.jupiternft.xyz/"],
    nativeCurrency: {
      decimals: 18,
      name: "GAS",
      symbol: "GAS",
    },
    shortName: "Jupiter",
    slug: "Jupiter",
    testnet: true,
    chain: "Jupiter",
    name: "Jupiter",
  },{
    clientId: "82fd01350c9a22a611074a76e041f64c",
  });

  const collectionAddress = "0xe203370D7F5D6b67701e8fcebF220e08dA22464D";
  const tokenId = BigNumber.from(req.params.tokenId); // Convert token ID to BigNumber

  try {
    // Get the contract using the initialized SDK
    const contract = await sdk.getContract(collectionAddress,"nft-drop");
    // Fetch the NFT metadata using the contract and token ID
    const nftMetadata = await contract.erc721.get(tokenId)
    console.log("Fetched NFT Metadata:", nftMetadata); // Debugging: Log the fetched NFT metadata
  
    // Return the fetched NFT metadata in the response
    res.status(200).json({
      message: "NFT metadata fetched successfully",
      data: nftMetadata,
    });
  } catch (error: any) { // Explicitly specify 'any' type for the error object
    // Handle errors
    console.error("Error fetching NFT metadata:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

export default fetchNFTMetadata;
