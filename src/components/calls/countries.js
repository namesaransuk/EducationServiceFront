export const getAllCountries = async () => {
  try {
    const response = await fetch(`http://localhost:8080/EducationData/getAllEducationData`);
    const responseCountries = await response.json();
    return responseCountries;
  } catch (err) {
    console.log(err);
  }
};
