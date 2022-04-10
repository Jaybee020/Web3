import "@nomiclabs/hardhat-ethers"
import { ethers } from "hardhat"

(async function deploy() {
    const HelloWorld=await ethers.getContractFactory("HelloWorld")//name of the contract is parameter
    const hello=await HelloWorld.deploy()
    await hello.deployed()

    return hello
})().then(sayhello)

//@ts-ignore
async function sayhello(hello){
    console.log(await hello.hello())
}