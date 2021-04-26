import React from "react";

type Props = {
  className?: string;
  icon: string;
  type: "brands" | "regular" | "solid";
};

const FontAwesome: React.VFC<Props> = ({ className, icon, type }) => (
  <svg className={`stroke-current fill-current ${className}`} style={{ verticalAlign: "-0.125em" }}>
    <use xlinkHref={`../static/fonts/${type}.svg#${icon}`} />
  </svg>
);

export default FontAwesome;
