import React from "react";
import ContentSection from "./../../components/ContentSection";
import TeamBiosSection from "./../../components/TeamBiosSection";
import "./styles.scss";

function AboutPage(props) {
  return (
    <>
      <ContentSection
        color="primary"
        size="large"
        title="We help you save your money"
        subtitle="BankShare offers free and trustless banking without the overhead"
      />
      <TeamBiosSection
        color="white"
        size="medium"
        title="Meet the Team"
        subtitle=""
      />
    </>
  );
}

export default AboutPage;
