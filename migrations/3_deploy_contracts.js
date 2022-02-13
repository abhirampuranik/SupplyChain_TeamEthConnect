var Manufacturer = artifacts.require("./Manufacturer.sol");
var Transporter = artifacts.require("./Transporter.sol");
var Distributor = artifacts.require("./Distributor.sol");
var Regional = artifacts.require("./Regional.sol");
var tracking = artifacts.require("./tracking.sol");

module.exports = function(deployer) {
    deployer.deploy(Manufacturer);
    deployer.deploy(Transporter);
    deployer.deploy(Distributor);
    deployer.deploy(Regional);
    deployer.deploy(tracking);

  };
  