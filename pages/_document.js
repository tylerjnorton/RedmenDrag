import Document, { Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html>
        <Head>
          <script src="https://www.gstatic.com/firebasejs/5.1.0/firebase.js" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyD2_BcVzwKFQBn0czQsdCQqyM-tRV914FU",
      authDomain: "redmendrag.firebaseapp.com",
      databaseURL: "https://redmendrag.firebaseio.com",
      projectId: "redmendrag",
      storageBucket: "redmendrag.appspot.com",
      messagingSenderId: "507292806103"
    };
    firebase.initializeApp(config);

    const firestore = firebase.firestore();
    const settings = { timestampsInSnapshots: true };
	firestore.settings(settings);
		`
            }}
          />
          <link rel="stylesheet" type="text/css" href="/static/style.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
