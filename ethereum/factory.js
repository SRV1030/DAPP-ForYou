//Acc: 0x33186EbE36Cb0cf30d15381831a554B313077152 Address: 0x0886b61ca1842975380D6c15a02Fb407Fc2b7866

//Factory instance
import web3 from "./web3";
import { abi } from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(abi, '0x0886b61ca1842975380D6c15a02Fb407Fc2b7866');

export default instance;