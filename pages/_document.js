// pages/_document.js

import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/*Google fonts */}
          {/*Google fonts */}
          {/* <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,900&display=swap" rel="stylesheet"/>  */}
          {/* Fonts and icons */}
          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
            rel="stylesheet"
          />
        </Head>
                      
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument