import { useAtom } from 'jotai';
import { providerAtom } from '../web3Store.atoms';
import { IWeb3Provider } from '../web3Store.type';

type TSetProvider = (provider: IWeb3Provider) => void;

export default function useProvider(): [IWeb3Provider, TSetProvider] {
	return useAtom(providerAtom);
}
