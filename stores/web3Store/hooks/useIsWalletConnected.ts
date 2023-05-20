import { useAtom } from 'jotai';
import { isWalletConnectedAtom } from '../web3Store.atoms';

export default function useIsWalletConnected(): [boolean] {
	const [isWalletConnected] = useAtom(isWalletConnectedAtom);

	return [isWalletConnected];
}
