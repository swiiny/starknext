import Image from 'next/image';
import { FC } from 'react';
import styles from './Technologies.module.scss';
import { ITechnologies } from './Technologies.type';

const LOGOS = [
	{
		label: 'Starknet',
		url: 'https://www.starknet.io/en',
		src: '/assets/logo-starknet-full.svg'
	},
	{
		label: 'NextJs',
		url: 'https://nextjs.org/',
		src: '/assets/logo-next.svg'
	},
	{
		label: 'Jotai',
		url: 'https://jotai.org/',
		src: '/assets/logo-jotai.svg'
	} /* ,
	{
		label: 'Argent X',
		url: 'https://www.argent.xyz/',
		src: '/assets/logo-argent-x.svg'
	},
	{
		label: 'Braavos',
		url: 'https://www.braavos.io/',
		src: '/assets/logo-braavos.svg'
	} */
];

const Technologies: FC<ITechnologies> = () => {
	return (
		<div className={styles.technologies}>
			{LOGOS.map((logo) => (
				<div className={styles.logoContainer} key={logo.label}>
					<Image src={logo.src} alt={logo.label} width={60} height={60} />

					<a
						className={styles.link}
						href={logo.url}
						aria-label={`link to ${logo.label}`}
						target='_blank'
						rel='noopener noreferrer'
					/>
				</div>
			))}
		</div>
	);
};

export { Technologies };
