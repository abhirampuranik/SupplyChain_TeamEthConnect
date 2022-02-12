pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

contract Distributor {
    struct distributorDetails{
        string Name;
        string Id;
        string Email;
    }

    mapping (address => distributorDetails) public GroupOfDistributors;

    function setDistDetails(string memory _Name, string memory _Id, string memory _Email) public {
        GroupOfDistributors[msg.sender] = distributorDetails({
            Name: _Name,
            Id: _Id,
            Email: _Email
        });
    }

    function getDistDetails(address user) public view returns(distributorDetails memory){
        return GroupOfDistributors[user];
    }
}