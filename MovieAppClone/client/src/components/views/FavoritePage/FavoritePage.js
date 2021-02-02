import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import './favorite.css';
import { Popover } from 'antd';
import { IMAGE_URL } from '../../Config';
import { Button } from 'antd';

function FavoritePage() {
    
    const variables = { userFrom: localStorage.getItem('userId') }

    const [FavoriteMovies, setFavoriteMovies] = useState([])

    useEffect(() => {
        fetchFavoriteMovies()
    }, [])

    const fetchFavoriteMovies = () => {
        Axios.post('/api/favorite/getFavoriteMovie', variables)
            .then(response => {
                if (response.data.success) {
                    setFavoriteMovies(response.data.fav)
                } else {
                    alert('failed to get favorite movies')
                }
            })
    }

    const removeFromFavorites = (movieId) => {

        const variable = {
            movieId: movieId,
            userFrom: localStorage.getItem('userId')
        }

        Axios.post('/api/favorite/removeFromFavorite', variable)
            .then(response => {
                if (response.data.success) {
                    fetchFavoriteMovies()
                } else {
                    alert(' Failed to remove from favorite')
                }
            })
    }

    const renderTableBody = FavoriteMovies.map((movie, index) => {

        const content = (
            <div>
                {movie.movieImage ?
                    <img src={`${IMAGE_URL}w500${movie.movieImage}`} alt="movieImage" />
                    :
                    "no Image"
                }
            </div>
        )

        return <tr>
            <Popover content={content} title={`${movie.movieTitle}`}>
                <td><a href={`/movie/${movie.movieId}`}>{movie.movieTitle}</a></td>
            </Popover>
            <td>{movie.movieRunTime} mins</td>
            <td><Button onClick={() => removeFromFavorites(movie.movieId)}>Remove from the Favorites</Button></td>

        </tr>
    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h3>Favorite Movies By Me</h3>
            <hr />

            <table>
                <thead>
                    <tr>
                        <th>Movie Title	</th>
                        <th>Movie RunTime	</th>
                        <th>Remove from favorites</th>
                    </tr>
                </thead>
                <tbody>

                    {renderTableBody}

                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage
