import "@nomiclabs/hardhat-ethers"
import "@nomiclabs/hardhat-waffle"
import { ethers } from "hardhat"


(async function deploy(){
    const contract=await ethers.getContractFactory("Counter")
    const counter=await contract.deploy()
    await counter.deployed()
    return counter
})().then(count)

//@ts-ignore
async function count(counter){
    await counter.count();
    console.log("counter is " ,await counter.getCounter())
}