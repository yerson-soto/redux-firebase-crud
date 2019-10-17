import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layouts/Spinner';

//Redux y Firebase
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Books from './Books';

class ShowBook extends Component {

    devolverLibro = id => {
        // extraer firestore
        const { firestore } = this.props;

        // copia del libro
        const libroActualizado = {...this.props.book};

        // eliminar la persona que esta realizando la devolución de prestados
        const prestados = libroActualizado.prestados.filter(elemento => elemento.codigo !== id);
        libroActualizado.prestados = prestados;

        // actualizar en firebase
        firestore.update({
            collection : 'libros',
            doc: libroActualizado.id
        }, libroActualizado);
    }

    render() { 
            // extraer el libro
        const {book } = this.props;

        if(!book) return <Spinner />;

        // boton para solicitar un libro
        let btnPrestamo;

        if(book.existencia - book.prestados.length > 0 ) {
            btnPrestamo = <Link to={`/books/loan/${book.id}`}
                                className="btn btn-success my-3"
                            >Solicitar Prestamo</Link>
        } else {
            btnPrestamo = null;
        }
        
        return ( 
            <div className="row">
                <div className="col-md-6 mb-4">
                    <Link to="/" className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i> {''}
                        Volver Al Listado
                    </Link> 
                </div>
                <div className="col-md-6 mb-4">
                    <Link to={`/books/edit/${book.id}`} className="btn btn-primary float-right">
                        <i className="fas fa-pencil-alt"></i> {''}
                        Editar libro
                    </Link> 
                </div>

                <hr className="mx-5 w-100"/>

                <div className="col-12">
                    <h2 className="mb-4">{book.titulo}</h2>

                    <p>
                        <span className="font-weight-bold">
                            ISBN:
                        </span> {''}
                        {book.ISBN}
                    </p>

                    <p>
                        <span className="font-weight-bold">
                            Editorial:
                        </span> {''}
                        {book.editorial}
                    </p>

                    <p>
                        <span className="font-weight-bold">
                            Existencia:
                        </span> {''}
                        {book.existencia}
                    </p>

                    <p>
                        <span className="font-weight-bold">
                            Disponibles:
                        </span> {''}
                        {book.existencia - book.prestados.length }
                    </p>

                    {/* Boton para solicitar un prestamo de libro */}
                    {btnPrestamo}

                    {/* Muestra las personas que tienen los libros */}

                    <h3 className="my-2">Personas que tienen el Libro Prestado</h3>

                    {book.prestados.map(prestado => (
                        <div key={prestado.codigo} className="card my-2">
                            <h4 className="card-header">
                                {prestado.nombre} {prestado.apellido}
                            </h4>

                            <div className="card-body">
                                <p>
                                    <span className="font-weight-bold">
                                        Código:
                                    </span> {''}
                                    {prestado.codigo}
                                </p>

                                <p>
                                    <span className="font-weight-bold">
                                        Carrera:
                                    </span> {''}
                                    {prestado.carrera}
                                </p>

                                <p>
                                    <span className="font-weight-bold">
                                        Fecha Solicitud:
                                    </span> {''}
                                    {prestado.fecha_solicitud}
                                </p>
                            </div>

                            <div className="card-footer">
                                <button 
                                    type="button"
                                    className="btn btn-success font-weight-bold"
                                    onClick={() => this.devolverLibro(prestado.codigo)}
                                > Realizar Devolución </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div> 
        );
    }
}
 
export default compose(
    firestoreConnect(props => [{
        collection: 'books',
        storeAs: Books,
        doc: props.match.params.id
    }]),
    connect(( {firestore: {ordered} }, props) => ({
        books: ordered.book && ordered.book[0]
    }))
)(ShowBook);