import Document, { Html, Head, Main, NextScript } from "next/document";
import NavBar from "./nav";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <title>Turknet Case</title>
          <meta name="description" content="turknet case" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
