import { useAtom } from 'jotai';
import { chainIdAtom } from '../web3Store.atoms';

export default function useChainId() {
	return useAtom(chainIdAtom);
}
