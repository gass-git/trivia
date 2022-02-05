import axios from "axios";

export default function GetData({ fetchErrorCount, dispatch }) {
  const url = 'https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean'

  axios.get(url)
    .then((response) => {
      let dataArray = response.data.results

      // If data array is empty
      if (dataArray.length === 0) {
        dispatch({ type: 'fetch error' })
      }
      else { //  If data array is NOT empty
        dispatch({
          type: 'update data',
          data: dataArray
        })
      }

    })
    .catch((error) => {
      dispatch({ type: 'fetch error' })
      console.log(error)
    })

}