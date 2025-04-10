import { NextPage } from "next";
import { SessionProvider } from "next-auth/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Context from "../context";
import Layout from "../components/org/layout";

import { config } from "@fortawesome/fontawesome-svg-core";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import "../styles/report.css";
import "../styles/globals.css";

// font awesome already added
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
                <Context>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </Context>
                <ReactQueryDevtools />
            </QueryClientProvider>
        </SessionProvider>
    );
};

export default App;
