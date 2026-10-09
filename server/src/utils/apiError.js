class ApiError extends Error {
  constructor(statusCode, message, error = [], stack = "") {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.error = error;
    this.success = false;

    this.stack = stack;
    //dung de lay thong tin cac loi minh tu dinh nghia, ben canh cac loi default
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError;
