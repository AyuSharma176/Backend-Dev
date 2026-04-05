function defaultJwtVerifier(token) {
  // Minimal fallback check. In production use a real JWT library verification.
  const parts = String(token || "").split(".");

  if (parts.length !== 3) {
    throw new Error("Invalid JWT format");
  }

  const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8"));

  return {
    userId: payload.sub || payload.userId || payload.id,
    payload
  };
}

function createOtpStore(ttlMs = 5 * 60 * 1000) {
  const otpMap = new Map();

  function issue(userId, otp) {
    otpMap.set(String(userId), {
      otp: String(otp),
      expiresAt: Date.now() + ttlMs
    });
  }

  function verify(userId, otp) {
    const key = String(userId || "");
    const value = otpMap.get(key);

    if (!value) {
      return false;
    }

    if (Date.now() > value.expiresAt) {
      otpMap.delete(key);
      return false;
    }

    const isMatch = value.otp === String(otp || "");

    if (isMatch) {
      otpMap.delete(key);
    }

    return isMatch;
  }

  return {
    issue,
    verify
  };
}

function createMfaMiddleware(options = {}) {
  const otpStore = options.otpStore;
  const verifyJwt = options.verifyJwt || defaultJwtVerifier;

  if (!otpStore || typeof otpStore.verify !== "function") {
    throw new Error("createMfaMiddleware requires an otpStore with a verify(userId, otp) method");
  }

  return async function mfaMiddleware(req, res, next) {
    try {
      const authHeader = req.headers.authorization || "";
      const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Missing JWT token"
        });
      }

      const authData = await verifyJwt(token);
      const userId = authData && (authData.userId || authData.sub || authData.id);

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "JWT token is missing user identity"
        });
      }

      const otp =
        req.headers["x-otp-code"] ||
        req.body?.otp ||
        req.query?.otp;

      if (!otp) {
        return res.status(401).json({
          success: false,
          message: "Missing OTP code"
        });
      }

      const isValidOtp = otpStore.verify(userId, otp);

      if (!isValidOtp) {
        return res.status(401).json({
          success: false,
          message: "Invalid or expired OTP code"
        });
      }

      req.auth = {
        userId,
        tokenPayload: authData.payload || authData
      };

      return next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed",
        error: error.message
      });
    }
  };
}

module.exports = {
  createMfaMiddleware,
  createOtpStore,
  defaultJwtVerifier
};
