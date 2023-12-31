import "./global.css";
import Head from "next/head";
import Providers from "@/redux/provider";

export const metadata = {
  title: "wasap",
  description: "Real Tiem Text App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Sans&family=Noto+Sans&family=Roboto&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
