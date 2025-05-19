```
const Sequelize = require("sequelize");

const sequelize = new Sequelize("sequelize-db", "root", "Uzair@7007", {
  dialect: "mysql",
  host: "localhost",
  port: 3306,
  // can put fields that must be applied for all the table inside db here making timestamp true so every table will have if false no table will have this
  define: {
    timestamps: true,
  },
});

// sequelize.authenticate().then(res => console.log("connection successful")).catch(error => console.log(error))

// sequelize.sync({force:true}) use this method you can sync all the table in one go.
//  sequelize.drop() drop all table

// User.drop()  will drop specific table
const User = sequelize.define(
  "user",
  {
    user_id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 6],
      },
    },
    password: {
      type: Sequelize.DataTypes.STRING,
    },
    age: {
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 21,
    },
    withCodeRocks: {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    freezeTableName: false, // it will make plural of the table name : true | false
    timestamps: true, // will not add timestamp for created and updated at.
  }
);

const dbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("connected successfully");
  } catch (error) {
    console.log("error", error);
  }
};
dbConnection();
console.log("Another task");

// User.sync({ alter: true })
//   .then((data) => console.log("table user created successfully", data))
//   .catch((error) => console.log("error", error));

// User.sync({ alter: true })
//   .then((data) => {
// first way to do
//     const newUser = User.build({ username: "uzair", password: "123", age: 22 });
//     return newUser.save();

//   2nd way

//    return  User.create({
//       username: "something_wrong",
//       password: "hello",
//       age: 21,
//       withCodeRocks: false,
//     });
//   })

// for bulk entry we can use bulkCreate and pass array of object inside it
// if you want to run validation on bulk insert you must pass second argument {validate : true}
//     return User.bulkCreate(
//       [
//         { username: "newUserName", age: 21, password: "hellobabygirl" },
//         {
//           username: "somethinghappened",
//           age: 21,
//           password: "newthing",
//         },
//       ],
//       { validate: true }
//     );
//   })
//   .then((savedData) => {
//     savedData.decrement({ age: 2 });
//     console.log(savedData);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// Retrieving data
let count = 0;
User.findAll().then((data) => {
  count++;
  data.forEach((item) => {
    console.log(`------------query ${count}----------`);
    console.log(item.toJSON());
  });
});
// selecting only required data
User.findAll({ attributes: ["username", "password"] }).then((data) => {
  console.log(`------------query ${count}----------`);
  count++;

  data.forEach((item) => {
    console.log(item.toJSON());
  });
});
// Altering attribute name while sending no effect on table
User.findAll({
  attributes: [
    ["username", "name"],
    ["password", "pass"],
  ],
}).then((data) => {
  console.log(`------------query ${count}----------`);
  count++;

  data.forEach((item) => {
    console.log(item.toJSON());
  });
});

User.findAll({
  attributes: { exclude: ["password"] },
}).then((data) => {
  console.log(`------------query ${count}----------`);
  count++;

  data.forEach((item) => {
    console.log(item.toJSON());
  });
});

User.findAll({
  attributes: { exclude: ["password"] },
  where: { age: 24 },
}).then((data) => {
  console.log(`------------query ${count}----------`);
  count++;

  data.forEach((item) => {
    console.log(item.toJSON());
  });
});
// Aggregation
User.findAll({
  attributes: [[sequelize.fn("SUM", sequelize.col("age")), "total_age"]],
}).then((data) => {
  console.log(`------------query ${count}----------`);
  count++;

  data.forEach((item) => {
    console.log(item.toJSON());
  });
});

User.findAll({
  attributes: [
    "username",
    [sequelize.fn("SUM", sequelize.col("age")), "totalUserAge"],
  ],
  group: "username",
}).then((data) => {
  console.log("Hey! this is my grouping");

  data.forEach((item) => console.log(item.toJSON()));
});

User.findAll({
  attributes: [
    ["username", "NAME"],
    ["age", "AGE"],
  ],
  where: {
    [Sequelize.Op.or]: { username: "uzair", age: 1 },
  },
}).then((data) => {
  console.log("this is or operator query");

  data.forEach((item) => console.log(item.toJSON()));
});

User.findAll({
  attributes: ["username"],
  where: {
    age: {
      [Sequelize.Op.gt]: 21,
    },
  },
}).then((item) => {
  console.log("hey this is gt operator");
  item.forEach((item) => console.log(item.toJSON()));
});

User.findAll({
  attributes: ["username"],
  where: {
    age: {
      [Sequelize.Op.or]: {
        [Sequelize.Op.gt]: 21,
        [Sequelize.eq]: null,
      },
    },
  },
}).then((item) => {
  console.log("hey this is gt operator");
  item.forEach((item) => console.log(item.toJSON()));
});

User.findAll({
  attributes: ["username"],
  where: sequelize.where(
    sequelize.fn("char_length", sequelize.col("username")),
    5
  ),
}).then((item) => {
  console.log("hey this is length operator");
  item.forEach((item) => console.log(item.toJSON()));
});

User.update(
  { username: "sahil" },
  {
    where: {
      username: "uzair",
      age: {
        [Sequelize.Op.gt]: 21,
      },
    },
  }
).then((res) => {
  console.log(res, "hey updates here");
});
 

```
