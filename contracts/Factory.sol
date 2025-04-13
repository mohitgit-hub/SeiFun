/*
Factory contract use to create ERC20 Token and Send supply to marketplace Contract.
This contract creates multiple instances of TokenCreate.sol and Marketplace.sol allows users to create tokens and trade tokens.
Contract Address - 0x17131a4EaB3532e16Da3b2236DE82D5D5379498b
TXN -https://seitrace.com/tx/0xe5f82110139e7efd401eee64f779db774a43b2d6a8c72de69ba02a34a5529bce?chain=atlantic-2
*/

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Marketplace.sol";
import "./TokenCreation.sol";

contract Factory {
    address public dev = msg.sender;
    struct ProjectInfo {
        address marketplace;
        address token;
        string name;
        string symbol;
        address owner;
    }

    ProjectInfo[] public allProjects;
    mapping(address => address[]) public userProjects;
    event ProjectCreated(address indexed owner, address indexed marketplace, address indexed token);

    // deduct 0.02 SEI fee 
    function createProject(string memory name_, string memory symbol_) external payable {
        require(msg.value == 0.02 ether, "Send 0.02 SEI");
        TokenCreation token = new TokenCreation(name_, symbol_);

        Marketplace market = new Marketplace(msg.sender, address(token));

        token.mint(address(market));
        
        ProjectInfo memory info = ProjectInfo({
            marketplace: address(market),
            token: address(token),
            name: name_,
            symbol: symbol_,
            owner: msg.sender
        });

        allProjects.push(info);
        userProjects[msg.sender].push(address(market));

        emit ProjectCreated(msg.sender, address(market), address(token));
    }

    function getAllProjects() external view returns (ProjectInfo[] memory) {
        return allProjects;
    }

    function getUserProjects(address user) external view returns (address[] memory) {
        return userProjects[user];
    }
    function withdrawFee () public{
        require(msg.sender == dev , "You're not developer");
        payable(dev).transfer(address(this).balance);
    }

    receive() external payable { 
        
    }
    fallback() external payable {
        
    }
}