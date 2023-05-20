import Portal from '@components/common/Portal';
import classNames from 'classnames';
import { useAtom } from 'jotai';
import Image from 'next/image';
import { FC, MouseEvent, useEffect, useId, useState } from 'react';
import useConnectWallet from 'stores/web3Store/hooks/useConnectWallet';
import useDisconnectWallet from 'stores/web3Store/hooks/useDisconnectWallet';
import useIsWalletConnected from 'stores/web3Store/hooks/useIsWalletConnected';
import useIsWalletModalOpen from 'stores/web3Store/hooks/useIsWalletModalOpen';
import { loadableStarknetWalletsAtom } from 'stores/web3Store/web3Store.atoms';
import { STARKNET_WALLETS } from 'stores/web3Store/web3Store.variables';
import { ESize } from 'theme/theme.enum';
import GradientContainer from '../GradientContainer';
import Text from '../Text';
import { EFontWeight, ETextAlign } from '../Text/Text.enum';
import styles from './WalletModal.module.scss';
import { IWalletModal } from './WalletModal.type';

const WalletModal: FC<IWalletModal> = () => {
	const { connectWallet } = useConnectWallet();
	const { disconnectWallet } = useDisconnectWallet();
	const [isWalletConnected] = useIsWalletConnected();
	const [isWalletModalOpen, setIsWalletModalOpen] = useIsWalletModalOpen();

	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

	const uuid = useId();

	const [starknetWallets] = useAtom(loadableStarknetWalletsAtom);

	useEffect(() => {
		console.log('starknetWallets', starknetWallets);
	}, [starknetWallets]);

	useEffect(() => {
		async function init() {}

		init();
	}, []);

	useEffect(() => {
		if (!uuid) {
			return;
		}
		if (isWalletModalOpen) {
			// @ts-ignore
			clearTimeout(window[`modal-timeout-${uuid}`]);
			setTimeout(() => {
				document.body.style.overflow = 'hidden';
				setIsModalVisible(true);
			}, 10);
		} else {
			// @ts-ignore
			window[`modal-timeout-${uuid}`] = setTimeout(() => {
				document.body.style.overflow = 'visible';
				document.body.style.overflowX = 'hidden';

				setIsModalVisible(false);
			}, 400);
		}
	}, [isWalletModalOpen, uuid]);

	const closeModal = (e: MouseEvent) => {
		// @ts-ignore
		if (e.target?.getAttribute('class')?.includes('modalBackground')) {
			setIsWalletModalOpen(false);
		}
	};

	const handleDisconnectWallet = () => {
		setIsWalletModalOpen(false);

		setTimeout(() => {
			disconnectWallet();
		}, 300);
	};

	if (!isWalletModalOpen && !isModalVisible) {
		return <></>;
	}

	return (
		<Portal selector='body'>
			<button
				className={classNames(styles.modalBackground, {
					[styles.isVisible]: isModalVisible && isWalletModalOpen
				})}
				onClick={(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => closeModal(e)}
			>
				<GradientContainer className={styles.gradientContainer}>
					{isWalletConnected ? (
						<button className={styles.modalButton} onClick={() => handleDisconnectWallet()}>
							<Text size={ESize.l} weight={EFontWeight.bold} align={ETextAlign.center}>
								Disconnect Wallet
							</Text>
						</button>
					) : (
						STARKNET_WALLETS.map((wallet) => (
							<button key={wallet.name} className={styles.modalButton} onClick={() => connectWallet(wallet.id)}>
								<Image src={wallet.srcLogo} alt={`${wallet.name}'s logo`} width={60} height={60} />
								<Text size={ESize.l} weight={EFontWeight.bold}>
									{wallet.name}
								</Text>
							</button>
						))
					)}
				</GradientContainer>
			</button>
		</Portal>
	);
};

export { WalletModal };
