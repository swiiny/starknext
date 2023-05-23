import Portal from '@components/common/Portal';
import classNames from 'classnames';
import Image from 'next/image';
import { FC, MouseEvent, useEffect, useId, useState } from 'react';
import useConnectWallet from 'stores/web3Store/hooks/useConnectWallet';
import useDisconnectWallet from 'stores/web3Store/hooks/useDisconnectWallet';
import useIsWalletConnected from 'stores/web3Store/hooks/useIsWalletConnected';
import useIsWalletModalOpen from 'stores/web3Store/hooks/useIsWalletModalOpen';
import useStarknetWallets from 'stores/web3Store/hooks/useStarknetWallets';
import { STARKNET_WALLETS } from 'stores/web3Store/web3Store.variables';
import { ESize } from 'theme/theme.enum';
import GradientContainer from '../GradientContainer';
import Text from '../Text';
import { EFontWeight, ETextAlign } from '../Text/Text.enum';
import styles from './WalletModal.module.scss';

const WalletModal: FC = () => {
	const [starknetWallets] = useStarknetWallets();
	const { connectWallet } = useConnectWallet();
	const { disconnectWallet } = useDisconnectWallet();
	const [isWalletConnected] = useIsWalletConnected();
	const [isWalletModalOpen, setIsWalletModalOpen] = useIsWalletModalOpen();

	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

	// prevent safari users having the modal with nothing inside
	const isStarknetAvailable = STARKNET_WALLETS.some((wallet) => {
		return starknetWallets.data?.some((w) => w.id === wallet.id);
	});

	const uuid = useId();

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
			<div
				className={classNames(styles.modalBackground, {
					[styles.isVisible]: isModalVisible && isWalletModalOpen
				})}
				onClick={(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => closeModal(e)}
			>
				<GradientContainer className={styles.gradientContainer}>
					{!isStarknetAvailable ? (
						<button className={styles.modalButton}>
							<Text size={ESize.l} weight={EFontWeight.bold} align={ETextAlign.center}>
								Starknet is not available on your browser
							</Text>
						</button>
					) : isWalletConnected ? (
						<button className={styles.modalButton} onClick={() => handleDisconnectWallet()}>
							<Text size={ESize.l} weight={EFontWeight.bold} align={ETextAlign.center}>
								Disconnect Wallet
							</Text>
						</button>
					) : (
						STARKNET_WALLETS.map((wallet) => {
							const starknetWalletInstance = starknetWallets.data?.find((w) => w.id === wallet.id);

							if (!starknetWalletInstance) return null;

							if (!starknetWalletInstance.isInstalled) {
								return (
									<a
										key={wallet.id}
										href={starknetWalletInstance.downloadUrl}
										target='_blank'
										rel='noreferrer'
										className={styles.modalButton}
									>
										<Image src={wallet.srcLogo} alt={`${wallet.name}'s logo`} width={60} height={60} />

										<Text size={ESize.l} weight={EFontWeight.bold}>
											{`Install ${wallet.name}`}
										</Text>
									</a>
								);
							}

							return (
								<button key={wallet.id} className={styles.modalButton} onClick={() => connectWallet(wallet.id)}>
									<Image src={wallet.srcLogo} alt={`${wallet.name}'s logo`} width={60} height={60} />
									<Text size={ESize.l} weight={EFontWeight.bold}>
										{wallet.name}
									</Text>
								</button>
							);
						})
					)}
				</GradientContainer>
			</div>
		</Portal>
	);
};

export { WalletModal };
