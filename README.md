Watch-only Counterparty wallet with easy Identifier service
===========================================================

Watch-only Counterparty wallet built from 12-word Counterwallet seed, with server-stored master public key and easy recall ID.

A solution to entering your 12-word passphrase into counterwallet.co just to check your balance or generate a new address for receiving counterparty assets.

1. Enter your 12-word counterwallet seed 
2. Your browser computes the master public key used by counterwallet
3. The public key can then be stored on the server for quick access, optionally encrypted with password
4. With your watch-only wallet loaded, you can deterministically generate more receiving addresses and check balances
5. Come back later, enter your easy ID and optional encryption password to restore watch-only wallet

Built with Bitcore
All data comes from blockscan.com, plans in future to integrate my own bitcoin node with Counterparty


version: 1.0 (7.15.14)
