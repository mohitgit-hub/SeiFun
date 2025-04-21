// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

interface ITokenCreation {
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 value) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 value) external returns (bool);
    function transferFrom(address from, address to, uint256 value) external returns (bool);
    function totalSupply() external view returns (uint256);
}

contract Marketplace is Ownable, ReentrancyGuard {
    address public dev = 0xd99220e2494604e5A99AcF4601073CEFfD2bAA32;
    ITokenCreation public tokenAddress;
    address public immutable factory;

    uint256 public initialprice = 0.001 ether;
    uint256 public tokensBought;
    uint256 public tokensSold;
    uint256 public feeCollected;
    uint256 public constant fee = 0.02 ether;

    event TokensBought(address indexed buyer, uint256 amount, uint256 price);
    event TokensSold(address indexed seller, uint256 amount, uint256 price);

    constructor(address _owner, address _token) Ownable(_owner) {
        factory = msg.sender;
        tokenAddress = ITokenCreation(_token);
    }

    AllUserTransaction[] private globalTransactions;

    function getAvailableTokens() public view returns (uint256) {
        return tokenAddress.balanceOf(address(this));
    }

    function getAvailableSei() public view returns (uint256) {
        return address(this).balance;
    }

    function getUpdatedPrice() public view returns (uint256) {
        uint256 availableTokens = getAvailableTokens();
        uint256 availableSEI = getAvailableSei();

        require(availableTokens > 0, "No tokens available");
        uint256 price = (availableSEI * 1e18) / availableTokens;
        return price + initialprice;
    }

    function calculatePrice(uint256 _amountToBuy) public view returns (uint256) {
        return _amountToBuy * getUpdatedPrice() / 1e18; //to be included in JS later
    }

    function buyTokens() external payable nonReentrant {
        // need to deduct msg.value + fee (i.e 0.02 ether)
        require(msg.value > fee, "Send more than fee");
        uint256 valueAfterFee = msg.value - fee;
        feeCollected += fee;

        uint256 tokenPrice = getUpdatedPrice();
        uint256 tokensToBuy = (valueAfterFee * 1e18) / tokenPrice;

        require(tokenAddress.balanceOf(address(this)) >= tokensToBuy, "Not enough tokens");
        tokensBought += tokensToBuy;

        emit TokensBought(msg.sender, tokensToBuy, tokenPrice);
        tokenAddress.transfer(msg.sender, tokensToBuy);
        userTransactions[msg.sender].push(UserTransaction({
    amount: tokensToBuy,
    price: tokenPrice,
    timestamp: block.timestamp,
    txnType: TxnType.Buy
    }));

    AllUserTransaction memory txn = AllUserTransaction({
    transactionId: globalTransactions.length,
    transactionOf: msg.sender,
    amount: tokensToBuy,
    price: tokenPrice,
    timestamp: block.timestamp,
    txnType: TxnType.Buy
});

allUserTransactions[msg.sender].push(txn);
globalTransactions.push(txn);


    }

    // Approval from JS
    function sellTokens(uint256 _amountToSell) external nonReentrant {
    require(_amountToSell > 0, "Sell amount > 0");

    uint256 tokenPrice = getUpdatedPrice();
    uint256 seiToReturn = (_amountToSell * tokenPrice) / 1e18;
    uint256 seiToReturnAfterFee = seiToReturn - fee;

    require(tokenAddress.transferFrom(msg.sender, address(this), _amountToSell), "Token transfer failed");
    require(address(this).balance >= seiToReturnAfterFee, "Insufficient SEI");

    tokensSold += _amountToSell;

    emit TokensSold(msg.sender, _amountToSell, tokenPrice);
    payable(msg.sender).transfer(seiToReturnAfterFee);
    userTransactions[msg.sender].push(UserTransaction({
    amount: _amountToSell,
    price: tokenPrice,
    timestamp: block.timestamp,
    txnType: TxnType.Sell
}));

    AllUserTransaction memory txn = AllUserTransaction({
    transactionId: globalTransactions.length,
    transactionOf: msg.sender,
    amount: _amountToSell,
    price: tokenPrice,
    timestamp: block.timestamp,
    txnType: TxnType.Sell
});

allUserTransactions[msg.sender].push(txn);
globalTransactions.push(txn);




}

    function withdrawFees() external {  
        require(msg.sender == dev,"You're not Developer");
        require(feeCollected > 0, "No fees");
        uint256 amount = feeCollected;
        feeCollected = 0;
        payable(factory).transfer(amount);
    }

    enum TxnType { Buy, Sell }

struct UserTransaction {
    uint256 amount;
    uint256 price;
    uint256 timestamp;
    TxnType txnType;
}
struct AllUserTransaction {
    uint256 transactionId;
    address transactionOf;
    uint256 amount;
    uint256 price;
    uint256 timestamp;
    TxnType txnType;
}

    mapping(address => UserTransaction[]) private userTransactions;
    mapping(address => AllUserTransaction[]) private allUserTransactions;

    function getAllUserTransactions(address user) external view returns (UserTransaction[] memory) {
    return userTransactions[user];
    }

    function getAllTransactions() external view returns (AllUserTransaction[] memory) {
    return globalTransactions;
    }



    receive() external payable {}
}


