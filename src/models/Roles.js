
const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  role_name: {
    type: String,
    required: true,
  },
  permissions: {
    type: String, // Store permissions as a JSON string or an array of permissions
  },
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
