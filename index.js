const mongoose = require('mongoose');
const Dishes = require('./models/dishes');
const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db) => {
	console.log("Connected to Server");

	Dishes.create({
		name: 'Pizza',
		description:'onion and corn'
	})
		.then((dish) => {
			console.log(dish);
			return Dishes.findByIdAndUpdate(dish._id,{
				$set: {description: 'cheese'}
			},
				{
					new: true
				}).exec(); //to execute the command
			})
			.then((dish) => {
				console.log(dish);
				dish.comments.push({
					rating: 5,
					comment: 'The Brief History of Time',
					author: 'S.W. Hawking'
				});
				return dish.save();
					})
				.then(() => {
					return Dishes.remove();
				})
					.then(() => {
						return mongoose.connection.close();
						})
						.catch((err) => {
						console.log(err);
						});
				});