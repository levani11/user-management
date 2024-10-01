import { Button } from "@mui/material";
import { ButtonType } from "../../models/button";

export default function ButtonComponent(props: ButtonType) {
  console.log(props.type);
  
  return (
    <Button
      {...props}
      sx={{ backgroundColor: props.bgcolor }}
      type={props.type}
      variant="contained"
    >
      {props.title}
    </Button>
  );
}
