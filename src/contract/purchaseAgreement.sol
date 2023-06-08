// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.11;


contract PurchaseAgreement {

    uint256 public value;

    address payable public worker;
    address payable public buyer;

    enum State {Created, Locked, Release, Inactive}
    State public state; //default is initialized with Created 

    //call once when the contract is deployed 
    constructor() payable {
        //msg is a global variable and sender is the one who deployed the contract 
        worker = payable (msg.sender);
        value = msg.value/2;
    }

    //modifier is going call the revert function to revert the transaction if conditions are not met 
    
    ///  The function cannot be called at the current state.
    error InvalidState();
    ///  Only the buyer can call this function 
    error OnlyBuyer();
    ///  Only the seller can call this function 
    error OnlyWorker();

    modifier inState(State state_){
        if(state != state_){
            revert InvalidState();
        }
        _;
    }


    modifier onlyBuyer(){
        if(msg.sender != buyer){
            revert OnlyBuyer();
        }
        _;

    }
    
    
    modifier onlyWorker(){
        if(msg.sender != worker){
            revert OnlyWorker();
        }
        _;

    }
    
    
    
    //THE BUYER deve essere in grado di chiamarla da fuori lo smart contract "external"
    function confirmPurchase() external inState(State.Created) payable {
        
        require(msg.value == ( 2*value ), "Please send in 2x the purchase amount");
        buyer = payable (msg.sender);//in this case the sender is the buyer 
        state = State.Locked;
    }


    function confirmReceived() external onlyBuyer inState(State.Locked) {

        state = State.Release; //release funds

        buyer.transfer(value); //returning the deposit to the buyer 
    }


    function payWorker() external onlyWorker inState(State.Release){

            state = State.Inactive;

            worker.transfer(3* value);
    }


    function abort() external onlyWorker inState(State.Created){

        state = State.Inactive;

        worker.transfer(address(this).balance);
    }


}
