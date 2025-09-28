import React, { useEffect } from "react";
import { getStuffs } from "../services/apiStuffs";

const Staff = () => {
  useEffect(() => {
    getStuffs().then((data) => console.log(data));
  }, []);

  return <div>Staff</div>;
};

export default Staff;
