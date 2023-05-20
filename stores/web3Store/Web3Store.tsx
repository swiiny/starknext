import { getLocalStorage } from '@utils/global';
import { FC, useCallback, useEffect } from 'react';
import useConnectWallet from './hooks/useConnectWallet';
import useProvider from './hooks/useProvider';
import { WalletLocalStorageKey } from './web3Store.variables';

const Web3Store: FC = () => {
	const [provider] = useProvider();
	const { connectWallet } = useConnectWallet();

	// check if the user was previously connected and connect them if true (after page refresh for example)
	const checkIfWalletIsConnected = useCallback(() => {
		const savedWalletId = getLocalStorage(WalletLocalStorageKey) as string;

		if (savedWalletId) {
			connectWallet(savedWalletId);
		}

		return;
	}, [connectWallet]);

	useEffect(() => {
		if (!provider.web3Instance) return;

		try {
			if (!provider.web3Instance.on) {
				console.warn('provider.web3Instance.on is undefined');
			}
			/* 
			if (!provider.web3Instance.removeListener) {
				console.warn('provider.web3Instance.removeListener is undefined');
			}
			 */
			/* 
			provider.web3Instance.on?.('chainChanged', onChainChanged);
			provider.web3Instance.on?.('accountsChanged', onAccountsChanged);
			provider.web3Instance.on?.('disconnect', onDisconnect); // used to detect if the user disconnect himself from WalletConnect */
		} catch (err) {
			console.error('Error while initializing web3 listeners', err);
		}

		return () => {
			/* 
			provider.web3Instance.removeListener?.('chainChanged', onChainChanged);
			provider.web3Instance.removeListener?.('accountsChanged', onAccountsChanged);
			provider.web3Instance.removeListener?.('disconnect', onDisconnect);
			 */
		};
	}, [provider.web3Instance]);

	useEffect(() => {
		checkIfWalletIsConnected();
	}, [checkIfWalletIsConnected]);

	/* 	useEffect(() => {
		updateChainId();
	}, [updateChainId]);
 */
	return null;
};

export default Web3Store;
