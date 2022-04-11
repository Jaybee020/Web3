import "@nomiclabs/hardhat-ethers"
import { ethers } from "hardhat"
import { expect } from "chai"


describe("should get counter",async function(){
    it("should get counter",async function(){
        const contract=await ethers.getContractFactory("Counter")
        const deployContract=await contract.deploy()
        await deployContract.deployed()

        expect(await deployContract.getCounter()).to.be.a('number')//making sure this function returns a number
    })
})


describe("it should increment count",async function(){
    it("should increment count",async function(){
        const contract=await ethers.getContractFactory("Counter")
        const deployContract=await contract.deploy()
        await deployContract.deployed()

        const current =await deployContract.getCounter()
        const incrementTx=await deployContract.count()
        await incrementTx.wait()

        expect(await deployContract.getCounter()).to.equal(current+1)
       
    })
})