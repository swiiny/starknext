import { constants } from 'starknet';
import { IWallet } from './web3Store.type';

const SAVED_USER_ADDRESS_KEY = 'savedUserAddress';
const defaultProvider = { error: true };
// the key used to save the state in localStorage
const WalletLocalStorageKey = 'wallet';

const NETWORKS = [
	{
		chainId: constants.StarknetChainId.MAINNET,
		name: 'Starknet Mainnet'
	},
	{
		chainId: constants.StarknetChainId.TESTNET,
		name: 'Starknet Testnet'
	},
	{
		chainId: constants.StarknetChainId.TESTNET2,
		name: 'Starknet Testnet2'
	}
];

const STARKNET_WALLETS: IWallet[] = [
	{
		id: 'argentX',
		srcLogo: '/assets/logo-argent-x.svg',
		name: 'Argent X'
	},
	{
		id: 'braavos',
		srcLogo: '/assets/logo-braavos.svg',
		name: 'Braavos'
	}
];

export { SAVED_USER_ADDRESS_KEY, defaultProvider, WalletLocalStorageKey, STARKNET_WALLETS, NETWORKS };
