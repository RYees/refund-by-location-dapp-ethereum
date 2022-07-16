// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.4.18;

contract Employer {
    struct Parameter {
        string longitude;
        string latitude;
        string timelimit;
    }

    mapping (address => Parameter) employees;

    address[] public employeeAccts;

    function setEmployee(address _address, string _longtitude, string _latitude, string _timelimit) public {
        //var instructor = employees[_address];
        Parameter storage parameter = employees[_address];
        parameter.longitude = _longtitude;
        parameter.latitude = _latitude;
        parameter.timelimit = _timelimit;
        employeeAccts.push(_address) -1;
    }
    function getAllEmployees() view public returns (address[]) {
        return employeeAccts;
    }

    function getEmployee(address _address) view public returns (string memory, string memory, string memory) {
        return (employees[_address].longitude, employees[_address].latitude, employees[_address].timelimit);
    }

    function countEmployees() view public returns (uint) {
        return employeeAccts.length;
    }

    // function geoloc(address _address, string memory _longitude, string memory _latitude) public view returns(string){
    //    if (
    //     (keccak256(abi.encodePacked(employees[_address].longitude)) == keccak256(abi.encodePacked(_longitude))) && (keccak256(abi.encodePacked(employees[_address].latitude)) == keccak256(abi.encodePacked(_latitude))) ){
    //          return 'correct';
    //      } else {
    //          return 'incorrect';
    //      }
    // }
    
    function checkPlayerExists(address player) public constant returns(bool){
      for(uint256 i = 0; i < employeeAccts.length; i++){
         if(employeeAccts[i] == player) 
         return true;
      }
      return false;
    }
    
}