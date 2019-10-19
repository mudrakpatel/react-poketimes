import React, {Component} from 'react';
import {connect} from 'react-redux';

import {deletePost} from '../actions/postActions';

class Post extends Component{
    handleClick = (id) => {
        this.props.deletePost(id);
        //Redirect user to the Home component
        //after deleting the post
        this.props.history.push('/');
    };

    render(){
        const post = this.props.post ? (
            <div className="post">
                <h4 className="center">{this.props.post.title}</h4>
                <p>{this.props.post.body}</p>
                <div className="center">
                    <button 
                        className="btn grey"
                        onClick={
                            () => {
                                this.handleClick(this.props.post.id)
                            }
                        }>
                            Delete Post
                    </button>
                </div>
            </div>
        ) : (
            <div className="center">Loading post...</div>
        );

        return(
            <div className="container">
                {post}
            </div>
        );
    };
};

const mapStateToProps = (state, ownProps) => {
    //Grab the postid from route params
    let id = ownProps.match.params.postid;

    //Find the post based on id defined 
    //above and return the post
    return{
        post: state.posts.find((post) => {
            return post.id === id
        })
    };
};

const mapDispatchToProps = (dispatch) => {
    return{
        deletePost: (id) => {
            dispatch(deletePost(id));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Post);