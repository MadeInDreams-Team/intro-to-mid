// contracts/INTRO.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Imports from the OpenZeppelin Contracts library
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";


contract INTRO is Initializable, ERC20Upgradeable, AccessControlUpgradeable, PausableUpgradeable {

using SafeMathUpgradeable for uint;

function initialize(address _admin, string memory _name, string memory _symbol) public virtual initializer {

  __Pausable_init();
  __AccessControl_init();
  __ERC20_init(_name,_symbol);   
  _setupRole(DEFAULT_ADMIN_ROLE, _admin);
  _mint(_admin, 1000000000000000000000 );

}

   /// @notice SECURITY.

    /// @notice pause or unpause.
    /// @dev Security feature to use with Defender

    function pause() public whenNotPaused{
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Unauthorized to pause");
        _pause();
    }
    
    function unpause() public whenPaused{
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Unauthorized to unpause");
        _unpause();
    }

}