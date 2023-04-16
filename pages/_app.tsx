import { NextPage } from "next";
import "../styles/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
// Tell Font Awesome to skip adding the CSS automatically
// since it's already imported above
config.autoAddCss = false;

const queryClient = new QueryClient();

type Props = {
	Component: any;
	pageProps: any;
};
const App: NextPage<Props> = ({ Component, pageProps }) => {
	return (
		<SessionProvider session={pageProps.session}>
			<QueryClientProvider client={queryClient}>
				<Component {...pageProps} />
			</QueryClientProvider>
		</SessionProvider>
	);
};

export default App;
