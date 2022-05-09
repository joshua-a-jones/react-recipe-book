import React from "react";
import "./MessageCard.css";
import { useTheme } from "../../api/hooks/useTheme";

export function MessageCard({ children }: { children: React.ReactNode }) {
  const { themeStyle } = useTheme();

  return <div className={`message-card ${themeStyle.mode}`}>{children}</div>;
}
