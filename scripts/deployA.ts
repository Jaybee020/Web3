import "@nomiclabs/hardhat-ethers"
import { ethers } from "hardhat"

async function deploy(name:string,...args:any) {
    const Contract=await ethers.getContractFactory(name)//name of the contract is parameter
    const contract=await Contract.deploy(...args)//passing args into constructor
    await contract.deployed()

    return contract
}


async function main(){
    const a=await deploy("A")
    const b=await deploy("B",a.address)

    await a.setA(43)
    console.log("A",await a.getA())
    console.log("B",await b.getB())

    await b.setB(69)
    console.log("A",await a.getA())
    console.log("B",await b.getB())

}

main()