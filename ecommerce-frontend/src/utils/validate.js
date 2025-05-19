export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[0-9]{10,}$/;
  return phoneRegex.test(phone);
};

export const validateCardNumber = (number) => {
  const cardRegex = /^[0-9]{13,16}$/;
  return cardRegex.test(number);
};

export const validateCardExp = (exp) => {
  const expRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  return expRegex.test(exp);
};

export const validateCVC = (cvc) => {
  const cvcRegex = /^[0-9]{3,4}$/;
  return cvcRegex.test(cvc);
};

export const validateZipCode = (zip) => {
  const zipRegex = /^[0-9]{5}(?:-[0-9]{4})?$/;
  return zipRegex.test(zip);
};

export const validateForm = (formData, rules) => {
  const errors = {};
  
  Object.entries(rules).forEach(([field, validators]) => {
    if (!formData[field]) {
      errors[field] = 'This field is required';
      return;
    }

    validators.forEach(validator => {
      if (!validator.test(formData[field])) {
        errors[field] = validator.message;
      }
    });
  });

  return errors;
};

export const createValidators = (rules) => {
  return Object.entries(rules).map(([field, validators]) => {
    return {
      field,
      validators: validators.map(validator => {
        if (typeof validator === 'string') {
          const validatorFn = {
            'required': (value) => !!value,
            'email': validateEmail,
            'phone': validatePhone,
            'cardNumber': validateCardNumber,
            'cardExp': validateCardExp,
            'cvc': validateCVC,
            'zip': validateZipCode
          }[validator];
          
          return {
            test: validatorFn,
            message: {
              required: 'This field is required',
              email: 'Please enter a valid email address',
              phone: 'Please enter a valid phone number',
              cardNumber: 'Please enter a valid card number',
              cardExp: 'Please enter a valid expiration date (MM/YY)',
              cvc: 'Please enter a valid CVC code',
              zip: 'Please enter a valid ZIP code'
            }[validator]
          };
        }
        return validator;
      })
    };
  });
};
