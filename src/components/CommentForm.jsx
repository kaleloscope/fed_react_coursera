import React, {Component} from 'react';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Button, Col, Label, Modal, ModalBody, ModalHeader, Row  } from 'reactstrap';

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
                            <Label htmlFor = "rating" >Rating</Label>
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
                            <Label htmlFor = "author" >Your Name</Label>
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
export default Comment;