import { SliderThumb } from "@mui/material";

interface CustomThumbComponent extends React.HTMLAttributes<unknown> {}

export default function CustomThumbComponent(props: CustomThumbComponent) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <div>I</div>
    </SliderThumb>
  );
}
