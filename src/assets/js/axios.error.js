export default function (err) {
  if (err.response) {
    console.log(err.response.data);
    console.log(err.response.status);
    console.log(err.response.headers);
    alert(err.response.status + ' ' + err.response.data.message)
  } else if (err.request) {
    console.log(err.request);
  } else {
    console.log('Error', err.message);
  }
  console.log(err.config);
}