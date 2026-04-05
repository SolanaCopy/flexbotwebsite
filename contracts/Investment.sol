// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Investment {
    address public owner;
    mapping(address => uint256) public investments;
    uint256 public totalInvested;

    event Invested(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    function invest() public payable {
        require(msg.value > 0, "Amount must be greater than 0");
        investments[msg.sender] += msg.value;
        totalInvested += msg.value;
        emit Invested(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) public {
        require(investments[msg.sender] >= amount, "Insufficient funds");
        investments[msg.sender] -= amount;
        totalInvested -= amount;
        payable(msg.sender).transfer(amount);
        emit Withdrawn(msg.sender, amount);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}


















