import "@nomiclabs/hardhat-ethers"//adds convenient methods to the ethers library from hardhat
import { ethers } from "hardhat"//import ethers from hardhat
import { expect } from "chai"

describe("Hero",async function (){
    async function createHero() {
        const Hero=await ethers.getContractFactory("TestHero")
        const hero=await Hero.deploy()
        await hero.deployed()
        return hero
    }
    //@ts-ignore
    let hero:any
    before(async function(){
        hero=await createHero()
    })

    it('should get an empty array on initialization',async function(){
        expect(await await hero.getHeroes()).to.deep.equal([])
    })

    it('should create a mage',async function () {
        const hero=await createHero()
        await hero.setRandom(69);
        await hero.createHero(0,{
            value:ethers.utils.parseEther("0.05")//specifying the amount of ether to be sent along with the transaction
        })
        const newhero=(await hero.getHeroes())[0]
        expect(await hero.getMagic(newhero)).to.equal(16)
    })

    it('should fail at creating a mage',async function(){
        let e:any
        try {
            await hero.createHero(0,{
                value:ethers.utils.parseEther("0.04")//specifying the amount of ether to be sent along with the transaction
            })
        } catch (error) {
           e=error
        }
    })
})
