//code to be loaded into browser(you cant use hardhat as it is client side)
import { ethers } from "ethers";//import directly from ethers library

//get eth in the broser
function getEth(){
    //@ts-ignore
    const eth= window.ethereum//ethereum object is added to your window by metamask
    if(!eth){
        throw new Error("Could not find metamask")
    }
    return eth
}

//accounts that are in metamask
async function hasAccounts() {
    const eth=await getEth()
    const accounts=await eth.request({method:'eth_accounts'}) as string[]
    return accounts && accounts.length
}

//you request an account from your metamask
async function requestAccounts() {
    const eth=await getEth()
    const accounts=await eth.request({method:'eth_requestAccounts'}) as string[]
    return accounts && accounts.length
}

async function run(){
    if(!await hasAccounts() && !await requestAccounts()){//asking metamask for accounts in it and requesting the account
        throw new Error("Please install algosigner")
    }
    const contract=new ethers.Contract(
        "0x5fbdb2315678afecb367f032d93f642f64180aa3",//account address youwant to call the contract from
        [
            " function hello() public pure returns (string memory)"  //interface of what we want to grab
        ],
        new ethers.providers.Web3Provider(getEth())//web 3 provider api
    )
 
    document.body.innerHTML=await contract.hello() //calling the function in the smart contract
}

run()