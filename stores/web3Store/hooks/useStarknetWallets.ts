import { useAtom } from 'jotai';
import { loadableStarknetWalletsAtom } from '../web3Store.atoms';

export default function useStarknetWallets() {
	const [starknetWallets] = useAtom(loadableStarknetWalletsAtom);
	return [starknetWallets];
}
