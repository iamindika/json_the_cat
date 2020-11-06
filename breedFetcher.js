const request = require('request');
const args = process.argv.slice(2);

let breedLongName = args[0];
if (!breedLongName) {
  throw new Error('ERROR!!! Must enter a breed to search.');
}

let breedShortName = breedLongName.slice(0, 3).toLowerCase();
let breedDesc;

request(`https://api.thecatapi.com/v1/breeds/search?q=${breedShortName}`, (error, response, body) => {
  if (error) {
    throw new Error(error);
  }
  console.log(response && response.statusCode);
  
  const data = JSON.parse(body);
  //console.log(data);
  //console.log(data[0]['description']);
  
  if (!data.length) {
    throw new Error('ERROR!!! ' + breedLongName + ' does not exist.');
  } else {
    breedDesc = data.filter(breed => breed.name.toLowerCase() === breedLongName.toLowerCase());
    if (!breedDesc.length) {
      throw new Error('ERROR!!! ' + breedLongName + ' is not recognized.');
    } else {
      console.log(`${breedDesc[0].name}: ${breedDesc[0].description}`);
    }
  }

});