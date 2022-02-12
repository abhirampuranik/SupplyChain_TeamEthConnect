pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

contract Manufacturer {
    struct manufacturerDetails{
        string Name;
        string Id;
        string Email;
        bool isValue;
    }

    mapping (address => manufacturerDetails) public GroupOfManufacts;
    address[] manufactures;


    function setManuDetails(string memory _Name, string memory _Id, string memory _Email) public {
        GroupOfManufacts[msg.sender] = manufacturerDetails({
            Name: _Name,
            Id: _Id,
            Email: _Email,
            isValue: true
        });
    }

    function getManuDetails(address user) public view returns(manufacturerDetails memory){
        return GroupOfManufacts[user];
    }

    function Exists(address user) public view returns(bool exists) {
        if(GroupOfManufacts[user].isValue == true) return true;
        return false;
    }


}