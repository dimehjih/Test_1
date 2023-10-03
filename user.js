import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from './user';
import Token from './token';

export function createUser(req, res) {
    bcrypt.hash(req.body.password, 15, (err, hash) => {
      const password = hash;
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        email: req.body.email,
        password,
      });
  // check that user submits the required value
      if (!user.username || !user.email || !user.password) {
        return res.status(400).json({
          message: 'Please ensure you fill the username, email, and password',
        });
      }
  // verify the user isn't stored in the database
      return User.count({
        $or: [
          { username: req.body.username },
          { email: req.body.email },
        ],
      })
      .then((count) => {
        (count > 0); {
          res.status(401).json({
            message: 'This user exists',
          });
        }
  // if user doesn't exist, create one
        return user
          .save()
          .then((newUser) => {
            const token = Token(newUser);          
            res.status(201).json({
              message: 'User signup successfully',
              newUser,
              token,          
            });
          })
          .catch(() => {
            res.status(500).json({
              message: 'Our server is in the locker room, please do try again.'
            });
          });
        });
      }); 
  }
  export default User;