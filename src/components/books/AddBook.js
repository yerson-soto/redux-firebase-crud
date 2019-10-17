import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

class AddBook extends Component {
    state = { 
        titulo: '',
        ISBN: '',
        editorial: '',
        existencia : ''
    }

    // guardar el libro en la base de datos
    handleSubmit = e => {
        e.preventDefault();

        // tomar una copia del state
       const nuevoLibro = this.state;

       // agregar un arreglo de interesados.
       nuevoLibro.prestados = [];

        // extraer firestore con sus métodos
        const { firestore, history } = this.props;
         
        // añadirlo a la base de datos y redireccionar
        firestore.add({collection: 'books'}, nuevoLibro)
           .then(() => history.push('/'))
    }

    // almacena lo que el usuario escribe en el state
    handleChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render() { 
        return (  
            <div className="row">
                <div className="col-12 mb-4">
                    <Link to="/" className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i> {''}
                        Volver al Listado
                    </Link>
                </div>
                <div className="col-12">
                    <h2>
                        <i className="fas fa-book"></i> {''}
                        Nuevo Libro
                    </h2>

                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            <form
                                onSubmit={this.handleSubmit}
                            >
                                <div className="form-group">
                                    <label>Titulo:</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="titulo"
                                        placeholder="Titulo o Nombre de Libro"
                                        required
                                        value={this.state.titulo}
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Editorial:</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="editorial"
                                        placeholder="Editorial de Libro"
                                        required
                                        value={this.state.editorial}
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>ISBN:</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="ISBN"
                                        placeholder="ISBN de Libro"
                                        required
                                        value={this.state.ISBN}
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Existencia:</label>
                                    <input 
                                        type="number"
                                        min="0"
                                        className="form-control"
                                        name="existencia"
                                        placeholder="Cantidad en Existencia"
                                        required
                                        value={this.state.existencia}
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <input type="submit" value="Agregar Libro" className="btn btn-success"/>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AddBook.propTypes = {
    firestore: PropTypes.object.isRequired
}
 
export default firestoreConnect() (AddBook);