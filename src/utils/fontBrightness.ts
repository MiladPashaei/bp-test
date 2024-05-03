export const colorChecker = (hexColor:string ) => {
  if (!hexColor) {
    return "black"
  }
  // Function to calculate brightness from hex color code
  const calculateBrightness = (hex:string) => {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return (r * 299 + g * 587 + b * 114) / 1000;
  };

  const brightness = calculateBrightness(hexColor);
  if(Number.isNaN(brightness)){
    return 'black'
  }
  const textColor = brightness > 128 ? "black" : "white";
  return textColor;
};
export const calculateColor = (hex:string) => {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  const rgbValue = (r * 299 + g * 587 + b * 114) ;
  if(Number.isNaN(rgbValue)){
    return "blue"
  }
  return hex;
};