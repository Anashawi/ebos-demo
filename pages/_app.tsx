import { NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "../styles/report.css";
import "../styles/globals.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

import { config } from "@fortawesome/fontawesome-svg-core";

// Tell Font Awesome to skip adding the CSS automatically
// since it's already imported above
config.autoAddCss = false;

const queryClient = new QueryClient();

interface Props {
    Component: any;
    pageProps: any;
}

const App: NextPage<Props> = ({ Component, pageProps }) => {
    return (
        <SessionProvider session={pageProps.session}>
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
                <ReactQueryDevtools />
            </QueryClientProvider>
        </SessionProvider>
    );
};

export default App;
