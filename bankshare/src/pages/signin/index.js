import React from "react";
import SignInSection from "./../../components/SignInSection";
import "./styles.scss";

function SigninPage(props) {
  return (
    <SignInSection
      color="white"
      size="large"
      title="Welcome to BankShare"
      subtitle="Send cryptocurrency to your friends using just your email."
      buttonText="Sign in"
    />
  );
}

export default SigninPage;
