import { setLocalStorage } from '@utils/global';
import { useCallback } from 'react';
import { _connectWallet } from '../web3Store.functions';
import { IWallet } from '../web3Store.type';
import { WalletLocalStorageKey } from '../web3Store.variables';
import useIsWalletModalOpen from './useIsWalletModalOpen';
import useProvider from './useProvider';
import useStarknetWallets from './useStarknetWallets';

export default function useConnectWallet() {
	const [, setProvider] = useProvider();
	const [, setIsWalletModalOpen] = useIsWalletModalOpen();
	const [starknetWallets] = useStarknetWallets();

	const connectWallet = useCallback(
		async (id: IWallet['id']) => {
			if (starknetWallets.state !== 'hasData') {
				console.error('Wallet list not loaded');
				return;
			}

			const selectedWallet = starknetWallets.data.find((wallet) => wallet.id === id);

			if (!selectedWallet) {
				console.error('Wallet not found');
				return;
			}

			const { provider: newProvider, error } = await _connectWallet(selectedWallet);

			if (!error) {
				setProvider(newProvider);
				setIsWalletModalOpen(false);
				setLocalStorage(WalletLocalStorageKey, selectedWallet.id);
			} else {
				console.error('connectWallet', error);
			}
		},
		[setIsWalletModalOpen, setProvider, starknetWallets]
	);

	return { connectWallet };
}
