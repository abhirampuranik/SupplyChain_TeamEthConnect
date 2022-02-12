var Manufacturer = artifacts.require("./Manufacturer.sol");
var Transporter = artifacts.require("./Transporter.sol");
var Distributor = artifacts.require("./Distributor.sol");
var Regional = artifacts.require("./Regional.sol");

module.exports = function(deployer) {
    deployer.deploy(Manufacturer);
    deployer.deploy(Transporter);
    deployer.deploy(Distributor);
    deployer.deploy(Regional);

  };
  