type EnumLiteralsOf<T> = T[keyof T];

const Primary = Object.freeze({
  background: "#181825",
  gray: "#444769",
  white: "#FFFFFF",
  black: "#000000",
  darkBackground: "#32324d",
  link: "#6698ff",
  disabled: "#c6c6cc",
  error: "#ff2600",
  warning: "#ffb214",
});

const Secondary = Object.freeze({
  blackDisabled: "#181825",
  blackActive: "#13131D",
  darkOrange: "#973B15",
  darkYellow: "#874C2E",
  darkNavy: "#202031",
  deepGray: "#1c1d2c",
  deepNavy: "#242635",
  lightBackground: "#2A2A41",
  lightGray: "#646897",
  lightOrange: "#FD6323",
  lightYellow: "#FFC728",
});

const Colors = {
  ...Primary,
  ...Secondary,
};

export type TColors = EnumLiteralsOf<typeof Colors>;

export default Colors;
