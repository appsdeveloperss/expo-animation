import {
  Blur,
  Canvas,
  RadialGradient,
  Rect,
  vec,
} from "@shopify/react-native-skia";
import { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import {
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

// Animation constants
const ANIMATION_CONFIG = {
  durations: {
    MOUNT: 2000,
    SPEAKING_TRANSITION: 600,
    QUIET_TRANSITION: 400,
    PULSE: 1000,
  },
  spring: {
    damping: 10,
    stiffness: 50,
    duration: 900,
  },
} as const;

// Visual constants
const VISUAL_CONFIG = {
  blur: 20,
  center: {
    x: width / 2,
    y: height / 2,
  },
} as const;

type GradientPosition = "top" | "center" | "bottom";

interface GradientProps {
  position: GradientPosition;
  isSpeaking: boolean;
}

const getTargetY = (position: GradientPosition): number => {
  switch (position) {
    case "top":
      return 0;
    case "center":
      return VISUAL_CONFIG.center.y - 40;
    case "bottom":
      return height;
    default:
      return VISUAL_CONFIG.center.y;
  }
};

export default function Gradient({ position, isSpeaking }: GradientProps) {
  const animatedY = useSharedValue(0);
  const center = useDerivedValue(() => {
    return vec(VISUAL_CONFIG.center.x, animatedY.value);
  });

  useEffect(() => {
    animatedY.value = getTargetY(position);
  }, []);

  useEffect(() => {
    const targetY = getTargetY(position);

    animatedY.value = withSpring(targetY, ANIMATION_CONFIG.spring);
  }, [position, animatedY]);

  return (
    <View style={StyleSheet.absoluteFill}>
      <Canvas style={{ flex: 1 }}>
        <Rect x={0} y={0} width={width} height={height}>
          <RadialGradient
            c={center}
            r={128}
            colors={[
              COLORS.mediumBlue,
              COLORS.lightBlue,
              COLORS.teal,
              COLORS.iceBlue,
              COLORS.white,
            ]}
          />
          <Blur blur={VISUAL_CONFIG.blur} mode={"clamp"} />
        </Rect>
      </Canvas>
    </View>
  );
}

const COLORS = {
  white: "#FFFFFF",
  teal: "#5AC8FA",
  mediumBlue: "#007AFF",
  lightBlue: "#4DA6FF",
  iceBlue: "#E6F3FF",
};
