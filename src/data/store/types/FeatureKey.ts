export type FeatureKeyType = "Strategy" | "Balance";

export const FeatureKey: {
  [key in FeatureKeyType]: FeatureKeyType;
} = {
  Balance: "Balance",
  Strategy: "Strategy",
};
