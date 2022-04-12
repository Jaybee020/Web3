import "@nomiclabs/hardhat-ethers"
import {ethers} from "hardhat"


//@ts-ignore
async function fallback(fallback){
    const f=await ethers.getContractAt("IFallback",fallback.address)//specifying the interface to use and the address to get contract from
    return await f.count()
}
(async function deploy(){
    const Fallback=await ethers.getContractFactory("Fallback")
    const fallback=await Fallback.deploy()
    await fallback.deployed()
    console.log()
    return fallback
})().then(fallback)
