//code to be loaded into browser(you cant use hardhat as it is client side)
import { ethers } from "ethers";//import directly from ethers library
import Counter from "../artifacts/contracts/counter.sol/Counter.json"

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
        throw new Error("Please install metamask")
    }

    console.log("hello")
    const contract=new ethers.Contract(
        "0xdc64a140aa3e981100a9beca4e685f962f0cf6c9",//account address youwant to call the contract from
        Counter.abi,//using the contracts abi
        new ethers.providers.Web3Provider(getEth()).getSigner()//web 3 provider api and adding the signer
    )

 
    contract.on(contract.filters.counterInc(),function(count){
        setcounter(count)
    })

    const text=document.createElement("div")
    // console.log("hello")
    text.style.borderColor="red"
    const button=document.createElement("button")
    //@ts-ignore
    async function setcounter(count?) {
        text.innerHTML=count||await contract.getCounter()//calling the value of counter from the contract
    }

    setcounter()
    button.innerText="increment"
    button.onclick=async function(){
        const tx=await contract.count()//calling the contract incrementer function
        await tx.wait()
    }

    document.body.appendChild(text)
    document.body.appendChild(button)
    
}

run()