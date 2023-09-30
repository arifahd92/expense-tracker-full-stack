

const login = async (req, res) => {
  return res.send ({message: 'success', token: res.token, userId: res.id});
};
module.exports = {login};
