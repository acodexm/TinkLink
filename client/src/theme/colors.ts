type EnumLiteralsOf<T> = T[keyof T];

const Pallette = Object.freeze({
  primary: "#427783",
  background: "#FFFFFF",
  tintedBackground: "#F0F5F5",
  buttonBg: "#427783",
  textPrimary: "#262626",
  textSecondary: "#808080",
  textBtn: "#FFFFFF",
  disabled: "#c6c6cc",
  error: "#EA544A",
  warning: "#ffb214",
});

const Colors = {
  ...Pallette,
};

export type TColors = EnumLiteralsOf<typeof Colors>;

export default Colors;
