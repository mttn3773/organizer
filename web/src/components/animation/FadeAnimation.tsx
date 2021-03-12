import { Box } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import "./animation.css";

interface FadeAnimationProps {
  dep: any;
}

export const FadeAnimation: React.FC<FadeAnimationProps> = ({
  children,
  dep,
}) => {
  const [animate, setAnimate] = useState<boolean>(true);
  useEffect(() => {
    setAnimate(true);
  }, [dep]);
  return (
    <Box
      onAnimationEnd={() => setAnimate(false)}
      className={animate ? "fade" : ""}
    >
      {children}
    </Box>
  );
};
