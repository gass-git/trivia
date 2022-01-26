import axios from "axios";

const url = 'https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean'

export default function getData({ setData }) {

  axios.get(url)
    .then((response) => {

      let dataArray = response.data.results
      setData(dataArray)

      console.log(dataArray)
    })
    .catch((error) => {
      console.log(error)
    })

}