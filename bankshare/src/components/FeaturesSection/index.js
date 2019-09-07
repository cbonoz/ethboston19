import React from "react";
import Section from "./../Section";
import Features from "./../Features";
import "./styles.scss";

function FeaturesSection(props) {
  return (
    <Section color={props.color} size={props.size}>
      <div className="container">
        <Features
          items={[
            {
              title: "Tap into a network of lenders",
              description:
                "Create an account with just your gmail, no credit card, social security, address, or other personal information needed.",
              image: "https://uploads.divjoy.com/undraw-mind_map_cwng.svg"
            },
            {
              title: "We'll pair you with an offer that matches your criteria",
              description:
                "Powered by the Taxa network, privately search and redeem a loan with another friend in the network.",
              image:
                "https://uploads.divjoy.com/undraw-personal_settings_kihd.svg"
            },
            {
              title: "Celebrate",
              description:
                "You got money! Pay it back on the agreed terms.",
              image: "https://uploads.divjoy.com/undraw-having_fun_iais.svg"
            }
          ]}
        />
      </div>
    </Section>
  );
}

export default FeaturesSection;
