import React, {Component} from "react";
import { Link } from "react-router-dom";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Col, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
// import Comment from "./CommentForm";
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length; 
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class Comment extends Component{

    constructor(props){
        super(props);
        this.state = {
            isModalOpen:false,
        }

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);

    }

    handleOpenModal(){
        this.setState ({
            isModalOpen : !this.state.isModalOpen
        });
    }

    handleSubmitComment(values){
        alert('Current state is: ' + JSON.stringify(values))
    }

    render(){
        return(
          <React.Fragment>
            
            <Button outline onClick = {this.handleOpenModal}>
                <span className="fa fa-comments fa-lg"></span> Submit Comment
            </Button>

            <Modal isOpen = {this.state.isModalOpen} toggle={this.handleOpenModal}>
                <ModalHeader toggle ={this.handleOpenModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit = {(values) => this.handleSubmitComment(values)}>
                        <Row className = "form-group">
                            <Label htmlFor = "rating" md={12}>Rating</Label>
                            <Col md={12}>
                                    <Control.select model = ".rating"
                                        className="form-control"
                                        name="rating"
                                        id="rating"
                                        validators={{
                                            required
                                        }}
                                    >
                                        <option>Please Select</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                        }}
                                    />  
                                </Col> 
                        </Row>
                        <Row className = "form-group">
                            <Label htmlFor = "author" md={12}>Your Name</Label>
                            <Col md={12}>
                                    <Control.text model = ".author"
                                        className="form-control"
                                        name="author"
                                        id="author"
                                        validators={{
                                            required,
                                            minLength : minLength(3),
                                            maxLength : maxLength(20)
                                        }}
                                    >
                                    </Control.text>
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength : ' Must be at least 3 characters',
                                            maxLength : 'Must be 20 characters or less'
                                        }}
                                    />  
                                </Col> 
                        </Row>
                        
                        <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control"
                                        validators={{
                                            required
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                        }}
                                    />  
                                </Col>

                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>

                    </LocalForm>
                </ModalBody>
            </Modal>
            
            
          </React.Fragment>  
            
        );
    }



}


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
                <Comment/>

            </div>
        );
    }


    const DishDetail = (props) => {
        const dish = props.dish  
        if (dish == null) {
            return (<div></div>);
        }

        return (
            <div className = 'container'>
                <div className = "row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to = '/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>
                </div>
                <div className='row'>
                    <RenderDish dish = {dish}/>
                    
                        <RenderComments comments = {props.comments}/>
                        
                    
                </div>
            </div>
        )
    }



export default DishDetail;