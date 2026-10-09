const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || err.status || 500;
    //chuan bi response loi
    const errorResponse = {
      statusCode,
      message: err.message || 'Loi khong xac dinh',
      data: err.data || null,
      error: err.error || [],
      stack: process.env.NODE_ENV === 'development' ?  err.stack : "",
    };
    //xuat ra console de xem
    console.error(err);
    //tra ve cho nguoi dung
    res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;

