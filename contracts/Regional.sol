pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

contract Regional {
    struct regionalDetails{
        string Name;
        string Id;
        string Email;
        bool isValue;
    }

    string quantity;

    mapping (address => regionalDetails) public GroupOfRegional;

    function setRegDetails(string memory _Name, string memory _Id, string memory _Email) public {
        GroupOfRegional[msg.sender] = regionalDetails({
            Name: _Name,
            Id: _Id,
            Email: _Email,
            isValue: true
        });
    }

    function getRegDetails(address user) public view returns(regionalDetails memory){
        return GroupOfRegional[user];
    }

    function Exists(address user) public view returns(bool exists) {
        if(GroupOfRegional[user].isValue == true) return true;
        return false;
    }

    function getPackage(string memory _quantity) public {
        quantity = _quantity;
    }

    function getQuantity() public view returns (string memory){
        return quantity;
    }

}