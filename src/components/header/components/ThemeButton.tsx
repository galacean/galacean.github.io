import React, { useContext } from "react";
import { lightTheme } from "@oasis-engine/editor-design-system";
import { SunLight, HalfMoon } from 'iconoir-react';
import { ActionButton } from "@oasis-engine/editor-components";
import { AppContext } from "../../contextProvider";

export default function ThemeButton() {
  const context = useContext(AppContext);

  React.useEffect(() => {
    document.body.classList.remove("dark-theme", lightTheme);
    document.body.classList.add(context.theme);
  }, [context.theme]);

  return <ActionButton onClick={() => {
    const newTheme = context.theme === "dark-theme" ? lightTheme : "dark-theme"
    context.setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }}>
    {context.theme === "dark-theme" ? <HalfMoon /> : <SunLight />}
  </ActionButton>
}