import Address from '@models/Address';
import { useAtom } from 'jotai';
import { addressAtom } from '../web3Store.atoms';

export default function useAddress(): [Address | undefined] {
	const [address] = useAtom(addressAtom);

	return [address];
}
