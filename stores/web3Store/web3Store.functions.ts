import { getStarknet, StarknetWindowObject } from 'get-starknet-core';
import { IWeb3Provider } from './web3Store.type';
import { defaultProvider } from './web3Store.variables';

async function _connectWallet(wallet: StarknetWindowObject): Promise<{
	provider: IWeb3Provider;
	error?: any;
}> {
	try {
		const starknet = getStarknet();

		let _provider: IWeb3Provider = defaultProvider;

		const enabledWallet = await starknet.enable(wallet);
		_provider.web3Provider = enabledWallet.provider;
		_provider.web3Instance = enabledWallet;

		if (!_provider.web3Provider) throw new Error('No provider');

		console.log('_provider.web3Provider', _provider.web3Provider);

		return {
			provider: _provider,
			error: undefined
		};
	} catch (err: any) {
		console.error("Couldn't connect to wallet", wallet.id, err);

		return {
			provider: defaultProvider,
			error: err
		};
	}
}

export { _connectWallet };
