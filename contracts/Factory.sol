/*
Factory contract use to create ERC20 Token and Send supply to marketplace Contract.
This contract creates multiple instances of TokenCreate.sol and Marketplace.sol allows users to create tokens and trade tokens.
Contract Address - 0xd28fd559cf57DcFb07bB708ab5443957B36c08AE
TXN -http://seitrace.com/tx/0xbceb9589dae542d843a23ce803aa6d50021baa75e94ab417bf653124a8402643?chain=atlantic-2
*/

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Marketplace.sol";
import "./TokenCreation.sol";

contract Factory {
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
    function createProject(string memory name_, string memory symbol_) external {

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
}
