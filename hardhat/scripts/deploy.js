const main = async () => {
  const locationFactory = await hre.ethers.getContractFactory("Courses");
  const locationContract = await locationFactory.deploy();

  await locationContract.deployed();

  console.log("Location address: ", locationContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
