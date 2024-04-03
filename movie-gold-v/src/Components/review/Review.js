import { Container, Row,Col } from 'react-bootstrap';
import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';

import api from '../../api/axiosConfig';
import Reviewform from '../reviewform/Reviewform';

const Review = ({getMovieData,movie,reviews,setReviews}) => {
   
        const revText=useRef();
        let params=useParams();
        const movieId=params.movieId;
      
       
    
    useEffect(()=>{
        getMovieData(movieId);

    },[]);
    const addReview= async(e)=>{
        e.preventDefault();
        try{
            const rev =revText.current;
            const response =await api.post("/api/v1/reviews",{reviewBody:rev.value,imdbId:movieId});
            const updateReviews=[...(reviews||[]),rev.value];
            rev.value="";
            setReviews(updateReviews);
        }
         catch(error){

            console.log(error);
        }
       
    }
  return (
    <Container>
        <Row>
            <Col><h3>Reviews</h3></Col>
        </Row>
        <Row className="mt-2">
            <Col>
                <img src={movie?.poster} alt=" no picture" />
            </Col>
            <Col>
                {
                    <>
                        <Row>
                            <Col>
                                <Reviewform handleSubmit={addReview} revText={revText} labelText = "Write a Review?" />  
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>
                }
                {
                   reviews?.map((r, index) => (
                    <React.Fragment key={index}>
                      <Row key={index}>
                        <Col >{"Review sucessfully added"} {r.body}</Col>
                      </Row>
                      <Row key={`hr-${index}`}>
                        <Col>
                          <hr />
                        </Col>
                      </Row>
                    </React.Fragment>
                  ))
                }
            </Col>
        </Row>
        <Row>
            <Col>
                <hr />
            </Col>
        </Row>        
    </Container>
  )
}

export default Review
