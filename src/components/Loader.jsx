import React from "react";
import { Stack } from "@mui/material";
import { RingLoader } from "react-spinners";

const Loader = () => (
  <Stack
    direction="row"
    justifyContent="center"
    alignItems="center"
    width="100%"
    minHeight="260px"
  >
    <RingLoader color="#6366f1" size={60} />
  </Stack>
);

export default Loader;
