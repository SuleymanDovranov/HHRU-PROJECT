const { Users, Clients } = require('./../models');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.addUser = catchAsync(async (req, res, next) => {
  var { firstName, lastName, gender, address, city, phone, email, status } =
    req.body;
  const user = await Users.create({
    firstName,
    lastName,
    gender,
    address,
    city,
    phone,
    email,
    status,
  });

  return res.status(201).send(user);
});

exports.addClient = catchAsync(async (req, res, next) => {
  const user = await Users.findOne({ where: { uuid: req.params.uuid } });
  if (!user) return next(new AppError('User Not Found', 404));

  const client = await Clients.create({ name: req.body.name, userId: user.id });

  return res.status(201).send(client);
});

exports.getClient = catchAsync(async (req, res, next) => {
  const user = await Users.findOne({ where: { uuid: req.params.uuid } });
  if (!user) return next(new AppError('User Not Found', 404));
   var {
    limit,
    page,
  } = req.query;
    let offset = 0;

  if (limit || page) offset = (page - 1) * limit;
  const clients = await Clients.findAll({ where: { userId: user.id },  limit,
    offset, });
  if (!clients) return next(new AppError('Not found', 404));

  return res.status(201).send(clients);
});

exports.getMe = catchAsync(async (req, res, next) => {
  const user = await Users.findOne({
    where: { uuid: req.params.uuid },
    include: [{ model: Clients, as: 'clients' }],
  });
  if (!user) return next(new AppError('User Not Found', 404));

  return res.status(201).send(user);
});

exports.deleteClients = catchAsync(async (req, res, next) => {
  const client = await Clients.findOne({ where: { uuid: req.params.uuid } });
  if (!client) return next(new AppError('Client Not Found', 404));

  client.destroy();
  return res.status(201).send({ msg: 'Successfully deleted!' });
});

exports.updateClient = catchAsync(async (req, res, next) => {
  const client = await Clients.findOne({ where: { uuid: req.params.uuid } });
  if (!client) return next(new AppError('Client Not FOUND', 404));
  client.update(req.body);
  return res.status(201).send(client);
});
