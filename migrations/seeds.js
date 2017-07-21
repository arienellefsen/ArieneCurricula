
module.exports = function (db) {
  db.User.create({
    user_email: 'testPerson1@gmail.com', 
    password: 'password1',
    user_type: 'user'
  }).then(() => {
    console.log('Seeded user testPerson1@gmail.com');
  });

  db.User.create({
    user_email: 'testPerson2@gmail.com', 
    password: 'password2',
    user_type: 'author'
  }).then(() => {
    console.log('Seeded user testPerson2@gmail.com');
  });

  db.User.create({
    user_email: 'testPerson3@gmail.com', 
    password: 'password3',
    user_type: 'user'
  }).then(() => {
    console.log('Seeded user testPerson3@gmail.com');
  });

  db.Curricula.create({
    curricula_name: 'How to learn JavaScript',
    category: 'Programming',
    sub_category: 'JavaScript',
    search_tags: 'javascript programming web development',
    votes: 10,
    description: 'Learn to program with the language of the internet.',
    submited_status: false,
    author_id: 2
  }).then(() => {
    console.log('Seeded curricula on learning Javascript');
  });

  db.Curricula.create({
    curricula_name: 'How to cook steak',
    category: 'Cooking',
    sub_category: 'Steak',
    search_tags: 'steak cooking meat grill',
    votes: 90,
    description: 'Learn to cook steaks perfectly every time.',
    submited_status: true,
    author_id: 2
  }).then(() => {
    console.log('Seeded curricula on learning to cook streak');
  });

  db.CurriculaDetails.create({
    step_number: 1,
    step_type: "text",
    step_content: "Read the book Eloquent Javascript.",
    step_url: null,
    author_id: 2,
    curricula_id: 1
  }).then(() => {
    console.log('Seeded JS step 1');
  });

  db.CurriculaDetails.create({
    step_number: 2,
    step_type: "text",
    step_content: "Try the practice problems in the book.",
    step_url: null,
    author_id: 2,
    curricula_id: 1
  }).then(() => {
    console.log('Seeded JS step 2');
  });

  db.CurriculaDetails.create({
    step_number: 3,
    step_type: "text",
    step_content: "Build a todo list.",
    step_url: null,
    author_id: 2,
    curricula_id: 1
  }).then(() => {
    console.log('Seeded JS step 3');
  });

  db.CurriculaDetails.create({
    step_number: 4,
    step_type: "text",
    step_content: "Watch some you-tube videos",
    step_url: null,
    author_id: 2,
    curricula_id: 1
  }).then(() => {
    console.log('Seeded JS step 4');
  });

  db.CurriculaDetails.create({
    step_number: 1,
    step_type: "text",
    step_content: "Watch this video on cuts of meat",
    step_url: null,
    author_id: 2,
    curricula_id: 2
  }).then(() => {
    console.log('Seeded Steak step 1');
  });

  db.CurriculaDetails.create({
    step_number: 2,
    step_type: "text",
    step_content: "Watch this video on how to cook a steak",
    step_url: "https://youtu.be/AmC9SmCBUj4",
    author_id: 2,
    curricula_id: 2
  }).then(() => {
    console.log('Seeded Steak step 2');
  });

  db.CurriculaDetails.create({
    step_number: 3,
    step_type: "text",
    step_content: "Practice, Practice, Practice...",
    step_url: null,
    author_id: 2,
    curricula_id: 2
  }).then(() => {
    console.log('Seeded Steak step 3');
  });
}