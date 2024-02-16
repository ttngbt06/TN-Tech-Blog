const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Define the Post model
class Post extends Model {}

// Initialize the Post model with fields/columns
Post.init(
  {
    // Define the id column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      comment: 'Unique identifier for the post'
    },
    // Define the title column
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter a title'
        },
        len: {
          args: [1, 255],
          msg: 'Title must be between 1 and 255 characters long'
        }
      },
      comment: 'Title of the post'
    },
    // Define the post_content column
    post_content: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Content of the post'
    },
    // Define the user_id column as a foreign key referencing the User model
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      },
      comment: 'Identifier of the user who created the post'
    }
  },
  {
    // Define Sequelize connection and table options
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
    comment: 'Table storing posts'
  }
);

// Export the Post model
module.exports = Post;
