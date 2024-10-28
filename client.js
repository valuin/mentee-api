import promptSync from "prompt-sync";
import axios from "axios";


const prompt = promptSync();

async function createUser() {
  try {
    const name = prompt("Enter your name: ");
    const nim = prompt("Enter your nim: ");
    console.log(nim);

    const response = await axios.post("http://localhost:3000/users", {
      name: name,
      nim: nim,
    });
    console.log("User created successfully", response.data);
  } catch (error) {
    console.log(error);
  }
}

function main() {
  createUser();
}

main();
