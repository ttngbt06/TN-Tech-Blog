const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Function to fetch posts with comments and user data
const fetchPosts = (whereClause, res, template) => {
  Post.findAll({
    where: whereClause,
    attributes: ['id', 'title', 'created_at', 'post_content'],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username', 'twitter', 'github']
        }
      },
      {
        model: User,
        attributes: ['username', 'twitter', 'github']
      }
    ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render(template, { posts, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Failed to retrieve posts.' });
    });
};

// Route to fetch all posts
router.get('/', withAuth, (req, res) => {
  fetchPosts({ user_id: req.session.user_id }, res, 'dashboard');
});

// Route to fetch a specific post for editing
router.get('/edit/:id', withAuth, (req, res) => {
  Post.findOne({
    where: { id: req.params.id },
    attributes: ['id', 'title', 'created_at', 'post_content']
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      const post = dbPostData.get({ plain: true });
      res.render('edit-post', { post, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Failed to retrieve the post.' });
    });
});

// Route to render the create post page
router.get('/create/', withAuth, (req, res) => {
  fetchPosts({ user_id: req.session.user_id }, res, 'create-post');
});

module.exports = router;
