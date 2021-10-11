import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";


    function RenderDish({dish}) {
        return (
            <div className='col-12 col-md-5 m-1'>
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle> {dish.name}</CardTitle>
                        <CardText> {dish.description} </CardText>
                    </CardBody>
                </Card>
            </div>   
        );
    }

    function RenderComments({comments}){
        
        const cmnts = comments.map((comment) => {
            return (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author}
                    &nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit'
                    }).format(new Date(comment.date))}
                    </p>
                </li>
            );
        });
        return (
            <div className='col-12 col-md-5 m-1'>
                <h4> Comments </h4>
                <ul className='list-unstyled'>
                    {cmnts}
                </ul>

            </div>
        );
    }


    const DishDetail = (props) => {
        const dish = props.dish
        // const commnts = props.dish.comments        
        if (dish == null) {
            return (<div></div>);
        }

        // const comments = (comment) => {
        //     return(
        //         <div  key={comment.id} className = "col-12 col-md-5 m-1 ">
        //             <RenderComments comments = {props.dish.comments}/>
        //         </div>
        //     );
        // };

        // const dishItem = RenderDish(dish);
        // const dishComment = RenderComments(dish.comments);

        return (
            <div className = 'container'>
            <div className='row'>
                <RenderDish dish = {dish}/>
                <RenderComments comments = {props.dish.comments}/>
            </div>
            </div>
        )
    }



export default DishDetail;