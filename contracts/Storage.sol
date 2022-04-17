// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;


struct AppStorage{
    uint a;
    uint b;
    uint8 c;
    uint d;
    address A;
}

// library Storage{
//     bytes32 KEY = keccak256('my-');
//     function get() internal pure returns (AppStorage storage s){
//         bytes32 k=KEY;
//         assembly{
//             s.slot := k
//         }
//     }
// }