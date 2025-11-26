import React, { useMemo } from "react";
import { useTheme } from "@mui/material/styles";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";
import Button from "@mui/material/Button";

export default function ClerkThemedAuth() {
  const theme = useTheme();

  // Map MUI theme → Clerk appearance
  const clerkAppearance = useMemo(() => ({
    baseTheme: theme.palette.mode === "dark" ? "dark" : "light",
    variables: {
      colorPrimary: theme.palette.primary.main,
      colorBackground: theme.palette.background.default,
      colorText: theme.palette.text.primary,
      colorInputBackground: theme.palette.background.paper,
      colorInputText: theme.palette.text.primary,
      colorDanger: theme.palette.error.main,
    },
    elements: {
      card: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[2],
      },
      formButtonPrimary: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        "&:hover": { backgroundColor: theme.palette.primary.dark },
      },
      footerActionLink: { color: theme.palette.secondary.main },
      headerTitle: { color: theme.palette.text.primary },
    },
  }), [theme]);

  return (
    <>
      <SignedOut>
        <SignInButton mode="modal" appearance={clerkAppearance}>
          <Button color="primary" variant="text" size="small">
            Sign In
          </Button>
        </SignInButton>
        <SignUpButton mode="modal" appearance={clerkAppearance}>
          <Button color="primary" variant="contained" size="small">
            Sign Up
          </Button>
        </SignUpButton>
      </SignedOut>

      <SignedIn>
        <UserButton afterSignOutUrl="/" appearance={clerkAppearance} />
      </SignedIn>
    </>
  );
}
