import { useAtom } from 'jotai';
import { isWalletModalOpenAtom } from '../web3Store.atoms';

export default function useIsWalletModalOpen() {
	return useAtom(isWalletModalOpenAtom);
}
