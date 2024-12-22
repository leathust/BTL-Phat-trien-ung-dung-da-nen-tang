import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'TOP_SECRET_JWT';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'TOP_SECRET_REFRESH_JWT';

// Tạo Access Token
export const createAccessToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

// Tạo Refresh Token
export const createRefreshToken = (payload, expiresIn = '30d') => {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn });
};

// Xác thực Access Token
export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired access token');
  }
};

// Xác thực Refresh Token
export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired refresh token');
  }
};
