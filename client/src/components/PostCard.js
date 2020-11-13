import React from "react";
import { Card, Icon, Label, Image, Button } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

const PostCard = ({
  post: { id, username, body, createdAt, likeCount, commentCount },
}) => {
  function likePost() {
    console.log("like post!!!");
  }
  function commentPost() {
    console.log("like post!!!");
  }
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/jenny.jpg"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow()}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as="div" labelPosition="right" size="mini" onClick={likePost}>
          <Button color="teal" size="mini" basic>
            <Icon name="heart" />
          </Button>
          <Label as="a" basic color="teal" pointing="left">
            {likeCount}
          </Label>
        </Button>
        <Button
          as="div"
          labelPosition="right"
          size="mini"
          onClick={commentPost}
        >
          <Button color="teal" size="mini" basic>
            <Icon name="comment" />
          </Button>
          <Label as="a" basic color="teal" pointing="left">
            {commentCount}
          </Label>
        </Button>
      </Card.Content>
    </Card>
  );
};

export default PostCard;
