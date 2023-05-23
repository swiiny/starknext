import Image from 'next/image';
import { FC } from 'react';
import styles from './Technologies.module.scss';
import { ITechnologies } from './Technologies.type';

const LOGOS = [
	{
		label: 'Starknet',
		url: 'https://www.starknet.io/en',
		src: '/assets/logo-starknet-full.svg',
		scale: 1.2
	},
	{
		label: 'NextJs',
		url: 'https://NextJs.org/',
		src: '/assets/logo-next.svg'
	},
	{
		label: 'Jotai',
		url: 'https://jotai.org/',
		src: '/assets/logo-jotai.svg'
	}
];

const Technologies: FC<ITechnologies> = () => {
	return (
		<div className={styles.technologies}>
			{LOGOS.map((logo) => (
				<a
					className={styles.logoContainer}
					key={logo.label}
					href={logo.url}
					aria-label={`link to ${logo.label}`}
					target='_blank'
					rel='noopener noreferrer'
				>
					<Image
						src={logo.src}
						alt={logo.label}
						width={60}
						height={60}
						style={{
							transform: logo.scale ? `scale(${logo.scale})` : 'scale(1)'
						}}
					/>
				</a>
			))}
		</div>
	);
};

export { Technologies };
