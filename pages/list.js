import { useState } from "react"
import Nav from "../components/Nav.jsx"
import MovieList from "../components/MovieList.jsx"
import Popup from "../components/Popup.jsx"

function List() {
  const [showPopup, setShowPopup] = useState(false)
  return (
    <div className="conatiner">
      {showPopup && <Popup setShowPopup={setShowPopup} />}
      <Nav />
      <MovieList setShowPopup={setShowPopup} />
    </div>
  )
}

export default List
