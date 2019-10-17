import React, { Component } from 'react';
import Spinner from '../layouts/Spinner';
import { Link } from 'react-router-dom';

//Redux y Firebase
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

const Books = ({books, firestore}) => {

    const eliminarLibro = id => {
        // eliminar libro de Firestore
        firestore.delete({
            collection : 'books',
            doc : id
        });
        
    }

    if(!books) return <Spinner />


    return ( 
        <div className="row">
            <div className="col-12 mb-4">
                <Link to="/books/new" className="btn btn-success">
                    <i className="fas fa-plus"></i> {''}
                    Nuevo Libro
                </Link>
            </div>
            <div className="col-md-8">
                <h2>
                    <i className="fas fa-book"></i> {''}
                    Libros
                </h2>
            </div>

            <table className="table table-striped mt-4">
                <thead className="text-light bg-primary">
                    <tr>
                        <th>Titulo</th>
                        <th>ISBN</th>
                        <th>Editorial</th>
                        <th>Existencia</th>
                        <th>Disponibles</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {books.map(book => (
                        <tr key={book.id}>
                            <td>{book.titulo}</td>
                            <td>{book.ISBN}</td>
                            <td>{book.editorial}</td>
                            <td>{book.existencia}</td>
                            <td>{book.existencia - book.prestados.length}</td>
                            <td>
                                <Link 
                                    to={`/books/show/${book.id}`}
                                    className="btn btn-success btn-block"
                                > 
                                    <i className="fas fa-angle-double-right"></i> {''}  
                                    Más Información
                                </Link>

                                <button 
                                    type="button"
                                    className="btn btn-danger btn-block"
                                    onClick={() => eliminarLibro(book.id)}
                                >
                                    <i className="fas fa-trash-alt"></i> {''}
                                    Eliminar

                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
     );
}

Books.propTypes = {
    firestore : PropTypes.object.isRequired,
    books: PropTypes.array
}
 
export default compose(     
    firestoreConnect([{ collection: 'books'}]),
    connect((state, props) => ({
        books: state.firestore.ordered.books
    }))
)(Books);