import { set } from "mongoose"
import { useState, useEffect } from "react"
import styles from "../styles/Movielist.module.css"
import { useSession } from "next-auth/react"
import Link from "next/link"

export default function MovieList({ setShowPopup }) {
  const [page, setPage] = useState(1)
  const [movieList, setMovieList] = useState([])
  const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=73d50226df0facd8f05ada492eb68211&language=en-US&page=${page}`
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setMovieList((prev) => [...prev, ...data.results]))
      .catch((er) => console.log(err))
  }, [page])
  console.log(movieList)
  const { data: session, status } = useSession()
  if (status === "loading") {
    return <div>Loading...</div>
  } else {
    return (
      <div className="">
        <main className={styles.main}>
          <div className={styles.container}>
            {movieList.map((data) => (
              <a
                href={`https://www.themoviedb.org/movie/${data.id}`}
                target="_blank"
                rel="noreferrer"
                key={data.title}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500/${data["poster_path"]}`}
                  className={styles.poster}
                />
              </a>
            ))}
          </div>
          {status !== "loading" && (
            <button
              className={styles.loadmore}
              onClick={() => {
                status === "authenticated"
                  ? setPage((prev) => prev + 1)
                  : setShowPopup((prev) => !prev)
              }}
            >
              Load more
            </button>
          )}
        </main>
      </div>
    )
  }
}
