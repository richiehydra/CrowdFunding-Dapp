//SPDX-License-Identifier: UNLICENSED

pragma solidity >= 0.5.0 < 0.9.0;


contract CrowdFunding
{
   struct users
   {
       string name;
       string message;
       uint timestamp;
       address from;
   }

   address payable owner;

   constructor()
   {
       owner=payable(msg.sender);
   }
   users[] user;

   function payment(string memory name,string memory message)public  payable
   {
       require(msg.value>0,"Please Pay More than 0 Ether");
       owner.transfer(msg.value);
       user.push(users(name,message,block.timestamp,msg.sender));
   }

   function getUsers()public view returns(users[] memory)
   {
       return user;
   }
}