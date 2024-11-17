import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';


function ReviewCard(props) {

    let completed_badge_text = props.data.completed ? "Completed" : "Not Completed";
    let completed_badge_class = props.data.completed ? "success" : "warning";

    let review_tags = props.data.tags.map((tag, idx) => {
        return (
          <Badge key={idx}>{tag}</Badge>
        )
    });

    let completed_tag = ( <Badge key={review_tags.length} bg={completed_badge_class}>{completed_badge_text}</Badge>);
    review_tags.push(completed_tag);

    return (
        <Card style={{ width: '20rem', textAlign: "left" }}>
            <Card.Body>
                <Card.Title>{props.data.media_name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Rating: {props.data.rating}/10</Card.Subtitle>
                <Card.Text>
                    <strong>{' '}{props.data.media_type}{' '}</strong>
                </Card.Text>
                <Card.Text>{props.data.review_str}</Card.Text>
                {review_tags}
            </Card.Body>
        </Card>
    );
}

export default ReviewCard; 