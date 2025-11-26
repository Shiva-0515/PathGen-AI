// ClerkAppearanceProvider.js
import { useTheme } from "@mui/material/styles";
import { ClerkProvider } from "@clerk/clerk-react";

const ClerkAppearanceProvider = ({ children, publishableKey }) => {
  const theme = useTheme();

  const appearance = {
    baseTheme: theme.palette.mode === "dark" ? "dark" : "light",
    variables: {
      colorPrimary: theme.palette.primary.main,
      colorBackground: theme.palette.background.default,
      colorText: theme.palette.text.primary,
      colorInputBackground: theme.palette.background.paper,
      colorInputText: theme.palette.text.primary,
    },
    elements: {
      card: "shadow-md rounded-2xl", // example extra Tailwind/CSS
      formButtonPrimary: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      },
    },
  };

  return (
    <ClerkProvider publishableKey={publishableKey} appearance={appearance}>
      {children}
    </ClerkProvider>
  );
};

export default ClerkAppearanceProvider;
