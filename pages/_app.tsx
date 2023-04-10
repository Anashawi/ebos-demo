import { NextPage } from "next";
import "../styles/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
// Tell Font Awesome to skip adding the CSS automatically
// since it's already imported above
config.autoAddCss = false;

type Props = {
   Component: any;
   pageProps: any;
};
const App: NextPage<Props> = ({ Component, pageProps }) => {
   return <Component {...pageProps} />;
};

export default App;
