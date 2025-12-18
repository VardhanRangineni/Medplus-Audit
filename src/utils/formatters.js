export const formatIndianCurrency = (value) => {
  if (value === undefined || value === null) return "₹0";

  // Convert to absolute value for calculation, handle sign at the end if needed
  const absValue = Math.abs(value);

  if (absValue >= 10000000) {
    // 1 Crore
    return `₹${(absValue / 10000000).toFixed(2)} Cr`;
  } else if (absValue >= 100000) {
    // 1 Lakh
    return `₹${(absValue / 100000).toFixed(2)} L`;
  } else {
    return `₹${value.toLocaleString("en-IN")}`;
  }
};

export const formatIndianNumber = (value, shorten = false) => {
  if (value === undefined || value === null) return "0";

  if (shorten) {
    const absValue = Math.abs(value);
    if (absValue >= 10000000) {
      return `${(absValue / 10000000).toFixed(2)} Cr`;
    } else if (absValue >= 100000) {
      return `${(absValue / 100000).toFixed(2)} L`;
    }
  }

  return value.toLocaleString("en-IN");
};
