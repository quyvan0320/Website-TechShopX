export const isRequire = (value, errMsg) => {
  return value ? undefined : errMsg;
};

export const isEmail = (value, errMsg) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) ? undefined : errMsg;
};

export const isLength = (min) => (value, errMsg) => {
  return value && value.length < min ? errMsg : undefined;
};

export const isPhoneNumber = (value, errMsg) => {
  const phoneRegex = /^(0[1-9])[0-9]{8}$/;  // Kiểm tra số điện thoại bắt đầu bằng 0 và dài 10 chữ số
  return phoneRegex.test(value) ? undefined : errMsg;
};