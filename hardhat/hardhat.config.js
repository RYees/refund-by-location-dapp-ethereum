//https://eth-goerli.g.alchemy.com/v2/mTqKDgkJW6to-0hQpZ9irfemd9WvJTvv

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.4.18',
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/mTqKDgkJW6to-0hQpZ9irfemd9WvJTvv',
      accounts: ['03c998ad8bd0d67e2655a9982c2f1272626f3bc17edf8e57a218c264a04e3b39'],
    },
  },
};