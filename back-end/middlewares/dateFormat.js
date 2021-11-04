const formatDate = (data) => {
  const date = data.getDate();
  const month = data.getMonth() + 1;
  const year = data.getFullYear();
  return `${month}/${date}/${year}`;
};

const formatDueDate = (data) => {
  const date = data.getDate() + 1;
  const month = data.getMonth() + 1;
  const year = data.getFullYear();
  return `${month}/${date}/${year}`;
};

const dateFormatter = (req, res, next) => {
  const {
    createdAt,
    updatedAt,
    dueDate,
    id,
    description,
    status,
  } = req.body;
  const newcreatedAt = formatDate(createdAt);
  const newupdatedAt = formatDate(updatedAt);
  const newdueDate = formatDueDate(dueDate);

  const newBody = {
    id,
    description,
    status,
    createdAt: newcreatedAt,
    updatedAt: newupdatedAt,
    dueDate: newdueDate,
  };

  req.data = newBody;
  next();
};

module.exports = dateFormatter;
