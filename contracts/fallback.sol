// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;
import "hardhat/console.sol";

interface IFallback{
    function count() external;
}

contract Fallback{
    function foo()internal view{
        console.log("Fell back");
    }


    fallback() external payable{//can only be called from outside contract
        foo();
        console.log("fallback");
        revert("You cant complete it");
    }
}