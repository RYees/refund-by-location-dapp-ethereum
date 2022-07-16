// const { expect } = require('chai');

var chai = require('chai');
// const BN = require('bn.js');
// chai.use(require('chai-bn')(BN));

// const DECIMALS='18'
// const INITIAL_PRICE='200000000000000000000'

describe('Employer Unit Test', function () {
    before(async function () {
    //  MockV3Aggregator = await ethers.getContractFactory('MockV3Aggregator');
    //  mockV3Aggregator = await MockV3Aggregator.deploy(DECIMALS,INITIAL_PRICE);
    //  await mockV3Aggregator.deployed();

      Employer = await ethers.getContractFactory('Employer');
      Employer = await Employer.deploy();
      await Employer.deployed();
    });

    beforeEach(async function () {
        await Employer.setEmployee('0x5B38Da6a701c568545dCfcB03FcB875f56beddC4', '34.09', '98.43', '3:30');
    });

    // it('Initial value is set to 0', async function () {
    //     expect((await Employer.getNumber()).toString()).to.equal('0');
    //   });


    it('retrieve returns a value previously stored', async function () {
        await Employer.setEmployee('0x5B38Da6a701c568545dCfcB03FcB875f56beddC4', '34.09', '98.43', '3:30');
      expect((await Employer.getAllEmployees()).toString()).to.equal('0x5B38Da6a701c568545dCfcB03FcB875f56beddC4');
    });

    // it('gets a price feed value', async function () {
    //     let result = await Employer.getLatestPrice();
    //     console.log('price:' + new ethers.BigNumber.from(result._hex).toString())
    //     expect((new ethers.BigNumber.from(result._hex).toString())).equals(INITIAL_PRICE).toString()
    //   });


  });