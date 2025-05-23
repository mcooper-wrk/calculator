import { Slider, styled } from "@mui/material";

export const CustomSlider = styled(Slider)(() => ({
  color: "#9e9e9e",
  border: "none",
  width: "122px",
  "& .MuiSlider-thumb": {
    backgroundColor: "#d9d9d9",
    borderRadius: "2px",
    height: "18px",
    boxShadow: "0 0 2px 0px rgba(0, 0, 0, 0.1)",
    maxHeight: "15px",
    maxWidth: "15px",
  },
  "& .MuiSlider-markLabel": {
    color: "#d9d9d9",
    fontSize: "large",
  },
}));
