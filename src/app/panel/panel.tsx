import { type ReactNode } from "react";
import "./panel.css";

interface PanelProps {
  children: ReactNode;
  opened: boolean;
  onClose: () => void;
}

export const Panel = ({ opened, children, onClose }: PanelProps) => {
  return (
    <div className={`panel ${opened ? "opened" : "closed"}`}>
      <button className="p-close" onClick={onClose}>
        x
      </button>
      <div className="p-content">{children}</div>
    </div>
  );
};
