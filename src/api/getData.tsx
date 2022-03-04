import axios from "axios"
import { ACTIONS } from "../appReducer"

export default function GetData({ dispatch }) {
  const url = 'https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean'
  const { FETCH_ERROR, UPDATE_DATA } = ACTIONS;

  axios.get(url)
    .then((response) => {
      let dataArray = response.data.results

      // If data array is empty
      if (dataArray.length === 0) {
        dispatch({ type: FETCH_ERROR })
      }
      else { //  If data array is NOT empty
        dispatch({
          type: UPDATE_DATA,
          data: dataArray
        })
      }
    })
    .catch((error) => {
      dispatch({ type: 'API fetching error', action: error })
    })

}