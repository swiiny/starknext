import Navbar from '@components/default/Navbar';
import { WalletModal } from '@components/default/WalletModal/WalletModal';
import ResponsiveProvider from '@contexts/ResponsiveContext';
import { Provider as JotaiProvider } from 'jotai';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../theme/globals.scss';

const StarkNextJotaiDapp = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<Head>
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />

				<link rel='apple-touch-icon' href='/icon.png'></link>

				<meta name='application-name' content='StarkNext' />
				<meta name='apple-mobile-web-app-capable' content='yes' />
				<meta name='apple-mobile-web-app-status-bar-style' content='default' />
				<meta name='apple-mobile-web-app-title' content='StarkNext' />
				<meta name='description' content='Starter to create Dapps with Next, React and Starknet' />

				<meta name='theme-color' content='#1E1F20' />
			</Head>

			<JotaiProvider>
				<ResponsiveProvider>
					<Navbar />
					<WalletModal />

					<Component {...pageProps} />
				</ResponsiveProvider>
			</JotaiProvider>
		</>
	);
};

export default StarkNextJotaiDapp;
