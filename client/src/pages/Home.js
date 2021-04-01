import React, { useContext } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../context/authContext";

const GET_ALL_POSTS = gql`
  {
    allPosts {
      id
      title
      description
    }
  }
`;

const Home = () => {
  const { data, loading, error } = useQuery(GET_ALL_POSTS);

  // access context
  const { state, dispatch } = useContext(AuthContext);

  const updateUserName = () => {
    dispatch({
      type: "LOGGED_IN_USER",
      payload: "Gaurav",
    });
  };

  if (loading) return <p className="p-5">Loading ...</p>;

  return (
    <div className="containe">
      <div className="row  p-5">
        {data.allPosts.map((post) => (
          <div className="col-md-4" key={post.id}>
            <div className="card">
              <div className="card-body">
                <div className="card=title">
                  <h4>{post.title}</h4>
                </div>
                <p className="card-text">{post.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <hr />
      {JSON.stringify(state.user)}
      <button className="btn btn-primary" onClick={updateUserName}>
        Change User Name
      </button>
    </div>
  );
};

export default Home;
