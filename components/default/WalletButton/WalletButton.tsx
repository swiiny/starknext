import { EColor } from '@theme/theme.enum';
import { FC } from 'react';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';
import useAddress from 'stores/web3Store/hooks/useAddress';
import useIsWalletConnected from 'stores/web3Store/hooks/useIsWalletConnected';
import useIsWalletModalOpen from 'stores/web3Store/hooks/useIsWalletModalOpen';
import Button from '../Button';
import { IWalletButton } from './WalletButton.type';

const WalletButton: FC<IWalletButton> = () => {
	//const { isWalletModalOpen, setIsWalletModalOpen, address, isWalletConnected, ens } = useWeb3();
	const [isWalletConnected] = useIsWalletConnected();
	const [, setIsWalletModalOpen] = useIsWalletModalOpen();
	const [address] = useAddress();

	return (
		<Button
			onClick={() => setIsWalletModalOpen(true)}
			color={isWalletConnected ? EColor.lightOrange : EColor.white}
			iconColor={isWalletConnected ? EColor.lightOrange : EColor.white}
			icon={<MdOutlineAccountBalanceWallet size={28} />}
		>
			{isWalletConnected ? address?.truncate() : 'Connect Wallet'}
		</Button>
	);
};

export { WalletButton };
