const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

// Define the Comment model
Comment.init(
  {
    // Define the columns of the Comment table
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      comment: 'Unique identifier for the comment'
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      },
      comment: 'Identifier of the user who created the comment'
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'post',
        key: 'id'
      },
      comment: 'Identifier of the post to which the comment belongs'
    },
    comment_text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 500],
          msg: 'Comment text must be between 1 and 500 characters long'
        },
        notNull: {
          msg: 'Please provide a comment'
        }
      },
      comment: 'Text content of the comment'
    }
  },
  {
    // Define Sequelize connection and table options
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
    comment: 'Table storing comments'
  }
);

// Export the Comment model
module.exports = Comment;
