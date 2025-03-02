import { ReactNode } from "react";
import { Property } from "csstype";

interface WhiteContainerProps {
  height: Property.Height<string | number>;
  width: Property.Width<string | number>;
  borderRadius: Property.BorderRadius<string | number>;
  children: ReactNode;
}

const WhiteContainer = ({
  height,
  width,
  borderRadius,
  children,
}: WhiteContainerProps) => {
  return (
    <div style={{ height, width, borderRadius }} className="flex justify-center items-center bg-white p-2 shadow">
      {children}
    </div>
  );
};

export { WhiteContainer };
