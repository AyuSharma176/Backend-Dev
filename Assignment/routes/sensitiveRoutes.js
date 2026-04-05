const express = require("express");
const { createMfaMiddleware, createOtpStore } = require("../middleware/mfa");

const router = express.Router();
const otpStore = createOtpStore();

// Demo route to issue OTP for a user id.
router.post("/otp/issue", (req, res) => {
  const { userId, otp } = req.body || {};

  if (!userId || !otp) {
    return res.status(400).json({
      success: false,
      message: "userId and otp are required"
    });
  }

  otpStore.issue(userId, otp);

  return res.json({
    success: true,
    message: "OTP issued"
  });
});

const mfaMiddleware = createMfaMiddleware({ otpStore });

router.post("/transfer-funds", mfaMiddleware, (req, res) => {
  return res.json({
    success: true,
    message: "Sensitive operation completed with MFA",
    userId: req.auth.userId
  });
});

module.exports = router;
