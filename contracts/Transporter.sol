pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

contract Transporter {
    struct transporterDetails{
        string Name;
        string Id;
        string Email;
    }

    mapping (address => transporterDetails) public GroupOfTransporters;

    function setTranDetails(string memory _Name, string memory _Id, string memory _Email) public {
        GroupOfTransporters[msg.sender] = transporterDetails({
            Name: _Name,
            Id: _Id,
            Email: _Email
        });
    }

    function getTranDetails(address user) public view returns(transporterDetails memory){
        return GroupOfTransporters[user];
    }
}