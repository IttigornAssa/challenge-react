export const summaryDonations = (donations) => {
  donations.map(item => {
    if(typeof item != 'number'){
      throw "Invalid data"
    }
  })
  return donations.reduce((accumulator, value) => accumulator + value);
}
