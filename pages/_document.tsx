import { Head, Html, Main, NextScript } from 'next/document';

export default function StarkNextDappDocument() {
	return (
		<Html lang='en'>
			<Head>
				<link
					href='https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;700&display=swap'
					rel='stylesheet'
				/>

				<meta name='application-name' content='Starknet x NextJs x Jotai' />
				<meta name='apple-mobile-web-app-capable' content='yes' />
				<meta name='apple-mobile-web-app-status-bar-style' content='default' />
				<meta name='apple-mobile-web-app-title' content='Starknet x NextJs x Jotai' />
				<meta
					name='description'
					content='StarkNext is a boilerplate to help you build your next dapp on Starknet using NextJs and Jotai'
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
