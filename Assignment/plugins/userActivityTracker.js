function userActivityTracker(schema) {
  schema.add({
    isLoggedIn: {
      type: Boolean,
      default: false
    },
    loginSessions: [
      {
        loginAt: {
          type: Date,
          required: true
        },
        logoutAt: {
          type: Date
        }
      }
    ],
    lastActiveAt: {
      type: Date,
      default: Date.now
    }
  });

  schema.pre("save", function userActivitySaveHook(next) {
    const now = new Date();

    if (this.isModified("isLoggedIn")) {
      if (this.isLoggedIn) {
        this.loginSessions.push({ loginAt: now });
      } else {
        const openSession = [...this.loginSessions].reverse().find((session) => !session.logoutAt);
        if (openSession) {
          openSession.logoutAt = now;
        }
      }
    }

    this.lastActiveAt = now;
    next();
  });

  schema.pre(["findOneAndUpdate", "updateOne", "updateMany"], function userActivityQueryHook(next) {
    const update = this.getUpdate() || {};
    const setData = update.$set || {};

    setData.lastActiveAt = new Date();
    update.$set = setData;
    this.setUpdate(update);

    next();
  });
}

module.exports = {
  userActivityTracker
};
