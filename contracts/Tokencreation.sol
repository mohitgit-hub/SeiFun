// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TokenCreation is ERC20 {
    address public factory;
    uint256 public constant initialSupply = 1_000_000_000 * 1e18;

    constructor(string memory name_, string memory symbol_) ERC20(name_, symbol_) {
        factory = msg.sender;
    }

    function mint(address to) external {
        require(msg.sender == factory, "Not authorized");
        _mint(to, initialSupply);
    }

    function decimals() public view virtual override returns (uint8) {
        return 18;
    }
}
