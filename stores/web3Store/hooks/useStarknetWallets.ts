import { useAtom } from 'jotai';
import { loadableStarknetWalletsAtom } from '../web3Store.atoms';
import { TStarknetWallet } from '../web3Store.type';

export default function useStarknetWallets(): [{ state: string; data?: TStarknetWallet[] }] {
	const [starknetWallets] = useAtom(loadableStarknetWalletsAtom);
	return [starknetWallets];
}
