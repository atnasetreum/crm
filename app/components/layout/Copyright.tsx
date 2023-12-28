import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

export default function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://www.linkedin.com/in/mario-gutierrez-garcia-7866751a6/?originalSubdomain=mx"
        target="_blank"
      >
        Mario Gutierrez García
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
