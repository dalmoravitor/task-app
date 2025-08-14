const { isValidEmail, validatePassword } = require('../utils/auth');

/**
 * Validate registration data
 */
const validateRegistration = (req, res, next) => {
  const { email, password, name } = req.body;
  const errors = [];

  // Email validation
  if (!email) {
    errors.push('Email is required');
  } else if (!isValidEmail(email)) {
    errors.push('Please provide a valid email address');
  }

  // Password validation
  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    errors.push(...passwordValidation.errors);
  }

  // Name validation (optional but if provided, should be valid)
  if (name && (typeof name !== 'string' || name.trim().length === 0)) {
    errors.push('Name must be a non-empty string');
  }

  if (name && name.length > 50) {
    errors.push('Name must be less than 50 characters');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors
    });
  }

  // Sanitize input
  req.body.email = email.toLowerCase().trim();
  if (name) {
    req.body.name = name.trim();
  }

  next();
};

/**
 * Validate login data
 */
const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email) {
    errors.push('Email is required');
  } else if (!isValidEmail(email)) {
    errors.push('Please provide a valid email address');
  }

  if (!password) {
    errors.push('Password is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors
    });
  }

  // Sanitize input
  req.body.email = email.toLowerCase().trim();

  next();
};

/**
 * Validate profile update data
 */
const validateProfileUpdate = (req, res, next) => {
  const { name, avatar } = req.body;
  const errors = [];

  // Name validation (optional)
  if (name !== undefined) {
    if (typeof name !== 'string') {
      errors.push('Name must be a string');
    } else if (name.trim().length === 0) {
      errors.push('Name cannot be empty');
    } else if (name.length > 50) {
      errors.push('Name must be less than 50 characters');
    }
  }

  // Avatar validation (optional)
  if (avatar !== undefined) {
    if (typeof avatar !== 'string') {
      errors.push('Avatar must be a string (URL or base64)');
    } else if (avatar.length > 19000000) { // ~19MB limit for base64 images
      errors.push('Avatar data is too large (max 19MB)');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors
    });
  }

  // Sanitize input
  if (name !== undefined) {
    req.body.name = name.trim();
  }
  if (avatar !== undefined) {
    req.body.avatar = avatar.trim();
  }

  next();
};

/**
 * Validate change password data
 */
const validateChangePassword = (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  const errors = [];

  if (!currentPassword) {
    errors.push('Current password is required');
  }

  const passwordValidation = validatePassword(newPassword);
  if (!passwordValidation.isValid) {
    errors.push(...passwordValidation.errors.map(error => 
      error.replace('Password', 'New password')
    ));
  }

  if (currentPassword === newPassword) {
    errors.push('New password must be different from current password');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors
    });
  }

  next();
};

module.exports = {
  validateRegistration,
  validateLogin,
  validateProfileUpdate,
  validateChangePassword
};
