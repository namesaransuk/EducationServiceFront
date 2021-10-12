export const getAllCountries = async () => {
  try {
    const response = await fetch(`https://educationservice.herokuapp.com/EducationData/getAllEducationData`);
    const responseCountries = await response.json();
    return responseCountries;
  } catch (err) {
    console.log(err);
  }
};
