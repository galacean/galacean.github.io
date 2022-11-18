import React from "react";
import { Button } from "../../../ui/Button";
import { lightTheme } from "../../../ui/design-system";
import { SunLight, HalfMoon } from 'iconoir-react';
import { ActionButton } from "../../../ui/ActionButton";

export default function ThemeButton() {
  const [theme, setTheme] = React.useState("light-theme");

  React.useEffect(() => {
    document.body.classList.remove("dark-theme", lightTheme);
    document.body.classList.add(theme);
  }, [theme]);

  return <ActionButton onClick={() => setTheme(theme === "dark-theme" ? lightTheme : "dark-theme")}>
    {theme === "dark-theme" ? <HalfMoon /> : <SunLight />}
  </ActionButton>
}