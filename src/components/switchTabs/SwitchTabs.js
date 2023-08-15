import React from "react";
import { useState } from "react";

import "./SwitchTabs.scss";

const SwitchTabs = (props) => {
  const [activeTab, setActiveTab] = useState(0);
  const left = activeTab * 100;

  const tabSwitchHandler = (tab, index) => {
    setActiveTab(index);

    props.onTabChange(tab);
  };

  return (
    <div className="switchingTabs">
      <div className="tabItems">
        {props.tabs.map((tab, index) => (
          <span
            className={`tabItem ${index === activeTab ? "active" : ""}`}
            key={index}
            onClick={() => tabSwitchHandler(tab, index)}
          >
            {tab}
          </span>
        ))}
        <span className="movingBg" style={{ left: left }} />
      </div>
    </div>
  );
};

export default SwitchTabs;
