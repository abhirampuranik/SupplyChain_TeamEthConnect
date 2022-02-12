pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

contract Manufacturer {
    struct manufacturerDetails{
        string Name;
        string Id;
        string Email;
    }

    mapping (address => manufacturerDetails) public GroupOfManufacts;

    function setManuDetails(string memory _Name, string memory _Id, string memory _Email) public {
        GroupOfManufacts[msg.sender] = manufacturerDetails({
            Name: _Name,
            Id: _Id,
            Email: _Email
        });
    }

    function getManuDetails(address user) public view returns(manufacturerDetails memory){
        return GroupOfManufacts[user];
    }
}