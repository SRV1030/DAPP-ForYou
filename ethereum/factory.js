// Attempting to deploy contract from account:  0x33186EbE36Cb0cf30d15381831a554B313077152       
// Contract deployed at address:  0x17d8AceB26E96E1503fDa441fD9CB1D8126734cB
import web3 from "./web3";
import { abi } from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(abi, '0x17d8AceB26E96E1503fDa441fD9CB1D8126734cB');

export default instance;