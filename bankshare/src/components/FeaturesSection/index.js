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
                "Anonymously share",
              image: "https://uploads.divjoy.com/undraw-mind_map_cwng.svg"
            },
            {
              title: "Find money when you need it most",
              description:
                "Integer ornare neque mauris, ac vulputate lacus venenatis et. Pellentesque ut ultrices purus.",
              image:
                "https://uploads.divjoy.com/undraw-personal_settings_kihd.svg"
            },
            {
              title: "Celebrate",
              description:
                "Integer ornare neque mauris, ac vulputate lacus venenatis et. Pellentesque ut ultrices purus.",
              image: "https://uploads.divjoy.com/undraw-having_fun_iais.svg"
            }
          ]}
        />
      </div>
    </Section>
  );
}

export default FeaturesSection;
