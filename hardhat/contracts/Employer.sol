// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;
// import "prb-math/contracts/PRBMathSD59x18.sol";
//import "hardhat/console.sol";

contract Employer {
    // using PRBMathSD59x18 for int256;
    // int256 pi = PRBMathSD59x18.pi();
    event Deposit(address sender, uint amount, uint balance);
    event Withdraw(uint amount, uint balance);
    event Transfer(address to, uint amount, uint balance);
    // Payable constructor can receive Ether

    address payable public owner;

    constructor() payable {
        owner = payable(msg.sender);
    }
    // address owner;
    struct Parameter {
        string empName;
        string long; // these value is set by the employer
        string lat;  // these value is set by the employer
        string requiredDistance;
        string distance; // the final calculated distance
        string startHour;
        string endHour;
        string fetchedHour; // the time of the hour the employee was at the location
    }

    struct Output {
        string accept;
        string decline;
    }
    
    mapping (address => Parameter) employees;
    mapping (address => Output) outputs;

    address[] public employeeAccts;
    uint256 amountOwed = 1000000000000000;
 

    function setEmployee(address _address, string memory _empName, string memory _long, string memory _lat, string memory _requiredDistance, string memory _startHour, string memory _endHour) public {
        //var instructor = employees[_address];
       // Parameter storage parameter = employees[_address];
        require(msg.sender == owner);
        employees[_address].empName = _empName;
        employees[_address].long = _long;
        employees[_address].lat = _lat;
        employees[_address].requiredDistance = _requiredDistance;
        employees[_address].startHour = _startHour;
        employees[_address].endHour = _endHour;
        employeeAccts.push(_address);
    }
    function getAllEmployees() view public returns (address[] memory) {
        return employeeAccts;
    }

    function getEmployee(address _address) public view returns (string memory, string memory, string memory, string memory, string memory, string memory) {
        return (employees[_address].empName, employees[_address].long, employees[_address].lat, employees[_address].startHour, employees[_address].endHour, employees[_address].requiredDistance);
    }

    function countEmployees() view public returns (uint) {
        return employeeAccts.length;
    }

    function getResults(address _address) external view returns (Output memory) {
        return (outputs[_address]);
    }

    function contractCondition(address _address, string memory distance, string memory fetchedHour) public {
        string memory result = setContract(_address, distance, fetchedHour);
        //  console.log(result);
        if(keccak256(abi.encodePacked(result)) == keccak256(abi.encodePacked('Approved'))){
            //console.log('true');
            outputs[_address].accept = 'accept';
            // uint256 _amount = 1000000000000000;
            // transfer(_to, _amount);
        } else if(keccak256(abi.encodePacked(result)) == keccak256(abi.encodePacked('Out of compliance'))){
            //console.log('false');
           outputs[_address].decline = 'decline';
        }
    }

    function stnum(string memory numString) public pure returns(uint) {
        uint  val=0;
        bytes   memory stringBytes = bytes(numString);
        for (uint  i =  0; i<stringBytes.length; i++) {
            uint exp = stringBytes.length - i;
            bytes1 ival = stringBytes[i];
            uint8 uval = uint8(ival);
           uint jval = uval - uint(0x30);
   
           val +=  (uint(jval) * (10**(exp-1))); 
        }
      return val;
    }

    function setContract(address _address,string memory distance, string memory fetchedHour) public view returns (string memory) {
        uint dist = stnum(distance);
        uint hour = stnum(fetchedHour);
        uint start = stnum(employees[_address].startHour);
        uint end = stnum(employees[_address].endHour);
        uint reqdist = stnum(employees[_address].requiredDistance);
        // console.log(dist, hour, reqdist);
        
        require(end >= hour && hour >= start, "out of time");
        if(reqdist >= dist){
            return 'Approved';
        }
        else {
            return 'Out of compliance';
        }
    }


    function deposit() public payable {
        emit Deposit(msg.sender, msg.value, address(this).balance);
    }

    function notPayable() public {}
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    // Function to transfer Ether from this contract to address from input
    function transfer(address payable _to, uint _amount) public onlyOwner{
        _to.transfer(_amount);
        emit Transfer(_to, _amount, address(this).balance);
    }

    function getBalance () public view returns (uint) {
        return address(this).balance;
    }
    
    function getOwedAmount() public view returns (uint256) {
    // i  am assuming " amountOwed" is state variable, uint256
     return amountOwed;
    }
}