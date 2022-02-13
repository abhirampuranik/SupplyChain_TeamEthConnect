pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

contract tracking{
    bool mColor=false;
    bool tColor=false;
    bool dColor=false;
    bool rColor=false;

    function setmColor() public{
        mColor=true;
    }
    function settColor() public{
        tColor=true;
    }
    function setdColor() public{
        dColor=true;
    }
    function setrColor() public{
        rColor=true;
    }
    function getmColor() public view returns (bool exists){
        return mColor;
    }
    function gettColor() public view returns (bool exists){
        return tColor;
    }
    function getdColor() public view returns (bool exists){
        return dColor;
    }
    function getrColor() public view returns (bool exists){
        return rColor;
    }
}