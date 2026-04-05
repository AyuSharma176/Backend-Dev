function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function sanitizeString(value) {
  const noScriptTags = value.replace(/<\s*\/\s*script\s*>/gi, "").replace(/<\s*script\b[^>]*>/gi, "");
  return escapeHtml(noScriptTags.trim());
}

function sanitizeObject(value) {
  if (Array.isArray(value)) {
    return value.map(sanitizeObject);
  }

  if (value && typeof value === "object") {
    const output = {};

    for (const [key, childValue] of Object.entries(value)) {
      // Drop suspicious keys often used in NoSQL injection payloads.
      if (key.startsWith("$") || key.includes(".")) {
        continue;
      }

      output[key] = sanitizeObject(childValue);
    }

    return output;
  }

  if (typeof value === "string") {
    return sanitizeString(value);
  }

  return value;
}

function sanitizeRequestData(req, res, next) {
  if (req.body) {
    req.body = sanitizeObject(req.body);
  }

  if (req.query) {
    req.query = sanitizeObject(req.query);
  }

  if (req.params) {
    req.params = sanitizeObject(req.params);
  }

  next();
}

module.exports = {
  sanitizeRequestData,
  sanitizeObject,
  sanitizeString
};
