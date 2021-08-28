import React, { useState } from "react";

export default function State() {
  const [pinData, setPinData] = useState([]);

  return { pinData: pinData, setPinData: setPinData };
}