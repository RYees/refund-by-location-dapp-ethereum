pragma solidity 0.4.20;

contract Casino {
   address public owner;
   function Casino() public {
      owner = msg.sender;
   }
   function kill() public {
      if(msg.sender == owner) selfdestruct(owner);
   }
}