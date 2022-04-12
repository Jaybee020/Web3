// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

import "./hero.sol";

contract TestHero is Hero{
    uint random;
    function generateRandom() public override view returns (uint) {//function to generate random number  based on blockdifficulty input and returns a 32 bits(256 bits)
        return random;
    }
    function setRandom(uint num)public {
        random=num;
    }
}
