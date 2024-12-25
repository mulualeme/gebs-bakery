// Card number formatting (1234 5678 9012 3456)
export const formatCardNumber = (value) => {
  // Remove all non-digits
  const digits = value.replace(/\D/g, "");
  // Add space after every 4 digits
  const formatted = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  // Limit to 19 characters (16 digits + 3 spaces)
  return formatted.slice(0, 19);
};

// Expiry date formatting (MM/YY)
export const formatExpiryDate = (value) => {
  // Remove all non-digits
  const digits = value.replace(/\D/g, "");
  // Add slash after first 2 digits
  if (digits.length >= 2) {
    return digits.slice(0, 2) + "/" + digits.slice(2, 4);
  }
  return digits;
};

// Phone number formatting ((123) 456-7890)
export const formatPhoneNumber = (value) => {
  // Remove all non-digits
  const digits = value.replace(/\D/g, "");
  // Format as (XXX) XXX-XXXX
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
};

// Form validation
export const validateForm = (formData) => {
  // Card number validation (16 digits)
  const cardNumberValid = formData.cardNumber.replace(/\s/g, "").length === 16;

  // Expiry date validation (MM/YY format)
  const expiryValid = /^\d{2}\/\d{2}$/.test(formData.expiryDate);

  // CVV validation (3-4 digits)
  const cvvValid = /^\d{3,4}$/.test(formData.cvv);

  // Phone validation (10 digits)
  const phoneValid = formData.phone.replace(/\D/g, "").length === 10;

  // Email validation
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

  return {
    isValid:
      cardNumberValid && expiryValid && cvvValid && phoneValid && emailValid,
    errors: {
      cardNumber: !cardNumberValid ? "Invalid card number" : "",
      expiryDate: !expiryValid ? "Invalid expiry date" : "",
      cvv: !cvvValid ? "Invalid CVV" : "",
      phone: !phoneValid ? "Invalid phone number" : "",
      email: !emailValid ? "Invalid email address" : "",
    },
  };
};
