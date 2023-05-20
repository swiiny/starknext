import { useAtom } from 'jotai';
import { walletIdAtom } from '../web3Store.atoms';

export default function useWalletId() {
	return useAtom(walletIdAtom);
}
