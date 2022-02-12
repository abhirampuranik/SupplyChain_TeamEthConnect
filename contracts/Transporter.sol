pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

contract Transporter {
    struct transporterDetails{
        string Name;
        string Id;
        string Email;
        bool isValue;
    }

    mapping (address => transporterDetails) public GroupOfTransporters;
    address[] TranAdd;
    string[] TranNames;

    function setTranDetails(string memory _Name, string memory _Id, string memory _Email) public {
        GroupOfTransporters[msg.sender] = transporterDetails({
            Name: _Name,
            Id: _Id,
            Email: _Email,
            isValue: true
        });

        TranAdd.push(msg.sender);
        TranNames.push(_Name);
    }

    function getTranDetails(address user) public view returns(transporterDetails memory){
        return GroupOfTransporters[user];
    }

    function Exists(address user) public view returns(bool exists) {
        if(GroupOfTransporters[user].isValue == true) return true;
        return false;
    }

    function getTranAdd() public view returns (address[] memory){
        return TranAdd;
    }

    function getTranNames() public view returns (string[] memory){
        return TranNames;
    }

}