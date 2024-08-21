const express = require('express');
const axios = require('axios');
const mysql = require('mysql');
const { v4: uuidv4 } = require('uuid');
const { db } = require('./db');

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  const name = await getPersonName();
  await insertName(name);
  const names = await getNames();

  return res.send(
    `<h1 style="text-align: center">Full Cycle Rocks!</h1>

<table style="border-collapse: collapse; width: 50%; margin: 20px auto; font-family: Arial, sans-serif;">
  <tr>
    <th style="background-color: #f2f2f2; padding: 10px; border: 1px solid #ddd; text-align: left;">Id</th>
    <th style="background-color: #f2f2f2; padding: 10px; border: 1px solid #ddd; text-align: left;">Names</th>
  </tr>
  
  ${names.map((row) => `
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd;">${row.id}</td>
      <td style="padding: 10px; border: 1px solid #ddd;">${row.name}</td>
    </tr>`).join('')}
</table>
    `
  );
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Get Random number between 1 and 83
const getRandomNumber = () => {
  return Math.floor(Math.random() * 83) + 1;
};

const getPersonName = async () => {
  let name = '';

  try {
    const devApiResponse = await swapiDevAPiNameGeneration();
    name = devApiResponse;
  } catch (error) {
    console.error('Error on SWAPI Dev API', error);
    try {
      const randomUserApiResponse = await randomUserrApiNameGeneration();
      name = randomUserApiResponse;
    } catch (error) {
      console.error('Error on Random User API', error);
    }
  } finally {
    if (!name) {
      name = `Jhon Doe ${uuidv4()}`
    }

    return name;
  }
};

const swapiDevAPiNameGeneration = async () => {
  const randomNumber = getRandomNumber();
  const response = await axios.get(`https://swapi.dev/api/people/${randomNumber}`);
  return response.data.name;
};

const randomUserrApiNameGeneration = async () => {
  const response = await axios.get('https://randomuser.me/api/');
  const firstName = response.data.results[0].name.first;
  const lastName = response.data.results[0].name.last;
  const name = `${firstName} ${lastName}`;

  return name;
}

const insertName = async (name) => {
  const createQuery = `INSERT INTO people (name) VALUES ('${name}');`;
  const response = await db.query(createQuery);
  return response;

}

const getNames = async () => {
  const query = `SELECT * FROM people`;
  const response = await db.query(query);

  return response;
}