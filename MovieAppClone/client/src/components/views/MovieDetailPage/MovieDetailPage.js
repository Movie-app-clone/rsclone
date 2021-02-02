import React, { useState, useEffect } from 'react';
import { API_URL, API_KEY, IMAGE_URL } from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import { Descriptions, Button, Row } from 'antd';
import GridCard from '../LandingPage/Sections/GridCard';
import Favorite from './Sections/Favorite';
import Comments from './Sections/Comments';
import axios from 'axios';

function MovieDetailPage(props) {

    const movieId = props.match.params.movieId

    let StringOfGenres = ''

    const [Movie, setMovie] = useState([])
    const [Genres, setGenres] = useState([])
    const [Crews, setCrews] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)
    const [CommentLists, setCommentLists] = useState([])

    const movieVariable = {
        movieId: movieId
    }

    useEffect(() => {
    
        fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`)
            .then(response => response.json())
            .then(response => {
                setMovie(response)
                setGenres(response.genres)
                fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
                    .then(response => response.json())
                    .then(response => {
                        setCrews(response.cast)
                    })
            })

            

            axios.post('/api/comment/getComments', movieVariable)
            .then(response => {
                if (response.data.success) {

                    setCommentLists(response.data.comments)
                } else {
                    alert('Failed to get comments Info')
                }
            })


    }, [])

    const handleClick = () => {
        setActorToggle(!ActorToggle)
    }

    const updateComment = (newComment) => {
        setCommentLists(CommentLists.concat(newComment))
    }

    Genres.forEach((e)=>{
        let {name} = e
        StringOfGenres += name +', '
        
    })
    
    return (
       

        <div style={{ width: '100%', margin: 0 }}>
            {Movie &&
                <MainImage image={`${IMAGE_URL}w1280${Movie.backdrop_path && Movie.backdrop_path}`}
                    title={Movie.original_title} text={Movie.overview} />
            }
            
            <div style={{ width: '85%', margin: '1rem auto' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Favorite userFrom={localStorage.getItem('userId')} movieId={movieId} movieInfo={Movie} />
                </div>
               
                

                <Descriptions title="Movie Info">
                    <Descriptions.Item label="Title">{Movie.original_title}</Descriptions.Item>
                    <Descriptions.Item label="Release date">{Movie.release_date}</Descriptions.Item>
                    <Descriptions.Item label="Revenue">{Movie.revenue} $</Descriptions.Item>
                    <Descriptions.Item label="Runtime">{Movie.runtime} mins</Descriptions.Item>
                    <Descriptions.Item label="Vote average">
                        {Movie.vote_average}
                    </Descriptions.Item>
                    <Descriptions.Item label="Genre">{StringOfGenres}</Descriptions.Item>
                    <Descriptions.Item label="Vote count">{Movie.vote_count}</Descriptions.Item>
                    <Descriptions.Item label="Status">{Movie.status}</Descriptions.Item>
                    <Descriptions.Item label="Popularity">{Movie.popularity}</Descriptions.Item>
                </Descriptions>

                <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem' }}>
                    <Button onClick={handleClick}> Toggle Actor View</Button>
                </div>

                {ActorToggle &&
                    <Row gutter={[16, 16]}>
                        {Crews && Crews.map((crew, index) => (
                            <React.Fragment key={index}>
                                {crew.profile_path &&
                                    <GridCard
                                        actor image={`${IMAGE_URL}w500${crew.profile_path}`}
                                    />
                                }
                            </React.Fragment>
                        ))}

                    </Row>
                }

                <Comments movieTitle={Movie.original_title} CommentLists={CommentLists} postId={movieId} refreshFunction={updateComment} />

            </div>
        </div>
    )
}

export default MovieDetailPage
