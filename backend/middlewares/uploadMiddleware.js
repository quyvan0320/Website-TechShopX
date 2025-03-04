import formidable from "formidable";

const uploadMiddleware = (req, res, next) => {
  const form = formidable({ multiples: true });
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "Lỗi khi xử lý dữ liệu" });
    }
    req.fields = fields;
    req.files = files;
    next();
  });
};

export default uploadMiddleware;
