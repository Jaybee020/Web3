// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;


import 'hardhat/console.sol';
import "./Storage.sol";

contract A{
    // AppStorage storage s=Storage.get()
    AppStorage s;
    function setA(uint _a)public {
        s.a=_a;

    }

    function getA()public view returns(uint){
        return s.a;
    }
}

contract B{
    AppStorage s;
    constructor(address _A){
        s.A=_A;//setting the contract on initial deployment
    }
    function setB(uint _b)public {
        s.b=_b;
        A(s.A).setA(_b+1);//calling the smart contract A as a function
        s.A.delegatecall(
            abi.encodeWithSignature("setA(uint256)", _b+1)
        );
    }

    function getB()public view returns(uint){
        return s.b;
    }
}