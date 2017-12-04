(error, result) => {
    if (error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      alert('Success fetching data');
      console.log(result)
    }
}