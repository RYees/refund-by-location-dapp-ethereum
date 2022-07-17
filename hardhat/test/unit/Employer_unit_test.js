const { expect } = require('chai');

var chai = require('chai');

describe('Employer Unit Test', function () {
    before(async function () {
      Employer = await ethers.getContractFactory('Employer');
      Employer = await Employer.deploy();
      await Employer.deployed();
    });

    it('retrieve returns a value previously stored', async function () {
        await Employer.setEmployee('0x5B38Da6a701c568545dCfcB03FcB875f56beddC4', '34.09', '98.43', '3:30');
      expect((await Employer.getAllEmployees()).toString()).to.equal('0x5B38Da6a701c568545dCfcB03FcB875f56beddC4');
      //expect((await Employer.getEmployee('0x5B38Da6a701c568545dCfcB03FcB875f56beddC4')).toString()).to.equal('34.09', '98.43', '3:30');
    });

    // it('retrieve returns a value previously stored', async function () {
    //   await Employer.setEmployee('0x5B38Da6a701c568545dCfcB03FcB875f56beddC4', '34.09', '98.43', '3:30');
    //  expect((await Employer.getEmployee('0x5B38Da6a701c568545dCfcB03FcB875f56beddC4')).toString()).to.equal('34.09', '98.43', '3:30');
    // });

  });