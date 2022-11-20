import axios from "axios";
import React, { useEffect, useState } from "react";
import Records from "../../components/history/Records";
import UserContext from "../../Context/userContext";
import { useContext } from "react";

const history = () => {
  

  return (
    <div>
      <Records />
    </div>
  );
};

export default history;
