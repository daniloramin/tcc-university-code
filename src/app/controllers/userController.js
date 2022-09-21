const User = require("../models/User");
const bcrypt = require("bcryptjs");

const updateAccount = async (req, res) => {
  const { id, changes } = req.body;

  // id irá vir do jwt, sendo possível editar somente a própria conta, mas por enquanto será por json

  if (!id) return res.status(400).send({ message: 'Field "id" is required' });

  if (!changes)
    return res.status(400).send({ message: 'Field "changes" is required' });

  try {
    const password = changes?.password;
    if (password) {
      console.log("entrou no if password");
      const salt = bcrypt.genSaltSync(10);
      changes.password = bcrypt.hashSync(password, salt);
    }

    console.log(id);
    console.log(changes);

    // const user = await User.findOne({ _id: id });
    const user = await User.findByIdAndUpdate(id, changes);
    console.log(user);

    if (!user)
      return res.status(400).send({ message: "This user does not exists." });

    // const update = await User.updateOne({ _id: id }, { ...changes });

    // console.log(update);

    const update = await User.findById(id);
    update.password = undefined;

    return res.status(200).send({ message: "Updated", user: update });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

// const deleteAccount = (req, res) => {
//   res.status(204).send(`Account deleted`);
// };

module.exports = { updateAccount };
