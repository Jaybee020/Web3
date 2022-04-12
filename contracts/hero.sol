// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract Hero{
    enum Class {Mage,Healer,Barbarian}//heroes class
    mapping(address => uint[]) addressToHeroes;//storing the heroes(as 256 bits) and mapping them to their various users

    function generateRandom() public virtual returns (uint) {//function to generate random number  based on blockdifficulty input and returns a 32 bits(256 bits)
    return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp)));
    }

    function getHeroes()public view returns(uint[] memory){//memory is the memory created in the function,storage is the one loaded from contracts state.
        return addressToHeroes[msg.sender];//function only requires a sender
    }

    function getStrength(uint hero)public pure returns(uint32){
        return uint32((hero>>2) & 0x1F);//shift by 2 bits removing mage class property and selecting the first 5 bits representing strength
    }

    function getHealth(uint hero)public pure returns(uint32){
        return uint32((hero>>7) & 0x1F);//shift by 7 bits removing mage class and strength property and selecting the first 5 bits representing strength
    }
    function getDexterity(uint hero)public pure returns(uint32){
        return uint32((hero>>12) & 0x1F);//shift by 7 bits removing mage class and strength property and selecting the first 5 bits representing strength
    }
    function getIhtellect(uint hero)public pure returns(uint32){
        return uint32((hero>>17) & 0x1F);//shift by 7 bits removing mage class and strength property and selecting the first 5 bits representing strength
    }
    function getMagic(uint hero)public pure returns(uint32){
        return uint32((hero>>22) & 0x1F);//shift by 7 bits removing mage class and strength property and selecting the first 5 bits representing strength
    }

    function createHero(Class class) public payable {//payable functions require a signer and eth to execute
        require(msg.value>=0.05 ether, "Send at least 0.05 ether");
        //stats are in strength,health ,dexterity,intellect,magic
        uint[] memory stats=new uint[](5);

        //specifying how each stat attributed is added to the hero uint(each stat has a max value of 18 which is 5 bit and the hero class occupies the first 2 bits already)
        stats[0]=2;
        stats[1]=7;
        stats[2]=12;
        stats[3]=17;
        stats[4]=22;

        uint len=5;//the length of properties each hero will have
        uint hero=uint(class);//generating your hero from the specified class

        do{
            uint random_position_selected=generateRandom() % len;//to select random position beween beginning and specified length
            uint value=generateRandom()%(13+len)+ 1;//generating a random value

            hero |= value<<stats[random_position_selected];//writing value of the stat to your hero and bitshifting it by the required bit 
            len--;//reducing length
            stats[random_position_selected]=stats[len];//moving last item in array to replace current position
        }while(len>0);

        addressToHeroes[msg.sender].push(hero);//add hero to list of sender account list
    }
}