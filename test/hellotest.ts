import "@nomiclabs/hardhat-ethers"//adds convenient methods to the ethers library from hardhat
import { ethers } from "hardhat"//import ethers from hardhat
import { expect } from "chai"


describe("Should say hello",async function (){
    it("should say hello",async function (){
        //set up the environment by importing the neccessary modules
        //deploy the contract
        //call functions to test

        //deploying the contract
        const HelloWorld=await ethers.getContractFactory("HelloWorld")//getting your compiled contract via hardhat
        const hello=await HelloWorld.deploy() //deploy it to the network
        await hello.deployed()//making sure it is confirmed on the blockchain

        expect(await hello.hello()).to.equal("Hello World")
    })
})
