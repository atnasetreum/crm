import { ReactElement, ReactNode, Ref, forwardRef } from "react";

import Typography from "@mui/material/Typography";
import { TransitionProps } from "@mui/material/transitions";
import Slide from "@mui/material/Slide";

interface TabPanelProps {
  children?: ReactNode;
  dir?: string;
  index: number;
  value: number;
}

export function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return value === index && <Typography>{children}</Typography>;
}

export function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
