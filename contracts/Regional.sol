pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

contract Regional {
    struct regionalDetails{
        string Name;
        string Id;
        string Email;
    }

    mapping (address => regionalDetails) public GroupOfRegional;

    function setRegDetails(string memory _Name, string memory _Id, string memory _Email) public {
        GroupOfRegional[msg.sender] = regionalDetails({
            Name: _Name,
            Id: _Id,
            Email: _Email
        });
    }

    function getRegDetails(address user) public view returns(regionalDetails memory){
        return GroupOfRegional[user];
    }
}