// make_hash.js
const bcrypt = require("bcrypt");

async function run() {
  const password = process.argv[2];
  if (!password) {
    console.log("Usage: node make_hash.js yourPasswordHere");
    process.exit(1);
  }

  const hash = await bcrypt.hash(password, 10);
  console.log("PASSWORD:", password);
  console.log("BCRYPT HASH:", hash);
}

run();
