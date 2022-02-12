pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

contract Distributor {
    struct distributorDetails{
        string Name;
        string Id;
        string Email;
        bool isValue;
    }

    mapping (address => distributorDetails) public GroupOfDistributors;

    function setDistDetails(string memory _Name, string memory _Id, string memory _Email) public {
        GroupOfDistributors[msg.sender] = distributorDetails({
            Name: _Name,
            Id: _Id,
            Email: _Email,
            isValue: true
        });
    }

    function getDistDetails(address user) public view returns(distributorDetails memory){
        return GroupOfDistributors[user];
    }

    function Exists(address user) public view returns(bool exists) {
        if(GroupOfDistributors[user].isValue == true) return true;
        return false;
    }

}