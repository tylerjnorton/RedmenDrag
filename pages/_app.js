import App, { Container } from "next/app";
import Router from "next/router";
import { onAuthStateChange } from "../components/firebase";
import { login } from "../components/firebase";

function Login() {
  return <button id="loginbutton" onClick={() => login()}>Login With Google</button>;
}

export default class MyApp extends App {
  state = { loading: true };
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }
  componentDidMount() {
    onAuthStateChange(async user => {
      if (user) {
        const token = await user.getIdToken(true);
        localStorage.setItem("auth_token", token);
        document.cookie = `auth_token=${token}`;
      }

      this.setState(state => ({ loading: false, user }));
    });
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        {this.state.loading ? null : this.state.user ? (
          <Component {...pageProps} user={this.state.user} />
        ) : (
            <Login />
          )}
      </Container>
    );
  }
}
