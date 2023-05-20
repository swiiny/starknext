import { clearLocalStorage } from '@utils/global';
import { getStarknet } from 'get-starknet-core';
import { useCallback } from 'react';
import { defaultProvider } from '../web3Store.variables';
import useProvider from './useProvider';

export default function useDisconnectWallet() {
	const [, setProvider] = useProvider();

	const disconnectWallet = useCallback(() => {
		const starknet = getStarknet();

		starknet.disconnect({ clearLastWallet: true });

		setProvider(defaultProvider);

		clearLocalStorage();
	}, [setProvider]);

	return { disconnectWallet };
}
