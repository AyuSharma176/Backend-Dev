function softDeletePlugin(schema) {
  schema.add({
    isDeleted: {
      type: Boolean,
      default: false,
      index: true
    },
    deletedAt: {
      type: Date,
      default: null
    }
  });

  schema.methods.softDelete = function softDelete() {
    this.isDeleted = true;
    this.deletedAt = new Date();
    return this.save();
  };

  schema.methods.restore = function restore() {
    this.isDeleted = false;
    this.deletedAt = null;
    return this.save();
  };

  schema.statics.softDeleteById = function softDeleteById(id) {
    return this.findByIdAndUpdate(
      id,
      {
        $set: {
          isDeleted: true,
          deletedAt: new Date()
        }
      },
      { new: true }
    );
  };

  schema.statics.restoreById = function restoreById(id) {
    return this.findByIdAndUpdate(
      id,
      {
        $set: {
          isDeleted: false,
          deletedAt: null
        }
      },
      { new: true }
    );
  };

  // Override delete methods so data is marked deleted instead of physically removed.
  schema.statics.deleteOne = function softDeleteOne(filter = {}, options = {}) {
    return this.updateOne(
      filter,
      {
        $set: {
          isDeleted: true,
          deletedAt: new Date()
        }
      },
      options
    );
  };

  schema.statics.deleteMany = function softDeleteMany(filter = {}, options = {}) {
    return this.updateMany(
      filter,
      {
        $set: {
          isDeleted: true,
          deletedAt: new Date()
        }
      },
      options
    );
  };

  schema.statics.findOneAndDelete = function softFindOneAndDelete(filter = {}, options = {}) {
    return this.findOneAndUpdate(
      filter,
      {
        $set: {
          isDeleted: true,
          deletedAt: new Date()
        }
      },
      {
        ...options,
        new: true
      }
    );
  };

  schema.statics.findByIdAndDelete = function softFindByIdAndDelete(id, options = {}) {
    return this.findByIdAndUpdate(
      id,
      {
        $set: {
          isDeleted: true,
          deletedAt: new Date()
        }
      },
      {
        ...options,
        new: true
      }
    );
  };

  schema.pre(/^find/, function hideDeletedOnFind(next) {
    const includeDeleted = this.getOptions()?.includeDeleted;

    if (!includeDeleted) {
      this.where({ isDeleted: false });
    }

    next();
  });

  schema.pre("aggregate", function hideDeletedOnAggregate(next) {
    const firstStage = this.pipeline()[0];

    if (!firstStage || !firstStage.$match || firstStage.$match.isDeleted === undefined) {
      this.pipeline().unshift({ $match: { isDeleted: false } });
    }

    next();
  });
}

module.exports = {
  softDeletePlugin
};
