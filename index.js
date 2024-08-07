const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename: "tracks_database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.1 HW2" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

/*
Exercise 1: Retrieve All Tracks

Define the endpoint /tracks to retrieve all music tracks.

Define the function name fetchAllTracks which returns all tracks from the database.

API call

http://localhost:3000/tracks

Expected Output

{
  'tracks': [
    {
      id: 1,
      title: 'Raabta',
      genre: 'Romantic',
      release_year: 2012,
      artist: 'Arijit Singh',
    },
    {
      id: 2,
      title: 'Naina Da Kya Kasoor',
      genre: 'Pop',
      release_year: 2018,
      artist: 'Amit Trivedi',
    },
    {
      id: 3,
      title: 'Ghoomar',
      genre: 'Traditional',
      release_year: 2018,
      artist: 'Shreya Ghoshal',
    },
    {
      id: 4,
      title: 'Bekhayali',
      genre: 'Rock',
      release_year: 2019,
      artist: 'Sachet Tandon',
    },
    {
      id: 5,
      title: 'Hawa Banke',
      genre: 'Romantic',
      release_year: 2019,
      artist: 'Darshan Raval',
    },
    {
      id: 6,
      title: 'Ghungroo',
      genre: 'Dance',
      release_year: 2019,
      artist: 'Arijit Singh',
    },
    {
      id: 7,
      title: 'Makhna',
      genre: 'Hip-Hop',
      release_year: 2019,
      artist: 'Tanishk Bagchi',
    },
    {
      id: 8,
      title: 'Tera Ban Jaunga',
      genre: 'Romantic',
      release_year: 2019,
      artist: 'Tulsi Kumar',
    },
    {
      id: 9,
      title: 'First Class',
      genre: 'Dance',
      release_year: 2019,
      artist: 'Arijit Singh',
    },
    {
      id: 10,
      title: 'Kalank Title Track',
      genre: 'Romantic',
      release_year: 2019,
      artist: 'Arijit Singh',
    },
  ]
}
*/

//  function to rerieve all tracks
async function fetchAllTracks() {
  let query = "SELECT * FROM tracks";
  try {
    if (!db) throw new Error("Database not connected");
    let result = await db.all(query);
    if (!result || result.length == 0) {
      throw new Error("No tracks found");
    }
    return { tracks: result };
  } catch (error) {
    console.log("Error in fetching records ", error.message);
    throw error;
  }
}

//  endpoint to retrieve all tracks
app.get("/tracks", async (req, res) => {
  try {
    let result = await fetchAllTracks();
    res.status(200).json(result);
  } catch (error) {
    if (error.message === "No tracks found") {
      return res.status(404).json({ status: 404, error: error.message });
    } else {
      return res.status(500).json({ status: 500, error: error.message });
    }
  }
});

/*
Exercise 2: Retrieve Tracks by Artist

Define the endpoint /tracks/artist/:artist to retrieve tracks by a specific artist.

Define the function name fetchTracksByArtist which returns tracks for a given artist from the database.

API call

http://localhost:3000/tracks/artist/Arijit%20Singh

Expected Output

{
  'tracks': [
    { 'id': 1, 'title': 'Raabta', 'genre': 'Romantic', 'release_year': 2012, 'artist': 'Arijit Singh' },
    { 'id': 6, 'title': 'Ghungroo', 'genre': 'Dance', 'release_year': 2019, 'artist': 'Arijit Singh' },
    { 'id': 9, 'title': 'First Class', 'genre': 'Dance', 'release_year': 2019, 'artist': 'Arijit Singh' },
    { 'id': 10, 'title': 'Kalank Title Track', 'genre': 'Romantic', 'release_year': 2019, 'artist': 'Arijit Singh' }
  ]
}
*/

// function to retrieve tracks by artist
async function fetchTracksByArtist(artist) {
  let query = "SELECT * FROM tracks WHERE artist = ?";
  try {
    if (!db) throw new Error("Database not connected");
    let result = await db.all(query, [artist]);
    if (!result || result.length == 0) {
      throw new Error("No tracks found");
    }
    return { tracks: result };
  } catch (error) {
    console.log("Error in fetching records ", error.messsage);
    throw error;
  }
}

// endpoint to retrieve tracks by artist
app.get("/tracks/artist/:artist", async (req, res) => {
  try {
    let artist = req.params.artist;
    let result = await fetchTracksByArtist(artist);
    res.status(200).json(result);
  } catch (error) {
    if (error.message === "No tracks found") {
      return res.status(404).json({ status: 404, error: error.message });
    } else {
      return res.status(500).json({ status: 500, error: error.message });
    }
  }
});

