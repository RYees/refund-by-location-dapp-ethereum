# Dapps-GPS
Causal inference refers to an intellectual discipline that considers the assumptions, study designs, and estimation strategies that allow researchers to draw causal conclusions based on data. 

![Ethereum Blockchain](./images/Screenshot from 2022-07-13 16-08-18.png)

# Table of content
* [Overview](#overview)
* [Introduction](#introduction)
* [Workflow](#workflow)
* [Installation](#installation)

## Overview
This project is do a refund by location smart contract that is aimed to be used when one party, for example an employer, agrees to pay another party, when an employee, for being present in a certain geographic area for a certain duration. The employee’s phone sends its GPS location to a smart contract at a certain interval. Based on the pre-agreed contract codified in an Ethereum smart contract, a cryptocurrency payment is executed when all the agreed conditions are met. If, at any point, the GPS sensor indicates that an employee is outside the range of the agreed GPS area, the contract state will be updated to indicate that it is out of compliance.  


## Introduction
As indicated in the overview this project main objective is to create a smart contract in ethereum blockchain that includes the above conditions that are mentioned. In this spirit, the following tasks will be done:
* There will be a function that tracks the employees' geographical location or it will accept the location that is sent by the employee;
* There will be a function that will evalutate the recieved location for a certain duration and decides if the smart contract is met or not;
* There will be a function that gives response if the above condition is not met, an out of compliance error will be fired or if it is met a transaction will be made to the employee;


## Workflow
Steps to do the project:
* Developing smart contract. 
   * With solidity programming
   * Testing and deploying the contract on ethereum blockchain
* Building frontend mobile dApp
   * Designing the user interface
   * Doing it with java programming
* Connecting the frontend and smart contract backend


## Installation
To clone the repository use the below link:
---
    https://github.com/RYees/dapps-gps.git
    


