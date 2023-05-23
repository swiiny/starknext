import { getLocalStorage } from '@utils/global';
import { FC, useCallback, useEffect } from 'react';
import useConnectWallet from './hooks/useConnectWallet';
import useDisconnectWallet from './hooks/useDisconnectWallet';
import useProvider from './hooks/useProvider';
import { WalletLocalStorageKey } from './web3Store.variables';

const Web3Store: FC = () => {
	const [provider] = useProvider();
	const { connectWallet } = useConnectWallet();
	const { disconnectWallet } = useDisconnectWallet();

	// check if the user was previously connected and connect them if true (after page refresh for example)
	const checkIfWalletIsConnected = useCallback(() => {
		const savedWalletId = getLocalStorage(WalletLocalStorageKey) as string;

		if (savedWalletId) {
			connectWallet(savedWalletId);
		}

		return;
	}, [connectWallet]);

	const onAccountsChanged = useCallback(
		(accounts: string[]) => {
			console.debug('accounts changed', accounts);
			if (accounts.length === 0) {
				disconnectWallet();
			}
		},
		[disconnectWallet]
	);

	const onNetworkChanged = useCallback((network?: string) => {
		console.debug('chain changed', network);
	}, []);

	useEffect(() => {
		if (!provider.web3Instance) return;

		try {
			if (!provider.web3Instance.on) {
				console.warn('provider.web3Instance.on is undefined');
				return;
			}

			provider.web3Instance.on('accountsChanged', onAccountsChanged);
			provider.web3Instance.on('networkChanged', onNetworkChanged);
		} catch (err) {
			console.error('Error while initializing web3 listeners', err);
		}

		return () => {
			if (!provider.web3Instance?.off) {
				console.warn('provider.web3Instance.off is undefined');
				return;
			}

			provider.web3Instance.off('accountsChanged', onAccountsChanged);
			provider.web3Instance.off('networkChanged', onNetworkChanged);
		};
	}, [onAccountsChanged, onNetworkChanged, provider.web3Instance]);

	useEffect(() => {
		checkIfWalletIsConnected();
	}, [checkIfWalletIsConnected]);

	useEffect(() => {
		console.debug('provider', provider);
	}, [provider]);

	/* 	// debug purpose
	// debug purpose
	useEffect(() => {
		console.debug('walletId', walletId);
	}, [walletId]);

	// debug purpose
	useEffect(() => {
		console.debug('address', address);
	}, [address]);
 */
	/* 	useEffect(() => {
		updateChainId();
	}, [updateChainId]);
 */
	return <></>;
};

export default Web3Store;
