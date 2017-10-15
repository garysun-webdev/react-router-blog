import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPosts } from '../actions';


class PostNew extends Component {
	renderField(field){
		const { meta: {touched, error} } = field;

		const className = `form-group ${touched && error ? 'has-danger' : ''}`

		return(
			<div className={className}>
				<label>{field.label}</label>
				<input
					className="form-control"
					type="text"
					//get connected with the field
					{...field.input}
				/>
				<div className="text-help">
					{touched ? error : ''}
				</div>
			</div>
		)
	}

	onSubmit(values){
		this.props.createPosts(values);
		
	}

	render(){
		
		const { handleSubmit } = this.props;
		
		return(
			//const handleSubmit = this.props.handleSubmit;
			//equals to .
			

			//handleSubmit -> reduxForm
			//this.onSubmit.bind(this) -> callback function when handleSubmit finishes, it will run.
			<form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
				<Field 
					label="Title"
					name="title"
					//component is the view(JSX) part
					component={this.renderField}
				/>

				<Field 
					label="Categories"
					name="categories"
					//component is the view(JSX) part
					component={this.renderField}
				/>

				<Field 
					label="Content"
					name="content"
					//component is the view(JSX) part
					component={this.renderField}
				/>
				<button type="submit" className="btn btn-primary">Submit</button>
				<Link className="btn btn-danger" to="/">Cancel</Link>

			</form>
		)
	}
}

function validate(values) {
	//console.log(values) -> {title:'asdf, categories:'dad', content:'dsfs'}
	const errors = {};

	//Validate the inputs from 'values'
	if (!values.title || values.title.length < 3){
		//errors.title -> title is the 'name' in <Field>
		errors.title = "Title must be at least 3 characters";
	}
	if (!values.categories){
		errors.categories = "Please enter some categories";
	}
	if (!values.content){
		errors.content = "Please enter some content";
	}
	//If errors is empty, the form is fine to submit
	//If errors has *any* properties, redux form assumes from is invalid
	return errors;

}
// It's like connect, which passes many props to Component-PostNewForm

export default reduxForm({
	validate,
	form: 'PostNewForm'
})(
	connect(null,{createPosts})(PostNew)
);


