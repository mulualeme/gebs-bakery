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
export const validateForm = (formData = {}) => {
  const errors = {};

  // Name validation
  if (!formData.name?.trim()) {
    errors.name = "Name is required";
  }

  // Email validation
  if (!formData.email?.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Invalid email format";
  }

  // Phone validation
  if (!formData.phone?.trim()) {
    errors.phone = "Phone number is required";
  } else {
    const cleanedPhone = formData.phone.replace(/\D/g, "");
    if (cleanedPhone.length < 10) {
      errors.phone = "Phone number must be at least 10 digits";
    }
  }

  // Address validation
  if (!formData.address?.trim()) {
    errors.address = "Address is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
