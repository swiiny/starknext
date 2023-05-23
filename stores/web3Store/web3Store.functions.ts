import * as Bowser from 'bowser';
import { getStarknet, StarknetWindowObject } from 'get-starknet-core';
import { EBrowser } from './web3Store.enums';
import { IWeb3Provider } from './web3Store.type';
import { defaultProvider } from './web3Store.variables';

async function _connectWallet(wallet: StarknetWindowObject): Promise<{
	provider: IWeb3Provider;
	error?: any;
}> {
	try {
		const starknet = getStarknet();

		let _provider: IWeb3Provider = { ...defaultProvider };

		const enabledWallet = await starknet.enable(wallet);
		_provider.web3Provider = enabledWallet.provider;
		_provider.web3Instance = enabledWallet;
		_provider.error = false;

		if (!_provider.web3Provider) throw new Error('No provider');

		return {
			provider: _provider
		};
	} catch (err: any) {
		console.error("Couldn't connect to wallet", wallet.id, err);

		return {
			provider: defaultProvider,
			error: err
		};
	}
}

function getBrowser(): EBrowser {
	if (typeof window === 'undefined') return EBrowser.unknown;

	const browserName = Bowser.getParser(window.navigator.userAgent)?.getBrowserName()?.toLowerCase();

	const chromiumBasedBrowsers = ['android browser', 'chrome', 'chromium', 'electron', 'opera', 'vivaldi'];

	if (browserName === 'firefox') {
		return EBrowser.firefox;
	}

	if (browserName === 'microsoft edge') {
		return EBrowser.edge;
	}

	if (chromiumBasedBrowsers.includes(browserName)) {
		return EBrowser.chrome;
	}

	return EBrowser.unknown;
}

export { _connectWallet, getBrowser };
