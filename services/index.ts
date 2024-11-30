import axios from "axios";

// API sorgusu yapacak fonksiyon

const fetchCharacter = async (id:number) => {
  const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);

  if (!response) {
    throw new Error("Ağ yanıt vermedi.");
  }

  const stringifiedObj = JSON.stringify(response.data, null, 2);

  return response.data;
};

const fetchCharacters = async (ids:number[]) => {
  const response = await axios.get(`https://rickandmortyapi.com/api/character/${ids.join(",")}`);

  if (!response) {
    throw new Error("Ağ yanıt vermedi.");
  }

  const stringifiedObj = JSON.stringify(response.data, null, 2);

  return response.data;
};

const fetchAllCharacters = async (page: number) => {
  const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);

  if (!response) {
    throw new Error("Ağ yanıt vermedi.");
  }

  const stringifiedObj = JSON.stringify(response.data.results, null, 2);

  return response.data.results;
};

const filteredFetchByName = async (word: string) => {
  const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${word}`);

  if (!response) {
    throw new Error("Ağ yanıt vermedi.");
  }

  const stringifiedObj = JSON.stringify(response.data.results, null, 2);

  return response.data.results;
};


export { fetchCharacter, fetchCharacters, fetchAllCharacters, filteredFetchByName };
