import Address from '@models/Address';
import { WalletProvider, getStarknet } from 'get-starknet-core';
import { atom } from 'jotai';
import { loadable } from 'jotai/utils';
import { constants } from 'starknet';
import { getBrowser } from './web3Store.functions';
import { IWeb3Provider, TDiscoverableWallet, TStarknetWallet } from './web3Store.type';
import { NETWORKS, defaultProvider } from './web3Store.variables';

export const providerAtom = atom<IWeb3Provider>(defaultProvider);

export const addressAtom = atom<Address | undefined>((get) => {
	const { web3Instance } = get(providerAtom);
	const walletId = get(walletIdAtom);

	if (!web3Instance || !walletId) return undefined;

	return Address.from(web3Instance.selectedAddress);
});

export const walletIdAtom = atom<string | undefined>((get) => {
	const { web3Instance } = get(providerAtom);

	return web3Instance?.id;
});

export const isWalletModalOpenAtom = atom<boolean>(false);

export const isWalletConnectedAtom = atom<boolean>((get) => {
	const address = get(addressAtom);

	return typeof address !== 'undefined';
});

export const starknetWalletsAtom = atom<Promise<TStarknetWallet[]>>(async (get) => {
	const starknet = getStarknet();
	const installedWallet = await starknet.getAvailableWallets();
	const discoveryWallets = await starknet.getDiscoveryWallets();

	// keep only where downloads are available and set downloadUrl value
	const discoveryWalletsWithAvailableDownloadUrl = discoveryWallets.reduce<TDiscoverableWallet[]>((acc, wallet) => {
		if (installedWallet.some((installedWallet) => installedWallet.id === wallet.id)) return acc;

		const browser = getBrowser();

		const downloadUrl: string | undefined = wallet.downloads?.[browser as keyof WalletProvider['downloads']];

		if (downloadUrl) {
			acc.push({
				...wallet,
				downloadUrl
			});
		}

		return acc;
	}, []);

	const typedInstalledWallet: TStarknetWallet[] = installedWallet.map((wallet) => ({
		wallet,
		id: wallet.id,
		isInstalled: true,
		downloadUrl: ''
	}));

	const typedDiscoveryWallets: TStarknetWallet[] = discoveryWalletsWithAvailableDownloadUrl.map((wallet) => ({
		id: wallet.id,
		isInstalled: false,
		downloadUrl: wallet.downloadUrl
	}));

	return [...typedInstalledWallet, ...typedDiscoveryWallets];
});

export const loadableStarknetWalletsAtom = loadable(starknetWalletsAtom);

export const chainIdAtom = atom<constants.StarknetChainId | undefined>((get) => {
	const { web3Provider } = get(providerAtom);

	if (!web3Provider) return undefined;

	return web3Provider.chainId;
});

export const isValidNetworkAtom = atom<boolean>((get) => {
	const chainId = get(chainIdAtom);

	if (!chainId) return false;

	return NETWORKS.some((network) => network.chainId === chainId);
});