/*
Exercise 3: Retrieve Tracks by Genre

Define the endpoint /tracks/genre/:genre to retrieve tracks by genre.

Define the function name fetchTracksByGenre which returns tracks for a given genre from the database.

API call

http://localhost:3000/tracks/genre/Romantic

Expected Output

{
  'tracks': [
    { 'id': 1, 'title': 'Raabta', 'genre': 'Romantic', 'release_year': 2012, 'artist': 'Arijit Singh' },
    { 'id': 5, 'title': 'Hawa Banke', 'genre': 'Romantic', 'release_year': 2019, 'artist': 'Darshan Raval' },
    { 'id': 8, 'title': 'Tera Ban Jaunga', 'genre': 'Romantic', 'release_year': 2019, 'artist': 'Tulsi Kumar' },
    { 'id': 10, 'title': 'Kalank Title Track', 'genre': 'Romantic', 'release_year': 2019, 'artist': 'Arijit Singh' }
  ]
}
*/

// function to retrieve tracks by genre
async function fetchTracksByGenre(genre) {
  let query = "SELECT * FROM tracks WHERE genre = ?";
  try {
    if (!db) throw new Error("Database not connected");
    let result = await db.all(query, [genre]);
    if (!result || result.length == 0) {
      throw new Error("No tracks found");
    }
    return { tracks: result };
  } catch (error) {
    console.log("Error in fetching records => ", error.message);
    throw error;
  }
}

// endpoint to retrieve tracks by genre
app.get("/tracks/genre/:genre", async (req, res) => {
  try {
    let genre = req.params.genre;
    let result = await fetchTracksByGenre(genre);
    res.status(200).json(result);
  } catch (error) {
    if (error.message === "No tracks found") {
      return res.status(404).json({ status: 404, error: error.message });
    } else {
      return res.status(500).json({ status: 500, error: error.message });
    }
  }
});

/*
Exercise 4: Retrieve Tracks by Release Year

Define the endpoint /tracks/release_year/:year to retrieve tracks by release year.

Define the function name fetchTracksByReleaseYear which returns tracks for a given release year from the database.

API call

http://localhost:3000/tracks/release_year/2019

Expected Output

{
  'tracks': [
    { 'id': 4, 'title': 'Bekhayali', 'genre': 'Rock', 'release_year': 2019, 'artist': 'Sachet Tandon' },
    { 'id': 5, 'title': 'Hawa Banke', 'genre': 'Romantic', 'release_year': 2019, 'artist': 'Darshan Raval' },
    { 'id': 6, 'title': 'Ghungroo', 'genre': 'Dance', 'release_year': 2019, 'artist': 'Arijit Singh' },
    { 'id': 7, 'title': 'Makhna', 'genre': 'Hip-Hop', 'release_year': 2019, 'artist': 'Tanishk Bagchi' },
    { 'id': 8, 'title': 'Tera Ban Jaunga', 'genre': 'Romantic', 'release_year': 2019, 'artist': 'Tulsi Kumar' },
    { 'id': 9, 'title': 'First Class', 'genre': 'Dance', 'release_year': 2019, 'artist': 'Arijit Singh' },
    { 'id': 10, 'title': 'Kalank Title Track', 'genre': 'Romantic', 'release_year': 2019, 'artist': 'Arijit Singh' }
  ]
}
*/

// function to retrieve tracks by release year
async function fetchTracksByReleaseYear(year) {
  let query = "SELECT * FROM tracks WHERE release_year = ?";
  try {
    if (!db) throw new Error("Database not connected");
    let result = await db.all(query, [year]);
    if (!result || result.length == 0) {
      throw new Error("No tracks found");
    }
    return { tracks: result };
  } catch (error) {
    console.log("Error in fetching records => ", error.message);
    throw error;
  }
}

// endpoint to retrieve tracks by release year
app.get("/tracks/release_year/:year", async (req, res) => {
  try {
    let year = req.params.year;
    let result = await fetchTracksByReleaseYear(year);
    res.status(200).json(result);
  } catch (error) {
    if (error.message === "No tracks found") {
      return res.status(404).json({ status: 404, error: error.message });
    } else {
      return res.status(500).json({ status: 500, error: error.message });
    }
  }
});
