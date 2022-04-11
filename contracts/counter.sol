// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;


import 'hardhat/console.sol';

contract Counter{
    uint32 counter;
    event counterInc(uint32 counter);
    //write to state function and invilves creating a transaction
    function count() public {
        counter++;
        console.log("Count is now ",counter);
        emit counterInc(counter);
    }

    //get from state...this returns a value and is usually free
    function getCounter() public view returns(uint32){
        return counter;
    }
}