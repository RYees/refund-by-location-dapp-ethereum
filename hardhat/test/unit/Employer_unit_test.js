const { expect } = require('chai');

var chai = require('chai');

describe('Employer Unit Test', function () {
    before(async function () {
      Employer = await ethers.getContractFactory('Employer');
      Employer = await Employer.deploy();
      await Employer.deployed();
    });

    beforeEach(async function () {
      await Employer.setEmployee('0x5B38Da6a701c568545dCfcB03FcB875f56beddC4', 'emp','34.09', '98.43', '20', '3','4');
    })

    it('storing a value', async function () {
      //  await Employer.setEmployee('0x5B38Da6a701c568545dCfcB03FcB875f56beddC4', 'emp1','34.09', '98.43', '20', '3','4');
      expect((await Employer.getAllEmployees()).toString()).to.equal('0x5B38Da6a701c568545dCfcB03FcB875f56beddC4');
      //expect((await Employer.getEmployee('0x5B38Da6a701c568545dCfcB03FcB875f56beddC4')).toString()).to.equal('34.09', '98.43', '3:30');
    });

    it('retrieve returns a value previously stored', async function () {
    //  await Employer.setEmployee('0x5B38Da6a701c568545dCfcB03FcB875f56beddC4', '34.09', '98.43', '3:30');
     expect((await Employer.getEmployee('0x5B38Da6a701c568545dCfcB03FcB875f56beddC4')).toString()).to.equal('emp,34.09,98.43,3,4,20');
    }); 

    it('retrieve returns a count of previously stored', async function () {
      //  await Employer.setEmployee('0x5B38Da6a701c568545dCfcB03FcB875f56beddC4', '34.09', '98.43', '3:30');
       expect((await Employer. countEmployees()).toNumber()).to.equal(3);
    }); 
    

    // it('calling the location contract', async function () {
    //   await Employer.contractCondition('0x5B38Da6a701c568545dCfcB03FcB875f56beddC4', '10','3');
    // });

    it('calling the contract balance', async function () {
     // expect(await Employer.getBalance()).to.be.within(0);
      expect((await Employer. getBalance()).toNumber()).to.equal(0); 
    });
  });